"use client";

import Image from "next/image";
import { ChevronDown, MapPin, Star } from "lucide-react";
import type { Tour, Destination } from "@/types/api";
import { Link, usePathname } from "@/i18n/navigation";
interface DesktopNavProps {
  tours: Tour[];
  destinations: Destination[];
}

export function DesktopNav({ tours, destinations }: DesktopNavProps) {
  const pathname = usePathname();
  const safariStyles = Array.from(
    new Set(tours.map((tour) => tour.category.trim()).filter(Boolean))
  );
  const regions = Array.from(
    new Set(destinations.map((destination) => destination.region.trim()).filter(Boolean))
  ).slice(0, 5);
  // Helper to format price
  const formatPrice = (price: string, currency: string) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: currency || "USD", maximumFractionDigits: 0 }).format(Number(price));
  };

  return (
    <nav className="hidden items-center gap-8 lg:flex">
      {/* 1. HOME */}
      <div className="group relative flex h-full items-center">
        <Link
          href="/"
          className={`flex items-center gap-1 py-6 text-[14px] font-semibold transition-colors ${
            pathname === "/" ? "text-[#0B3D1F]" : "text-[#11110F] hover:text-[#0B3D1F]"
          }`}
        >
          <span>Home</span>
        </Link>
        {/* Active Line */}
        <span className={`absolute bottom-4 left-0 h-[2px] bg-[#F67A05] transition-all duration-300 ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`} />
      </div>

      {/* 2. DESTINATIONS (Mega Menu) */}
      <div className="group relative flex h-[72px] items-center">
        <Link
          href="/destinations"
          className={`flex items-center gap-1 text-[14px] font-semibold transition-colors ${
            pathname.startsWith("/destinations") ? "text-[#0B3D1F]" : "text-[#11110F] hover:text-[#0B3D1F]"
          }`}
        >
          <span>Destinations</span>
          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-[#0B3D1F] transition-transform group-hover:rotate-180" />
        </Link>
        <span className={`absolute bottom-4 left-0 h-[2px] bg-[#F67A05] transition-all duration-300 ${pathname.startsWith("/destinations") ? "w-full" : "w-0 group-hover:w-full"}`} />

        {/* MEGA MENU DROPDOWN */}
        <div className="invisible absolute left-1/2 top-[72px] w-[900px] -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
          <div className="mt-2 overflow-hidden bg-white shadow-2xl border border-gray-100 rounded-b-lg">
            <div className="grid grid-cols-4 gap-8 p-8">
              {/* Col 1 */}
              <div>
                <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Tanzania Parks</h4>
                <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                  Northern Circuit classics, quieter southern parks, and the Zanzibar coast.
                </p>
                <Link href="/destinations" className="group/link flex items-center gap-2 text-sm font-bold text-[#11110F] hover:text-[#F67A05]">
                  BROWSE ALL DESTINATIONS
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
              
              {/* Col 2 */}
              <div>
                <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Regions</h4>
                <ul className="space-y-3">
                  {regions.map(r => (
                    <li key={r}>
                      <Link href={`/destinations?region=${encodeURIComponent(r)}`} className="flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-[#F67A05]">
                        <MapPin className="h-4 w-4 text-[#F67A05]" /> {r}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 */}
              <div>
                <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Featured Parks</h4>
                <ul className="space-y-3">
                  {destinations.slice(0, 5).map(d => (
                    <li key={d.id}>
                      <Link href={`/destinations/${d.slug}`} className="flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-[#F67A05]">
                        <Star className="h-3.5 w-3.5 fill-[#F67A05] text-[#F67A05]" /> {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4 (Featured Image) */}
              <div className="relative h-[280px] w-full overflow-hidden">
                {destinations[0] && (
                  <>
                    <Image src={destinations[0].image_url} alt={destinations[0].name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F67A05]">Start Here</span>
                      <h5 className="mt-1 text-lg font-bold leading-tight">{destinations[0].name}</h5>
                      <p className="mt-1 text-xs text-white/70">Discover the Endless Plains</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. SAFARIS (Mega Menu) */}
      <div className="group relative flex h-[72px] items-center">
        <Link
          href="/tours"
          className={`flex items-center gap-1 text-[14px] font-semibold transition-colors ${
            pathname.startsWith("/tours") ? "text-[#0B3D1F]" : "text-[#11110F] hover:text-[#0B3D1F]"
          }`}
        >
          <span>Safaris</span>
          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-[#0B3D1F] transition-transform group-hover:rotate-180" />
        </Link>
        <span className={`absolute bottom-4 left-0 h-[2px] bg-[#F67A05] transition-all duration-300 ${pathname.startsWith("/tours") ? "w-full" : "w-0 group-hover:w-full"}`} />

        {/* MEGA MENU DROPDOWN */}
        <div className="invisible absolute left-1/2 top-[72px] w-[1000px] -translate-x-1/2 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
          <div className="mt-2 overflow-hidden bg-white shadow-2xl border border-gray-100 rounded-b-lg">
            <div className="grid grid-cols-4 gap-8 p-8">
              {/* Col 1 */}
              <div>
                <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Tanzania Safaris</h4>
                <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                  Private, tailor-made and small-group safaris across Tanzania's Northern Circuit.
                </p>
                <Link href="/tours" className="group/link flex items-center gap-2 text-sm font-bold text-[#11110F] hover:text-[#F67A05]">
                  BROWSE ALL SAFARIS
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
              
              {/* Col 2 */}
              <div>
                <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Safari Styles</h4>
                <ul className="space-y-2">
                  {safariStyles.map(s => (
                    <li key={s}>
                      <Link href={`/tours?category=${encodeURIComponent(s)}`} className="flex items-center gap-2 text-[13px] font-medium text-gray-700 hover:text-[#F67A05]">
                        <span className="text-[#F67A05]">🏕️</span> {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 3 */}
              <div>
                <h4 className="mb-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">Most Booked</h4>
                <ul className="space-y-4">
                  {tours.slice(0, 4).map(t => (
                    <li key={t.id}>
                      <Link href={`/tours/${t.slug}`} className="group/tour block">
                        <div className="flex gap-2">
                           <Star className="mt-1 h-3.5 w-3.5 shrink-0 fill-[#F67A05] text-[#F67A05]" />
                           <div>
                              <span className="line-clamp-2 text-[13px] font-bold text-gray-800 group-hover/tour:text-[#F67A05]">{t.name}</span>
                              <span className="mt-1 block text-[11px] text-gray-500">{t.duration_days} Days / {t.duration_nights} Nights · From <span className="font-tour">{formatPrice(t.price, t.currency)}</span></span>
                           </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Col 4 (Featured Image) */}
              <div className="relative h-[300px] w-full overflow-hidden bg-gray-100">
                {tours[0] && (
                  <>
                    <Image src={tours[0].featured_image} alt={tours[0].name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#F67A05]">Featured Journey</span>
                      <h5 className="mt-1 text-lg font-bold leading-tight">{tours[0].name}</h5>
                      <p className="mt-1 text-xs text-white/70">{tours[0].duration_days} Days / {tours[0].duration_nights} Nights</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. GALLERY */}
      <div className="group relative flex h-full items-center">
        <Link href="/gallery" className={`flex items-center gap-1 py-6 text-[14px] font-semibold transition-colors ${pathname.startsWith("/gallery") ? "text-[#0B3D1F]" : "text-[#11110F] hover:text-[#0B3D1F]"}`}>
          <span>Gallery</span>
        </Link>
        <span className={`absolute bottom-4 left-0 h-[2px] bg-[#F67A05] transition-all duration-300 ${pathname.startsWith("/gallery") ? "w-full" : "w-0 group-hover:w-full"}`} />
      </div>

      {/* 5. BLOG */}
      <div className="group relative flex h-full items-center">
        <Link href="/blog" className={`flex items-center gap-1 py-6 text-[14px] font-semibold transition-colors ${pathname.startsWith("/blog") ? "text-[#0B3D1F]" : "text-[#11110F] hover:text-[#0B3D1F]"}`}>
          <span>Blog</span>
        </Link>
        <span className={`absolute bottom-4 left-0 h-[2px] bg-[#F67A05] transition-all duration-300 ${pathname.startsWith("/blog") ? "w-full" : "w-0 group-hover:w-full"}`} />
      </div>
    </nav>
  );
}