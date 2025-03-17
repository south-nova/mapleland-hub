import { cn } from '@/lib/cn';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn('antialiased rounded-lg bg-background w-screen h-screen flex flex-col')}>
      {children}
    </div>
  );
}
