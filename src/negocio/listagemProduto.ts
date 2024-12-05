import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class ListagemProdutos extends Listagem {
    private produtos: Produto[];
    private clientes: Cliente[];

    constructor(produtos: Array<Produto>, clientes: Array<Cliente>) {
        super();
        this.produtos = produtos;
        this.clientes = clientes;
    }

    public listar(): void {
        console.log(`\nLista de todos os produtos:`);

        const dadosProdutos = this.produtos.map(produto => ({
            ID: produto.getId(),
            Nome: produto.getNome(),
            Preço: produto.getPreco().toFixed(2),
        }));

        console.table(dadosProdutos);
        console.log(`\n`);
    }

    public listarPorPreco(): void {
        console.log(`\nListando produtos por preço (decrescente):`);

        const produtosOrdenados = [...this.produtos].sort((a, b) => b.getPreco() - a.getPreco());

        const dadosProdutos = produtosOrdenados.map(produto => ({
            ID: produto.getId(),
            Nome: produto.getNome(),
            Preço: produto.getPreco().toFixed(2),
        }));

        console.table(dadosProdutos);
        console.log(`\n`);
    }

    public listarMaisConsumidos(): void {
        console.log("\nProdutos Mais Consumidos:");
    
        if (!this.clientes || this.clientes.length === 0) {
            console.log("Nenhum cliente encontrado.");
            return;
        }
    
        // Obtendo todos os produtos consumidos dos clientes
        const produtosConsumidos = this.clientes.flatMap(cliente =>
            cliente.getCompras().flatMap(compra =>
                compra.getProdutos().map(itemCompra => ({
                    id: itemCompra.id,
                    quantidade: itemCompra.quantidade,
                }))
            )
        );
    
        // Agrupando os produtos por ID e somando as quantidades
        const produtosAgrupados = produtosConsumidos.reduce((acc, produto) => {
            if (!acc[produto.id]) {
                acc[produto.id] = { id: produto.id, quantidade: 0 };
            }
            acc[produto.id].quantidade += produto.quantidade;
            return acc;
        }, {} as { [id: number]: { id: number; quantidade: number } });
    
        // Associando os nomes dos produtos a partir da lista de produtos
        const produtosComNome = Object.values(produtosAgrupados).map(produtoAgrupado => {
            const produtoOriginal = this.produtos.find(p => p.getId() === produtoAgrupado.id);
            return {
                nome: produtoOriginal ? produtoOriginal.getNome() : "Desconhecido",
                quantidade: produtoAgrupado.quantidade,
            };
        });
    
        // Ordenando os produtos por quantidade consumida
        const produtosOrdenados = produtosComNome.sort((a, b) => b.quantidade - a.quantidade).slice(0, 10);
    
        console.table(produtosOrdenados.map(produto => ({
            Nome: produto.nome,
            Quantidade: produto.quantidade,
        })));
    }
    

    public listarProdutosMaisConsumidosPorGenero(): void {
        console.log("\nProdutos Mais Consumidos por Gênero:");
    
        if (!this.clientes || this.clientes.length === 0) {
            console.log("Nenhum cliente encontrado.");
            return;
        }
    
        const produtosPorGenero = this.clientes.reduce((acc, cliente) => {
            const genero = cliente.getGenero();
            if (!acc[genero]) {
                acc[genero] = [];
            }
    
            const produtosConsumidos = cliente.getCompras().flatMap(compra =>
                compra.getProdutos().map(itemCompra => ({
                    id: itemCompra.id,
                    quantidade: itemCompra.quantidade,
                }))
            );
    
            acc[genero].push(...produtosConsumidos);
            return acc;
        }, {} as { [key: string]: { id: number; quantidade: number }[] });
    
        Object.entries(produtosPorGenero).forEach(([genero, produtosConsumidos]) => {
            console.log(`\nGênero: ${genero}`);
    
            const produtosAgrupados = produtosConsumidos.reduce((acc, produto) => {
                if (!acc[produto.id]) {
                    acc[produto.id] = { id: produto.id, quantidade: 0 };
                }
                acc[produto.id].quantidade += produto.quantidade;
                return acc;
            }, {} as { [id: number]: { id: number; quantidade: number } });
    
            const produtosComNome = Object.values(produtosAgrupados).map(produtoAgrupado => {
                const produtoOriginal = this.produtos.find(p => p.getId() === produtoAgrupado.id);
                return {
                    nome: produtoOriginal ? produtoOriginal.getNome() : "Desconhecido",
                    quantidade: produtoAgrupado.quantidade,
                };
            });
    
            const produtosOrdenados = produtosComNome.sort((a, b) => b.quantidade - a.quantidade);
            console.table(produtosOrdenados.map(produto => ({
                Nome: produto.nome,
                Quantidade: produto.quantidade,
            })));
        });
    }
    
    
}
