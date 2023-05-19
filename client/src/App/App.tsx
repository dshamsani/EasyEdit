import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CheckAuthorization } from "./helpers";

import LoginPage from "../Pages/Login";
import RegisterPage from "../Pages/Register";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/" element={CheckAuthorization(<span>Nothing here</span>)} />
        <Route path="/profile" element={CheckAuthorization(<span>profile</span>)} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
