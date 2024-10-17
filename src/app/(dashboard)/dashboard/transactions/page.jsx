'use client';
import axios from "axios";
import { useState, useEffect } from "react";

function TransactionsPage() {
  const [incomeByMonth, setIncomeByMonth] = useState({}); // Ingresos agrupados por mes
  const [expensesByMonth, setExpensesByMonth] = useState({}); // Egresos agrupados por mes
  const [incomeTotal, setIncomeTotal] = useState(0); // Total de ingresos
  const [expensesTotal, setExpensesTotal] = useState(0); // Total de egresos

  useEffect(() => {
    async function getTransactions() {
      const { data: incomeData } = await axios.get("/api/dashboard/income");
      const { data: expensesData } = await axios.get("/api/dashboard/expenses");

      // Función para sumar los ingresos o egresos por el mes y año en el que se registró la transacción
      const sumByMonthYear = (transactions) => {
        const monthlyTotals = {};

        transactions.forEach((transaction) => {
          const transactionDate = new Date(transaction.date);
          const monthKey = transactionDate.toLocaleString("es-ES", {
            month: "long",
            year: "numeric",
          });
          const total = parseFloat(transaction.total);

          if (monthlyTotals[monthKey]) {
            monthlyTotals[monthKey] += total;
          } else {
            monthlyTotals[monthKey] = total;
          }
        });

        return monthlyTotals;
      };

      const incomeGrouped = sumByMonthYear(incomeData);
      const expensesGrouped = sumByMonthYear(expensesData);

      // Calcular el total de ingresos y egresos sumando todos los meses
      const calculateTotal = (groupedData) => {
        return Object.values(groupedData).reduce((total, value) => total + value, 0);
      };

      setIncomeByMonth(incomeGrouped);
      setExpensesByMonth(expensesGrouped);
      setIncomeTotal(calculateTotal(incomeGrouped));
      setExpensesTotal(calculateTotal(expensesGrouped));
    }

    getTransactions();
  }, []);

  // Obtener todos los meses únicos de ingresos y egresos
  const allMonths = new Set([...Object.keys(incomeByMonth), ...Object.keys(expensesByMonth)]);

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-zinc-200 font-medium">
          Transacciones
        </h1>
      </div>

      {/* Sección de totales */}
      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Ingresos y Egresos Totales
        </h1>

        <section className="overflow-x-auto rounded-md">
          <table className="w-full text-sm text-left text-zinc-400 bg-white dark:bg-zinc-950 rounded-md">
            <thead className="text-xs uppercase bg-zinc-900">
              <tr>
                <th className="px-6 py-3 text-white">Ingresos (Bs)</th>
                <th className="px-6 py-3 text-white">Egresos (Bs)</th>
                <th className="px-6 py-3 text-white">Balance (Bs)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                  Bs {incomeTotal.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                  Bs {expensesTotal.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                  Bs {(incomeTotal - expensesTotal).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>

      {/* Sección por mes */}
      {[...allMonths].map((month) => (
        <section key={month} className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
          <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
            Ingresos y Egresos Mes: {month}
          </h1>

          <section className="overflow-x-auto rounded-md">
            <table className="w-full text-sm text-left text-zinc-400 bg-white dark:bg-zinc-950 rounded-md">
              <thead className="text-xs uppercase bg-zinc-900">
                <tr>
                  <th className="px-6 py-3 text-white">Ingresos (Bs)</th>
                  <th className="px-6 py-3 text-white">Egresos (Bs)</th>
                  <th className="px-6 py-3 text-white">Balance (Bs)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                    Bs {incomeByMonth[month]?.toFixed(2) || 0}
                  </td>
                  <td className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                    Bs {expensesByMonth[month]?.toFixed(2) || 0}
                  </td>
                  <td className="px-6 py-4 text-zinc-800 dark:text-zinc-400">
                    Bs {(incomeByMonth[month] - expensesByMonth[month] || 0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      ))}
    </section>
  );
}

export default TransactionsPage;
