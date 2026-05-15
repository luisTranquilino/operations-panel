import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A horizontal bar chart";

const chartConfig = {
  count: {
    label: "OPs",
    color: "#4C5155",
  },
  "0-7": {
    label: "0-7 dias",
  },
  "8-14": {
    label: "8-14 dias",
  },
  "15-30": {
    label: "15-30 dias",
  },
  "30+": {
    label: "+30 dias",
  },
} satisfies ChartConfig;

type ProjectCountBy = {
  age: string;
  count: number;
  fill: string;
};

export function ChartBarHorizontal({
  projectsCountByAge,
}: {
  projectsCountByAge: Array<ProjectCountBy>;
}) {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={projectsCountByAge}
          layout="vertical"
          margin={{
            left: -10,
          }}
        >
          <CartesianGrid horizontal={false} />
          <XAxis type="number" dataKey="count" hide />
          <YAxis
            dataKey="age"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={5} />
        </BarChart>
      </ChartContainer>
    </>
  );
}
