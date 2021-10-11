import React from 'react'
import Banner from '../components/layouts/Banner'
import Category from '../components/layouts/Category'
import NewProducts from '../components/layouts/NewProducts'
import Poster from '../components/layouts/Poster'
import ProductHome from '../components/layouts/Products/ProductHome'
function Home() {
    return (
        <div className="container" >
          <Poster/>
          <Category/>
          <Banner/>
          <NewProducts/>
          <ProductHome/>
        </div>
    )
}

export default Home
