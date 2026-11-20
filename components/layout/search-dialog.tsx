"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronDown, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react"; // Added imports

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "@/i18n/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Tour, Destination } from "@/types/api";

interface SearchDialogProps {
  tours: Tour[];
  destinations: Destination[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function SearchDialog({
  tours,
  destinations,
  open,
  setOpen,
}: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  
  const maximumTourPrice = Math.max(
    1000,
    ...tours.map((tour) => Number(tour.price)).filter(Number.isFinite)
  );
  const priceSliderMax = Math.ceil(maximumTourPrice / 1000) * 1000;
  const tourCurrency = tours.find((tour) => tour.currency)?.currency || "USD";
  const [priceRange, setPriceRange] = useState<number[]>([0, priceSliderMax]);
  const [minDays, setMinDays] = useState("");
  const [maxDays, setMaxDays] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const hasPriceFilter = priceRange[0] > 0 || priceRange[1] < priceSliderMax;
  
  const formatTourPrice = (price: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: tourCurrency,
      maximumFractionDigits: 0,
    }).format(price);

  // Handle keyboard shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const categories = Array.from(
    new Set(tours.map((tour) => tour.category?.trim()).filter(Boolean))
  ) as string[];
  const difficulties = Array.from(
    new Set(tours.map((tour) => tour.difficulty?.trim()).filter(Boolean))
  ) as string[];
  const normalizedQuery = query.trim().toLowerCase();
  
  const filteredTours = tours.filter((tour) => {
    const price = Number(tour.price);
    const days = Number(tour.duration_days ?? 0);
    const matchesQuery =
      !normalizedQuery ||
      tour.name.toLowerCase().includes(normalizedQuery) ||
      (tour.category || "").toLowerCase().includes(normalizedQuery) ||
      (tour.destination?.name || "").toLowerCase().includes(normalizedQuery);
    const matchesPrice =
      Number.isFinite(price) && price >= priceRange[0] && price <= priceRange[1];
    const matchesDays =
      (!minDays || days >= Number(minDays)) && (!maxDays || days <= Number(maxDays));
    const matchesCategory = !category || tour.category === category;
    const matchesDifficulty = !difficulty || tour.difficulty === difficulty;
    return matchesQuery && matchesPrice && matchesDays && matchesCategory && matchesDifficulty;
  });

  const filteredDestinations = destinations.filter(
    (dest) =>
      !normalizedQuery ||
      dest.name.toLowerCase().includes(normalizedQuery) ||
      (dest.region || "").toLowerCase().includes(normalizedQuery)
  );

