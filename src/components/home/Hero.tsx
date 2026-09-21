"use client";

import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Search, Map, FlaskConical } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32 z-10">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent blur-3xl opacity-50" />

        {/* Floating 3D-like elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotateZ: [0, 10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className="absolute w-12 h-12 rounded-xl bg-primary/10 blur-sm border border-primary/20"
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          National Digital Platform for Land Governance
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1]"
        >
          Empowering India's Land Policy with <span className="text-primary">Evidence-Based</span> Insights
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl"
        >
          A unified ecosystem to store, search, analyze, and simulate land governance
          evidence. Bridging the gap between cadastral data and national policy innovation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/repository"
            className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-md font-semibold gap-2 transition-all hover:scale-105 active:scale-95")}
          >
            Explore Repository <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/gis"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 px-8 text-md font-semibold transition-all hover:scale-105 active:scale-95")}
          >
            View GIS Dashboard
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full max-w-4xl"
        >
          {[
            { icon: Search, label: "AI-Powered Research", desc: "Semantic discovery across papers" },
            { icon: Map, label: "Geospatial Analysis", desc: "Interactive land-use mapping" },
            { icon: FlaskConical, label: "Policy Simulation", desc: "Scenario modeling for reforms" },
          ].map((feature, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5, borderColor: "var(--primary)" }}
              className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border shadow-sm transition-all"
            >
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <feature.icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-sm">{feature.label}</div>
                <div className="text-muted-foreground text-xs">{feature.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
