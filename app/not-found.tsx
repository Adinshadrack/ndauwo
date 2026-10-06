import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#FCFAF4] px-6">
      <div className="max-w-2xl text-center">
        <p className="text-7xl font-black tracking-tight text-[#F67A05] md:text-9xl">
          404
        </p>

        <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
          This trail doesn&apos;t exist.
        </h1>

        <p className="mx-auto mt-5 max-w-lg leading-8 text-black/55">
          The page you&apos;re looking for may have moved, or perhaps you took
          a wrong turn somewhere in the bush.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-[#080808] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#F67A05]"
          >
            Back Home
          </Link>

          <Link
            href="/tours"
            className="rounded-full bg-[#F67A05] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#C52A0E]"
          >
            Explore Safaris
          </Link>
        </div>
      </div>
    </main>
  );
}