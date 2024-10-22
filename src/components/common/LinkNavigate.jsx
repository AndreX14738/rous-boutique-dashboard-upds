'use client'
import { usePathname } from "next/navigation";
function LinkNavigate() {
  const pathname = usePathname();
  return <p className="text-blue-300 text-sm pb-4">{pathname}</p>;
}

export default LinkNavigate;
