import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { CartProvider } from '@/components/cart/cart-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Mzansi Fire | Premium South African Hot Sauces',
  description: 'Handcrafted hot sauces from the heart of South Africa, ranging from Cape Mild to Wild Veldt Fire.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground min-h-screen flex flex-col">
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}