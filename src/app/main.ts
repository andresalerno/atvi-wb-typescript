import fs from 'fs';
import path from 'path';
import Entrada from "../io/entrada";
import Empresa from "../modelo/empresa";
import CadastroCliente from "../negocio/cadastroCliente";
import ListagemClientes from "../negocio/listagemClientes";
import ImportacaoClientes from "../negocio/importarClientes";
import EditarCliente from '../negocio/editarCliente';
import ExcluirCliente from '../negocio/excluirCliente';
import CadastroProduto from '../negocio/cadastroProduto';
import CadastroServico from '../negocio/cadastroServico';
import ListagemProdutos from '../negocio/listagemProduto';
import EditarProduto from '../negocio/editarProduto';
import ExcluirProduto from '../negocio/excluirProduto';
import ListagemServicos from '../negocio/listagemServico';
import EditarServico from '../negocio/editarServico';
import ExcluirServico from '../negocio/excluirServico';
import ImportacaoServicos from '../negocio/importarServico';
import ImportacaoProdutos from '../negocio/importarProdutos';
import CadastroCompra from '../negocio/cadastroCompra';
import ListagemCompras from '../negocio/listagemCompras';
import EditarCompra from '../negocio/editarCompra';
import ExcluirCompra from '../negocio/excluirCompra';
import Compra from '../modelo/compra';
import Produto from '../modelo/produto';
import Servico from '../modelo/servico';

function importarClientesJSON(empresa: Empresa) {
    const filePath = path.join(__dirname, '../carga/clientes.json');
    try {
        const importador = new ImportacaoClientes(empresa.getClientes());
        importador.importar(filePath);
        console.log(`Dados de clientes importados automaticamente de ${filePath}`);
    } catch (error) {
        console.error(`Erro ao importar clientes: ${error instanceof Error ? error.message : error}`);
    }
}

function importarProdutosJSON(empresa: Empresa) {
    const filePath = path.join(__dirname, '../carga/produtos.json');
    try {
        const importador = new ImportacaoProdutos(empresa.getProdutos());
        importador.importar(filePath);
        console.log(`Dados de produtos importados automaticamente de ${filePath}`);
    } catch (error) {
        console.error(`Erro ao importar produtos: ${error instanceof Error ? error.message : error}`);
    }
}

function importarServicosJSON(empresa: Empresa) {
    const filePath = path.join(__dirname, '../carga/servicos.json');
    try {
        const importador = new ImportacaoServicos(empresa.getServicos());
        importador.importar(filePath);
        console.log(`Dados de serviços importados automaticamente de ${filePath}`);
    } catch (error) {
        console.error(`Erro ao importar serviços: ${error instanceof Error ? error.message : error}`);
    }
}

function importarComprasJSON(empresa: Empresa) {
    const filePath = path.join(__dirname, '../carga/compras.json');
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const comprasData = JSON.parse(data);

        comprasData.forEach((compraJson: any) => {
            const cliente = empresa.getClientes().find(c => c.getId() === compraJson.clienteId);

            if (!cliente) {
                console.warn(`Cliente com ID ${compraJson.clienteId} não encontrado. Compra ignorada.`);
                return;
            }

            const compra = new Compra(
                compraJson.id,
                new Date(compraJson.dataEvento)
            );

            compraJson.produtos.forEach((produto: any) => {
                compra.adicionarProduto(
                    {
                        getId: () => produto.id,
                        getNome: () => produto.nome,
                        getPreco: () => produto.subtotal / produto.quantidade,
                    } as Produto,
                    produto.quantidade
                );
            });

            compraJson.servicos.forEach((servico: any) => {
                compra.adicionarServico(
                    {
                        getId: () => servico.id,
                        getDescricao: () => servico.nome,
                        getPreco: () => servico.subtotal / servico.quantidade,
                    } as Servico,
                    servico.quantidade
                );
            });

            cliente.adicionarCompra(compra);
            empresa.adicionarCompra(compra);
        });

        console.log(`Dados de compras importados automaticamente de ${filePath}`);
    } catch (error) {
        console.error(`Erro ao importar compras: ${error instanceof Error ? error.message : error}`);
    }
}

