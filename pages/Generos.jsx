import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Generos = () => {

     const [datos, setDatos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const params = useParams()
    const tipo = params.tipo; // cine 0 tv
    const id = params.id;
    const genero = params.genero;
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

      let tipo2 = 'tv'; // por defecto es tv
    if (tipo=='cine') { 
        tipo2 = 'movie';
    }

    const API=`https://api.themoviedb.org/3/discover/${tipo2}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE&with_genres=${id}+&page=${page}`;

     const getDatos = async () => {
        try {
           
            const response = await fetch(API);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setDatos(data.results);


            setTotalPages(data.total_pages);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    useEffect(() => {
        getDatos();
    }, [id,tipo,page]);

    useEffect(() => {
        setPage(1);
    }, [id,tipo]);
    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p>Cargando las Peliculas...</p>
               
            </div>
        );
    }
    if (error) {
        return (
            <div className="text-center py-5 text-danger">
                <h4>Error al cargar las Peliculas</h4>
                <p>{error}</p>
                
            </div>
        );
    }
  return (
    <>
    <div className="bg-dark">
        <h1 className="display-5 text-primary text-center mb-0 mt-4">{tipo2}</h1>
    </div>
    </>
  )
}

export default Generos