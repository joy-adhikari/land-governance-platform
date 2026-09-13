import Hero from "@/components/home/Hero";
import Pillars from "@/components/home/Pillars";
import Stats from "@/components/home/Stats";

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
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:opacity-90 transition-all">
                Apply for Researcher Access
              </button>
              <button className="px-8 py-3 bg-background border border-border rounded-full font-semibold hover:bg-muted transition-all">
                View Public Dashboards
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