let empresa = new Empresa();

importarClientesJSON(empresa);
importarProdutosJSON(empresa);
importarServicosJSON(empresa);
importarComprasJSON(empresa);

console.log(`Bem-vindo ao sistema de gerenciamento do Grupo World Beauty`);

let execucao = true;

while (execucao) {
    console.log(`\nOpções do Menu Principal:`);
    console.log(`1 - Gerenciar Clientes`);
    console.log(`2 - Gerenciar Produtos`);
    console.log(`3 - Gerenciar Serviços`);
    console.log(`4 - Gerenciar Compras`);
    console.log(`0 - Sair`);

    let entrada = new Entrada();
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `);

    switch (opcao) {
        case 1:
            let execucaoClientes = true;
            while (execucaoClientes) {
                console.log(`\nGerenciamento de Clientes:`);
                console.log(`1 - Cadastrar Cliente`);
                console.log(`2 - Listar Clientes`);
                console.log(`3 - Editar Cliente`);
                console.log(`4 - Excluir Cliente`);
                console.log(`0 - Voltar ao Menu Principal`);

                let opcaoClientes = entrada.receberNumero(`Escolha uma opção: `);

                switch (opcaoClientes) {
                    case 1:
                        new CadastroCliente(empresa.getClientes()).cadastrar();
                        break;
                    case 2:
                        let subMenuClientes = true;
                        while (subMenuClientes) {
                            console.log("\nListagem de Clientes:");
                            console.log("1 - Listar Todos os Clientes");
                            console.log("2 - Listar Top 10 Clientes que Mais Consumiram (Produtos e Serviços)");
                            console.log("3 - Listar Top 10 Clientes que Menos Consumiram (Produtos e Serviços)");
                            console.log("4 - Listar Top 5 clientes que mais consumiram em valor");
                            console.log("5 - Listar por gênero");
                            console.log("0 - Voltar");

                            let opcaoSubMenu = entrada.receberNumero("Escolha uma opção: ");

                            switch (opcaoSubMenu) {
                                case 1:
                                    new ListagemClientes(empresa.getClientes()).listar();
                                    break;
                                case 2:
                                    new ListagemClientes(empresa.getClientes()).listarTopClientesPorQuantidade();
                                    break;
                                case 3:
                                    new ListagemClientes(empresa.getClientes()).listarMenosConsumidores();
                                    break;
                                case 4:
                                    new ListagemClientes(empresa.getClientes()).listarTopConsumidoresPorValor();
                                    break;
                                case 5:
                                    new ListagemClientes(empresa.getClientes()).listarPorGenero();
                                    break;
                                case 0:
                                    subMenuClientes = false;
                                    break;
                                default:
                                    console.log("Opção inválida.");
                            }
                        }
                        break;
                    case 3:
                        new EditarCliente(empresa.getClientes()).editar();
                        break;
                    case 4:
                        new ExcluirCliente(empresa.getClientes()).excluir();
                        break;
                    case 0:
                        execucaoClientes = false;
                        break;
                    default:
                        console.log(`Opção inválida.`);
                }
            }
            break;
        case 2:
            let execucaoProdutos = true;
            while (execucaoProdutos) {
                console.log("\nGerenciamento de Produtos:");
                console.log("1 - Cadastrar Produto");
                console.log("2 - Listar Produtos");
                console.log("3 - Editar Produto");
                console.log("4 - Excluir Produto");
                console.log("0 - Voltar ao Menu Principal");

                let opcaoProdutos = entrada.receberNumero("Escolha uma opção: ");

                switch (opcaoProdutos) {
                    case 1:
                        new CadastroProduto(empresa.getProdutos()).cadastrar();
                        break;
                    case 2:
                        new ListagemProdutos(empresa.getProdutos(), empresa.getClientes()).listar();
                        break;
                    case 3:
                        new EditarProduto(empresa.getProdutos()).editar();
                        break;
                    case 4:
                        new ExcluirProduto(empresa.getProdutos()).excluir();
                        break;
                    case 0:
                        execucaoProdutos = false;
                        break;
                    default:
                        console.log("Opção inválida.");
                }
            }
            break;
        case 3:
            let execucaoServicos = true;
            while (execucaoServicos) {
                console.log("\nGerenciamento de Serviços:");
                console.log("1 - Cadastrar Serviço");
                console.log("2 - Listar Serviços");
                console.log("3 - Editar Serviço");
                console.log("4 - Excluir Serviço");
                console.log("0 - Voltar ao Menu Principal");

                let opcaoServicos = entrada.receberNumero("Escolha uma opção: ");

                switch (opcaoServicos) {
                    case 1:
                        new CadastroServico(empresa.getServicos()).cadastrar();
                        break;
                    case 2:
                        new ListagemServicos(empresa.getServicos(), empresa.getClientes()).listar();
                        break;
                    case 3:
                        new EditarServico(empresa.getServicos()).editar();
                        break;
                    case 4:
                        new ExcluirServico(empresa.getServicos()).excluir();
                        break;
                    case 0:
                        execucaoServicos = false;
                        break;
                    default:
                        console.log("Opção inválida.");
                }
            }
            break;
            case 4:
                let execucaoCompras = true;
                while (execucaoCompras) {
                    console.log("\nGerenciamento de Compras:");
                    console.log("1 - Cadastrar Compra");
                    console.log("2 - Listar Compras");
                    console.log("3 - Listar Produtos Mais Consumidos");
                    console.log("4 - Listar Serviços Mais Consumidos");
                    console.log("5 - Listar Produtos Mais Consumidos por Gênero");
                    console.log("6 - Listar Serviços Mais Consumidos por Gênero");
                    console.log("7 - Editar Compra");
                    console.log("8 - Cancelar Compra");
                    console.log("0 - Voltar ao Menu Principal");
            
                    let opcaoCompras = entrada.receberNumero("Escolha uma opção: ");
            
                    switch (opcaoCompras) {
                        case 1:
                            new CadastroCompra(empresa, empresa.getClientes(), empresa.getProdutos(), empresa.getServicos()).cadastrar();
                            break;
                        case 2:
                            new ListagemCompras(empresa.getCompras(), empresa.getClientes()).listar();
                            break;
                        case 3: // Produtos Mais Consumidos
                            new ListagemProdutos(empresa.getProdutos(), empresa.getClientes()).listarMaisConsumidos();
                            break;
                        case 4: // Serviços Mais Consumidos
                            new ListagemServicos(empresa.getServicos(), empresa.getClientes()).listarMaisConsumidos();
                            break;
                        case 5: // Produtos Mais Consumidos por Gênero
                            new ListagemProdutos(empresa.getProdutos(), empresa.getClientes()).listarProdutosMaisConsumidosPorGenero();
                            break;
                        case 6: // Serviços Mais Consumidos por Gênero
                            new ListagemServicos(empresa.getServicos(), empresa.getClientes()).listarServicosMaisConsumidosPorGenero();
                            break;
                        case 7:
                            new EditarCompra(empresa.getClientes(), empresa.getProdutos(), empresa.getServicos()).editar();
                            break;
                        case 8:
                            new ExcluirCompra(empresa.getClientes()).excluir();
                            break;
                        case 0:
                            execucaoCompras = false;
                            break;
                        default:
                            console.log("Opção inválida.");
                    }
                }
                break;            
        case 0:
            execucao = false;
            console.log(`Até mais!`);
            break;
        default:
            console.log(`Operação não entendida :(`);
    }
}
