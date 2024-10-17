import axios from "axios";

async function TransactionsPage() {
  const response = await axios.get(`${process.env.API_URL}/api/dashboard/income`);
  const incomes = response.data;

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-zinc-200 font-medium">Ingresos</h1>
      </div>

      {/* Sección de totales */}
      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Todo los ingresos
        </h1>

        <section className="overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-zinc-400 bg-white dark:bg-zinc-950 rounded-md">
            <thead className="text-xs uppercase bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-white">ID</th>
                <th className="px-6 py-3 text-white">Fecha</th>
                <th className="px-6 py-3 text-white">Descripcion</th>
                <th className="px-6 py-3 text-white">Total</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income) => (
                <tr key={income.PK_income} className="">
                  <td className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                    {income.PK_income}
                  </td>
                  <td className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                    {new Date(income.date).toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                    {income.description}
                  </td>
                  <td className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                    {income.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </section>
    </section>
  );
}

export default TransactionsPage;
