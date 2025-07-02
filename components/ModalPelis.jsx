import React from 'react'

const ModalPelis = ({items}) => {
    //puntuacion
  let coloraverage="text-info";
  if (items.vote_average<8) {
    coloraverage="text-warning"
  }
  if (items.vote_average<5) {
    coloraverage="text-danger"
  }
//cierre puntuacion
  return (
    <div className="modal fade" id={`${items.id}`} tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-xl">
    <div className="modal-content bg-dark text-light">
      <div className="modal-header">
        <h5 className="modal-title text-light" id="exampleModalLabel">{items.title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
        <div className='row'>
          <div className='col-4'>
                      <img src={`https://image.tmdb.org/t/p/w500/${items.poster_path}`} className="img-fluid imgmodal" alt="" />

          </div>
          <div className='col-8'>
            <p className='text-center fs-4'>Descripcion</p>
            <p>Popularidad: {items.popularity}</p>
            <p>Calificacion: <span className={coloraverage}>{items.vote_average}</span></p>
            <p>Fecha estreno: {items.release_date}</p>
            <p className='text-light text-center'>{items.overview}</p>

          </div>
        </div>

      </div>
      <div className="modal-footer justify-content-center">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
  )
}

export default ModalPelis