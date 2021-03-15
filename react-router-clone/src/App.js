import { useContext } from "react"
import './App.css';


import {Router, Routes, Route, Link, RouteContext} from "./router"

// import Link from "./router/Link"
// import Router from "./router/Router"
// import Routes from "./router/Routes"
// import Route from "./router/Route"
// import { RouteContext } from "./router/RouteContext"

// extract parameters from the URL
function useParams() {
  return useContext(RouteContext).params;
}


function Products() {
  return (
    <>
      <h4>Example Products</h4>
      <ul>
        <li>
          <Link to="/products/1">Product One</Link>
        </li>
        <li>
          <Link to="/products/2">Product Two</Link>
        </li>
      </ul>
    </>
  );
}

function Product() {
  const { id } = useParams();
  return (
    <>
      <h4>Viewing product {id}</h4>
      <Link to="/products">Back to all products</Link>
    </>
  );
}





function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/products/:id">
              <Product />
            </Route>
            <Route path="/">
              <Products />
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
