import Link from "next/link";

const links = [
  { name: "Timeline", href: "/timeline" },
  { name: "Simulator", href: "/simulators" },
  { name: "Playground", href: "/playground" },
  { name: "Benchmarks", href: "/benchmarks" },
  { name: "Library", href: "/open-library" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-800 bg-[#0D1117]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Memory<span className="text-blue-400">Grid</span>
        </Link>

        <div className="hidden gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-gray-400 transition hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
