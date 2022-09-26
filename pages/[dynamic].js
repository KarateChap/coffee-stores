import Head from "next/head";
import {useRouter} from "next/router"


const Dynamic = () => {
  const router = useRouter();
  return (

    <div>
        <Head>
      <title>{router.query.dynamic}</title>
    </Head>
    this is Dynamic {router.query.dynamic}</div>
  )
}

export default Dynamic