import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "../lib/coffee-stores";

export default function Home(props) {
  const handleOnBannerBtnClick = () => {};

  return (
    <div className="h-[100vh] w-[full] text-[#373b64] flex justify-center">
      <Head>
        <title>Coffee Stores</title>
        <meta name="description" content="Coffee Stores in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col px-10 max-w-[1240px] w-full">
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className="absolute top-16 z-[1] left-[0] md:left-[10%] lg:left-[20%] xl:left-[40%] flex">
          <Image
            src="/static/hero-image.png"
            alt="/"
            width={700}
            height={400}
          />
        </div>

        {props.coffeeStores.length > 0 && (
          <>
            <h1 className="text-2xl font-bold mb-3">Toronto Stores</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.title}
                    href={`/coffee-store/${coffeeStore.id}`}
                    imgUrl={coffeeStore.image}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {

 const coffeeStores = await fetchCoffeeStores();
 
 let newCoffeeArray = [];

 for (let i = 0; i < 10; i++) {
  newCoffeeArray.push(coffeeStores[i])
 }

  return {
    props: { coffeeStores: newCoffeeArray}
  };
}

