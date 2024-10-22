"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonSubmit from "@/components/dashboard/common/ButtonSubmit";
import AlertDanger from "@/components/dashboard/common/AlertDanger";
import AlertSuccess from "@/components/dashboard/common/AlertSuccess";

function CreateProduct() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [sizes, setSizes] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    async function getSizes() {
      const sizesResponse = await axios.get("/api/dashboard/sizes");
      setSizes(sizesResponse.data);
    }
    async function getSubcategories() {
      const subcategoriesResponse = await axios.get(
        "/api/dashboard/subcategories"
      );
      setSubcategories(subcategoriesResponse.data);
    }
    getSizes();
    getSubcategories();
  }, []);

  async function onSubmit(data) {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const result = await axios.post("/api/dashboard/products", data);
      setSuccessMessage("Producto creado exitosamente");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Error al crear el producto");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="grid gap-4 pb-8">
      <div className="py-4 p-2">
        <h1 className="text-2xl text-black dark:text-white font-medium">
          Productos
        </h1>
      </div>

      <section className="p-4 border grid gap-4 dark:border-zinc-800 rounded-md">
        <h1 className="text-black dark:text-white font-normal text-lg pb-4 border-b dark:border-zinc-800">
          Crear nuevo producto
        </h1>

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
          {/* Nombre del Producto */}
          <label className="flex flex-col gap-1">
            Nombre del Producto *
            <input
              type="text"
              className="input-dark"
              {...register("name", {
                required: {
                  value: true,
                  message: "El campo nombre es obligatorio",
                },
                maxLength: {
                  value: 80,
                  message: "El nombre no puede exceder los 80 caracteres",
                },
              })}
            />
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>

          {/* SKU */}
          <label className="flex flex-col gap-1">
            SKU *
            <input
              type="text"
              className="input-dark"
              {...register("SKU", {
                required: {
                  value: true,
                  message: "El campo SKU es obligatorio",
                },
                maxLength: {
                  value: 50,
                  message: "El SKU no puede exceder los 50 caracteres",
                },
              })}
            />
            {errors.SKU && (
              <span className="text-sm text-red-500">{errors.SKU.message}</span>
            )}
          </label>

          {/* URL del Producto */}
          <label className="flex flex-col gap-1">
            URL del Producto *
            <input
              type="text"
              className="input-dark"
              {...register("urlProduct", {
                required: {
                  value: true,
                  message: "El campo URL es obligatorio",
                },
                maxLength: {
                  value: 80,
                  message: "La URL no puede exceder los 80 caracteres",
                },
              })}
            />
            {errors.urlProduct && (
              <span className="text-sm text-red-500">
                {errors.urlProduct.message}
              </span>
            )}
          </label>

          {/* Precio Regular */}
          <label className="flex flex-col gap-1">
            Precio Regular *
            <input
              type="number"
              step="0.01"
              className="input-dark"
              {...register("regularPrice", {
                required: {
                  value: true,
                  message: "El campo precio regular es obligatorio",
                },
              })}
            />
            {errors.regularPrice && (
              <span className="text-sm text-red-500">
                {errors.regularPrice.message}
              </span>
            )}
          </label>

          {/* Precio en Oferta */}
          <label className="flex flex-col gap-1">
            Precio en Oferta
            <input
              type="number"
              step="0.01"
              className="input-dark"
              {...register("offerPrice")}
            />
          </label>

          {/* Stock */}
          <label className="flex flex-col gap-1">
            Stock *
            <input
              type="number"
              className="input-dark"
              {...register("stock", {
                required: {
                  value: true,
                  message: "El campo stock es obligatorio",
                },
              })}
            />
            {errors.stock && (
              <span className="text-sm text-red-500">
                {errors.stock.message}
              </span>
            )}
          </label>

          {/* Tamaño */}
          <label className="flex flex-col gap-1">
            Tamaño *
            <select
              className="input-dark"
              {...register("FK_size", {
                required: {
                  value: true,
                  message: "El campo tamaño es obligatorio",
                },
              })}
            >
              <option value="">Selecciona un tamaño</option>
              {sizes.map((size) => (
                <option key={size.PK_size} value={size.PK_size}>
                  {size.name}
                </option>
              ))}
            </select>
            {errors.FK_size && (
              <span className="text-sm text-red-500">
                {errors.FK_size.message}
              </span>
            )}
          </label>

          {/* Subcategoría */}
          <label className="flex flex-col gap-1">
            Subcategoría *
            <select
              className="input-dark"
              {...register("FK_subcategory", {
                required: {
                  value: true,
                  message: "El campo subcategoría es obligatorio",
                },
              })}
            >
              <option value="">Selecciona una subcategoría</option>
              {subcategories.map((subcategory) => (
                <option
                  key={subcategory.PK_subcategory}
                  value={subcategory.PK_subcategory}
                >
                  {subcategory.name}
                </option>
              ))}
            </select>
            {errors.FK_subcategory && (
              <span className="text-sm text-red-500">
                {errors.FK_subcategory.message}
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

          <section className="flex md:col-span-3 flex-col md:flex-row mt-4 items-center justify-between border-t border-zinc-800 pt-4 gap-4">
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

export default CreateProduct;
