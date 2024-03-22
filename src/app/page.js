import Link from "next/link";

export default async function Home() {
  return (
    <div className="h-screen container mx-auto flex flex-row items-center justify-center text-center">
      <div className="basis-full">
        <div className={`grid grid-cols-3`}>
          <Link href="/random" className="w-11/12">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            >
              Random Word
            </button>
          </Link>
          <Link href="/word" className="w-11/12">
            <button
              type="button"
              className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            >
              Get Word
            </button>
          </Link>
          <Link href="/admin" className="w-11/12">
            <button
              type="button"
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
            >
              Admin
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
