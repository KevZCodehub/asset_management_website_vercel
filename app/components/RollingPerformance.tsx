"use client";
import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import cumulativeData from "../data/cumulative_returns.json";
import rollingData from "../data/asset_rolling_36m_results.json";

type CumulativeDataPoint = {
  date: string;
  portfolio: number;
  benchmark: number;
  gap: number;
};

type RollingDataPoint = {
  start: string;
  end: string;
  portfolio: number;
  benchmark: number;
  win: boolean;
};

// Format month for display (e.g., "2017-01" -> "Jan 2017")
const formatMonth = (month: string) => {
  const [year, monthNum] = month.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[parseInt(monthNum) - 1]} ${year}`;
};

export default function RollingPerformance() {
  const monthlyData = cumulativeData as CumulativeDataPoint[];
  const threeYearData = rollingData as RollingDataPoint[];

  // Prepare chart data for cumulative returns chart
  const topChartData = useMemo(() => {
    return monthlyData.map((d) => ({
      date: d.date,
      portfolio: Number((d.portfolio * 100).toFixed(2)),
      benchmark: Number((d.benchmark * 100).toFixed(2)),
    }));
  }, [monthlyData]);

  // Prepare chart data for gap chart
  const bottomChartData = useMemo(() => {
    return monthlyData.map((d) => ({
      date: d.date,
      gap: Number((d.gap * 100).toFixed(2)),
    }));
  }, [monthlyData]);

  // Overall win rate (hardcoded)
  const winRate = "71.21";

  // 3-Year Rolling Returns Section
  const firstMonth = threeYearData[0]?.start || "2017-01";
  const lastMonth = threeYearData[threeYearData.length - 1]?.start || "2022-06";
  const [selectedStart, setSelectedStart] = useState(firstMonth);

  const selectedData = threeYearData.find((d) => d.start === selectedStart);

  // Calculate win rate for 3-year returns
  const threeYearWinRate = useMemo(() => {
    const wins = threeYearData.filter((d) => d.win).length;
    return ((wins / threeYearData.length) * 100).toFixed(1);
  }, [threeYearData]);

  // Calculate difference for selected window
  const diff = selectedData
    ? ((selectedData.portfolio - selectedData.benchmark) * 100)
    : 0;
  const diffFormatted = diff.toFixed(1);

  // Prepare chart data for 3-year returns
  const threeYearChartData = useMemo(() => {
    return threeYearData.map((d) => ({
      start: d.start,
      portfolio: Number((d.portfolio * 100).toFixed(2)),
      benchmark: Number((d.benchmark * 100).toFixed(2)),
    }));
  }, [threeYearData]);

  // Convert month string to index for slider
  const monthToIndex = (month: string) => {
    return threeYearData.findIndex((d) => d.start === month);
  };

  const indexToMonth = (index: number) => {
    return threeYearData[index]?.start || firstMonth;
  };

  const selectedIndexValue = monthToIndex(selectedStart);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIndex = parseInt(e.target.value);
    setSelectedStart(indexToMonth(newIndex));
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Chart: Portfolio vs Benchmark Cumulative Returns */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4 text-white">
          Portfolio vs Benchmark (Cumulative Returns)
        </h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={topChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis
                dataKey="date"
                stroke="#ffffff80"
                tickFormatter={(value) => {
                  const [year, month] = value.split("-");
                  return `${month}/${year.slice(2)}`;
                }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#ffffff80"
                label={{ value: "Return (%)", angle: -90, position: "insideLeft", fill: "#ffffff80" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #ffffff30",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number) => `${value.toFixed(2)}%`}
                labelFormatter={(label) => formatMonth(label)}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="#2563eb"
                strokeWidth={3}
                dot={false}
                name="Portfolio"
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#9ca3af"
                strokeWidth={3}
                dot={false}
                name="Benchmark"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Chart: Gap/Difference */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4 text-white">
          Excess Return (Portfolio - Benchmark)
        </h3>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={bottomChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis
                dataKey="date"
                stroke="#ffffff80"
                tickFormatter={(value) => {
                  const [year, month] = value.split("-");
                  return `${month}/${year.slice(2)}`;
                }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#ffffff80"
                label={{ value: "Difference (%)", angle: -90, position: "insideLeft", fill: "#ffffff80" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #ffffff30",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number) => `${value.toFixed(2)}%`}
                labelFormatter={(label) => formatMonth(label)}
              />
              <ReferenceLine y={0} stroke="#000000" strokeWidth={2} />
              <Line
                type="monotone"
                dataKey="gap"
                stroke="#ffffff60"
                strokeWidth={2}
                dot={(props: any) => {
                  const val = props.payload?.gap || 0;
                  return (
                    <circle
                      key={`gap-dot-${props.payload?.date || props.index}`}
                      cx={props.cx}
                      cy={props.cy}
                      r={4}
                      fill={val >= 0 ? "#22c55e" : "#ef4444"}
                    />
                  );
                }}
                name="Gap"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3-Year Rolling Returns Section */}
      <div className="w-full space-y-6">
        <h3 className="text-xl font-semibold text-white">
          3-Year Rolling Returns: Portfolio vs Benchmark
        </h3>
        
        {/* 3-Year Returns Chart */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={threeYearChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis
                dataKey="start"
                stroke="#ffffff80"
                tickFormatter={(value) => {
                  const [year, month] = value.split("-");
                  return `${month}/${year.slice(2)}`;
                }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#ffffff80"
                label={{ value: "3-Year Return (%)", angle: -90, position: "insideLeft", fill: "#ffffff80" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a1a",
                  border: "1px solid #ffffff30",
                  borderRadius: "8px",
                  color: "#fff",
                }}
                formatter={(value: number) => `${value.toFixed(2)}%`}
                labelFormatter={(label) => formatMonth(label)}
              />
              <ReferenceLine
                x={selectedStart}
                stroke="#800000"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="#2563eb"
                strokeWidth={3}
                dot={false}
                name="Portfolio"
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#9ca3af"
                strokeWidth={3}
                dot={false}
                name="Benchmark"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Slider */}
        <div className="flex flex-col items-center gap-4">
          <label className="text-lg font-semibold text-white">
            Select 3-Year Window Start: <span className="text-[#800000]">{formatMonth(selectedStart)}</span>
          </label>
          <input
            type="range"
            min={0}
            max={threeYearData.length - 1}
            value={selectedIndexValue}
            onChange={handleSliderChange}
            className="w-full max-w-2xl accent-[#800000]"
          />
          <div className="flex justify-between w-full max-w-2xl text-sm text-white/70">
            <span>{formatMonth(firstMonth)}</span>
            <span>{formatMonth(lastMonth)}</span>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="mt-6 rounded-lg bg-white/10 text-white p-6 border border-white/15">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="text-sm text-white/70 mb-1">Overall Win Rate</div>
              <div className="text-2xl font-bold">{threeYearWinRate}%</div>
            </div>
            <div>
              <div className="text-sm text-white/70 mb-1">Selected Window</div>
              <div className="text-2xl font-bold">
                {formatMonth(selectedStart)} → {formatMonth(selectedData?.end || "")}
              </div>
            </div>
            <div>
              <div className="text-sm text-white/70 mb-1">Outperformance</div>
              <div
                className={`text-2xl font-bold ${
                  selectedData?.win ? "text-green-400" : "text-red-400"
                }`}
              >
                {diff > 0 ? "+" : ""}
                {diffFormatted}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
