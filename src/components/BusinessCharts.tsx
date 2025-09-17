import { Card } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export interface ChartData {
  type: 'bar' | 'line' | 'pie' | 'trend';
  title: string;
  data: any[];
  config: Record<string, any>;
}

interface BusinessChartsProps {
  charts: ChartData[];
}

const chartColors = [
  "hsl(217, 91%, 60%)", // primary
  "hsl(0, 65%, 51%)", // destructive  
  "hsl(38, 92%, 50%)", // warning
  "hsl(142, 76%, 36%)", // success
  "hsl(220, 13%, 91%)", // muted
  "hsl(217, 91%, 70%)", // primary variant
];

export const BusinessCharts = ({ charts }: BusinessChartsProps) => {
  if (!charts || charts.length === 0) return null;

  const renderChart = (chart: ChartData, index: number) => {
    const chartConfig = {
      ...chart.config,
      ...Object.keys(chart.config).reduce((acc, key, i) => ({
        ...acc,
        [key]: {
          ...chart.config[key],
          color: chartColors[i % chartColors.length]
        }
      }), {})
    };

    switch (chart.type) {
      case 'bar':
        return (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <BarChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {Object.keys(chart.config).map((key, i) => (
                <Bar 
                  key={key} 
                  dataKey={key} 
                  fill={chartColors[i % chartColors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ChartContainer>
        );

      case 'line':
        return (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {Object.keys(chart.config).map((key, i) => (
                <Line 
                  key={key} 
                  type="monotone" 
                  dataKey={key} 
                  stroke={chartColors[i % chartColors.length]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        );

      case 'pie':
        return (
          <ChartContainer config={chartConfig} className="h-[300px]">
            <PieChart>
              <Pie
                data={chart.data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chart.data.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={chartColors[i % chartColors.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ChartContainer>
        );

      case 'trend':
        return (
          <ChartContainer config={chartConfig} className="h-[250px]">
            <LineChart data={chart.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {Object.keys(chart.config).map((key, i) => (
                <Line 
                  key={key} 
                  type="monotone" 
                  dataKey={key} 
                  stroke={chartColors[i % chartColors.length]}
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ChartContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
        Data Insights
      </h4>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart, index) => (
          <Card key={index} className="p-4">
            <h5 className="text-sm font-medium text-muted-foreground mb-4">
              {chart.title}
            </h5>
            {renderChart(chart, index)}
          </Card>
        ))}
      </div>
    </div>
  );
};