import React from 'react'
import ModalPelis from './ModalPelis';
import { Link } from 'react-router-dom';

const CardPeliculas = ({items,tipo}) => {


  return (
        <div className='col-xl-3 col-lg-4 col-sm-6 pt-4'>
            <div className='card h-100 bg-dark text-white border-light'>

            <div className='card-header p-0 border-light'>
                    <img src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`} className="card-img-top-pelis" alt="" />            </div>

            <div className='card-body text-center'>
                <p className='fs-4'>{items.title}</p>
                <p><span className='text-danger'>Popularidad: </span>{items.popularity}</p>
                <p><span className='text-info'>Estreno: </span>{items.release_date}</p>
            </div>

                <div className="card-footer text-center border-light">
                    <a href="#" className="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target={`#${items.id}`}>Modal</a>
                    <Link to={`/detalles/${tipo}/${items.id}`} href="#" className="btn btn-primary">Detalle</Link>
                </div>

            </div>

          <ModalPelis items={items}/>

        </div>
  )
}

export default CardPeliculas