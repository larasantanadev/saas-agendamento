import {
  CalendarIcon,
  DollarSignIcon,
  UserIcon,
  UsersIcon,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrencyInCents } from "@/helpers/currency";

interface StatsCardsProps {
  totalRevenue: number | null;
  totalAppointments: number;
  totalPatients: number;
  totalDoctors: number;
}

const StatsCards = ({
  totalRevenue,
  totalAppointments,
  totalPatients,
  totalDoctors,
}: StatsCardsProps) => {
  const stats = [
    {
      title: "Faturamento",
      value: totalRevenue ? formatCurrencyInCents(totalRevenue) : "R$ 0,00",
      icon: DollarSignIcon,
    },
    {
      title: "Agendamentos",
      value: totalAppointments.toString(),
      icon: CalendarIcon,
    },
    {
      title: "Pacientes",
      value: totalPatients.toString(),
      icon: UserIcon,
    },
    {
      title: "Profissionais",
      value: totalDoctors.toString(),
      icon: UsersIcon,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="gap-2">
            <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                <Icon className="text-primary h-4 w-4" />
              </div>
              <CardTitle className="text-muted-foreground text-sm font-medium">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;

// esse componente é para exibir os cards de estatísticas
// ele recebe um objeto com os valores de faturamento, agendamentos, pacientes e médicos
// ele gera um card com o valor e o ícone da estatística
// ele usa o componente Card para gerar o card
// ele usa o componente CardHeader para gerar o cabeçalho do card
// ele usa o componente CardTitle para gerar o título do card
// ele usa o componente CardContent para gerar o conteúdo do card
// ele usa o componente Icon para gerar o ícone da estatística
// ele usa o componente formatCurrencyInCents para formatar o valor do faturamento
