import { Card } from "@/components/ui/card";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
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
  ResponsiveContainer,
  Legend
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
  "hsl(220, 13%, 60%)", // muted-foreground
  "hsl(217, 91%, 70%)", // primary variant
];

// Format currency values
const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value.toLocaleString()}`;
};

// Format percentage values
const formatPercent = (value: number) => `${value.toFixed(1)}%`;

export const BusinessCharts = ({ charts }: BusinessChartsProps) => {
  if (!charts || charts.length === 0) return null;

  const renderChart = (chart: ChartData, index: number) => {
    // Create a simpler config for the ChartContainer
    const chartConfig = Object.keys(chart.config).reduce((acc, key, i) => ({
      ...acc,
      [key]: {
        label: chart.config[key]?.label || key,
        color: chartColors[i % chartColors.length]
      }
    }), {});

    switch (chart.type) {
      case 'bar':
        return (
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart.data} margin={{ top: 30, right: 40, left: 60, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.2} />
                  <XAxis 
                    dataKey="name" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    height={50}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={50}
                    tickFormatter={(value) => 
                      chart.title.toLowerCase().includes('cost') || 
                      chart.title.toLowerCase().includes('overcharge') ? 
                        formatCurrency(value) : value.toLocaleString()
                    }
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent 
                      formatter={(value: any, name: string) => [
                        chart.title.toLowerCase().includes('cost') || 
                        chart.title.toLowerCase().includes('overcharge') ? 
                          formatCurrency(Number(value)) : value.toLocaleString(),
                        name
                      ]}
                    />} 
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="rect"
                  />
                  {Object.keys(chart.config).map((key, i) => (
                    <Bar 
                      key={key} 
                      dataKey={key} 
                      fill={chartColors[i % chartColors.length]}
                      radius={[6, 6, 0, 0]}
                      name={chart.config[key]?.label || key}
                      maxBarSize={60}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        );

      case 'line':
      case 'trend':
        const xAxisKey = chart.type === 'trend' ? 'period' : 'name';
        return (
          <div className="h-[400px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chart.data} margin={{ top: 30, right: 40, left: 60, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground))" opacity={0.2} />
                  <XAxis 
                    dataKey={xAxisKey} 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    height={50}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={11}
                    tickLine={false}
                    axisLine={false}
                    width={50}
                    tickFormatter={(value) => 
                      chart.title.toLowerCase().includes('cost') ? 
                        formatCurrency(value) : 
                        chart.title.toLowerCase().includes('%') || chart.title.toLowerCase().includes('rate') ? 
                          formatPercent(value) : value.toLocaleString()
                    }
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent 
                      formatter={(value: any, name: string) => [
                        chart.title.toLowerCase().includes('cost') ? 
                          formatCurrency(Number(value)) :
                          chart.title.toLowerCase().includes('%') || chart.title.toLowerCase().includes('rate') ? 
                            formatPercent(Number(value)) : value.toLocaleString(),
                        name
                      ]}
                    />} 
                  />
                  <Legend 
                    wrapperStyle={{ paddingTop: '20px' }}
                    iconType="line"
                  />
                  {Object.keys(chart.config).map((key, i) => (
                    <Line 
                      key={key} 
                      type="monotone" 
                      dataKey={key} 
                      stroke={chartColors[i % chartColors.length]}
                      strokeWidth={3}
                      dot={{ r: 5, fill: chartColors[i % chartColors.length], strokeWidth: 2, stroke: '#fff' }}
                      name={chart.config[key]?.label || key}
                      activeDot={{ r: 7, fill: chartColors[i % chartColors.length], strokeWidth: 2, stroke: '#fff' }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        );

      case 'pie':
        return (
          <div className="h-[450px] w-full">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 80, left: 20 }}>
                  <Pie
                    data={chart.data}
                    cx="50%"
                    cy="45%"
                    labelLine={true}
                    label={({ name, percent }) => 
                      percent > 0.05 ? `${name}: ${(percent * 100).toFixed(1)}%` : ''
                    }
                    outerRadius={110}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    paddingAngle={2}
                  >
                    {chart.data.map((entry, i) => (
                      <Cell 
                        key={`cell-${i}`} 
                        fill={chartColors[i % chartColors.length]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip 
                    content={<ChartTooltipContent 
                      formatter={(value: any, name: string) => [
                        chart.title.toLowerCase().includes('cost') || 
                        chart.title.toLowerCase().includes('impact') ? 
                          formatCurrency(Number(value)) :
                          chart.title.toLowerCase().includes('%') || chart.title.toLowerCase().includes('rate') ? 
                            formatPercent(Number(value)) : value.toLocaleString(),
                        name
                      ]}
                    />} 
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={60}
                    wrapperStyle={{ paddingTop: '30px' }}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 mt-6">
      <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide border-l-4 border-l-primary pl-3">
        📊 Data Insights
      </h4>
      <div className="grid grid-cols-1 gap-6">
        {charts.map((chart, index) => (
          <Card key={index} className="p-6 shadow-card">
            <h5 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              {chart.title}
            </h5>
            {renderChart(chart, index)}
          </Card>
        ))}
      </div>
    </div>
  );
};