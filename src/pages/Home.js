import React from 'react'
import ClientReview from '../components/ClientReview'
import Collection from '../components/Collection'
import Footer from '../components/Footer'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import Navbar from '../components/Navbar'

function Home() {
  return (
   <>
   <Header/>
   <Navbar/>
   <HeroSection/>
   <Collection/>
   <ClientReview/>
   <Footer/>
   </>

  )
}

export default Home
