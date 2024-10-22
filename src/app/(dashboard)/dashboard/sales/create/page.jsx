"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonSubmit from "@/components/dashboard/common/ButtonSubmit";
import AlertDanger from "@/components/dashboard/common/AlertDanger";
import AlertSuccess from "@/components/dashboard/common/AlertSuccess";

function CreateSale() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [salesStatuses, setSalesStatuses] = useState("");

  useEffect(() => {
    async function getSalesStatuses() {
      const salesstatuses = await axios.get("/api/dashboard/salesstatuses");
      setSalesStatuses(salesstatuses.data);
    }

    getSalesStatuses();
  }, []);

  async function onSubmit(data) {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await axios.post("/api/dashboard/sales", data);
      setSuccessMessage("Venta creado exitosamente");

    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Error al crear el rol");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Venta
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Registrar nueva venta
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
          className="grid grid-cols-1 md:grid-cols-3 gap-2 dark:text-zinc-400 text-zinc-500"
        >
          <details className="border-b pb-4 dark:border-zinc-800  md:col-span-3">
            <summary className="cursor-pointer flex items-center justify-between">
              <div>
                <h1 className="text-white font-medium text-lg">
                  Datos del cliente
                </h1>
                <p className="text-sm">Informacion personal del cliente</p>
              </div>
              <svg
                className={`w-5 h-5 transform transition-transform duration-200 active:rotate-180`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              {/* Nombre */}
              <label className="flex flex-col gap-1">
                Nombre
                <input
                  type="text"
                  className="input-dark"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "Nombre requerido",
                    },
                  })}
                />
                {errors.firstName && (
                  <span className="text-sm text-red-500">
                    {errors.firstName.message}
                  </span>
                )}
              </label>

              {/* Apellido */}
              <label className="flex flex-col gap-1">
                Apellido
                <input
                  type="text"
                  className="input-dark"
                  {...register("lastName", {
                    required: {
                      value: true,
                      message: "Apellido requerido",
                    },
                  })}
                />
                {errors.lastName && (
                  <span className="text-sm text-red-500">
                    {errors.lastName.message}
                  </span>
                )}
              </label>

              {/* CI */}
              <label className="flex flex-col gap-1">
                CI
                <input
                  type="text"
                  className="input-dark"
                  {...register("CI", {
                    required: {
                      value: true,
                      message: "CI requerido",
                    },
                  })}
                />
                {errors.CI && (
                  <span className="text-sm text-red-500">
                    {errors.CI.message}
                  </span>
                )}
              </label>

              {/* Correo electrónico */}
              <label className="flex flex-col gap-1">
                Correo Electrónico
                <input
                  type="email"
                  className="input-dark"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Correo electrónico requerido",
                    },
                  })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
          </details>

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

export default CreateSale;
