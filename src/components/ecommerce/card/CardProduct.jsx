function CardProduct() {
  return (
    <section className="   rounded-md shadow-sm  ">
      <img
        className=" rounded-t-md "
        src="https://uitailwindcss.pages.dev/assets/airmax.jpg"
        alt=""
      ></img>
      <div className="bg-zinc-100 rounded-b-md flex flex-col items-center justify-center p-4 gap-4 dark:bg-zinc-900 ">
        <span className="text-sm  text-red-500">NIKE</span>
        <h2 className="text-black dark:text-white text-2xl ">
          AIR MAX 90 INFRARED
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-center">
          The infrared colorway is without a doubt one of the most iconic in the
          Nike Air Max history.
        </p>
        <button className="bg-red-500 text-white px-4 py-2 font-medium text-sm rounded-md hover:bg-red-600 active:bg-red-700">
          $129 - ADD TO CART
        </button>
      </div>
    </section>
  );
}

export default CardProduct;
