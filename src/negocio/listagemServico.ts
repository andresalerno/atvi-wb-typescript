import Cliente from "../modelo/cliente";
import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemServicos extends Listagem {
    private servicos: Servico[];
    private clientes: Cliente[]

    constructor(servicos: Servico[], clientes: Cliente[]) {
        super();
        this.servicos = servicos;
        this.clientes = clientes;
    }

    public listar(): void {
        console.log(`\nLista de todos os serviços:`);

        const dadosServicos = this.servicos.map(servico => ({
            ID: servico.getId(),
            Nome: servico.getDescricao(),
            Preço: servico.getPreco().toFixed(2),
        }));

        console.table(dadosServicos);
        console.log(`\n`);
    }

    public listarPorPreco(): void {
        console.log(`\nListando serviços por preço (decrescente):`);

        // Ordenando serviços por preço
        const servicosOrdenados = [...this.servicos].sort((a, b) => b.getPreco() - a.getPreco());

        // Formatando os dados para exibição
        const dadosServicos = servicosOrdenados.map(servico => ({
            ID: servico.getId(),
            Descrição: servico.getDescricao(),
            Preço: servico.getPreco().toFixed(2),
        }));

        console.table(dadosServicos);
        console.log(`\n`);
    }

    public listarMaisConsumidos(): void {
        console.log("\nServiços Mais Consumidos:");
    
        if (!this.clientes || this.clientes.length === 0) {
            console.log("Nenhum cliente encontrado.");
            return;
        }
    
        const servicosConsumidos = this.clientes.flatMap(cliente =>
            cliente.getCompras().flatMap(compra => compra.getServicos())
        );
    
        const servicosAgrupados = servicosConsumidos.reduce((acc, itemCompra) => {
            // Buscando o serviço correspondente na lista de serviços
            const servicoEncontrado = this.servicos.find(servico => servico.getId() === itemCompra.id);
    
            if (!servicoEncontrado) {
                console.warn(`Serviço com ID ${itemCompra.id} não encontrado.`);
                return acc;
            }
    
            if (!acc[servicoEncontrado.getId()]) {
                acc[servicoEncontrado.getId()] = { servico: servicoEncontrado, quantidade: 0 };
            }
            acc[servicoEncontrado.getId()].quantidade += itemCompra.quantidade;
            return acc;
        }, {} as { [id: number]: { servico: Servico; quantidade: number } });
    
        const servicosOrdenados = Object.values(servicosAgrupados)
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 10);
    
        console.table(
            servicosOrdenados.map(item => ({
                Nome: item.servico.getDescricao(),
                Quantidade: item.quantidade,
            }))
        );
    }
    
    

    public listarServicosMaisConsumidosPorGenero(): void {
        console.log("\nServiços Mais Consumidos por Gênero:");
    
        if (!this.clientes || this.clientes.length === 0) {
            console.log("Nenhum cliente encontrado.");
            return;
        }
    
        const servicosPorGenero = this.clientes.reduce((acc, cliente) => {
            const genero = cliente.getGenero();
            if (!acc[genero]) {
                acc[genero] = [];
            }
    
            const servicosConsumidos = cliente.getCompras().flatMap(compra =>
                compra.getServicos().map(itemCompra => ({
                    id: itemCompra.id,
                    quantidade: itemCompra.quantidade,
                }))
            );
    
            acc[genero].push(...servicosConsumidos);
            return acc;
        }, {} as { [key: string]: { id: number; quantidade: number }[] });
    
        Object.entries(servicosPorGenero).forEach(([genero, servicosConsumidos]) => {
            console.log(`\nGênero: ${genero}`);
    
            const servicosAgrupados = servicosConsumidos.reduce((acc, servico) => {
                if (!acc[servico.id]) {
                    acc[servico.id] = { id: servico.id, quantidade: 0 };
                }
                acc[servico.id].quantidade += servico.quantidade;
                return acc;
            }, {} as { [id: number]: { id: number; quantidade: number } });
    
            const servicosComNome = Object.values(servicosAgrupados).map(servicoAgrupado => {
                const servicoOriginal = this.servicos.find(s => s.getId() === servicoAgrupado.id);
                return {
                    nome: servicoOriginal ? servicoOriginal.getDescricao() : "Desconhecido",
                    quantidade: servicoAgrupado.quantidade,
                };
            });
    
            const servicosOrdenados = servicosComNome.sort((a, b) => b.quantidade - a.quantidade);
            console.table(servicosOrdenados.map(servico => ({
                Nome: servico.nome,
                Quantidade: servico.quantidade,
            })));
        });
    }
    
    
}
