"use client";

import "@tailwindcss/forms";
import { useState } from "react";

export default function Admin() {
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);

  const handleSubmit = async (event) => {
    setError(undefined);
    setSuccess(undefined);

    event.preventDefault();

    let sections = [];

    try {
      sections = JSON.parse(event.target.sections.value);
    } catch (e) {
      const error = new Error("An error occurred while parsing sections");
      error.info = "unable to parse sections";
      setError(error);
      return;
    }

    const data = {
      word: event.target.word.value,
      sections: sections,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const res = await fetch("/api/word", options);

    if (!res.ok) {
      const error = new Error("An error occurred while saving word.");

      error.info = await res.json();
      error.status = res.status;
      setError(error);

      return;
    }

    const out = await res.json();

    setSuccess(out);
  };

  return (
    <div className="h-screen container mx-auto flex flex-row items-center justify-center text-center">
      <div className="basis-full">
        {error ? (
          <div className="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-red-500 rounded-lg opacity-100 font-regular">
            {error.info.details ? error.info.details : error.info}
          </div>
        ) : null}
        {success ? (
          <div className="relative block w-full p-4 mb-4 text-base leading-5 text-white bg-green-500 rounded-lg opacity-100 font-regular">
            {`Word successfully created - ${success.id}`}
          </div>
        ) : null}
        <div className="text-3xl">Add New Word</div>
        <div className="md:w-96 md:max-w-full w-full mx-auto">
          <div className="sm:rounded-md p-6 border border-gray-300">
            <form method="POST" onSubmit={handleSubmit}>
              <label className="block mb-6">
                <span className="text-gray-700">Word</span>
                <input
                  style={{ color: "black" }}
                  type="text"
                  name="word"
                  id="word"
                  className=" focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                  placeholder="word"
                />
              </label>

              <label className="block mb-6">
                <span className="text-gray-700">Sections</span>

                <textarea
                  name="sections"
                  id="sections"
                  style={{ color: "black" }}
                  className=" focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 block w-full mt-1 border-gray-300 rounded-md shadow-sm"
                  rows={20}
                  placeholder="Add your sections here"
                ></textarea>
              </label>

              <div className="mb-2">
                <button
                  type="submit"
                  className=" focus:shadow-outline hover:bg-indigo-800 h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
