import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { Project } from "@/services/projects";

export const description = "A bar chart";

const chartConfig = {
  count: {
    label: "OPs",
  },
} satisfies ChartConfig;

type ProjectBySale = {
  sales: string;
  count: number;
  projects: Array<Project>;
  fill: string;
};

export function ChartBarDefault({
  projectsBySales,
}: {
  projectsBySales: Array<ProjectBySale>;
}) {
  return (
    <>
      <ChartContainer config={chartConfig} className="max-h-[260px] w-full">
        <BarChart accessibilityLayer data={projectsBySales}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="sales"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.split(" ")[0]}
            interval={0}
            fontSize={10}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-projects)" radius={8} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
