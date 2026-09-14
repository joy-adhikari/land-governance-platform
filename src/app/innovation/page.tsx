"use client";

import React from "react";
import {
  Trophy,
  Lightbulb,
  Rocket,
  ClipboardList,
  Medal,
  ArrowRight,
  ShieldCheck,
  Globe
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
  Badge
} from "@/components/ui/badge";

const CHALLENGES = [
  {
    title: "Urban Land Transition 2026",
    description: "Develop an AI model to predict urban sprawl patterns and suggest optimal zoning for sustainable growth.",
    reward: "₹5,00,000",
    deadline: "Oct 15, 2026",
    status: "Open",
    icon: Rocket
  },
  {
    title: "Rural Tenure Security Hack",
    description: "Create a blockchain-based verification system for rural land titles to reduce disputes.",
    reward: "₹3,00,000",
    deadline: "Nov 01, 2026",
    status: "Open",
    icon: ShieldCheck
  },
  {
    title: "Climate Resilience Mapping",
    description: "Integrating satellite data to identify high-risk agricultural zones for flood-resistant cropping.",
    reward: "₹4,00,000",
    deadline: "Sep 30, 2026",
    status: "Closing Soon",
    icon: Globe
  },
];

export default function InnovationPage() {
  return (
    <div className="container py-10 space-y-12">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Innovation Portal</h1>
        <p className="text-muted-foreground">
          Accelerating land governance reforms through open innovation, grants, and competitions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-primary bg-background">
          <CardHeader>
            <Trophy className="h-8 w-8 mb-2 text-primary" />
            <CardTitle className="text-primary">National Challenges</CardTitle>
            <CardDescription>
              Solve critical problems and win grants.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12 Active</div>
            <p className="text-sm text-muted-foreground mt-1">Challenges across 5 states</p>
          </CardContent>
          <CardFooter>
            <Button variant="default" className="w-full gap-2">
              Browse Challenges <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Lightbulb className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Research Grants</CardTitle>
            <CardDescription>
              Funding for evidence-based land governance research.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹2.5 Cr</div>
            <p className="text-sm text-muted-foreground mt-1">Total funding available</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              Apply for Grant <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <ClipboardList className="h-8 w-8 mb-2 text-primary" />
            <CardTitle>Pilot Registry</CardTitle>
            <CardDescription>
              Track the implementation of innovative policy pilots.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42 Pilots</div>
            <p className="text-sm text-muted-foreground mt-1">Currently in field testing</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full gap-2">
              Explore Registry <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Active Challenges</h2>
          <Button variant="ghost" className="text-primary">View All</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CHALLENGES.map((challenge, i) => (
            <Card key={i} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    <challenge.icon className="h-6 w-6" />
                  </div>
                  <Badge variant={challenge.status === "Open" ? "default" : "destructive"}>
                    {challenge.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{challenge.title}</CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Medal className="h-4 w-4 text-yellow-500" />
                  Reward: <span className="text-foreground">{challenge.reward}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ClipboardList className="h-4 w-4" />
                  Deadline: {challenge.deadline}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  Submit Proposal <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
