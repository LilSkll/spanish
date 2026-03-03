import { Suspense } from "react";
import ReaderClient from "@/app/reader/ReaderClient";

export default function ReaderPage() {
  return (
    <Suspense>
      <ReaderClient />
    </Suspense>
  );
}
