"use client";

import React, { useState } from "react";
import {
  Search,
  Sparkles,
  BookOpen,
  ExternalLink,
  Loader2,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import {
  Input
} from "@/components/ui/input";
import {
  Button
} from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Badge
} from "@/components/ui/badge";
import {
  MOCK_DOCUMENTS
} from "@/lib/mockData";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{
    answer: string;
    sources: any[];
  } | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);

    // Mocking an AI synthesis process (RAG)
    setTimeout(() => {
      const relevantDocs = MOCK_DOCUMENTS.filter(doc =>
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.abstract.toLowerCase().includes(query.toLowerCase())
      );

      // Mock synthesis answer based on query
      const mockAnswer = query.toLowerCase().includes("credit")
        ? "Based on current research, the digitization of land records has significantly reduced the time taken for credit appraisal in rural areas, particularly in Maharashtra, by providing verified collateral data to banks."
        : query.toLowerCase().includes("climate")
        ? "Climate vulnerability mapping in coastal Odisha indicates a high risk of soil salinity increase, suggesting a need for a strategic retreat and shift towards salt-tolerant crop varieties."
        : "Based on the indexed repository, land governance is transitioning toward a digital-first approach. Key trends include the implementation of SVAMITVA for rural property mapping and the integration of satellite imagery for land-use monitoring.";

      setResults({
        answer: mockAnswer,
        sources: relevantDocs.length > 0 ? relevantDocs : MOCK_DOCUMENTS.slice(0, 2),
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <ProtectedRoute>
      <div className="container px-4 py-10 max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            <Sparkles className="h-3 w-3" /> AI Synthesis Engine
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Knowledge Discovery</h1>
          <p className="text-muted-foreground text-lg">
            Ask complex questions about land governance, and our AI will synthesize
            answers from the national repository.
          </p>
        </div>

        <form onSubmit={handleSearch} className="relative group">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="e.g., How has land digitization impacted rural credit in Maharashtra?"
                className="pl-11 h-14 text-lg rounded-full shadow-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="h-14 px-6 rounded-full font-semibold gap-2"
              disabled={isSearching}
            >
              {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5" />}
              Synthesize
            </Button>
          </div>
        </form>

        {results && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-primary">
                  <MessageSquare className="h-4 w-4" /> Synthesized Answer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed font-medium">
                  {results.answer}
                </p>
                <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                  <Info className="h-3 w-3" />
                  This answer is synthesized from {results.sources.length} verified documents.
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Supporting Evidence
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {results.sources.map((source, i) => (
                  <Card key={i} className="hover:border-primary/50 transition-colors cursor-pointer group">
                    <CardContent className="p-4 flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{source.title}</span>
                          <Badge variant="secondary" className="text-[10px] capitalize">
                            {source.category.toLowerCase().replace("_", " ")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {source.abstract}
                        </p>
                        <div className="text-xs text-muted-foreground mt-2">
                          Author: {source.author} • {source.date}
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

function Info(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>;
}
