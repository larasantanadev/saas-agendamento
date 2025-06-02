"use client";

import "dayjs/locale/pt-br";

import dayjs from "dayjs";

dayjs.locale("pt-br");
import { DollarSign } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrencyInCents } from "@/helpers/currency";

interface DailyAppointment {
  date: string;
  appointments: number;
  revenue: number | null;
}

interface AppointmentsChartProps {
  dailyAppointmentsData: DailyAppointment[];
}

const AppointmentsChart = ({
  dailyAppointmentsData,
}: AppointmentsChartProps) => {
  // Gerar 21 dias: 10 antes + hoje + 10 depois
  const chartDays = Array.from({ length: 21 }).map((_, i) =>
    dayjs()
      .subtract(10 - i, "days")
      .format("YYYY-MM-DD"),
  );

  const chartData = chartDays.map((date) => {
    const dataForDay = dailyAppointmentsData.find((item) => item.date === date);
    return {
      date: dayjs(date).format("DD/MM"),
      fullDate: date,
      appointments: dataForDay?.appointments || 0,
      revenue: Number(dataForDay?.revenue || 0),
    };
  });

  const chartConfig = {
    appointments: {
      label: "Agendamentos",
      color: "#9962FF",
    },
    revenue: {
      label: "Faturamento",
      color: "#10B981",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <DollarSign />
        <CardTitle>Agendamentos e Faturamento</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatCurrencyInCents(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "revenue") {
                      return (
                        <>
                          <div className="h-3 w-3 rounded bg-[#10B981]" />
                          <span className="text-muted-foreground">
                            Faturamento:
                          </span>
                          <span className="font-semibold">
                            {formatCurrencyInCents(Number(value))}
                          </span>
                        </>
                      );
                    }
                    return (
                      <>
                        <div className="h-3 w-3 rounded bg-[#9962FF]" />
                        <span className="text-muted-foreground">
                          Agendamentos:
                        </span>
                        <span className="font-semibold">{value}</span>
                      </>
                    );
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return dayjs(payload[0].payload?.fullDate).format(
                        "DD/MM/YYYY (dddd)",
                      );
                    }
                    return label;
                  }}
                />
              }
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="appointments"
              stroke="var(--color-appointments)"
              fill="var(--color-appointments)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              fill="var(--color-revenue)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AppointmentsChart;

// esse componente é para exibir o gráfico de agendamentos e faturamento
// ele recebe um array de objetos com as datas e os valores de agendamentos e faturamento
// ele gera um gráfico com as datas e os valores de agendamentos e faturamento
// ele usa a biblioteca recharts para gerar o gráfico
// ele usa a biblioteca dayjs para formatar as datas
// ele usa a biblioteca formatCurrencyInCents para formatar o faturamento
// ele usa o componente ChartContainer para gerar o gráfico
// ele usa o componente ChartTooltip para exibir as informações do gráfico
// ele usa o componente AreaChart para gerar o gráfico
// ele usa o componente Area para gerar o gráfico de agendamentos
// ele usa o componente Area para gerar o gráfico de faturamento
// ele usa o componente XAxis para gerar o eixo horizontal do gráfico
// ele usa o componente YAxis para gerar o eixo vertical do gráfico
// ele usa o componente CartesianGrid para gerar a grade do gráfico
// ele usa o componente ChartTooltip para exibir as informações do gráfico
