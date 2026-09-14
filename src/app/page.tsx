import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import Stats from "@/components/home/Stats";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <Pillars />

      {/* CTA Section */}
      <section className="py-24 container text-center">
        <div className="bg-muted rounded-3xl p-12 border border-border relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
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
              <Button className="rounded-full px-8 py-6 h-auto text-md font-semibold">
                Apply for Researcher Access
              </Button>
              <Button variant="outline" className="rounded-full px-8 py-6 h-auto text-md font-semibold">
                View Public Dashboards
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
