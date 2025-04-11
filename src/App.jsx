import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { CompanyPage } from "./pages/CompanyPage/CompanyPage";
import { HomePage } from "./pages/HomePage/HomePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="company/:id" element={<CompanyPage />} />
        <Route path="contacts/:id" element={<div>Contact</div>} />
        <Route path="clients" element={<div>Clients</div>} />
        <Route path="search" element={<div>Search</div>} />
      </Route>
    </Routes>
  );
}

export default App;
