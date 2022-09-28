import Head from "next/head";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Banner from "../components/banner";
import Card from "../components/card";
import useTrackLocation from "../hooks/use-track-location";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import { ACTION_TYPES, StoreContext } from "../store/store-context";

export default function Home(props) {
  const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
    useTrackLocation();

  const [coffeeStoresError, setCoffeeStoresError] = useState(null);
  const {dispatch, state } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
      if (latLong) {
        try {
          const res = await fetch(`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`)
          const coffeeStores = await res.json()
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: coffeeStores, 
            }
          })
          setCoffeeStoresError('');
        } catch (error) {
          setCoffeeStoresError(error.message);
        }
      }
    }
    setCoffeeStoresByLocation();
  }, [latLong]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className="h-[100vh] w-[full] text-[#373b64] flex justify-center">
      <Head>
        <title>Coffee Stores</title>
        <meta name="description" content="Coffee Stores in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col px-10 max-w-[1240px] w-full">
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <h1>Something went wrong: {locationErrorMsg}</h1>}
        <div className="absolute top-16 z-[1] left-[0] md:left-[10%] lg:left-[20%] xl:left-[40%] flex">
          <Image
            src="/static/hero-image.png"
            alt="/"
            width={700}
            height={400}
          />
        </div>

        {coffeeStores.length > 0 && (
          <>
            <h1 className="text-2xl font-bold mb-3 mt-[80px]">
              Stores near me
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    href={`/coffee-store/${coffeeStore.id}`}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                  />
                );
              })}
            </div>
          </>
        )}

        {props.coffeeStores.length > 0 && (
          <>
            <h1 className="text-2xl font-bold mb-3 mt-[80px]">
              Toronto Stores
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.id}
                    name={coffeeStore.name}
                    href={`/coffee-store/${coffeeStore.id}`}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
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
  return {
    props: { coffeeStores: coffeeStores },
  };
}
