import { Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart";

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "var(--chart-1)",
//   },
//   safari: {
//     label: "Safari",
//     color: "var(--chart-2)",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "var(--chart-3)",
//   },
//   edge: {
//     label: "Edge",
//     color: "var(--chart-4)",
//   },
//   other: {
//     label: "Other",
//     color: "var(--chart-5)",
//   },
// } satisfies ChartConfig;

const chartConfig = {
  count: {
    label: "OPs",
  },
  canceled: {
    label: "Canceladas",
    color: "#ee4059",
  },
  finished: {
    label: "Concluídas",
    color: "#2d9c8e",
  },
  progress: {
    label: "Em aberto",
    color: "#2463eb",
  },
} satisfies ChartConfig;

type SalesProjectStatus = {
  status: "progress" | "finished" | "canceled";
  count: number;
  fill: string;
};

export function ChartPieDonut({
  salesProjectsStatus,
}: {
  salesProjectsStatus: Array<SalesProjectStatus>;
}) {
  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[260px]"
      >
        <PieChart>
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend
            content={<ChartLegendContent className="text-[10px]" />}
          />
          <Pie
            data={salesProjectsStatus}
            dataKey="count"
            nameKey="status"
            innerRadius={60}
          />
        </PieChart>
      </ChartContainer>
    </>
  );
}
