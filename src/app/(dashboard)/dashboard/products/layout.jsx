import Nav from "@/components/dashboard/sidebar/Nav";
function Layout({ children }) {
  const links = [
    { name: "Productos", path: "/dashboard/products" },
    { name: "Categorias", path: "/dashboard/products/categories" },
    { name: "Subcategorias", path: "/dashboard/products/subcategories" },
    { name: "Tallas", path: "/dashboard/products/sizes" },
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
