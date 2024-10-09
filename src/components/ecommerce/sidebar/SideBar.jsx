import DarkMode from "@/components/common/DarkMode";
import Link from "next/link";

async function SideBar() {

  return (
    <>
      <header className="bg-white dark:bg-black border-b border-zinc-700 h-16 shadow-md    fixed w-full flex items-center justify-between px-4 md:px-20">
        <a className="flex gap-1 items-center" href="/">
          <img className="w-12" src="/logo.png" alt="logo idiomify" />
          <span className="text-2xl font-extrabold ">Rous Boutique</span>
        </a>

        <nav className="flex items-center justify-center gap-4 text-zinc-400">
            <ul className="flex gap-4">
                <li>Tienda</li>
                <li>Ofertas</li>
                <li>Categoria</li>
                <li>Contacto</li>
                <li></li>
            </ul>
        
        </nav>
        <DarkMode />
      </header>
    </>
  );
}

export default SideBar;
