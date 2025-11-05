"use client";
import { useState } from "react";

export default function TurnoverSlider() {
  const [turnover, setTurnover] = useState(45);
  const netReturn = (5 - turnover * 0.01 * 0.25).toFixed(2);

  return (
    <div className="flex flex-col items-center gap-4 text-white">
      <p className="text-lg">
        Monthly Turnover: <b className="text-[#800000]">{turnover}%</b>
      </p>
      <input
        type="range"
        min="0"
        max="100"
        value={turnover}
        onChange={(e) => setTurnover(Number(e.target.value))}
        className="w-64 accent-[#800000]"
      />
      <p className="text-lg">
        Estimated Net Return: <b className="text-[#800000]">{netReturn}%</b>
      </p>
    </div>
  );
}


