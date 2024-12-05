import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes;
    }

    public listar(): void {
        console.log(`\nLista de todos os clientes:`);

        const dadosClientes = this.clientes.map(cliente => {
            const produtosConsumidos = cliente.getCompras()
                .flatMap(compra => compra.getProdutos())
                .reduce((acc, produto) => {
                    const existente = acc.find(p => p.id === produto.id);
                    if (existente) {
                        existente.quantidade += produto.quantidade;
                    } else {
                        acc.push({ id: produto.id, nome: produto.nome, quantidade: produto.quantidade });
                    }
                    return acc;
                }, [] as { id: number; nome: string; quantidade: number }[])
                .map(p => `${p.nome} (Quantidade: ${p.quantidade})`)
                .join(", ") || "Nenhum produto consumido";

            const servicosConsumidos = cliente.getCompras()
                .flatMap(compra => compra.getServicos())
                .map(servico => `${servico.nome} (${servico.quantidade} unidades)`)
                .join(", ") || "Nenhum serviço consumido";

            return {
                Nome: cliente.getNome(),
                NomeSocial: cliente.getNomeSocial(),
                CPF: cliente.getCpf().getValor, // Ajustando para usar getter
                Genero: cliente.getGenero(),
                ProdutosConsumidos: produtosConsumidos,
                ServicosConsumidos: servicosConsumidos,
            };
        });

        console.table(dadosClientes);
        console.log(`\n`);
    }

    public listarPorValor(): void {
        console.log(`\nListando clientes por valor consumido:`);

        const clientesOrdenados = [...this.clientes].sort((a, b) => {
            const totalA = a.getCompras().reduce((sum, compra) => sum + compra.getTotalGeral(), 0);
            const totalB = b.getCompras().reduce((sum, compra) => sum + compra.getTotalGeral(), 0);
            return totalB - totalA; // Ordem decrescente
        });

        const dadosClientes = clientesOrdenados.map(cliente => ({
            Nome: cliente.getNome(),
            NomeSocial: cliente.getNomeSocial(),
            CPF: cliente.getCpf().getValor,
            ValorConsumido: cliente.getCompras().reduce((sum, compra) => sum + compra.getTotalGeral(), 0),
        }));

        console.table(dadosClientes);
        console.log(`\n`);
    }

    public listarPorProdutosConsumidos(): void {
        console.log(`\nListando clientes por produtos consumidos:`);

        const clientesOrdenados = [...this.clientes].sort((a, b) => {
            const totalA = a.getCompras().flatMap(compra => compra.getProdutos())
                .reduce((sum, produto) => sum + produto.quantidade, 0);
            const totalB = b.getCompras().flatMap(compra => compra.getProdutos())
                .reduce((sum, produto) => sum + produto.quantidade, 0);
            return totalB - totalA; // Ordem decrescente
        });

        const dadosClientes = clientesOrdenados.map(cliente => ({
            Nome: cliente.getNome(),
            NomeSocial: cliente.getNomeSocial(),
            CPF: cliente.getCpf().getValor,
            ProdutosConsumidos: cliente.getCompras().flatMap(compra => compra.getProdutos())
                .reduce((sum, produto) => sum + produto.quantidade, 0),
        }));

        console.table(dadosClientes);
        console.log(`\n`);
    }

    public listarPorGenero(): void {
        console.log(`\nListagem de todos os clientes por gênero:`);
    
        const clientesPorGenero = this.clientes.reduce((acc, cliente) => {
            const genero = cliente.getGenero();
            if (!acc[genero]) {
                acc[genero] = [];
            }
            acc[genero].push(cliente);
            return acc;
        }, {} as { [key: string]: Cliente[] });
    
        const tabela = Object.entries(clientesPorGenero).flatMap(([genero, clientes]) =>
            clientes.map(cliente => ({
                Gênero: genero,
                Nome: cliente.getNome(),
                NomeSocial: cliente.getNomeSocial(),
                CPF: cliente.getCpf().getValor,
                "Total de Compras": cliente.getCompras().length,
                "Valor Total Consumido (R$)": cliente.getCompras().reduce((sum, compra) => sum + compra.getTotalGeral(), 0).toFixed(2),
            }))
        );
    
        console.table(tabela);
    }
    

    public listarTopClientesPorQuantidade(): void {
        console.log(`\nListagem dos 10 clientes que mais consumiram em quantidade:`);

        const clientesConsumidos = this.clientes.map(cliente => {
            const quantidadeConsumida = cliente.getCompras()
                .flatMap(compra => compra.getProdutos())
                .reduce((total, produto) => total + produto.quantidade, 0);

            return { cliente, quantidadeConsumida };
        });

        const top10Clientes = clientesConsumidos.sort((a, b) => b.quantidadeConsumida - a.quantidadeConsumida).slice(0, 10);

        console.table(
            top10Clientes.map(({ cliente, quantidadeConsumida }) => ({
                Nome: cliente.getNome(),
                CPF: cliente.getCpf().getValor,
                Quantidade: quantidadeConsumida,
            }))
        );
    }

    public listarMenosConsumidores(): void {
        console.log("\nListagem dos 10 clientes que menos consumiram produtos ou serviços:");
    
        // Calcular o total de produtos e serviços consumidos por cliente
        const clientesConsumo = this.clientes.map(cliente => {
            const totalProdutos = cliente.getCompras()
                .flatMap(compra => compra.getProdutos())
                .reduce((total, produto) => total + produto.quantidade, 0);
    
            const totalServicos = cliente.getCompras()
                .flatMap(compra => compra.getServicos())
                .reduce((total, servico) => total + servico.quantidade, 0);
    
            return {
                nome: cliente.getNome(),
                cpf: cliente.getCpf().getValor,
                totalConsumido: totalProdutos + totalServicos
            };
        });
    
        // Ordenar os clientes pelo total consumido (crescente)
        const menosConsumidores = clientesConsumo
            .sort((a, b) => a.totalConsumido - b.totalConsumido)
            .slice(0, 10); // Pegar os 10 primeiros
    
        // Exibir a tabela com os resultados
        console.table(
            menosConsumidores.map(cliente => ({
                Nome: cliente.nome,
                CPF: cliente.cpf,
                "Total Consumido": cliente.totalConsumido
            }))
        );
    }
    
    public listarTopConsumidoresPorValor(): void {
        console.log("\nListagem dos 5 clientes que mais consumiram em valor:");
    
        // Calcular o valor total consumido por cliente
        const clientesConsumo = this.clientes.map(cliente => {
            const valorTotalConsumido = cliente.getCompras().reduce((total, compra) => {
                return total + compra.getTotalGeral();
            }, 0);
    
            return {
                nome: cliente.getNome(),
                cpf: cliente.getCpf().getValor,
                valorTotalConsumido: valorTotalConsumido.toFixed(2) // Formatar o valor para 2 casas decimais
            };
        });
    
        // Ordenar os clientes pelo valor total consumido (decrescente)
        const topConsumidores = clientesConsumo
            .sort((a, b) => parseFloat(b.valorTotalConsumido) - parseFloat(a.valorTotalConsumido))
            .slice(0, 5); // Pegar os 5 primeiros
    
        // Exibir a tabela com os resultados
        console.table(
            topConsumidores.map(cliente => ({
                Nome: cliente.nome,
                CPF: cliente.cpf,
                "Valor Total Consumido (R$)": cliente.valorTotalConsumido
            }))
        );
    }
    
}
