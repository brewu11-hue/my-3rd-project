"use client"

import { useState, useMemo } from 'react';
import { SAUCES } from '@/app/lib/sauce-data';
import { SauceCard } from '@/components/ui/sauce-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, FilterX, Nut } from 'lucide-react';

export default function CatalogPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredSauces = useMemo(() => {
    if (activeTab === 'all') return SAUCES;
    return SAUCES.filter(sauce => {
      const category = sauce.heatCategory;
      return category.toLowerCase().replace(/\s+/g, '-') === activeTab;
    });
  }, [activeTab]);

  return (
    <div className="container px-4 py-12 mx-auto space-y-12">
      <header className="space-y-4 text-center">
        <h1 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter">
          The <span className="text-primary">Fire</span> Index
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Explore our collection of handcrafted spice profiles and sauces. Strictly culinary heat, zero tourism.
        </p>
      </header>

      <div className="space-y-12">
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-12">
            <TabsList className="bg-card border border-white/5 p-1 h-auto flex-wrap justify-center gap-2">
              <TabsTrigger value="all" className="font-headline uppercase tracking-widest px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
                All Products
              </TabsTrigger>
              <TabsTrigger value="spices" className="font-headline uppercase tracking-widest px-6 py-3 data-[state=active]:bg-accent data-[state=active]:text-white">
                Spices & Rubs
              </TabsTrigger>
              <TabsTrigger value="mild-breeze" className="font-headline uppercase tracking-widest px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
                Mild Breeze
              </TabsTrigger>
              <TabsTrigger value="warm-embers" className="font-headline uppercase tracking-widest px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
                Warm Embers
              </TabsTrigger>
              <TabsTrigger value="searing-heat" className="font-headline uppercase tracking-widest px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
                Searing Heat
              </TabsTrigger>
              <TabsTrigger value="jozi-fire" className="font-headline uppercase tracking-widest px-6 py-3 data-[state=active]:bg-primary data-[state=active]:text-white">
                Jozi Fire
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {filteredSauces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSauces.map((sauce) => (
                  <SauceCard key={sauce.id} sauce={sauce} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center space-y-4">
                <Flame className="w-12 h-12 text-muted mx-auto" />
                <h2 className="text-3xl font-headline italic">No items found in this category...</h2>
                <Button 
                  variant="outline" 
                  onClick={() => setActiveTab('all')}
                  className="font-headline uppercase tracking-widest border-white/10"
                >
                  <FilterX className="w-4 h-4 mr-2" />
                  View All Products
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
