import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Tendencias from '../pages/Tendencias'

const App = () => {
  return (
    <>
    <div className='app'>
    <Header/>
      <Tendencias/>
    <Footer/>
    </div>
    </>
  )
}

export default App