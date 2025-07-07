import "./App.css";
import ResoucePage from "./pages/ResourcePage";
import { Provider } from "./state/StateProvider";

function App() {
  return (
    <Provider>
      <ResoucePage></ResoucePage>
    </Provider>
  );
}

export default App;
