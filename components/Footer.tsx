import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 px-6 py-8 text-sm text-gray-500">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} MemoryGrid</p>
        <div className="flex gap-5">
          <Link href="/references" className="hover:text-gray-300">References</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
        </div>
      </div>
    </footer>
  );
}
