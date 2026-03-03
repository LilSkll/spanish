import { Suspense } from "react";
import SearchClient from "@/app/search/SearchClient";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchClient />
    </Suspense>
  );
}
