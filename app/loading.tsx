export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#FCFAF4]">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-black/10 border-t-[#F67A05]" />

        <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-black/40">
          Loading your adventure...
        </p>
      </div>
    </main>
  );
}