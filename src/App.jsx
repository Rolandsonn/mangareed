import { BrowserRouter } from "react-router-dom";
import AppRouter from "./links/AppRouter";
import { Provider } from "react-redux";
import { store } from "./redux";
import "./assets/styles/index.scss";
function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <AppRouter />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
