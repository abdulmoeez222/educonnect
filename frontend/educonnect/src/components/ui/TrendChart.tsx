import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

interface DataPoint {
  [key: string]: string | number;
}

interface TrendChartProps {
  data: DataPoint[];
  type?: 'line' | 'bar';
  xKey: string;
  yKey: string;
  color?: string;
  height?: number;
  showGrid?: boolean;
  yDomain?: [number, number];
  highlightLast?: boolean;
  tooltipFormatter?: (value: number) => string;
}

export function TrendChart({
  data,
  type = 'line',
  xKey,
  yKey,
  color = 'hsl(var(--primary))',
  height = 200,
  showGrid = true,
  yDomain,
  highlightLast = false,
  tooltipFormatter,
}: TrendChartProps) {
  const fmt = tooltipFormatter ?? ((v: number) => `${v}%`);

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
          <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} domain={yDomain} />
          <Tooltip
            contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
            formatter={(val: number) => [fmt(val), '']}
            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
          />
          <Bar dataKey={yKey} radius={[4, 4, 0, 0]} maxBarSize={40}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={highlightLast && i === data.length - 1 ? 'hsl(var(--primary))' : color}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
        {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />}
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} domain={yDomain} />
        <Tooltip
          contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
          formatter={(val: number) => [fmt(val), '']}
        />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={2.5}
          dot={{ r: 4, fill: color, strokeWidth: 0 }}
          activeDot={{ r: 6, fill: color }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
