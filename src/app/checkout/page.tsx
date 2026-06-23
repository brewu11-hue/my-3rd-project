"use client"

import { useState } from 'react';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, ChevronRight, Truck, CreditCard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<'details' | 'confirm'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    province: 'Gauteng'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
  };

  if (items.length === 0 && step === 'details') {
    return (
      <div className="container px-4 py-24 text-center space-y-8">
        <h1 className="text-4xl font-headline font-black uppercase">No Fire in the Hearth</h1>
        <p className="text-muted-foreground">Your cart is empty. Let's add some heat first.</p>
        <Button asChild className="bg-primary">
          <Link href="/catalog">Go to Catalog</Link>
        </Button>
      </div>
    );
  }

  if (step === 'confirm') {
    return (
      <div className="container px-4 py-24 max-w-2xl mx-auto text-center space-y-8 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-headline font-black uppercase">Ignition Confirmed!</h1>
          <p className="text-muted-foreground text-lg">
            Thanks, <span className="text-white font-bold">{formData.name}</span>! Your order is being prepared by our master fermenters. 
            A confirmation has been sent to <span className="text-white">{formData.email}</span>.
          </p>
        </div>
        <Card className="bg-card border-white/5 p-6 text-left">
          <div className="space-y-2">
            <h3 className="font-headline font-bold uppercase tracking-widest text-xs text-muted-foreground">Shipping To</h3>
            <p>{formData.address}, {formData.city}, {formData.province}</p>
          </div>
        </Card>
        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="outline" className="border-white/10 font-headline uppercase tracking-widest px-12 py-8">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild className="bg-accent hover:bg-accent/90 font-headline uppercase tracking-widest px-12 py-8" onClick={() => clearCart()}>
            <Link href="/catalog">Keep Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto space-y-12">
      <header>
        <h1 className="text-5xl font-headline font-black uppercase tracking-tighter">
          Final <span className="text-primary">Staging</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-2xl font-headline font-bold uppercase flex items-center">
              <Truck className="w-6 h-6 mr-3 text-primary" />
              Delivery Details
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <Input 
                placeholder="Full Name" 
                required 
                className="bg-card border-white/10"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <Input 
                type="email" 
                placeholder="Email Address" 
                required 
                className="bg-card border-white/10"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
              <Input 
                placeholder="Street Address" 
                required 
                className="bg-card border-white/10"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  placeholder="City" 
                  required 
                  className="bg-card border-white/10"
                  value={formData.city}
                  onChange={e => setFormData({...formData, city: e.target.value})}
                />
                <Input 
                  placeholder="Province" 
                  required 
                  className="bg-card border-white/10"
                  value={formData.province}
                  onChange={e => setFormData({...formData, province: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-headline font-bold uppercase flex items-center">
              <CreditCard className="w-6 h-6 mr-3 text-primary" />
              Payment Information
            </h3>
            <Card className="bg-card border-white/10 p-6 space-y-4">
              <div className="flex items-center text-sm text-muted-foreground bg-white/5 p-3 rounded italic">
                <ShieldCheck className="w-4 h-4 mr-2" />
                This is a secure mock payment interface. No real data is processed.
              </div>
              <Input placeholder="Card Number" className="bg-background border-white/5" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM/YY" className="bg-background border-white/5" />
                <Input placeholder="CVC" className="bg-background border-white/5" />
              </div>
            </Card>
          </div>

          <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-headline uppercase tracking-widest py-8 text-lg">
            Complete Purchase <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </form>

        <aside>
          <Card className="bg-card border-white/10 sticky top-28">
            <CardHeader>
              <CardTitle className="font-headline uppercase text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between items-start gap-4">
                    <div className="flex gap-4">
                      <div>
                        <p className="font-bold text-sm leading-tight">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.size} x {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm">R{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <Separator className="bg-white/5" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>R{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-primary">FREE</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-white/5 p-6 border-t border-white/5">
              <div className="w-full flex justify-between items-center">
                <span className="font-headline font-bold text-2xl uppercase italic">Total</span>
                <span className="font-headline font-black text-3xl">R{totalPrice.toFixed(2)}</span>
              </div>
            </CardFooter>
          </Card>
        </aside>
      </div>
    </div>
  );
}
