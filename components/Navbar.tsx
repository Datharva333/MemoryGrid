"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { name: "Timeline", href: "/timeline" },
  { name: "Simulator", href: "/simulators" },
  { name: "Playground", href: "/playground" },
  { name: "Benchmarks", href: "/benchmarks" },
  { name: "Library", href: "/open-library" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-800/80 bg-[#0A0F16]/88 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-6">
        <Link href="/" onClick={() => setOpen(false)} className="shrink-0 text-xl font-bold tracking-tight">
          Memory<span className="text-blue-400">Grid</span>
        </Link>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-blue-400/10 text-blue-300"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 text-slate-300 md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          <span className="text-lg leading-none">{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-800 bg-[#0A0F16] px-6 py-3 md:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-3 text-sm transition ${
                    active ? "bg-blue-400/10 text-blue-300" : "bg-slate-900 text-slate-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
