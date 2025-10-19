import jsPDF from "jspdf";
import html2canvas from 'html2canvas-pro';
import logo from '../assets/logo.png'
import wpp from '../assets/whatsapp.png'
import ig from '../assets/instagram.png'

export default function Orcamento() {
  const cliente = JSON.parse(sessionStorage.getItem("cliente")) || {};
  const servicos = JSON.parse(sessionStorage.getItem("servicos")) || [];

  const totalServicos = servicos.reduce((acc, s) => acc + s.valor, 0);
  const dataEmissao = new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const gerarPDF = async () => {
    const elemento = document.getElementById("orcamento-pdf");

    const canvas = await html2canvas(elemento, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Orcamento_${cliente[0].nome || "cliente"}.pdf`);
    sessionStorage.clear();
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-2 rounded-xl shadow">
      <div id="orcamento-pdf" className="p-2 text-gray-800 text-sm">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between border-b mb-4">
          <div className="flex items-center space-x-20 space-y-2">
            <div className="items-center space-x-2">
              <img
              src={logo}
              alt="Logo Oficina Fachinelli"
              className="w-22 h-8 ml-23  object-contain"
            />
            <h1 className="text-3xl font-bold text-black">FACHINELLI</h1>
            <h1 className="text-1xl font-bold text-black">MARTELINHO DE OURO E PEQUENOS REPAROS</h1>
            </div>            
            <div>
              <p>Av. CRISTO REI, 665, PARQUE DAS AMERICAS</p>
              <p className="mb-4">Uberaba - MG | CEP 38045-250</p>
              <div className="flex items-center justify-center mb-2">                
                <img className='w-4.5 h-3.5 top-4 pr-1' src={wpp}/>
                <p className="font-bold">Tel: (34) 98878-1704</p>  
              </div>
              <div className="flex items-center justify-center mb-1">                
                <img className='w-4.5 h-3.5 top-4 pr-1' src={ig}/>
                <p className="font-bold">fachinelli.oficina</p>  
              </div>                          
              <p className="text-[0.7rem]  ml-32 font-bold"> CNPJ: 39.349.347/0001-80</p>
            </div>
          </div>
        </div>

        {/* Dados Gerais */}
        <div className="flex justify-between mb-3 text-sm mb-4">
          <p><strong>Emissão:</strong> {dataEmissao}</p>
        </div>

        {/* Dados do Cliente */}
        <div className="mb-4 border-b pb-6">
          <h1 className="text-2xl font-semibold mb-2">Dados do Cliente / Veículo</h1>
          {cliente[0].nome ? (
            <>
              <p className="flex space-x-2"><strong>Nome: </strong> {cliente[0].nome.charAt(0).toUpperCase() + cliente[0].nome.slice(1)}</p>
              <div className="flex space-x-3">
                <p><strong>Veículo:</strong> {cliente[0].marca.toUpperCase()} {cliente[0].modelo}</p>
                <p><strong>Cor:</strong> {cliente[0].cor}</p>
                <p><strong>Placa:</strong> {cliente[0].placa.toUpperCase()}</p>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Nenhum cadastro encontrado.</p>
          )}
        </div>

        {/* Serviços */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">Serviços</h1>
          <table className="w-full border-collapse text-sm mb-10">
            <thead>
              <tr className="bg-gray-200 border">
                <th className="text-left px-2 py-1 border">Descrição</th>
                <th className="text-right px-2 py-1 border">Valor (R$)</th>
              </tr>
            </thead>
            <tbody>
              {servicos.length > 0 ? (
                servicos.map((s, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-2 py-1 border">{s.nomeServico}</td>
                    <td className="px-2 py-1 text-right border">
                      {s.valor.toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center py-2 text-gray-500">
                    Nenhum serviço adicionado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className=" flex justify-between font-bold text-base">
          <span>Total de Serviços:</span>
          <span>R$ {totalServicos.toFixed(2)}</span>
        </div>

        {/* Rodapé */}
        <div className="mt-4 text-xs text-gray-600 border-t pt-3">
          <p>
            Conte com um trabalho eficiente e de ótima qualidade.
            Agradecemos a preferência!
          </p>
          <p>
            O orçamento é válido por 30 dias a partir da data de emissão.
          </p>
          <p>
            Siga nossa pagina no instagram @fachinelli.oficina
          </p>
        </div>
      </div>

      {/* Botão de PDF */}
      <button
        onClick={gerarPDF}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        📄 Baixar Orçamento em PDF
      </button>
    </div>
  );
}
