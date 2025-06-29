import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CardPeliculas from '../components/CardPeliculas';
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
  <div className="row g-5 py-2">
    <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
      <h1 className="display-5 text-primary text-center mb-0">Tendencias</h1>
    </div>
  </div>

  <div className='container'>
  <div className='row mx-0'>
    {datos.map((item)=>(
      <CardPeliculas key={item.id} items={item}/>
    ))}
  </div>
  </div>

</div>

  )
}

export default Tendencias