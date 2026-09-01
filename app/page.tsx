import Link from "next/link";
import Hero from "@/components/Hero";

const sections = [
  {
    title: "Memory Timeline",
    text: "A short visual history from early electronic memory to DDR5 and HBM.",
    href: "/timeline",
  },
  {
    title: "Allocation Simulator",
    text: "Allocate and free blocks using First Fit, Best Fit, and Worst Fit.",
    href: "/simulators",
  },
  {
    title: "Playground",
    text: "Run your own ALLOC and FREE command sequence against the allocator.",
    href: "/playground",
  },
  {
    title: "Open Library",
    text: "A small collection of useful open books, documentation, and references.",
    href: "/open-library",
  },
];

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="border-t border-gray-800 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2">
            {sections.map((section) => (
              <Link
                key={section.title}
                href={section.href}
                className="rounded-2xl border border-gray-800 bg-[#11161D] p-7 transition hover:-translate-y-0.5 hover:border-gray-600"
              >
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                <p className="mt-3 leading-7 text-gray-400">{section.text}</p>
                <p className="mt-6 text-sm text-blue-400">Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
