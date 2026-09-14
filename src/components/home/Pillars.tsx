"use client";

import React from "react";
import { BookOpen, Search, Map, Zap, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const pillars = [
  {
    title: "Central Research Repository",
    description: "A unified storage for cadastral records, policy documents, and socio-economic surveys. Ensuring a single source of truth for land governance.",
    icon: BookOpen,
    features: ["Semantic Indexing", "Version Control", "Open Access APIs"],
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "AI-Driven Synthesis",
    description: "Leveraging LLMs to synthesize thousands of pages of legal texts and research papers into actionable executive summaries.",
    icon: Search,
    features: ["Automated Summarization", "Trend Detection", "Related-Work Recommendations"],
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Geospatial Intelligence",
    description: "Integrating ISRO Bhuvan and satellite imagery to visualize land-use changes and climate vulnerability in real-time.",
    icon: Map,
    features: ["Spatiotemporal Analysis", "Heatmaps", "Layered Visualization"],
    color: "text-orange-500",
    bg: "bg-orange-500/10"
  },
  {
    title: "Policy Simulation Engine",
    description: "Test the impact of proposed reforms—like land tax changes—before they are rolled out to the public.",
    icon: Zap,
    features: ["What-if Modeling", "Risk Assessment", "Impact Prediction"],
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  },
  {
    title: "Secure Governance",
    description: "Built on government-grade security with strict RBAC and DPDP Act compliance for sensitive data handling.",
    icon: ShieldCheck,
    features: ["Encrypted Storage", "Audit Trails", "Role-Based Access"],
    color: "text-red-500",
    bg: "bg-red-500/10"
  },
  {
    title: "Collaborative Innovation",
    description: "A hub for academic institutions, think tanks, and government officials to co-author policies.",
    icon: Users,
    features: ["Shared Workspaces", "Grant Applications", "Pilot Registry"],
    color: "text-indigo-500",
    bg: "bg-indigo-500/10"
  },
];

export default function Pillars() {
  return (
    <section className="py-24 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">The Pillars of LandGov</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          A comprehensive framework designed to transition India from implementation-focused
          land administration to evidence-based land governance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pillars.map((pillar, i) => (
          <Card key={i} className="group transition-all hover:shadow-lg hover:-translate-y-1 border-muted">
            <CardHeader>
              <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-2 transition-colors", pillar.bg)}>
                <pillar.icon className={cn("h-6 w-6", pillar.color)} />
              </div>
              <CardTitle className="text-xl">{pillar.title}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {pillar.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {pillar.features.map((feature, j) => (
                  <span key={j} className="text-[10px] font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground border">
                    {feature}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

