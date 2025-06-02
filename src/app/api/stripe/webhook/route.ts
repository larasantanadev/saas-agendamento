import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Stripe secret key not found");
  }

  // verifica se o stripe está funcionando
  // pega a assinatura do evento
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    throw new Error("Stripe signature not found");
  }

  // verifica se o evento é valido
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2025-05-28.basil",
  });

  // construtor de evento, HMAC com SHA256
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  // switch case para verificar o tipo de evento
  switch (event.type) {
    // caso o evento seja um pagamento
    case "invoice.paid": {
      if (!event.data.object.id) {
        throw new Error("Subscription ID not found");
      }
      // pega o id da assinatura, o id do cliente e o id do usuário
      const { subscription, subscription_details, customer } = event.data
        .object as unknown as {
        customer: string;
        subscription: string;
        subscription_details: {
          metadata: {
            userId: string;
          };
        };
      };
      if (!subscription) {
        throw new Error("Subscription not found");
      }
      const userId = subscription_details.metadata.userId;
      if (!userId) {
        throw new Error("User ID not found");
      }
      // atualiza o banco de dados com o id da assinatura, o id do cliente e o plano
      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: subscription,
          stripeCustomerId: customer,
          plan: "essential",
        })
        .where(eq(usersTable.id, userId));
      break;
    }

    // caso o evento seja a cancelação da assinatura
    case "customer.subscription.deleted": {
      if (!event.data.object.id) {
        throw new Error("Subscription ID not found");
      }
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      if (!subscription) {
        throw new Error("Subscription not found");
      }
      const userId = subscription.metadata.userId;
      if (!userId) {
        throw new Error("User ID not found");
      }
      await db
        .update(usersTable)
        .set({
          stripeSubscriptionId: null,
          stripeCustomerId: null,
          plan: null,
        })
        .where(eq(usersTable.id, userId));
    }
  }
  // retorna true para o stripe saber que o evento foi recebido
  return NextResponse.json({
    received: true,
  });
};

// essa route faz a verificação do pagamento e atualiza o banco de dados
// o stripe manda um webhook para essa rota quando o pagamento é confirmado
// o webhook manda um evento e o stripe verifica se o evento é valido
// se for valido, a rota atualiza o banco de dados
// se não for valido, a rota retorna um erro
// HMAC com SHA256 serve para verificar se o evento é valido
