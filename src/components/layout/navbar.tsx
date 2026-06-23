"use client"

import Link from 'next/link';
import { ShoppingCart, Flame, Search, Menu } from 'lucide-react';
import { useCart } from '@/components/cart/cart-provider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from '@/components/ui/sheet';

export function Navbar() {
  const { totalItems, items, totalPrice, updateQuantity, removeFromCart } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2 group">
          <Flame className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-black font-headline tracking-tighter uppercase text-primary">
            Mzansi <span className="text-foreground">Fire</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
          <Link href="/catalog" className="hover:text-primary transition-colors">Catalog</Link>
          <Link href="/matchmaker" className="hover:text-primary transition-colors">AI Matchmaker</Link>
          <Link href="/about" className="hover:text-primary transition-colors">Our Story</Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hidden sm:flex">
          <Search className="w-5 h-5" />
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 bg-accent text-accent-foreground text-[10px]">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md bg-card border-white/5">
            <SheetHeader>
              <SheetTitle className="font-headline text-2xl">Your Cart</SheetTitle>
            </SheetHeader>
            <div className="mt-8 space-y-6 overflow-y-auto max-h-[calc(100vh-250px)] pr-2">
              {items.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <p className="text-muted-foreground font-headline italic">Your cart is empty.</p>
                  <Button asChild variant="outline" className="border-primary text-primary">
                    <Link href="/catalog">Go To Catalog</Link>
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-4 items-start">
                    <div className="flex-1 space-y-1">
                      <h4 className="font-headline font-bold">{item.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.size}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center border border-white/10 rounded overflow-hidden">
                          <button 
                            className="px-2 py-1 hover:bg-white/5 transition-colors"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          >-</button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 hover:bg-white/5 transition-colors"
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          >+</button>
                        </div>
                        <button 
                          className="text-xs text-accent hover:underline"
                          onClick={() => removeFromCart(item.id, item.size)}
                        >Remove</button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold">R{item.price * item.quantity}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <SheetFooter className="absolute bottom-0 left-0 w-full p-6 bg-card border-t border-white/5">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-lg font-headline font-bold">
                  <span>Total</span>
                  <span>R{totalPrice.toFixed(2)}</span>
                </div>
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg" disabled={items.length === 0}>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
}
