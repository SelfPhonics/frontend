"use client";

import useSWR from "swr";
import Word from "@/components/Word";
import { useState } from "react";

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

export default function GetWord() {
  const [word, setWord] = useState(undefined);

  const opts = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  };
  const { data, error, isLoading } = useSWR("/api/words", fetcher, opts);

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

  const handleClick = async (word) => {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(`/api/word/${word}`, options);
    const data = await res.json();
    setWord(data);
  };

  return (
    <div className="h-screen container mx-auto flex flex-row items-center justify-center text-center">
      <div className="basis-full">
        {word ? (
          <Word data={word} />
        ) : (
          data.map((word, key) => {
            return (
              <p
                key={key}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(word.word)}
                className="text-3xl"
              >
                {word.word}
              </p>
            );
          })
        )}
      </div>
    </div>
  );
}
