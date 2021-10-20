import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React from "react";
import './App.css';
import ClientsList from "./components/table/ClientsList";
function App() {
  
  return (
    <div className="App">
      <ClientsList />
      <p>This app is using React version : {React.version}</p>
    </div>
  );
}

export default  App;
