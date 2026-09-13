export type DocCategory = "PAPER" | "POLICY" | "CASE_STUDY" | "LEGAL_TEXT";
export type DataType = "CSV" | "GeoJSON" | "RASTER" | "PDF";

export interface Document {
  id: string;
  title: string;
  abstract: string;
  category: DocCategory;
  author: string;
  date: string;
  isPublic: boolean;
  tags: string[];
}

export interface Dataset {
  id: string;
  name: string;
  description: string;
  type: DataType;
  contributor: string;
  date: string;
  isPublic: boolean;
  size: string;
}

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc-1",
    title: "Impact of Digital Land Records on Rural Credit Access",
    abstract: "This research examines how the digitization of land records in Maharashtra has influenced the ability of small-scale farmers to secure institutional credit.",
    category: "PAPER",
    author: "Dr. Anita Sharma, IIT Bombay",
    date: "2024-05-12",
    isPublic: true,
    tags: ["Digitalization", "Credit Access", "Maharashtra"],
  },
  {
    id: "doc-2",
    title: "National Land Use Policy 2025 - Draft",
    abstract: "Comprehensive draft outlining the transition toward sustainable land-use planning to combat urbanization and climate change risks.",
    category: "POLICY",
    author: "Ministry of Rural Development",
    date: "2025-01-20",
    isPublic: true,
    tags: ["Policy", "Sustainability", "Urbanization"],
  },
  {
    id: "doc-3",
    title: "Case Study: Resolving Land Disputes in Kerala",
    abstract: "Analysis of the alternative dispute resolution (ADR) mechanisms implemented in Kerala to reduce litigation in land ownership cases.",
    category: "CASE_STUDY",
    author: "National Institute of Urban Affairs",
    date: "2023-11-05",
    isPublic: true,
    tags: ["Dispute Resolution", "Kerala", "ADR"],
  },
  {
    id: "doc-4",
    title: "Revenue Act Amendment (2024) - Analysis",
    abstract: "Legal analysis of the 2024 amendments to the State Revenue Act focusing on tenure security for tenant farmers.",
    category: "LEGAL_TEXT",
    author: "Legal Aid Society",
    date: "2024-08-15",
    isPublic: true,
    tags: ["Law", "Tenure Security", "Agriculture"],
  },
  {
    id: "doc-5",
    title: "Climate Vulnerability of Coastal Land in Odisha",
    abstract: "Using satellite imagery to map flood-prone agricultural lands and proposing strategic retreats to mitigate loss.",
    category: "PAPER",
    author: "Odisha Agricultural University",
    date: "2024-03-10",
    isPublic: true,
    tags: ["Climate", "Odisha", "Satellite Imagery"],
  },
];

export const MOCK_DATASETS: Dataset[] = [
  {
    id: "data-1",
    name: "SVAMITVA Rural Property Records - Pilot",
    description: "High-resolution property boundaries for 500 villages in the pilot phase.",
    type: "GeoJSON",
    contributor: "SVAMITVA Project Office",
    date: "2024-06-01",
    isPublic: true,
    size: "1.2 GB",
  },
  {
    id: "data-2",
    name: "Agricultural Yield Trends 2010-2020",
    description: "Dataset containing crop yields across 12 states, correlated with soil health indices.",
    type: "CSV",
    contributor: "ICAR - Indian Council of Agricultural Research",
    date: "2023-09-15",
    isPublic: true,
    size: "450 MB",
  },
  {
    id: "data-3",
    name: "Bhuvan Satellite Imagery - Land Use Change",
    description: "Raster data showing land use changes from 2015 to 2025 in the Indo-Gangetic plain.",
    type: "RASTER",
    contributor: "ISRO Bhuvan",
    date: "2025-02-10",
    isPublic: true,
    size: "15 GB",
  },
];
