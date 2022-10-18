import Head from "next/head";
import { Landing } from "../containers/Landing";

const Page = () => {
  return (
    <>
      <Head>
        <title>
          Wuolah | Encuentra los apuntes de tus compañeros ahora
        </title>
      </Head>
      <Landing />
    </>
  );
};

export default Page;
