import axios from "axios";
async function DetailPage({ params }) {
  const responseCategory = await axios.get(
    `${process.env.API_URL}/api/dashboard/categories/${params.PK_category}`
  );
  const category = responseCategory.data;

  const createdAt = new Date(category.createdAt).toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="grid  gap-4 ">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Categorias
        </h1>
      </div>
      {/* Sección de información del administrador */}
      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Información de la categoria
        </h1>
        <div className="flex flex-col  gap-4">
          <h2 className="text-xl text-black dark:text-white font-medium">
            Categoria: {category.name} 
          </h2>
          <p className="text text-zinc-500 dark:text-zinc-400">
           SLUG: {category.urlCategory}
          </p>
          <p className="text text-zinc-500 dark:text-zinc-500">
            {category.description}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500">
            Creado el {createdAt}
          </p>
        </div>
      </section>
    </section>
  );
}

export default DetailPage;
