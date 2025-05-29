export const formatCurrencyInCents = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);
};

// esse helper é para formatar o valor em reais
// ele recebe um valor em centavos e retorna um valor em reais
// ele divide o valor por 100 para converter para reais
// ele usa o formato de moeda do Brasil
// ele usa o idioma português do Brasil
// ele usa o estilo de moeda do Brasil
