import axios from "axios";

async function CardProduct() {
  const response = await axios.get(
    `${process.env.API_URL}/api/ecommerce/products/new`
  ); // Cambia la URL según tu configuración
  const products = response.data;

  return (
    <section className="grid md:grid-cols-4 gap-4">
      {products.map((product) => (
        <div
          key={product.PK_product}
          className="rounded-md shadow-sm bg-zinc-100  dark:bg-zinc-950"
        >
          <img
            className="rounded-t-md"
            src="https://i.pinimg.com/564x/88/ed/13/88ed13f5f8b9d481542de3a3781c9813.jpg" // Utiliza la primera imagen del producto
            alt={product.name}
          />
          <div className="bg-zinc-100 rounded-b-md flex flex-col items-center justify-center p-4 gap-4 dark:bg-zinc-950">
            <span className="text-sm text-black dark:text-white">
              {product.SKU}
            </span>
            <h2 className="text-black dark:text-white text-2xl">
              {product.name}
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-center">
              {product.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}

export default CardProduct;
