import "./App.css";
import "@fontsource/public-sans";
import { CssVarsProvider } from "@mui/joy/styles";
import "bootstrap/dist/css/bootstrap.min.css";

import JoinTheTeam from "./components/JoinTheTeam/JoinTheTeam";

function App() {
  return (
    <div className="app">
        <CssVarsProvider>
          <JoinTheTeam />
        </CssVarsProvider>
    </div>
  );
}

export default App;
