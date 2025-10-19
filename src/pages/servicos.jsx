import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import iconDel from "../assets/delete.png"

export default function Servicos() {
  const navigate = useNavigate();

  const [nomeServico, setNomeServico] = useState("");
  const [valor, setValor] = useState("");
  const [servicos, setServicos] = useState(
    JSON.parse(sessionStorage.getItem("servicos")) || []
  );

  const adicionar = () => {
    if (!nomeServico || !valor) return alert("Preencha todos os campos!");

    const novo = { nomeServico, valor: parseFloat(valor) };
    const atualizados = [...servicos, novo];
    setServicos(atualizados);
    sessionStorage.setItem("servicos", JSON.stringify(atualizados));

    setNomeServico("");
    setValor("");
  };

  const handleSubmit = () => {
    navigate("/orcamento")
  };

  const handleDelete = (id) => {
    const atualizados = servicos.filter((_,i) => i !== id);
    setServicos(atualizados);
    sessionStorage.setItem('servicos', JSON.stringify(atualizados));
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-4 rounded-xl shadow">
      <h1 className="text-[1.7rem] font-semibold mb-4">Adicionar Serviços</h1>
      <form className="flex grid grid-cols-1 gap-4 w-full mt-18">
        <input
        type="text"
        placeholder="Serviço"
        value={nomeServico}
        onChange={(e) => setNomeServico(e.target.value)}
        className="bg-[#EDF0F4] pt-5 py-3  rounded placeholder-gray-400 pl-[14px]" 
        />
        <input
          type="number"
          placeholder="Valor (R$)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          className="bg-[#EDF0F4] pt-5 py-3 rounded placeholder-gray-400 pl-[14px]" 
        />
      </form>      

      <button
        onClick={adicionar}
        className="flex justify-center w-full bg-blue-600 text-white py-2 mt-8  rounded hover:bg-blue-700"        
      >
        <PlusIcon className="h-6 w-6 pr-1 text-white" />
        <p>Adicionar</p>        
      </button>

      <ul className="mt-4">
        {servicos.map((s, i) => (
          <li key={i} className="border-b py-2 flex justify-between mb-3">
            <span>{s.nomeServico}</span>
            <span>R$ {s.valor.toFixed(2)}</span>
            <button 
            onClick={() => handleDelete(i)}>
              <img 
                src={iconDel}
                className="h-4" 
              />
            </button>
          </li>
        ))}
      </ul>
      <button
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      onClick={handleSubmit}
      >
        Orçamento 
      </button>
    </div>
  );
}
