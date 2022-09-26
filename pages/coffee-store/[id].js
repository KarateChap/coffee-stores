import { useRouter } from "next/router";
import Link from "next/link";

import coffeeStoresData from "../../data/coffee-stores.json";
import Head from "next/head";
import Image from "next/image";
import {
  MapPinIcon,
  PaperAirplaneIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { fetchCoffeeStores } from "../../lib/coffee-stores";

const CoffeeStore = ({coffeeStore}) => {
    console.log(coffeeStore)
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { title, category, description, image } = coffeeStore;

  const handleUpvoteButton = () => {
    console.log("handle Upvote");
  };
  return (
    <div className="w-full flex justify-center px-5 py-10 ">
      <div className="w-full max-w-[1240px]">
        <div>
          <Head>
            <title></title>
          </Head>
          <Link href="/">
            <a className="text-xl font-bold text-[#4d284e]">Back to home</a>
          </Link>
          <h1 className="font-bold text-3xl text-white pb-4">{title}</h1>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Image
                src={image}
                alt="/"
                width={700}
                height={500}
                className="rounded-xl"
              />
            </div>
            <div className="glass hover:bg-white/40 p-4 flex flex-col gap-3 max-w-[350px] h-[auto] md:h-[auto] md:max-h-[250px]">
              <div className="flex gap-3">
                <MapPinIcon className="text-white w-6" />
                <h1 className="text-2xl text-[#303358] font-bold font-[IBMPlexSans]">
                  {category}
                </h1>
              </div>
              <div className="flex gap-3">
                <PaperAirplaneIcon className="text-white w-6" />
                <h1 className="text-2xl text-[#303358] font-bold font-[IBMPlexSans]">
                  {description.substring(0, 30)}...
                </h1>
              </div>
              <div className="flex gap-3">
                <StarIcon className="text-white w-6" />
                <h1 className="text-2xl text-[#303358] font-bold font-[IBMPlexSans]">
                  1
                </h1>
              </div>
              <div>
                <button
                  onClick={handleUpvoteButton}
                  className="text-white bg-[#453dde] px-4 py-2 rounded-md"
                >
                  Up Vote!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------- Server Side

export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

export default CoffeeStore;
