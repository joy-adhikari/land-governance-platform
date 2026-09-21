"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import Stats from "@/components/home/Stats";
import { Button } from "@/components/ui/button";
import ScrollPlants from "@/components/layout/ScrollPlants";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className="flex flex-col relative overflow-x-hidden bg-background min-h-screen" />;
  }

  return (
    <div className="flex flex-col relative overflow-x-hidden bg-background text-foreground min-h-screen z-0">
      <ScrollPlants />

      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            x: [0, -100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Stats />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Pillars />
      </motion.div>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-24 container mx-auto text-center"
      >
        <div className="bg-muted rounded-3xl p-12 border border-border relative overflow-hidden group transition-all hover:border-primary/50 mx-auto max-w-5xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-colors" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Ready to build the future of <br />
              land governance in India?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Whether you are a policy researcher, a government official, or an academic
              institution, join us in creating an evidence-backed land ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/innovation" className="w-full sm:w-auto">
                <Button className="w-full rounded-full px-8 py-6 h-auto text-md font-semibold transition-transform hover:scale-105">
                  Apply for Researcher Access
                </Button>
              </Link>
              <Link href="/gis" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full rounded-full px-8 py-6 h-auto text-md font-semibold transition-transform hover:scale-105">
                  View Public Dashboards
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
