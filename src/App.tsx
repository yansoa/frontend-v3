import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./App.scss";

function App() {
  const Views = () => useRoutes(routes);

  return (
    <div>
      <Views />
    </div>
  );
}

export default App;
