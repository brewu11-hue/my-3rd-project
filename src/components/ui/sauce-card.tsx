"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sauce } from '@/app/lib/sauce-data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart, ProductSize } from '@/components/cart/cart-provider';
import { Flame, Plus, Check, Nut, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';

interface SauceCardProps {
  sauce: Sauce;
}

export function SauceCard({ sauce }: SauceCardProps) {
  const { addToCart } = useCart();
  const isSpice = sauce.heatCategory === 'Spices';
  const [size, setSize] = useState<ProductSize>(isSpice ? '50g' : '125ml');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setSize(isSpice ? '50g' : '125ml');
  }, [isSpice]);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <Card className="group relative overflow-hidden bg-card border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 flex flex-col h-full">
      <Link href={`/catalog/${sauce.id}`} className="flex-1 flex flex-col">
        <div className="p-6 bg-gradient-to-br from-primary/5 to-transparent border-b border-white/5">
          <div className="flex justify-between items-center mb-4">
            <Badge className={`bg-background/80 backdrop-blur border-none font-headline uppercase tracking-widest text-[10px] py-1 ${
              isSpice ? 'text-accent' : (sauce.scoville > 100000 ? 'text-accent' : 'text-primary')
            }`}>
              {isSpice ? <Nut className="w-3 h-3 mr-1" /> : <Flame className="w-3 h-3 mr-1" />}
              {sauce.heatCategory}
            </Badge>
            {!isSpice && (
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-mono">
                {sauce.scoville.toLocaleString()} SHU
              </span>
            )}
          </div>
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            {sauce.description}
          </p>
        </div>
        
        <CardHeader className="space-y-1 p-6 flex-1">
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-xl font-headline font-black uppercase leading-tight group-hover:text-primary transition-colors">
              {sauce.name}
            </h3>
            <span className="font-headline font-bold text-lg whitespace-nowrap">R{sauce.price}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {sauce.flavorProfile.map(flavor => (
              <Badge key={flavor} variant="outline" className="text-[9px] uppercase border-white/20 text-white/70">
                {flavor}
              </Badge>
            ))}
          </div>
          <div className="mt-4 flex items-center text-[10px] text-primary uppercase font-headline tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            View Details <ChevronRight className="w-3 h-3 ml-1" />
          </div>
        </CardHeader>
      </Link>

      <CardContent className="px-6 pb-2" onClick={(e) => e.stopPropagation()}>
        <Select value={size} onValueChange={(v) => setSize(v as ProductSize)}>
          <SelectTrigger className="w-full bg-background/50 border-white/10 font-headline uppercase tracking-widest text-xs h-9">
            <SelectValue placeholder="Select Size" />
          </SelectTrigger>
          <SelectContent className="bg-card border-white/10">
            {isSpice ? (
              <>
                <SelectItem value="50g">50g Small Pouch</SelectItem>
                <SelectItem value="100g">100g Standard Tin</SelectItem>
                <SelectItem value="250g">250g Value Pack</SelectItem>
              </>
            ) : (
              <>
                <SelectItem value="125ml">125ml Classic</SelectItem>
                <SelectItem value="250ml">250ml Mid-Size</SelectItem>
                <SelectItem value="500ml">500ml Party Size</SelectItem>
              </>
            )}
          </SelectContent>
        </Select>
      </CardContent>

      <CardFooter className="p-6">
        <Button 
          className={`w-full font-headline uppercase tracking-widest h-11 transition-all duration-300 ${
            added ? 'bg-emerald-600 hover:bg-emerald-600' : 'bg-primary hover:bg-primary/90'
          }`}
          onClick={handleAdd}
        >
          {added ? <Check className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
          {added ? 'In Cart' : 'Add to Order'}
        </Button>
      </CardFooter>
    </Card>
  );
}