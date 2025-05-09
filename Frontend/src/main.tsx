import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Layout } from "./Components/LayoutArea/src/Components/LayoutArea/Layout/Layout";
import { store } from "./Redux/store";
import { interceptor } from "./Utils/Interceptor";

interceptor.create();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
