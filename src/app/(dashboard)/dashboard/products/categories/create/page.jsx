"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import ButtonSubmit from "@/components/dashboard/common/ButtonSubmit";
import AlertDanger from "@/components/dashboard/common/AlertDanger";
import AlertSuccess from "@/components/dashboard/common/AlertSuccess";

function CreateCategory() {
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
      const result = await axios.post("/api/dashboard/categories", data);
      setSuccessMessage("Categoría creada exitosamente");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Error al crear la categoría");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-4 pb-8">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Categorías
        </h1>
      </div>

      <section className="p-4 border  grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Crear una nueva categoría
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
          {/* Nombre de la Categoría */}
          <label className="flex flex-col gap-1">
            Nombre de la Categoría *
            <input
              type="text"
              className="input-dark"
              {...register("name", {
                required: {
                  value: true,
                  message: "El campo nombre es obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "El nombre no puede exceder los 50 caracteres",
                },
              })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>

          {/* URL de la Categoría */}
          <label className="flex flex-col gap-1">
            URL de la Categoría *
            <input
              type="text"
              className="input-dark"
              {...register("urlCategory", {
                required: {
                  value: true,
                  message: "El campo URL es obligatorio",
                },
                maxLength: {
                  value: 20,
                  message: "La URL no puede exceder los 20 caracteres",
                },
              })}
            />
            {errors.urlCategory && (
              <span className="text-sm text-red-500">
                {errors.urlCategory.message}
              </span>
            )}
          </label>

          {/* Descripción */}
          <label className="flex flex-col gap-1">
            Descripción
            <textarea
              className="input-dark"
              {...register("description", {
                maxLength: {
                  value: 255,
                  message: "La descripción no puede exceder los 255 caracteres",
                },
              })}
            />
            {errors.description && (
              <span className="text-sm text-red-500">
                {errors.description.message}
              </span>
            )}
          </label>

          <section className="flex col-span-4 flex-col md:flex-row mt-4 items-center justify-between border-t border-zinc-800 pt-4 gap-4">
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

export default CreateCategory;
