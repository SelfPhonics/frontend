"use client";

import useSWR from "swr";
import Word from "@/components/Word";

async function fetcher(...args) {
  const res = await fetch(...args);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}

export default function Random() {
  const opts = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };
  const { data, error, isLoading } = useSWR("/api/word/random", fetcher, opts);

  if (error || isLoading) {
    return (
      <div className="h-screen container mx-auto flex flex-row items-center justify-center text-center">
        <div className="basis-full">
          <div>
            {error
              ? `Error loading word: ${error.info?.details}`
              : "Loading..."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen container mx-auto flex flex-row items-center justify-center text-center">
      <div className="basis-full">
        <Word data={data} />
      </div>
    </div>
  );
}
