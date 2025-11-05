"use client";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const data = [
  { month: "2017-01", portfolio: 100, benchmark: 100 },
  { month: "2018-01", portfolio: 110, benchmark: 105 },
  { month: "2019-01", portfolio: 125, benchmark: 115 },
];

export default function PerformanceChart() {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="month" stroke="#ffffff80" />
          <YAxis stroke="#ffffff80" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "#1a1a1a", 
              border: "1px solid #ffffff30",
              borderRadius: "8px",
              color: "#fff"
            }} 
          />
          <Line type="monotone" dataKey="portfolio" stroke="#800000" strokeWidth={3} />
          <Line type="monotone" dataKey="benchmark" stroke="#ffffff60" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}


