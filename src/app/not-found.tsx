
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center px-4">
      <div className="max-w-md">
        <h1 className="text-6xl md:text-8xl font-bold text-primary tracking-tighter">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-slate-800 dark:text-slate-200">Page Not Found</h2>
        <p className="mt-4 text-muted-foreground">
          Sorry, we couldn't find the page you were looking for. It might have been mistyped or the page has been moved.
        </p>
        <div className="mt-8">
          <Button asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Homepage
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
