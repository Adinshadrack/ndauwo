// app/tours/page.tsx

import { getTours } from "@/lib/api/tours";
import { ToursPage } from "@/components/tours/tours-page";

export default async function Page() {
  const tours = await getTours();

  return <ToursPage tours={tours} />;
}