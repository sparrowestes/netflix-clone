import React from "react";
import "./App.css";
import Row from "./Row";
import requests from "./requests";

function App() {
  return (
    <div>
      <Row
        title='Netflix Originals'
        fetchURL={requests.fetchNetflixOriginals}
      />
      <Row title='Trending Now' fetchURL={requests.fetchTrending} />
    </div>
  );
}

export default App;
