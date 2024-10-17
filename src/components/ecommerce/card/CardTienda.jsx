"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";

function CardTienda() {
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [search, setSearch] = useState(""); // Estado para la búsqueda

  useEffect(() => {
    async function fetchData() {
      const sizesResponse = await axios.get(`/api/ecommerce/sizes`);
      setSizes(sizesResponse.data);

      const categoriesResponse = await axios.get(`/api/ecommerce/categories`);
      setCategories(categoriesResponse.data);

      const subcategoriesResponse = await axios.get(
        `/api/ecommerce/subcategories`
      );
      setSubcategories(subcategoriesResponse.data);

      const productsResponse = await axios.get(`/api/ecommerce/products`);
      setProducts(productsResponse.data);
      setFilteredProducts(productsResponse.data); // Inicialmente mostrar todos los productos
    }

    fetchData();
  }, []);

  // Filtrar subcategorías basadas en la categoría seleccionada
  useEffect(() => {
    if (selectedCategory) {
      const filteredSubcategories = subcategories.filter(
        (sub) => sub.FK_category === selectedCategory
      );
      setFilteredSubcategories(filteredSubcategories);
    } else {
      setFilteredSubcategories(subcategories); // Mostrar todas las subcategorías si no hay categoría seleccionada
    }
  }, [selectedCategory, subcategories]);

  // Filtrar productos cuando cambian los filtros o la búsqueda
  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedSubcategory) {
      filtered = filtered.filter(
        (product) => product.subcategory === selectedSubcategory
      );
    }

    if (selectedSize) {
      filtered = filtered.filter((product) => product.size === selectedSize);
    }

    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.SKU.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSubcategory, selectedSize, search, products]);

  // Manejo del cambio en el input de búsqueda
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
      {/* Formulario de filtros */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Barra de búsqueda y filtro */}

        <label className="flex flex-col gap-1">
          Buscar
          <div className="relative">
            <input
              type="search"
              placeholder="Buscar..."
              value={search}
              onChange={handleSearch}
              className="w-full p-2 rounded-md border dark:border-zinc-800 dark:bg-zinc-950 dark:text-white pl-10 focus:ring-2 focus:ring-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </label>

        <label className="flex flex-col gap-1">
          Categoría
          <select
            id="category"
            className="input-dark"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.PK_category} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          Subcategoría
          <select
            id="subcategory"
            className="input-dark"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="">Todas las subcategorías</option>
            {filteredSubcategories.map((subcategory) => (
              <option key={subcategory.PK_subcategory} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          Tamaño
          <select
            id="size"
            className="input-dark"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Todos los tamaños</option>
            {sizes.map((size) => (
              <option key={size.PK_size} value={size.name}>
                {size.name}
              </option>
            ))}
          </select>
        </label>
      </section>

      {/* Listado de productos filtrados */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Link
            href={`/tienda/${product.urlProduct}`}
            key={product.PK_product}
            className="rounded-md shadow-sm text-black dark:text-white bg-zinc-100 dark:bg-zinc-950"
          >
            <img
              className="rounded-t-md"
              src="https://i.pinimg.com/control/474x/90/c1/89/90c189a9b3e68de3cbca949ac6a819cc.jpg" // Utiliza la primera imagen del producto
              alt={product.name}
            />

            <div className="p-4">
              <h2 className="text-xl font-bold text-black dark:text-white">
                {product.name}
              </h2>
              <p className=" text-sm">
                {" "}
                <span className="text-zinc-500 dark:text-zinc-500">SKU: </span>
                {product.SKU}
              </p>
              {/* <p className="mt-2 text-sm">{product.description}</p> */}

              <div className="">
                <p>
                  <span className="text-zinc-500 dark:text-zinc-500">
                    Categoria:{" "}
                  </span>{" "}
                  {product.category}
                </p>
                <p>
                  <span className="text-zinc-500 dark:text-zinc-500">
                    {" "}
                    Subcategoria:{" "}
                  </span>
                  {product.subcategory}
                </p>

                <span className="text-sm">
                  <span className="text-zinc-500 dark:text-zinc-500">
                    Talla:{" "}
                  </span>{" "}
                  {product.size}
                </span>
              </div>

              <h2 className="mt-4 text-xl font-medium text-green-400">
                {product.offerPrice || product.regularPrice} Bs
              </h2>
            </div>
          </Link>
        ))}
      </section>
    </section>
  );
}

export default CardTienda;
