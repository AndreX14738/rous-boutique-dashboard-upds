import Link from "next/link";
function Layout({ children }) {
  return (
    <section className="grid gap-4 ">
      <header className="">
        <nav>
          <ul className="flex gap-4 border-b dark:border-zinc-800 text-zinc-400">
            <li className="pb-2 border-b-2 border-white">
              <Link className="hover:bg-zinc-950 rounded-md px-2 py-1 text-white hover:text-white " href="/dashboard/administrators">
                Administradores
              </Link>
            </li>
            <li className="pb-2">
              <Link className="hover:bg-zinc-950 rounded-md px-2 py-1 hover:text-white " href="/dashboard/administrators/roles">
                Roles
              </Link>
            </li>
            <li className="pb-2">
              <Link className="hover:bg-zinc-950 rounded-md px-2 py-1 hover:text-white " href="/dashboard/administrators">
                Administradores
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </section>
  );
}

export default Layout;
