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
          content="Transform any text you enter to a visually beautiful image."
        />
        <meta property="og:URL" content={process.env.NEXTAUTH_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="IntelliPic" />
        <meta
          property="og:description"
          content="Transform any text you enter to a visually beautiful image."
        />
        <meta property="og:image" content="'./logo.png'" />
        <meta property="og:site_name" content="IntelliPic" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="'./logo1200x628.png'" />
        <meta name="twitter:creator" content="@oussamalm" />
        <meta name="twitter:title" content="IntelliPic" />
        <meta
          name="twitter:description"
          content="Transform any text you enter to a visually beautiful image."
        />
        <meta name="twitter:image" content="/logo.png" />
        <meta
          name="twitter:image:alt"
          content="IntelliPic | Enter a text, get an image"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="ai,text to image, image form text, ai image generator"
        />
        <meta name="author" content="Oussama Lamnaouer" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeContainer />
    </>
  );
};

export default Home;
