import Nav from "@/components/dashboard/sidebar/Nav";
function Layout({ children }) {
  const links = [
    { name: "Ventas", path: "/dashboard/sales" },
    { name: "Estados de venta", path: "/dashboard/sales/salesstatuses" },
  ];

  return (
    <section className="grid gap-4 ">
      <header className="">
        <Nav links={links} />
      </header>
      {children}
    </section>
  );
}

export default Layout;
