import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from './pages/home.jsx'
import Servicos from "./pages/servicos.jsx";
import Orcamento from './pages/orcamento.jsx';


export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex-col bg-gray-100">
        <header className="min-w-screen bg-blue-600 text-white p-4 flex justify-evenly rounded">
          <nav className="space-x-20">
            <Link to="/" className="hover:underline">Inicio</Link>
            <Link to="/servicos" className="hover:underline">Serviços</Link>
            <Link to="/orcamento" className="hover:underline">Orçamento</Link>
          </nav>
        </header>

        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<Servicos />} />
            <Route path="/orcamento" element={<Orcamento />} />
          </Routes>
        </main>

        <footer className="text-center text-gray-500 py-3 text-sm">
          © 2025 Fachinelli
        </footer>
      </div>
    </Router>
  );
}