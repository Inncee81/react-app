import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import 'animate.css/animate.css'

import { BrowserRouter } from "react-router-dom";

import { Container } from "./app/Container";
import { Navbar } from "./app/Navbar";

function ReactApp() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container />
    </BrowserRouter>
  );
}

export default ReactApp;
