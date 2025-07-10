import "./App.css";
import MainPage from "./pages/MainPage";
import { Provider } from "./state/StateProvider";

function App() {
  return (
    <Provider>
      <MainPage></MainPage>
    </Provider>
  );
}

export default App;
