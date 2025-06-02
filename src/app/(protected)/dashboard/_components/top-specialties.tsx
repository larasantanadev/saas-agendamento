import { Hospital } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getSpecialtyIcon } from "./specialty-icons";

interface TopSpecialtiesProps {
  topSpecialties: {
    specialty: string;
    appointments: number;
  }[];
}

export default function TopSpecialties({
  topSpecialties,
}: TopSpecialtiesProps) {
  const maxAppointments = Math.max(
    ...topSpecialties.map((i) => i.appointments),
  );
  return (
    <Card className="mx-auto w-full">
      <CardContent>
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hospital className="text-muted-foreground" />
            <CardTitle className="text-base">Especialidades</CardTitle>
          </div>
        </div>

        {/* specialtys List */}
        <div className="space-y-6">
          {topSpecialties.map((specialty) => {
            const Icon = getSpecialtyIcon(specialty.specialty);
            // Porcentagem de ocupação da especialidade baseando-se no maior número de agendamentos
            const progressValue =
              (specialty.appointments / maxAppointments) * 100;

            return (
              <div
                key={specialty.specialty}
                className="flex items-center gap-2"
              >
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <Icon className="text-primary h-5 w-5" />
                </div>
                <div className="flex w-full flex-col justify-center">
                  <div className="flex w-full justify-between">
                    <h3 className="text-sm">{specialty.specialty}</h3>
                    <div className="text-right">
                      <span className="text-muted-foreground text-sm font-medium">
                        {specialty.appointments} agend.
                      </span>
                    </div>
                  </div>
                  <Progress value={progressValue} className="w-full" />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// esse componente é para exibir as especialidades mais agendadas
// ele recebe um objeto com as especialidades e o número de agendamentos
// ele gera um gráfico de barras com as especialidades e o número de agendamentos
// ele usa o componente BarChart para gerar o gráfico de barras
// ele usa o componente Card para gerar o card
// ele usa o componente CardContent para gerar o conteúdo do card com o gráfico de barras
