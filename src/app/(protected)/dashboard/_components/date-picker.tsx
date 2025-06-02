"use client";

import { addMonths, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { parseAsIsoDate, useQueryState } from "nuqs";
import * as React from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePicker({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [from, setFrom] = useQueryState(
    "from",
    parseAsIsoDate.withDefault(new Date()),
  );

  //essa const é para pegar o estado do to
  // e adicionar 1 mês a ele
  // exemplo: se o to for 2021-01-01, o to virá 2021-02-01
  const [to, setTo] = useQueryState(
    "to",
    parseAsIsoDate.withDefault(addMonths(new Date(), 1)),
  );

  //essa função é para selecionar o período
  // exemplo: se o from for 2021-01-01 e o to for 2021-01-31,
  // o from virá 2021-01-01 e o to virá 2021-01-31
  // shallow é para atualizar a URL sem recarregar a página
  const handleDateSelect = (dateRange: DateRange | undefined) => {
    if (dateRange?.from) {
      setFrom(dateRange.from, {
        shallow: false,
      });
    }
    if (dateRange?.to) {
      setTo(dateRange.to, {
        shallow: false,
      });
    }
  };
  const date = {
    from,
    to,
  };
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", {
                    locale: ptBR,
                  })}{" "}
                  -{" "}
                  {format(date.to, "LLL dd, y", {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Selecione um período</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// esse componente é para selecionar o período de datas
// ele recebe um objeto com as datas de início e fim
// ele usa o componente Popover para exibir o calendário
// ele usa o componente Calendar para exibir o calendário
// ele usa o componente CalendarIcon para exibir o ícone do calendário
// ele usa o componente Button para exibir o botão do calendário
// ele usa o componente PopoverTrigger para exibir o botão do calendário
// ele usa o componente PopoverContent para exibir o calendário
// ele usa o componente Calendar para exibir o calendário
// ele usa o componente CalendarIcon para exibir o ícone do calendário
// ele usa o componente Button para exibir o botão do calendário

// shallow é para atualizar a URL sem recarregar a página

// useQueryState é uma função que retorna um array com o estado do from e to
// parseAsIsoDate é uma função que retorna a data em formato ISO
// addMonths é uma função que retorna a data mais 1 mês
// format é uma função que retorna a data formatada
// cn é uma função que retorna a classe CSS
