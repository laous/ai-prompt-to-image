import { type NextPage } from "next";
import Head from "next/head";
import HomeContainer from "../components/HomeContainer";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>IntelliPic</title>
        <meta
          name="description"
          content="Transform you text to a powerful ai images in a single click."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer />
    </>
  );
};

export default Home;
