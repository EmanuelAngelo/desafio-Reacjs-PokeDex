/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      const sortedArray = [...response.data.results];

      sortedArray.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      setList(sortedArray);
    });
  }, []);

  return (
    <>
      <h3>desafio</h3>
      <h1>consumir api pokémon</h1>
      <hr />
      {list.map((item) => (
        <Pokemon key={item.name} data={item} />
      ))}
    </>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(data.url).then((response) => setDetails(response.data));
  }, []);

  if (details === null) {
    return <div>=</div>;
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>
        <img
          src={details.sprites.front_default}
          style={{ width: 30, marginRight: 20 }}
        />
      </span>
      <span>
        <b>{details.name}</b> - Exp {details.base_experience}
      </span>
    </div>
  );
};

export default App;
