export default function Footer() {
  return (
    <footer className="border-t border-gray-800 py-10 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} MemoryGrid. Built with Next.js.
    </footer>
  );
}