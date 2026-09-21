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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
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
import ProtectedRoute from "@/components/auth/ProtectedRoute";

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

function Users(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
}

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
    setTimeout(() => {
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
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-10 space-y-8">
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

                <Tabs defaultValue="bar" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="bar">Comparison</TabsTrigger>
                    <TabsTrigger value="pie">Distribution</TabsTrigger>
                    <TabsTrigger value="line">Projection</TabsTrigger>
                    <TabsTrigger value="area">Velocity</TabsTrigger>
                  </TabsList>

                  <TabsContent value="bar">
                    <Card className="border-none shadow-sm bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold">KPI Comparison</CardTitle>
                        <CardDescription>Direct contrast of simulation outcomes</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div style={{ width: '100%', height: '400px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { name: 'Revenue', value: results.revenue, color: '#3b82f6' },
                                { name: 'Risk', value: results.disputeRisk, color: '#ef4444' },
                                { name: 'Satisfaction', value: results.farmerSatisfaction, color: '#10b981' },
                                { name: 'Growth', value: results.economicGrowth, color: '#f59e0b' },
                              ]}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 12 }}
                              />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 12 }}
                              />
                              <RechartsTooltip
                                cursor={{ fill: '#f1f5f9' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                              />
                              <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={60}>
                                { [0,1,2,3].map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={['#3b82f6', '#ef4444', '#10b981', '#f59e0b'][index]} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="pie">
                    <Card className="border-none shadow-sm bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold">Outcome Weight</CardTitle>
                        <CardDescription>Relative distribution of simulated metrics</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div style={{ width: '100%', height: '400px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Revenue', value: results.revenue },
                                  { name: 'Risk', value: results.disputeRisk },
                                  { name: 'Satisfaction', value: results.farmerSatisfaction },
                                  { name: 'Growth', value: results.economicGrowth },
                                ]}
                                cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={8} dataKey="value"
                                stroke="none"
                              >
                                <Cell fill="#3b82f6" />
                                <Cell fill="#ef4444" />
                                <Cell fill="#10b981" />
                                <Cell fill="#f59e0b" />
                              </Pie>
                              <RechartsTooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="line">
                    <Card className="border-none shadow-sm bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold">Policy Trajectory</CardTitle>
                        <CardDescription>Projected trend from baseline to target</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div style={{ width: '100%', height: '400px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={[
                              { name: 'Baseline', rev: results.revenue * 0.6, risk: results.disputeRisk * 1.3 },
                              { name: 'Phase 1', rev: results.revenue * 0.8, risk: results.disputeRisk * 1.1 },
                              { name: 'Phase 2', rev: results.revenue * 0.9, risk: results.disputeRisk * 1.05 },
                              { name: 'Target', rev: results.revenue, risk: results.disputeRisk },
                            ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 12 }}
                              />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 12 }}
                              />
                              <RechartsTooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                              />
                              <Line type="monotone" dataKey="rev" name="Revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
                              <Line type="monotone" dataKey="risk" name="Risk Index" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} activeDot={{ r: 6 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="area">
                    <Card className="border-none shadow-sm bg-background">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg font-semibold">Growth Velocity</CardTitle>
                        <CardDescription>Projected acceleration of local GDP</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div style={{ width: '100%', height: '400px' }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={[
                              { name: 'Q1', value: results.economicGrowth * 0.4 },
                              { name: 'Q2', value: results.economicGrowth * 0.65 },
                              { name: 'Q3', value: results.economicGrowth * 0.85 },
                              { name: 'Q4', value: results.economicGrowth },
                            ]} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                              <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 12 }}
                              />
                              <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 12 }}
                              />
                              <RechartsTooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                              />
                              <Area type="monotone" dataKey="value" name="GDP Growth" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={3} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

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
    </ProtectedRoute>
  );
}