import React, { useEffect } from "react";
import ClientReview from "../components/ClientReview";
import Collection from "../components/Collection";
import HeroSection from "../components/HeroSection";
import { useIsUserLoggedIn } from "../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/product/productSlice";
import { IS_LOGGEDIN } from "../services/authServices";

function Home() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(async () => await dispatch(getProducts()), []);

  useEffect(async () => {

    if (isError) {
      console.log(message);
    }
  }, [, isError, message, dispatch]);

  return (
    <>
      <HeroSection />
      <Collection />
      <ClientReview />
    </>
  );
}

export default Home;
