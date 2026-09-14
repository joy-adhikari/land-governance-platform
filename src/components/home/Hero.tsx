"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Search, Map, FlaskConical } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent blur-3xl opacity-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center gap-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          National Digital Platform for Land Governance
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700">
          Empowering India's Land Policy with <span className="text-primary">Evidence-Based</span> Insights
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000">
          A unified ecosystem to store, search, analyze, and simulate land governance
          evidence. Bridging the gap between cadastral data and national policy innovation.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <Link
            href="/repository"
            className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-md font-semibold gap-2")}
          >
            Explore Repository <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/gis"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 px-8 text-md font-semibold")}
          >
            View GIS Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full max-w-4xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
          {[
            { icon: Search, label: "AI-Powered Research", desc: "Semantic discovery across papers" },
            { icon: Map, label: "Geospatial Analysis", desc: "Interactive land-use mapping" },
            { icon: FlaskConical, label: "Policy Simulation", desc: "Scenario modeling for reforms" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-sm transition-all hover:border-primary/50">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <feature.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">{feature.label}</div>
                <div className="text-muted-foreground text-xs">{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
