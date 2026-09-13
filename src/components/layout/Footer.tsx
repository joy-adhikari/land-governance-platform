import React from "react";
import Link from "next/link";
import { Map } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
              <div className="bg-primary text-primary-foreground p-1 rounded">
                <Map className="h-6 w-6" />
              </div>
              <span>LandGov <span className="text-primary">India</span></span>
            </Link>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              The National Digital Platform for Research, Policy Innovation, and
              Evidence-Based Land Governance. Transforming cadastral records and
              satellite imagery into actionable policy insights.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/repository" className="hover:text-primary transition-colors">Repository</Link></li>
              <li><Link href="/search" className="hover:text-primary transition-colors">AI Search</Link></li>
              <li><Link href="/gis" className="hover:text-primary transition-colors">GIS Dashboard</Link></li>
              <li><Link href="/simulate" className="hover:text-primary transition-colors">Policy Simulation</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Government</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary transition-colors">Ministry of Rural Development</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Department of Land Resources</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Digital India</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">GIGW Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 Government of India. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
