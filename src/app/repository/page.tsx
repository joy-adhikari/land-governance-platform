"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  FileText,
  Database,
  Download,
  ExternalLink,
  ArrowUpDown
} from "lucide-react";
import {
  Input
} from "@/components/ui/input";
import {
  Button
} from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Badge
} from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  MOCK_DOCUMENTS,
  MOCK_DATASETS,
  DocCategory
} from "@/lib/mockData";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function RepositoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DocCategory | "ALL">("ALL");

  const filteredDocs = MOCK_DOCUMENTS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.abstract.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredDatasets = MOCK_DATASETS.filter(data => {
    return data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           data.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const categories: (DocCategory | "ALL")[] = ["ALL", "PAPER", "POLICY", "CASE_STUDY", "LEGAL_TEXT"];

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">National Repository</h1>
          <p className="text-muted-foreground">
            Explore research papers, policy documents, and land-governance datasets.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title, abstract or keywords..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map(cat => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? "default" : "outline"}
                    size="sm"
                    className="whitespace-nowrap"
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat === "ALL" ? "All Types" : cat.replace("_", " ")}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="documents" className="flex gap-2">
              <FileText className="h-4 w-4" /> Documents
            </TabsTrigger>
            <TabsTrigger value="datasets" className="flex gap-2">
              <Database className="h-4 w-4" /> Datasets
            </TabsTrigger>
          </TabsList>

          <TabsContent value="documents" className="mt-6">
            <div className="rounded-md border bg-background">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocs.length > 0 ? (
                    filteredDocs.map(doc => (
                      <TableRow key={doc.id} className="group">
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{doc.title}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1 mt-1">{doc.abstract}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="capitalize">
                            {doc.category.toLowerCase().replace("_", " ")}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{doc.author}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{doc.date}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No documents found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          <TabsContent value="datasets" className="mt-6">
            <div className="rounded-md border bg-background">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dataset Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Contributor</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDatasets.length > 0 ? (
                    filteredDatasets.map(data => (
                      <TableRow key={data.id} className="group">
                        <TableCell className="font-medium">
                          <div className="flex flex-col">
                            <span>{data.name}</span>
                            <span className="text-xs text-muted-foreground line-clamp-1 mt-1">{data.description}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-mono">
                            {data.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{data.contributor}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{data.size}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                        No datasets found matching your search.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
}
