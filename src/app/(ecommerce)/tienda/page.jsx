import CardTienda from "@/components/ecommerce/card/CardTienda";

async function TiendaPage() {

  return (
    <section className="grid gap-4">
      <div className="py-4 p-2 ">
        <h1 className="text-2xl text-zinc-200 font-medium">Tienda</h1>
      </div>
     <CardTienda />
    </section>
  );
}

export default TiendaPage;
