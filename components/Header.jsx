import React from 'react'
import { Link } from 'react-router-dom'
import FiltroCine from './FiltroCine'
import FiltroTv from './FiltroTv'

const Header = () => {
  return (
<div className="container-fluid bg-dark px-0">
  <div className="row gx-0 wow fadeIn" data-wow-delay="0.1s">
    <div className="col-lg-3 bg-primary d-none d-lg-block">
      <a href="index.html" className="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
        <h1 className="m-0 display-4 text-white text-uppercase">ARMovie</h1>
      </a>
    </div>
    <div className="col-lg-9">
      <div className="row gx-0 d-none d-lg-flex bg-dark p-2">
            <form action="" method="post" className='f-1'>
              <input type="text" placeholder='Nombre de la pelicula'/>
            </form>

      </div>
      <nav className="navbar navbar-expand-lg navbar-dark p-3 p-lg-0 px-lg-5" style={{background: '#111111'}}>
        <a href="index.html" className="navbar-brand d-block d-lg-none">
          <h1 className="m-0 display-4 text-primary text-uppercase">ARMovie</h1>
        </a>
        <button type="button" className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
          <div className="navbar-nav mr-auto py-0">
            <Link to={`/tendencias/tendenciascine`} href="" className="nav-item nav-link active">Tendencias Cine</Link>
    <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Genero Cine</a>
              <div className="dropdown-menu rounded-0 m-0">
                  <FiltroCine/>
              </div>
            </div>
            <div className="nav-item dropdown">
              <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Generos TV</a>
              <div className="dropdown-menu rounded-0 m-0">
                  <FiltroTv/>
              </div>
            </div>
            <Link to={"/actores"} href="#" className="nav-item nav-link">Actores</Link>

          </div>
          <div className="d-none d-lg-flex align-items-center py-2">
            <a className="btn btn-outline-secondary btn-square rounded-circle ms-2" href>
              <i className="fab fa-facebook-f" />
            </a>
            <a className="btn btn-outline-secondary btn-square rounded-circle ms-2" href>
              <i className="fab fa-twitter" />
            </a>
            <a className="btn btn-outline-secondary btn-square rounded-circle ms-2" href>
              <i className="fab fa-linkedin-in" />
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</div>

  )
}

export default Header