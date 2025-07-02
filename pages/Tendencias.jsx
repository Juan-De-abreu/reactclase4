import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardPeliculas from "../components/CardPeliculas";
import Paginador from "../components/Paginador";

const APIPelTendenciasCine =
  "https://api.themoviedb.org/3/trending/movie/day?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE"; //tendencias cine
const APIEnTelevision =
  "https://api.themoviedb.org/3/tv/on_the_air?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE"; //en television
const APIPelProximamente =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE"; //proximamente
const APIPelRecientes =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE"; //en cartelera hoy
const APIPelMCTMDBEl =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE"; //mejor valoradas cine
const APIPelMCTMDBElTv =
  "https://api.themoviedb.org/3/tv/top_rated?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-VE"; //mejor valoradas tv

const Tendencias = () => {
  const params = useParams();
  const [datos, setDatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  let API = APIPelTendenciasCine;
  let titulo = "";
  let tipo = "";
  let boton1 = "text-white me-2 m-3 fs-5";
  let boton2 = "text-white me-3 m-2 fs-5";
  let boton3 = "text-white me-2 m-3 fs-5";
  let boton4 = "text-white me-2 m-3 fs-5";
  let boton5 = "text-white me-3 m-2 fs-5";
  let boton6 = "text-white me-2 m-3 fs-5";

  //if de los botones

  if (params.id == "tendenciascine" || !params.id) {
    API = APIPelTendenciasCine + `&page=${page}`;
    titulo = "Tendencias en el Cine";
    tipo = "cine";
    boton1 =
      "btn btn btn-outline-primary btn-sm me-2 mb-2 fs-4 active text-white";
  }
  if (params.id == "tendenciastv") {
    API = APIEnTelevision + `&page=${page}`;
    titulo = "Tendencias en TV";
    tipo = "tv";
    boton2 =
      "btn btn btn-outline-primary btn-sm me-2 mb-2 fs-4 active text-white";
  }
  if (params.id == "proximamente") {
    API = APIPelProximamente + `&page=${page}`;
    titulo = "Proximamente";
    tipo = "cine";
    boton3 =
      "btn btn btn-outline-primary btn-sm me-2 mb-2 fs-4 active text-white";
  }
  if (params.id == "recientes") {
    API = APIPelRecientes + `&page=${page}`;
    titulo = "Recientes";
    tipo = "cine";
    boton4 =
      "btn btn btn-outline-primary btn-sm me-2 mb-2 fs-4 active text-white";
  }
  if (params.id == "mejorValoradasCine") {
    API = APIPelMCTMDBEl + `&page=${page}`;
    titulo = "Mejor Valoradas en el Cine";
    tipo = "cine";
    boton5 =
      "btn btn btn-outline-primary btn-sm me-2 mb-2 fs-4 active text-white";
  }
  if (params.id == "mejorValoradasTv") {
    API = APIPelMCTMDBElTv + `&page=${page}`;
    titulo = "Mejor Valoradas en TV";
    tipo = "tv";
    boton6 =
      "btn btn btn-outline-primary btn-sm me-2 mb-2 fs-4 active text-white";
  }
  //finaliza if de los botones

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
  }, [params.id]);

  useEffect(() => {
    getDatos();
  }, [tipo, page]);
  useEffect(() => {
    setPage(1);
  }, [tipo]);

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
          <h1 className="display-5 text-primary text-center mb-0">{titulo}</h1>
        </div>
      </div>
      <div className="text-center py-4">
        <Link to="/tendencias/tendenciascine" href="#" className={boton1}>
          Tendencias Cine
        </Link>
        <Link to="/tendencias/tendenciastv" href="#" className={boton2}>
          Tendencias Tv
        </Link>
        <Link to="/tendencias/proximamente" href="#" className={boton3}>
          Próximamente
        </Link>
        <Link to="/tendencias/recientes" href="#" className={boton4}>
          Recientes
        </Link>
        <Link to="/tendencias/mejorValoradasCine" href="#" className={boton5}>
          Mejor Valoradas Cine
        </Link>
        <Link to="/tendencias/mejorValoradasTv" href="#" className={boton6}>
          Mejor Valoradas Tv
        </Link>
      </div>
      <div className="container">
        <Paginador page={page} setPage={setPage} totalPages={totalPages} />
        <div className="row mx-0">
          {datos.map((item) => (
            <CardPeliculas key={item.id} items={item} tipo={tipo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tendencias;
