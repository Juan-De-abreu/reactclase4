import React from 'react'

const CardPeliculas = ({items}) => {

  return (
        <div className='col-xl-3 col-lg-4 col-sm-6 pt-4'>
            <div className='card h-100 bg-dark text-white border-light'>

            <div className='card-header p-0 border-light'>
                    <img src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`} className="card-img-top" alt="" />            </div>

            <div className='card-body text-center'>
                <p className='fs-4'>{items.title}</p>
                <p><span className='text-danger'>Popularidad: </span>{items.popularity}</p>
                <p><span className='text-info'>Estreno: </span>{items.release_date}</p>
            </div>

                <div className="card-footer text-center border-light">
                    <a href="#" className="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target={`#${items.id}`}>Modal</a>
                    <a to={''} href="#" className='btn btn-primary me-3'>Detalles</a>
                </div>

            </div>
            


<div className="modal fade" id={`${items.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content  bg-dark text-light">
      <div className="modal-header">
        <h5 className="modal-title text-light" id="exampleModalLabel">{items.title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
        <div className='row'>
          <div className='col-6'>
                      <img src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`} className="img-fluid" alt="" />

          </div>
          <div className='col-6'>
            <p className='text-center fs-4 text-decoration-underline'>Descripcion</p>
            <p className='text-light text-center'>{items.overview}</p>
            
            <p>Puntuacion: <span className={items.vote_average > 6 ? "text-info" : "text-danger"}>
  {items.vote_average}
</span></p>

          </div>
        </div>

      </div>
      <div className="modal-footer justify-content-center">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

        </div>
  )
}

export default CardPeliculas