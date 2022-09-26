import Head from "next/head"
import Banner from "../components/banner"

export default function Home() {

  const handleOnBannerBtnClick = () => {
    console.log('hehe')
  }

  return (
    <div className="h-[100vh] w-[full] bg-[url('/static/background.png')] bg-[50%] bg-no-repeat bg-cover text-[#373b64]">
      <Head>
        <title>Coffee Stores</title>
        <meta name="description" content="Coffee Stores in town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerBtnClick}/>
    </div>
  )
}
