import { Provider } from "react-redux";
import store from "./store/store.ts";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import Header from "./components/Header";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <Header />
        <div className="container">
          <Sidebar />
          <Map />
        </div>
      </div>
    </Provider>
  );
}

export default App;
