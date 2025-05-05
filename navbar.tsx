import Link from "next/link";
import { ModeToggle } from "../mode-toggle";

export function Navbar() {
  return (
    <nav className="w-full max-w-5xl space-y-8 flex justify-between items-end border-b-2 pb-4 border-gray-600">
      <Link href={"/"} className="text-4xl md:text-5xl font-bold">
        Gastro
      </Link>

      <ModeToggle />
    </nav>
  );
}
