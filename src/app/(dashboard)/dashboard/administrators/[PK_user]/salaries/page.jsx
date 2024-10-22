import axios from "axios";
async function DetailPage({ params }) {
  const response = await axios.get(
    `${process.env.API_URL}/api/dashboard/roles/${params.PK_role}`
  );
  const role = response.data;
    // Formatear la fecha utilizando métodos nativos de JavaScript
    const createdAt = new Date(role.createdAt);
    const formattedDate = createdAt.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Roles
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Informacion del rol
        </h1>

        <div key={role.PK_role}>
          <h1>Rol: {role.role}</h1>
          <h1>Creado: {formattedDate}</h1>
        </div>
      </section>
    </section>
  );
}

export default DetailPage;
