import Nav from "@/components/dashboard/sidebar/Nav";
function Layout({ children }) {
  const links = [
    { name: "Transacciones", path: "/dashboard/transactions" },
    { name: "Ingresos", path: "/dashboard/transactions/income" },
    { name: "Egresos", path: "/dashboard/transactions/expenses" },
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
