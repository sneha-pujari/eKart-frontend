import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import { DataProvider } from "./data-context";
import { ProductsProvider } from "./products-context";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProductsProvider>
      <DataProvider>
        <Router>
          <App />
        </Router>
      </DataProvider>
    </ProductsProvider>
  </StrictMode>,
  rootElement
);
