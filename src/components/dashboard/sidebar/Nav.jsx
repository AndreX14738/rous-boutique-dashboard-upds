"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Nav({ links }) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex gap-4 border-b dark:border-zinc-800 text-zinc-400">
        {links.map((link) => {
          // Verifica si la ruta coincide exactamente con el path o es una subruta
          const isActive = pathname === link.path;

          return (
            <li
              key={link.path}
              className={`pb-2 ${
                isActive ? "border-b-2 border-white text-white" : ""
              }`}
            >
              <Link
                className="hover:bg-zinc-950 rounded-md px-2 py-1 hover:text-white"
                href={link.path}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Nav;
