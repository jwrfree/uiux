'use client';

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center px-4">
      <div className="max-w-md p-8 bg-card/50 border border-destructive/20 rounded-lg shadow-lg">
        <div className="flex justify-center">
           <AlertTriangle className="h-12 w-12 text-destructive" />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-destructive">An Error Occurred</h2>
        <p className="mt-4 text-muted-foreground">
            Sorry, it seems a technical issue has occurred. You can try to reload this page.
        </p>
        <div className="mt-6">
          <Button
            onClick={() => reset()}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}
