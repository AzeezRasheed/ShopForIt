import React from "react";
import routes from "./routes/routes";
import { BrowserRouter, useRoutes } from "react-router-dom";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextProvider } from "./context/ContextProvider";
const Router = () => useRoutes(routes);

function App() {
  return (
    <Provider store={store}>
      <ContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ContextProvider>
    </Provider>
  );
}

export default App;
