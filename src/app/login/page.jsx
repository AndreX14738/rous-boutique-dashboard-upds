function LoginPage() {
  return (
    <section className=" ">
      <h1 className="text-4xl font-medium text-center py-8">Iniciar Sesion jose </h1>
      <form className="grid gap-4  w-96 grid-cols-1" action="">
        <label htmlFor="">Email</label>
        <input className="bg-zinc-600 px-4 py-2 rounded-md" type="email" />
        <label htmlFor="">Password</label>
        <input
          className="bg-zinc-600 px-4 py-2 rounded-md"
          type="password"
          name=""
          id=""
        />

        <button className="bg-blue-500  px-4 py-2 rounded-md text-2xl">
          Iniciar Sesion
        </button>
      </form>
    </section>
  );
}

export default LoginPage;
