import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
const API='https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE'
const Tendencias = () => {
    const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

     const getDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.results);
//            setTotalPages(data.total_pages);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, []);


    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando Personajes...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar los Personajes</h4>
                <p>{error}</p>
            </div>
        );
    }
    
  return (
<div className="container-fluid p-5 mb-5 bg-dark text-secondary">
  <div className="row g-5 py-5">
    <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
      <h1 className="display-5 text-secondary text-center mb-0">Tendencias</h1>
    </div>
  </div>

  <div className='container'>
  <div className='row'>
    {datos.map((item)=>(
        <div className='col-xl-3 col-lg-4 col-sm-6 pt-4'>
            <div className='card h-100 bg-dark text-white'>

            <div className='card-header p-0'>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="card-img-top" alt="" />            </div>

            <div className='card-body text-center'>
                <p>{item.title}</p>
                <p className='text-danger'>{item.popularity}</p>
                <p><span>Estreno:</span>{item.release_date}</p>
            </div>

                <div className="card-footer text-center ">
                    <a href="#" className="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target={`#${item.id}`}>Modal</a>
                    <Link to={''} href="#" className='btn btn-primary me-3'>Detalles</Link>
                </div>

            </div>
        </div>
    ))}
  </div>
  </div>

</div>

  )
}

export default Tendencias