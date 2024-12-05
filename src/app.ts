import ImportacaoClientes from "./negocio/importarClientes";
import ImportacaoProdutos from "./negocio/importarProdutos";
import ImportacaoServicos from "./negocio/importarServico";
import Cliente from "./modelo/cliente";
import Produto from "./modelo/produto";
import Servico from "./modelo/servico";

// Inicialização das listas
const clientes: Array<Cliente> = [];
const produtos: Array<Produto> = [];
const servicos: Array<Servico> = [];

// Instâncias das classes de importação
const importacaoClientes = new ImportacaoClientes(clientes);
const importacaoProdutos = new ImportacaoProdutos(produtos);
const importacaoServicos = new ImportacaoServicos(servicos);

// Caminhos dos arquivos JSON
const caminhoClientes = './carga/clientes.json';
const caminhoProdutos = './carga/produtos.json';
const caminhoServicos = './carga/servicos.json';

// Importação dos dados
try {
    importacaoClientes.importar(caminhoClientes);
    console.log("Clientes carregados com sucesso!", clientes);

    importacaoProdutos.importar(caminhoProdutos);
    console.log("Produtos carregados com sucesso!", produtos);

    importacaoServicos.importar(caminhoServicos);
    console.log("Serviços carregados com sucesso!", servicos);

    console.log("Aplicação iniciada com sucesso!");
} catch (error) {
    console.error("Erro durante a inicialização da aplicação:", error);
}
