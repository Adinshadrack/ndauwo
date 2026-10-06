"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#FCFAF4] px-6">
      <div className="max-w-xl text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#F67A05]">
          Something went wrong
        </p>

        <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
          The trail got a little rough.
        </h1>

        <p className="mt-5 leading-8 text-black/55">
          We couldn&apos;t load this page right now. Please try again.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-full bg-[#080808] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#F67A05]"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}