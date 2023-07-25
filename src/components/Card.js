import React from "react";

// On récupère le props {movie}
const Card = ({ movie }) => {
  //Fonction pour formater la date et enlever les -
  const dateFormater = (date) => {
    let [yy, mm, dd] = date.split("-"); // split pour supprimer -
    return [dd, mm, yy].join("/"); // join pour ajouter /
  };

  //Fonction pour trouver le genre du film
  const genreFinder = () => {
    let genreArray = [];
    for (let i = 0; i < movie.genre_ids.length; i++) {
      // Boucle for pour parcourir
      switch (
        movie.genre_ids[i] // Condition Switch pour chaque cas
      ) {
        case 28:
          genreArray.push(`Action`);
          break;
        case 12:
          genreArray.push(`Aventure`);
          break;
        case 16:
          genreArray.push(`Animation`);
          break;
        case 35:
          genreArray.push(`Comédie`);
          break;
        case 80:
          genreArray.push(`Policier`);
          break;
        case 99:
          genreArray.push(`Documentaire`);
          break;
        case 18:
          genreArray.push(`Drame`);
          break;
        case 10751:
          genreArray.push(`Famille`);
          break;
        case 14:
          genreArray.push(`Fantasy`);
          break;
        case 36:
          genreArray.push(`Histoire`);
          break;
        case 27:
          genreArray.push(`Horreur`);
          break;
        case 10402:
          genreArray.push(`Musique`);
          break;
        case 9648:
          genreArray.push(`Mystère`);
          break;
        case 10749:
          genreArray.push(`Romance`);
          break;
        case 878:
          genreArray.push(`Science-fiction`);
          break;
        case 10770:
          genreArray.push(`Téléfilm`);
          break;
        case 53:
          genreArray.push(`Thriller`);
          break;
        case 10752:
          genreArray.push(`Guerre`);
          break;
        case 37:
          genreArray.push(`Western`);
          break;
        default:
          break;
      }
    }
    return genreArray.map((genre) => <li key={genre}>{genre}</li>); // On retourne le résultat via un map qu'on place dans un li
  };

  // Fonction pour ajouter au favoris grâce au localStorage
  const addStorage = () => {
    let storedData = window.localStorage.movies
      ? window.localStorage.movies.split(",")
      : [];

    //Si le movie.id n'éxiste pas pour pas qu'il y a un double id
    if (!storedData.includes(movie.id.toString())) {
      storedData.push(movie.id); // On push l'id du movie
      window.localStorage.movies = storedData;
    }
  };

  //Fonction pour supprimer des favoris
  const deleteStorage = () => {
    let storedData = window.localStorage.movies.split(",");
    let newData = storedData.filter((id) => id !== movie.id); // Via l'ID
    window.localStorage.movies = newData;
  };

  return (
    <div className="card">
      <img
        src={
          movie.poster_path // Lien des poster de film condition ternaire en bas si il y a affiche le poster sinon poster par défaut
            ? "https://image.tmdb.org/t/p/original" + movie.poster_path
            : "./img/poster.jpg"
        }
        alt={`Affiche ${movie.title}`} // Alternative si l'image est cassé
      />

      {/* Titre du film */}
      <h2>{movie.title}</h2>
      {/* Si la date éxiste : affiche le  : sinon null */}
      {movie.release_date ? (
        <h5>Sortie le : {dateFormater(movie.release_date)}</h5>
      ) : null}
      <h4>
        {Math.floor(movie.vote_average)}/10 <span>⭐</span>
      </h4>

      <ul>
        {movie.genre_ids
          ? genreFinder()
          : movie.genres.map((genre) => <li key={genre}>{genre.name}</li>)}
      </ul>

      {movie.overview ? <h3>Synopsis</h3> : ""}
      <p>{movie.overview}</p>
      {movie.genre_ids ? (
        <div className="btn" onClick={() => addStorage()}>
          Ajouter favoris <span>❤️</span>
        </div>
      ) : (
        <div
          className="btn"
          onClick={() => {
            deleteStorage();
            window.location.reload();
          }}
        >
          Supprimer de la liste
        </div>
      )}
    </div>
  );
};

export default Card;
