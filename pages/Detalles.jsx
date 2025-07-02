import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YouTube from "react-youtube";
import CardActores from "../components/CardActores";

const Detalles = () => {
  const [datos, setDatos] = useState([]);
  const [datavideo, setDatavideo] = useState({});
  const [datareparto, setDatareparto] = useState({});
  const [dataproduccion, setdProduccion] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playtrailer, setPlaytrailer] = useState(false);
  const [trailers, setTrailers] = useState([]);
  const [selectedTrailer, setSelectedTrailer] = useState(null);

  const [showModal, setShowModal] = useState(false); // Controla el modal

  //puntuacion
  let fondoaverage = "bg-info rounded p-1";
  if (datos.vote_average < 8) {
    fondoaverage = "bg-warning rounded p-1";
  }
  if (datos.vote_average < 5) {
    fondoaverage = "bg-danger rounded p-1";
  }
  //cierre puntuacion
  const navigate = useNavigate();
  const params = useParams();
  let tipo = params.tipo;
  let id = params.id;
  let API = "";
  let APIVideos = "";
  if (tipo == "cine") {
    API = `https://api.themoviedb.org/3/movie/${id}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
    APIVideos = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=ecbcdcf9044928d12b179d9153f5a269&language=en-US`;
  } else {
    API = `https://api.themoviedb.org/3/tv/${id}?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES`;
    APIVideos = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=ecbcdcf9044928d12b179d9153f5a269&language=en-US`;
  }

  const getDatos = async () => {
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDatos(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const getVideo = async () => {
    try {
      const response = await fetch(APIVideos);
      const data = await response.json();
      const ytTrailers = data.results.filter(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailers(ytTrailers);
      if (ytTrailers.length > 0) {
        setTrailers(ytTrailers); // solo guardamos los tráilers
      }
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const APICredits = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=ecbcdcf9044928d12b179d9153f5a269&language=es-ES&sort_by=popularity.desc`;
  const getReparto = async () => {
    try {
      const response = await fetch(APICredits);
      const data = await response.json();

      const sortedCast = [...data.cast].sort(
        (a, b) => b.popularity - a.popularity
      );

      setDatareparto(sortedCast);
      setdProduccion(data.crew);

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatos();
    getReparto();
    getVideo();
    // Limpiar selectedTrailer cuando se cierre el modal
    const modalEl = document.getElementById("modalTrailers");
    if (modalEl) {
      modalEl.addEventListener("hidden.bs.modal", () => {
        setSelectedTrailer(null);
      });
    }

    return () => {
      if (modalEl) {
        modalEl.removeEventListener("hidden.bs.modal", () => {});
      }
    };
  }, []);

  const ruta = "https://image.tmdb.org/t/p/original/";
  const rutaPel = "/peliculas/";
  const renderTrailer = () => {
    return (
      <YouTube
        videoId={trailerkey}
        className={"youtube-container"}
        opts={{
          width: "100%",
          height: "100%",
        }}
      />
    );
  };
  function formatDateToLocal(dateString) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", options);
  }

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
    <div className="bg-dark border-bottom border-top border-1 border-primary">
      <div
        style={{ backgroundImage: "url(" + ruta + datos.backdrop_path + ")" }}
        className="banner"
      >
        <div className="oscuro h-100">
          <div className="p-3 pt-5">
            <h1 className="display-1 py-2">{datos.title}</h1>
            <h1 className="display-2 py-3">{datos.tagline}</h1>
            <h2 className="py-2">Genero:{datos.genres[0].name}</h2>
            <h2 className="py-2">Titulo original: {datos.original_title}</h2>
            <h2 className="py-2">Titulo original: {datos.original_language}</h2>
            <h2 className="py-2">
              Puntuacion:{" "}
              <span className={fondoaverage}>{datos.vote_average}</span>
            </h2>
            <p className="pt-2 desaparecer">{datos.overview}</p>
            <div className="my-3">
              {trailers.length > 0 && (
                <button
                  className="btn btn-danger me-2 fs-4"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTrailers"
                  onClick={() => {
                    if (trailers.length > 0) {
                      setSelectedTrailer(trailers[0]); // Seleccionar el primer tráiler solo al hacer clic
                    }
                  }}
                >
                  Ver Trailers
                </button>
              )}
              <button
                className="btn btn-secondary fs-4"
                onClick={() => navigate(-1)}
              >
                Regresar
              </button>
              {datos.release_date && (
                <h5 className="py-4">
                  Fecha de Lanzamiento:{" "}
                  {formatDateToLocal(
                    datos.release_date || datos.first_air_date
                  )}
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>


       {Array.isArray(datareparto) && (

                <section className="container  py-5">

                    <h3 className="text-center text-white py-4">Reparto de la pelicula ({Array.isArray(datareparto) && datareparto.length}) actores</h3>
                    <div className="row row-cols-lg-6 m-2 justify-content-center">
                        {datareparto.map((item, index) => (
                        item.profile_path && item.profile_path !== "" ? (
                        <CardActores key={index} item={item} />
                         ) : null
                    ))}
                    </div>
                </section>
            )}

      {/* Modal de Trailers */}
      {trailers.length > 0 && (
        <div
          className="modal fade"
          id="modalTrailers"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Selecciona un Trailer
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {/* Selector de tráilers */}
                <div className="mb-4 text-center">
                  <h5>Elige un trailer:</h5>
                  <div className="d-flex justify-content-center flex-wrap gap-2">
                    {trailers.map((t, index) => (
                      <button
                        key={index}
                        className={`btn btn-sm ${
                          selectedTrailer?.key === t.key
                            ? "btn-primary"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setSelectedTrailer(t)}
                      >
                        Trailer {index + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reproductor */}
                {selectedTrailer && (
                  <YouTube
                    videoId={selectedTrailer.key}
                    className="youtube-container"
                    opts={{
                      width: "100%",
                      height: "600px",
                      playerVars: { autoplay: 1 },
                    }}
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detalles;
