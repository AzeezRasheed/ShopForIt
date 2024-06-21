import React, { useEffect } from "react";
import tw from "twin.macro";
import InfoBox from "../components/InfoBox";
import BestSellers from "../components/BestSellers";
import HeroSection from "../components/HeroSection";
import ClientReview from "../components/ClientReview";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/product/productSlice";
import BlendedAndObsessed from "../components/BlendedAndObsessed";
import PerfectExtensionAndWigs from "../components/PerfectExtensionAndWigs";

function Home() {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.product);

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(getProducts());
      } catch (error) {
        // Handle errors
      }
    };

    fetchProducts();
  }, [dispatch]);

  useEffect(() => {
    const logErrorMessage = async () => {
      if (isError) {
        console.log(message);
      }
    };

    logErrorMessage();
  }, [isError, message, dispatch]);

  return (
    <>
      <div style={styles.container}>
        <HeroSection />
        <PerfectExtensionAndWigs />
        <BlendedAndObsessed />
        <BestSellers />
        <ClientReview />
        <InfoBox/>
      </div>
    </>
  );
}

export default Home;
const styles = {
  container: tw` flex flex-col items-center w-full h-full max-w-screen-2xl justify-center  m-auto  `,
};
