"use client"

import { use, useState, useEffect } from 'react';
import { SAUCES, getHeatCategory } from '@/app/lib/sauce-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, ProductSize } from '@/components/cart/cart-provider';
import { Flame, Plus, Check, Nut, ArrowLeft, ShieldCheck, Zap } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const sauce = SAUCES.find(s => s.id === id);
  const { addToCart } = useCart();
  
  if (!sauce) {
    notFound();
  }

  const isSpice = sauce.heatCategory === 'Spices';
  const [size, setSize] = useState<ProductSize>(isSpice ? '50g' : '125ml');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      id: sauce.id,
      name: sauce.name,
      price: sauce.price,
      size
    });
    setAdded(true);
    toast({
      title: "Added to cart",
      description: `${sauce.name} (${size}) added to your collection.`,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="container px-4 py-12 mx-auto max-w-6xl">
      <Link href="/catalog" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-headline uppercase tracking-widest text-xs mb-12">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Info Left */}
        <div className="space-y-8">
          <div className="space-y-4">
            <Badge className={`bg-primary/10 text-primary border border-primary/20 font-headline uppercase tracking-widest text-xs py-1.5 px-4`}>
              {isSpice ? <Nut className="w-3 h-3 mr-2" /> : <Flame className="w-3 h-3 mr-2" />}
              {sauce.heatCategory}
            </Badge>
            <h1 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter leading-none italic">
              {sauce.name}
            </h1>
            <div className="flex items-center gap-6">
              <span className="text-3xl font-headline font-bold text-primary">R{sauce.price}</span>
              {!isSpice && (
                <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded border border-white/10">
                  <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-widest">Intensity:</span>
                  <span className="text-sm font-bold font-mono">{sauce.scoville.toLocaleString()} SHU</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 bg-card border border-white/5 rounded-xl space-y-6">
            <div className="space-y-2">
              <h3 className="font-headline font-bold uppercase tracking-widest text-xs text-muted-foreground">The Profile</h3>
              <p className="text-lg italic leading-relaxed text-foreground">
                "{sauce.longDescription}"
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-headline font-bold uppercase tracking-widest text-xs text-muted-foreground">Notes</h3>
              <div className="flex flex-wrap gap-3">
                {sauce.flavorProfile.map(flavor => (
                  <Badge key={flavor} variant="outline" className="text-xs uppercase px-4 py-1 border-white/20 text-white/90">
                    {flavor}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-white/5 rounded-lg flex items-start gap-4">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Purity</h4>
                <p className="text-xs">No artificial thickeners or dyes.</p>
              </div>
            </div>
            <div className="p-4 border border-white/5 rounded-lg flex items-start gap-4">
              <Zap className="w-5 h-5 text-primary shrink-0" />
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Small Batch</h4>
                <p className="text-xs">Master fermenter approved.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Options Right */}
        <div className="lg:sticky lg:top-32 h-fit space-y-8">
          <div className="p-8 bg-card border border-white/10 rounded-2xl shadow-2xl">
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="font-headline font-bold uppercase tracking-widest text-sm text-muted-foreground">
                  Select Quantity & Size
                </label>
                <Select value={size} onValueChange={(v) => setSize(v as ProductSize)}>
                  <SelectTrigger className="w-full bg-background border-white/10 font-headline uppercase tracking-widest py-8 text-lg">
                    <SelectValue placeholder="Select Size" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-white/10">
                    {isSpice ? (
                      <>
                        <SelectItem value="50g">50g Small Pouch (Standard)</SelectItem>
                        <SelectItem value="100g">100g Artisan Tin</SelectItem>
                        <SelectItem value="250g">250g Professional Pack</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="125ml">125ml Classic Bottle</SelectItem>
                        <SelectItem value="250ml">250ml Mid-Size Bottle</SelectItem>
                        <SelectItem value="500ml">500ml Culinary Jug</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className={`w-full font-headline uppercase tracking-widest py-10 text-xl transition-all duration-300 shadow-xl shadow-primary/20 ${
                  added ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-primary hover:bg-primary/90'
                }`}
                onClick={handleAdd}
              >
                {added ? <Check className="w-6 h-6 mr-3" /> : <Plus className="w-6 h-6 mr-3" />}
                {added ? 'Added to Cart' : 'Ignite Order'}
              </Button>

              <div className="text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                  Estimated delivery 2-3 business days across Mzansi
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/5 border border-white/5 rounded-xl">
            <h4 className="font-headline font-bold uppercase text-xs mb-4">Pairing Suggestion</h4>
            <p className="text-sm text-muted-foreground italic leading-relaxed">
              {isSpice 
                ? "Ideally applied 20 minutes before cooking. Let the minerals penetrate the protein for maximum fire." 
                : "Best served at room temperature to unlock the full spectrum of aromatic oils."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}