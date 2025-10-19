import { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Home(){
  const navigate = useNavigate();

  const [nome,setNome] = useState('');
  const [marca,setMarca] = useState('');
  const [modelo,setModelo] = useState('');
  const [cor,setCor] = useState('');
  const [placa,setPlaca] = useState('');
  const [cliente,setCliente] = useState(
    JSON.parse(sessionStorage.getItem("cliente")) || []
  );
  const salvar = () => {
    if (!nome || !marca || !modelo) return alert("Preencha todos os campos!");

    const novo = { nome, marca, modelo, cor, placa };
    const atualizados = [...cliente, novo];
    setCliente(atualizados);
    sessionStorage.setItem("cliente", JSON.stringify(atualizados));

    setNome("");
    setMarca("");
    setModelo("");
    setCor("");
    setPlaca("");

    navigate("/servicos")
  };
  
    return(
      <div className="max-w-xl mx-auto bg-white p-4 rounded-xl shadow">     
        <h2 className='text-[1.8rem] font-semibold mb-4'>Fachinelli - Martelinho de Ouro</h2>        
          <form className="flex grid grid-cols-1 gap-4 w-full mt-13">
            <input
              onChange={(e) => setNome(e.target.value)}
              value={nome}
              type="text"  
              className="bg-[#EDF0F4] pt-5 py-3 rounded placeholder-gray-400 pl-[14px]" 
              placeholder="Nome do cliente" 
              
            />
            <input
              onChange={(e) => setMarca(e.target.value)}
              value={marca} 
              type="text" 
              className="bg-[#EDF0F4] pt-5 py-3 rounded placeholder-gray-400 pl-[14px]"  
              placeholder="Marca" 
              />
            <input
              onChange={(e) => setModelo(e.target.value)} 
              value={modelo}
              type="text" 
              className="bg-[#EDF0F4] pt-5 py-3 rounded placeholder-gray-400 pl-[14px]" 
              placeholder="Modelo" 
               />
            <input
              onChange={(e) => setCor(e.target.value)}
              value={cor} 
              type="text" 
              className="bg-[#EDF0F4] pt-5 py-3 rounded placeholder-gray-400 pl-[14px]" 
              placeholder="Cor" 
               />
            <input
              onChange={(e) => setPlaca(e.target.value)}
              value={placa}  
              type="text" 
             className="bg-[#EDF0F4] pt-5 py-3 rounded placeholder-gray-400 pl-[14px]"  
              placeholder="Placa" 
               />
              <button
                onClick={salvar}
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 mt-6 rounded hover:bg-blue-700">
                Adicionar Serviços
              </button>
          </form>
      </div>
    )
    
}