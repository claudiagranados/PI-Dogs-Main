import { Route } from "react-router-dom";
import {
  Detail,
  Home,
  NavBar,
  Form,
  Landing,
} from "./Components/index";
import "./App.css";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" render={() => <Landing />} />{" "}
      {/*exact se muetre en varra el boton y que exactamante este en barra...*/}
      <Route path="/Home" render={() => <Home />} />
      {/*aca iria el rendere que va a mostrar todas las cards de perros*/}
      <Route path="/detail/:id" render={() => <Detail />} />
      {/*aca vamos a crear un rendere de detail*/}
      <Route path="/Form" render={() => <Form />} />
      {/*aca vamos a crear un rendere de detail*/}
      {/*en esta ruta va ser el inicio de la pagina , donde se encontrara el boton para ingresar...*/}
    </div>
  );
}

/*RECORDAR QUE USAMOS REACT-ROUTER-DOM LA VERSION 5 Y NO LA VERSION 6*/

export default App;