  const handleNavigate = (path: string) => {
    setOpen(false);
    setQuery("");
    router.push(path);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/40 font-[family-name:var(--font-body)] backdrop-blur-sm"
        >
          {/* Click outside to close */}
          <div className="absolute inset-0" onClick={() => setOpen(false)} />

          <div className="relative z-10 mx-auto mt-20 w-full max-w-[900px] px-4">
            
            {/* === MAIN SEARCH BAR (Slides down & fades in) === */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="flex items-center gap-4 rounded-full border border-gray-200 bg-white px-6 py-4 shadow-xl"
            >
              <Search className="h-6 w-6 text-gray-500" strokeWidth={1.5} />
              <div className="h-6 w-px bg-gray-300" />
              <input
                type="text"
                autoFocus
                placeholder="What are you looking for?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full min-w-0 bg-transparent text-lg font-medium text-gray-700 outline-none ring-0 placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 search-dialog-input font-[family-name:var(--font-primary)]"
              />
              <button
                onClick={() => {
                  setQuery("");
                  setOpen(false);
                }}
                className="flex aspect-square h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 p-0 text-gray-500 transition-colors hover:bg-gray-200 hover:text-black focus-visible:outline-none focus-visible:ring-0"
                aria-label="Close search"
              >
                <X className="h-5 w-5" strokeWidth={2} />
              </button>
            </motion.div>

            {/* === RESULTS DROPDOWN (Slides down & fades in slightly later) === */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.05 }}
              className="mt-2 max-h-[70vh] overflow-hidden rounded-xl bg-white shadow-2xl"
            >
              
              {/* Search filters */}
              <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-5 py-4">
                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 outline-none hover:border-gray-300 focus-visible:outline-none focus-visible:ring-0">
                    {hasPriceFilter
                      ? formatTourPrice(priceRange[0]) + " to " + formatTourPrice(priceRange[1])
                      : "Price"}{" "}
                    <ChevronDown className="size-4 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-72 p-4">
                    <div className="mb-4 flex items-center justify-between text-xs font-medium text-gray-600">
                      <span>{formatTourPrice(priceRange[0])}</span>
                      <span>{formatTourPrice(priceRange[1])}</span>
                    </div>
                    <Slider
                      min={0}
                      max={priceSliderMax}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 outline-none hover:border-gray-300 focus-visible:outline-none focus-visible:ring-0">
                    Number of days <ChevronDown className="size-4 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-64 p-4">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Trip length
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="text-xs text-gray-500">
                        Min days
                        <Input
                          type="number"
                          min="1"
                          value={minDays}
                          onChange={(event) => setMinDays(event.target.value)}
                          placeholder="Any"
                          className="mt-1 h-9"
                        />
                      </label>
                      <label className="text-xs text-gray-500">
                        Max days
                        <Input
                          type="number"
                          min="1"
                          value={maxDays}
                          onChange={(event) => setMaxDays(event.target.value)}
                          placeholder="Any"
                          className="mt-1 h-9"
                        />
                      </label>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 outline-none hover:border-gray-300 focus-visible:outline-none focus-visible:ring-0">
                    {category || "Safari style"}{" "}
                    <ChevronDown className="size-4 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="max-h-64">
                    <DropdownMenuItem onClick={() => setCategory("")}>
                      All safari styles
                    </DropdownMenuItem>
                    {categories.map((item, idx) => (
                      <DropdownMenuItem key={`${item}-${idx}`} onClick={() => setCategory(item)}>
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="inline-flex h-9 items-center gap-2 rounded-md border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 outline-none hover:border-gray-300 focus-visible:outline-none focus-visible:ring-0">
                    {difficulty || "Difficulty"}{" "}
                    <ChevronDown className="size-4 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="max-h-64">
                    <DropdownMenuItem onClick={() => setDifficulty("")}>
                      All difficulty levels
                    </DropdownMenuItem>
                    {difficulties.map((item, idx) => (
                      <DropdownMenuItem key={`${item}-${idx}`} onClick={() => setDifficulty(item)}>
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {(hasPriceFilter || minDays || maxDays || category || difficulty) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setPriceRange([0, priceSliderMax]);
                      setMinDays("");
                      setMaxDays("");
                      setCategory("");
                      setDifficulty("");
                    }}
                    className="text-gray-500 hover:text-[#0B3D1F]"
                  >
                    Clear filters
                  </Button>
                )}
              </div>

              {/* Scrollable Results Area */}
              <div className="max-h-[50vh] overflow-y-auto px-6 py-4">
                
                {filteredTours.length === 0 && filteredDestinations.length === 0 && (
                  <div className="py-10 text-center text-gray-500 font-[family-name:var(--font-primary)]">
                    {normalizedQuery
                      ? "No results found for " + query + ". Try a different keyword."
                      : "No safaris match the selected filters."}
                  </div>
                )}

                {/* SAFARIS SECTION */}
                {filteredTours.length > 0 && (
                  <div className="mb-8">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 font-[family-name:var(--font-primary)]">
                      Safaris & Tours
                    </h3>
                    <div className="flex flex-col gap-2">
                      {filteredTours.map((tour) => (
                        <button
                          key={tour.id}
                          onClick={() => handleNavigate(`/tours/${tour.slug}`)}
                          className="group flex w-full items-center gap-4 rounded-lg p-2 text-left transition-colors hover:bg-gray-50"
                        >
                          <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-md bg-gray-200">
                            {tour.featured_image && (
                              <Image
                                src={tour.featured_image}
                                alt={tour.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            )}
                          </div>
                          <div>
                            <h4 className="text-[15px] font-bold uppercase tracking-wide text-[#1A402A] group-hover:text-[#F67A05] font-[family-name:var(--font-primary)]">
                              {tour.name}
                            </h4>
                            <p className="mt-1 text-xs text-gray-500 font-[family-name:var(--font-primary)]">
                              {tour.duration_days} Days / {tour.duration_nights} Nights · {tour.category}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* DESTINATIONS SECTION */}
                {filteredDestinations.length > 0 && (
                  <div className="mb-8">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 font-[family-name:var(--font-primary)]">
                      Destinations
                    </h3>
                    <div className="flex flex-col gap-2">
                      {filteredDestinations.map((dest) => (
                        <button
                          key={dest.id}
                          onClick={() => handleNavigate(`/destinations/${dest.slug}`)}
                          className="group flex w-full items-center gap-4 rounded-lg p-2 text-left transition-colors hover:bg-gray-50"
                        >
                          <div className="relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-md bg-gray-200">
                            {dest.image_url && (
                              <Image
                                src={dest.image_url}
                                alt={dest.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            )}
                          </div>
                          <div>
                            <h4 className="text-[15px] font-bold uppercase tracking-wide text-[#1A402A] group-hover:text-[#F67A05] font-[family-name:var(--font-primary)]">
                              {dest.name}
                            </h4>
                            <p className="mt-1 text-xs text-gray-500 font-[family-name:var(--font-primary)]">
                              {dest.region}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}