import Header from '../components/Header'
import Footer from '../components/Footer'
import Tendencias from '../pages/Tendencias'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Detalle from '../pages/Detalles'
import Actores from '../pages/Actores'
import Generos from '../pages/Generos'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <div className='app'>
    <Header/>
      <Routes>
        <Route path="/tendencias/:id" element={<Tendencias/>} />
        <Route path='*' element={<Tendencias/>} />
        <Route path='/detalles/:tipo/:id' element={<Detalle/>}/>
        <Route path='/actores' element={<Actores/>}/>
        <Route path='/generos/:tipo/:genero/:id' element={<Generos/>}/>
      </Routes>
    <Footer/>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App