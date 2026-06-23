import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SAUCES } from '@/app/lib/sauce-data';
import { SauceCard } from '@/components/ui/sauce-card';
import { ArrowRight, Zap, Shield, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const featuredSauces = SAUCES.slice(0, 3);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-24">
        <div className="container relative z-10 px-4 text-center space-y-8">
          <div className="flex justify-center">
            <Badge variant="outline" className="border-primary text-primary px-4 py-1 uppercase tracking-[0.3em] font-headline">
              Artisanal Fire
            </Badge>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline font-black uppercase tracking-tighter leading-none italic">
            Taste the <span className="text-primary block">Culinary</span> Heat
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
            From deep citrus tangs to volcanic pepper extractions, 
            Mzansi Fire brings you small-batch bottled sauces that capture the spice of life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-headline uppercase tracking-widest py-8 px-10 text-lg">
              <Link href="/catalog">Explore Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 font-headline uppercase tracking-widest py-8 px-10 text-lg hover:bg-white/5">
              <Link href="/matchmaker">Find Your Match</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-headline font-bold uppercase">The Fire Starter <span className="text-primary">Series</span></h2>
            <p className="text-muted-foreground max-w-xl">
              Curated flavor profiles defining our culinary identity. Each bottle is a journey through rich pepper heritage.
            </p>
          </div>
          <Button asChild variant="link" className="text-accent hover:text-accent/80 font-headline uppercase tracking-widest p-0">
            <Link href="/catalog" className="flex items-center">
              View All Sauces <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredSauces.map((sauce) => (
            <SauceCard key={sauce.id} sauce={sauce} />
          ))}
        </div>
      </section>

      {/* Brand Values */}
      <section className="bg-card py-24 border-y border-white/5">
        <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-headline font-bold uppercase">Pure Ingredients</h3>
            <p className="text-muted-foreground">Sourced directly from local farmers focusing on premium pepper quality and flavor intensity.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-headline font-bold uppercase">Small Batch</h3>
            <p className="text-muted-foreground">Every bottle is hand-poured and inspected for consistent heat and flavor profile by our master fermenters.</p>
          </div>
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-headline font-bold uppercase">Culinary Heat</h3>
            <p className="text-muted-foreground">Proprietary fermentation methods that balance extreme Scoville levels with complex umami profiles.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
