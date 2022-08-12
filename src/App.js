import React, { useState } from "react";
import "./App.css";
import Nav from "./components/Nav.jsx";
import Cards from "./components/Cards.jsx";
import { Route } from "react-router-dom";
import pageAbout from "./components/About.jsx";
import Ciudad from "./components/Ciudad.jsx";
import fondo from "./components/views/fondo.mp4";

export default function App() {
  // espacio para codigo - React.useState()
  // estado para mantener un arreglo de ciudades
  const apiKey = "3806d36215e92f7ebc7098910d1d952b";
  const [ciudades, setCiudades] = useState([]);

  function onSearch(ciudad) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`
    )
      .then((r) => r.json())
      .then((recurso) => {
        console.log(recurso);
        if (recurso.main !== undefined) {
          const ciudad = {
            min: Math.round(recurso.main.temp_min),
            max: Math.round(recurso.main.temp_max),
            img: recurso.weather[0].icon,
            id: recurso.id,
            wind: recurso.wind.speed,
            temp: recurso.main.temp,
            name: recurso.name,
            weather: recurso.weather[0].main,
            clouds: recurso.clouds.all,
            latitud: recurso.coord.lat,
            longitud: recurso.coord.lon,
          };
          console.log(ciudades);
          setCiudades((oldCities) => [...oldCities, ciudad]);
        } else {
          alert("Ciudad no encontrada");
        }
      });
  }

  function onClose(id) {
    setCiudades((estadoAnterior) =>
      estadoAnterior.filter((el) => el.id !== id)
    );
  }

  return (
    <div className="App">
      <video
        autoplay="autoplay"
        loop="loop"
        muted
        defaultMuted
        src={fondo}
        type="video/mp4"
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
      ></video>
      <Route path="/" render={() => <Nav onSearch={onSearch} />} />
      <Route
        path="/"
        exact
        render={() => <Cards cities={ciudades} onClose={onClose} />}
      />
      <Route
        path="/ciudad/:id"
        exact
        render={({ match }) => {
          const city = ciudades.find(
            (city) => city.id === parseInt(match.params.id)
          );
          return <Ciudad city={city} />;
        }}
      />
      <Route path="/about" exact component={pageAbout} />
    </div>
  );
}
