"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import ButtonSubmit from "@/components/dashboard/common/ButtonSubmit";
import AlertDanger from "@/components/dashboard/common/AlertDanger";
import AlertSuccess from "@/components/dashboard/common/AlertSuccess";

function CreateExpense() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(data) {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await axios.post("/api/dashboard/expenses", data);
      setSuccessMessage("Egreso creado exitosamente");
      console.log("Egreso creado:", result.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Error al crear el egreso");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Egresos
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Crear un nuevo egreso
        </h1>

        {/* Alertas en la esquina inferior derecha */}
        <div className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-50">
          {successMessage && (
            <AlertSuccess
              successMessage={successMessage}
              onClose={() => setSuccessMessage("")}
            />
          )}
          {errorMessage && (
            <AlertDanger
              errorMessage={errorMessage}
              onClose={() => setErrorMessage("")}
            />
          )}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-2 dark:text-zinc-400 text-zinc-500"
        >
          {/* Fecha */}
          <label className="flex flex-col gap-1">
            Fecha
            <input
              type="date"
              className="input-dark"
              {...register("date", {
                required: {
                  value: true,
                  message: "El campo fecha es obligatorio",
                },
              })}
            />
            {errors.date && (
              <span className="text-sm text-red-500">
                {errors.date.message}
              </span>
            )}
          </label>

          {/* Descripción */}
          <label className="flex flex-col gap-1">
            Descripción
            <input
              type="text"
              className="input-dark"
              {...register("description", {
                required: {
                  value: true,
                  message: "El campo descripción es obligatorio",
                },
              })}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </label>

          {/* Total */}
          <label className="flex flex-col gap-1">
            Total (Bs)
            <input
              type="number"
              step="0.01"
              className="input-dark"
              {...register("total", {
                required: {
                  value: true,
                  message: "El campo total es obligatorio",
                },
                min: {
                  value: 0,
                  message: "El total no puede ser negativo",
                },
              })}
            />
            {errors.total && (
              <span className="text-sm text-red-500">
                {errors.total.message}
              </span>
            )}
          </label>

          <section className="md:col-span-3 flex flex-col md:flex-row mt-4 items-center justify-between border-t border-zinc-800 pt-4 gap-4">
            <p className="dark:text-zinc-400 text-zinc-500">
              Revisa la información antes de continuar.
            </p>
            <ButtonSubmit isLoading={isLoading} />
          </section>
        </form>
      </section>
    </section>
  );
}

export default CreateExpense;
