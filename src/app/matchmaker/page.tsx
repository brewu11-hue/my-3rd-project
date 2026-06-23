"use client"

import { useState } from 'react';
import { aiFlavorMatchmaker } from '@/ai/flows/ai-flavor-matchmaker';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Flame, Sparkles, Wand2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function MatchmakerPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      const response = await aiFlavorMatchmaker({ dishesOrIngredients: input });
      setResults(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container px-4 py-12 mx-auto max-w-4xl space-y-12">
      <header className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">GenAI Recommendation Engine</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter">
          The <span className="text-primary">Match</span>maker
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto text-lg">
          Describe the South African dish you're cooking, and our AI hot sauce sommelier will find the perfect Mzansi Fire pairing.
        </p>
      </header>

      <Card className="bg-card border-white/5 overflow-hidden">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-headline font-bold uppercase tracking-widest text-sm text-muted-foreground">
                What's on the menu?
              </label>
              <Textarea 
                placeholder="e.g. Braaied Boerewors, Lamb Potjiekos, or maybe some fresh Snoek..."
                className="min-h-[120px] bg-background/50 border-white/10 focus:border-primary text-lg"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-headline uppercase tracking-widest py-8 text-lg"
              disabled={loading || !input.trim()}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                  Consulting the Spirits...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5 mr-3" />
                  Find My Fire
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <h2 className="font-headline font-black text-2xl uppercase italic">The Sommelier's Picks</h2>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.recommendedSauces.map((rec: any, i: number) => (
              <Card key={i} className="bg-card border-white/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-headline text-2xl font-black uppercase text-primary">
                      {rec.name}
                    </CardTitle>
                    <Flame className="w-5 h-5 text-accent" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed italic">
                    "{rec.explanation}"
                  </p>
                  <Button asChild variant="outline" className="w-full border-white/10 font-headline uppercase tracking-widest">
                    <Link href="/catalog">
                      Buy Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}