function ButtonSubmit({ isLoading }) {
    return (
      <button
        type="submit"
        className={`py-2 px-4 w-full md:w-fit bg-black dark:bg-white rounded-md text-white dark:text-black font-medium flex items-center justify-center ${
          isLoading ? " bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-400 text-zinc-500 border dark:border-zinc-800 cursor-not-allowed" : ""
        }`}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-spin border-2 border-zinc-500 border-t-transparent  rounded-full w-4 h-4 mr-2"></span>
        ) : null}
        {isLoading ? "Creando..." : "Crear"}
      </button>
    );
  }
  
  export default ButtonSubmit;
