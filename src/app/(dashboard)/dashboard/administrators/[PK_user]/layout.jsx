import Link from "next/link";
function Layout({ children,params }) {
  return (
    <section className="grid md:grid-cols-4 gap-4 ">
      <div className="py-4 p-2 md:col-span-4">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Administradores
        </h1>
      </div>

      <section className="md:col-span-3">{children}</section>
      <div>
        <nav className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
          <h1 className="text-black text-center dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
            Sub menu
          </h1>

          <ul>
            <li>
              <Link href={`/dashboard/administrators/${params.PK_user}/assists`}>Asistencia</Link>
            </li>
            <li>
              <Link href={""}>Salarios</Link>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}

export default Layout;
