import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Form = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [search, setSearch] = useState("code"); // De base c'est les film qui détient le mot code
  const [sortGoodBad, setSortGoodBad] = useState(null); // De base la variable est sur NULL une fois que l'user clique on passe à goodToBad ou badToGood

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=ed82f4c18f2964e75117c2dc65e2161d&query=${search}&language=fr-FR` // Ici on ajoute search dans l'url
      )
      .then((res) => setMoviesData(res.data.results)); // On récupère les données puis on les stock dans notre state
  }, [search]); // On fait un callback de search

  return (
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)} // On récupère ce qui est taper dans l'input et on le passe au state setSearch
          />
          <input type="submit" value="Rechercher" />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSortGoodBad("goodToBad")} // Ceci déclenche la condition de sort plus bas
          >
            Top
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSortGoodBad("badToGood")} // Ceci déclenche la condition de sort plus bas
          >
            Flop
          </div>
        </div>
      </div>
      <div className="result">
        {moviesData
          .slice(0, 12) // On coupe à 12 film
          .sort((a, b) => {
            // On trie les film du meilleur au pire via les notes et tout se déclenche via le state sortGoodBad
            if (sortGoodBad === "goodToBad") {
              return b.vote_average - a.vote_average;
            } else if (sortGoodBad === "badToGood") {
              return a.vote_average - b.vote_average;
            }
            // Valeur de retour par défaut (tri inchangé)
            return 0;
          })
          .map((movie) => (
            <Card movie={movie} key={movie.id} /> // On map les résultat dans notre composant Card à qui on lui passe la props movie
          ))}
      </div>
    </div>
  );
};

export default Form;
