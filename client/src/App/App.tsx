import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CheckAuthorization } from "./helpers";

import LoginPage from "../Pages/Login";

const App: FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/hyi" element={CheckAuthorization(<span>Nothing here</span>)} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
