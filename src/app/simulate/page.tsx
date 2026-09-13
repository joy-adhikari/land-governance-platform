"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  RefreshCcw,
  ArrowRight,
  Info,
  AlertTriangle
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Button
} from "@/components/ui/button";
import {
  Slider
} from "@/components/ui/slider";
import {
  Label
} from "@/components/ui/label";
import {
  Badge
} from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

export default function SimulationPage() {
  const [params, setParams] = useState({
    taxRate: 5,
    landUseAgri: 60,
    digitizationRate: 40,
    subsidyLevel: 20,
  });

  const [results, setResults] = useState<{
    revenue: number;
    disputeRisk: number;
    farmerSatisfaction: number;
    economicGrowth: number;
    status: "stable" | "volatile" | "optimal";
  } | null>(null);

  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulation = () => {
    setIsSimulating(true);
    // Mock simulation delay
    setTimeout(() => {
      // Simple mock logic to derive results from parameters
      const revenue = (params.taxRate * 10) + (params.digitizationRate * 2);
      const disputeRisk = 100 - (params.digitizationRate * 0.8) - (params.subsidyLevel * 0.5);
      const farmerSatisfaction = params.subsidyLevel + (100 - params.taxRate * 2);
      const economicGrowth = (params.landUseAgri * 0.5) + (params.digitizationRate * 0.7);

      let status: "stable" | "volatile" | "optimal" = "stable";
      if (disputeRisk > 70) status = "volatile";
      if (disputeRisk < 30 && farmerSatisfaction > 70) status = "optimal";

      setResults({
        revenue: Math.round(revenue),
        disputeRisk: Math.round(disputeRisk),
        farmerSatisfaction: Math.round(farmerSatisfaction),
        economicGrowth: Math.round(economicGrowth),
        status,
      });
      setIsSimulating(false);
    }, 1500);
  };

  useEffect(() => {
    runSimulation();
  }, []);

  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Policy Simulation Engine</h1>
        <p className="text-muted-foreground">
          Model the impact of proposed land reforms before real-world implementation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" /> Simulation Parameters
            </CardTitle>
            <CardDescription>Adjust variables to test different policy scenarios.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Land Tax Rate (%)</Label>
                  <span className="text-sm font-mono font-bold">{params.taxRate}%</span>
                </div>
                <Slider
                  value={[params.taxRate]}
                  max={20}
                  step={0.5}
                  onValueChange={(val) => setParams({ ...params, taxRate: Array.isArray(val) ? val[0] : val })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Agricultural Land %</Label>
                  <span className="text-sm font-mono font-bold">{params.landUseAgri}%</span>
                </div>
                <Slider
                  value={[params.landUseAgri]}
                  max={100}
                  onValueChange={(val) => setParams({ ...params, landUseAgri: Array.isArray(val) ? val[0] : val })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Digitization Rate (%)</Label>
                  <span className="text-sm font-mono font-bold">{params.digitizationRate}%</span>
                </div>
                <Slider
                  value={[params.digitizationRate]}
                  max={100}
                  onValueChange={(val) => setParams({ ...params, digitizationRate: Array.isArray(val) ? val[0] : val })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Agricultural Subsidies (%)</Label>
                  <span className="text-sm font-mono font-bold">{params.subsidyLevel}%</span>
                </div>
                <Slider
                  value={[params.subsidyLevel]}
                  max={100}
                  onValueChange={(val) => setParams({ ...params, subsidyLevel: Array.isArray(val) ? val[0] : val })}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              className="w-full gap-2 h-12 font-semibold"
              onClick={runSimulation}
              disabled={isSimulating}
            >
              {isSimulating ? (
                <>
                  <RefreshCcw className="h-4 w-4 animate-spin" /> Running...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Run Simulation
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Results Panel */}
        <div className="lg:col-span-2 space-y-6">
          {results ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-l-4 border-l-primary">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" /> Est. Revenue Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-3xl font-bold">₹{results.revenue} Cr</div>
                    <div className="text-xs text-muted-foreground mt-1">Based on current tax model</div>
                  </CardContent>
                </Card>

                <Card className={cn(
                  "border-l-4",
                  results.disputeRisk > 50 ? "border-l-red-500" : "border-l-green-500"
                )}>
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" /> Dispute Risk Index
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-3xl font-bold">{results.disputeRisk}%</div>
                    <div className="text-xs text-muted-foreground mt-1">Probability of ownership conflict</div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" /> Farmer Satisfaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-3xl font-bold">{results.farmerSatisfaction}%</div>
                    <div className="text-xs text-muted-foreground mt-1">Sentiment based on subsidies & taxes</div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-emerald-500">
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" /> Local Economic Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-3xl font-bold">{results.economicGrowth}%</div>
                    <div className="text-xs text-muted-foreground mt-1">Projected GDP growth in target region</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-muted/50">
                <CardHeader>
                  <CardTitle className="text-lg">Policy Verdict</CardTitle>
                  <CardDescription>AI synthesis of the simulation results.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-background border">
                    <Badge className={cn(
                      "px-3 py-1 uppercase",
                      results.status === "optimal" ? "bg-green-500" :
                      results.status === "volatile" ? "bg-red-500" : "bg-blue-500"
                    )}>
                      {results.status}
                    </Badge>
                    <span className="text-sm font-medium">
                      {results.status === "optimal"
                        ? "The proposed policy is highly sustainable and likely to reduce disputes while increasing satisfaction."
                        : results.status === "volatile"
                        ? "Caution: The current parameters suggest a high risk of social unrest and increased land litigation."
                        : "The policy is stable but provides moderate growth. Consider increasing digitization for better efficiency."}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border bg-background space-y-2">
                      <h4 className="text-xs font-bold uppercase text-muted-foreground">Key Strength</h4>
                      <p className="text-sm">
                        {results.farmerSatisfaction > 60 ? "High social acceptance due to subsidies." : "Strong revenue generation potential."}
                      </p>
                    </div>
                    <div className="p-4 rounded-lg border bg-background space-y-2">
                      <h4 className="text-xs font-bold uppercase text-muted-foreground">Primary Risk</h4>
                      <p className="text-sm">
                        {results.disputeRisk > 40 ? "Insufficient digitization leading to tenure ambiguity." : "Potential under-investment in agri-infrastructure."}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <Play className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">No Simulation Data</h3>
                <p className="text-muted-foreground">Adjust parameters and run the simulation to see results.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

function Users(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}
