"use client";

import React from "react";
import { TrendingUp, FileText, Globe, AlertTriangle } from "lucide-react";

const stats = [
  { label: "Research Papers Indexed", value: "12,400+", icon: FileText, trend: "+12% this month" },
  { label: "Datasets Integrated", value: "850+", icon: Globe, trend: "+5% this month" },
  { label: "Policy Simulations Run", value: "3,200+", icon: TrendingUp, trend: "+24% this month" },
  { label: "Dispute Hotspots Identified", value: "1,100+", icon: AlertTriangle, trend: "Real-time tracking" },
];

export default function Stats() {
  return (
    <section className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transition-transform hover:scale-105">
              <div className="bg-white/20 p-3 rounded-full mb-2">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-4xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-sm font-medium opacity-80">{stat.label}</div>
              <div className="text-[10px] opacity-60 font-mono mt-2">{stat.trend}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
