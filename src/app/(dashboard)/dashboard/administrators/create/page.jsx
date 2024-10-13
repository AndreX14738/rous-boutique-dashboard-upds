'use client'
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";


function CreateUser() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [roles, setRoles] = useState([]);
 

  useEffect(() => {
    async function getRoles() {
      const roles = await axios.get("/api/dashboard/roles");
      setRoles(roles.data);
    }

    getRoles();
  }, []);

  async function onSubmit(data) {
    console.log(data)
    try {
      const result = await axios.post("/api/dashboard/users",data);
      console.log("Usuario creado:", result);
    
    } catch (err) {
      console.error("Error al crear el usuario:", err);
    }
  }

  return (
    <section className="p-4 border dark:border-zinc-800 rounded-md">
      <h1 className="text-white font-bold text-2xl pb-4">Crear un nuevo usuario</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {/* Selección de rol */}
        <label className="flex flex-col gap-1">
          Rol
          <select
            className="input-dark"
            {...register("FK_role", { required: true })}
          >
            <option value="">Seleccione un rol</option>
            {roles.map((role) => (
              <option key={role.PK_role} value={role.PK_role}>
                {role.role}
              </option>
            ))}
          </select>
          {errors.FK_role && (
            <span className="text-sm text-red-500">Rol requerido</span>
          )}
        </label>

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
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </label>

        {/* Contraseña */}
        <label className="flex flex-col gap-1">
          Contraseña
          <input
            type="password"
            className="input-dark"
            {...register("password", {
              required: {
                value: true,
                message: "Contraseña requerida",
              },
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </label>

        <button
          type="submit"
          className="py-2 px-4 w-full bg-blue-500 rounded-md text-white md:col-span-3"
        >
          Crear usuario
        </button>
      </form>
    </section>
  );
}

export default CreateUser;
