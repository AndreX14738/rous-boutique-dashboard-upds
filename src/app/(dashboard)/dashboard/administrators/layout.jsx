import Nav from "@/components/dashboard/sidebar/Nav";

function Layout({ children }) {
  const links = [
    { name: "Administradores", path: "/dashboard/administrators" },
    { name: "Roles", path: "/dashboard/administrators/roles" },
  ];
  return (
    <section className="grid gap-4 ">
      <header className="">
        <Nav links={links} />
      </header>
      {children}
      <footer className="py-4">

      </footer>
    </section>
  );
}

export default Layout;
