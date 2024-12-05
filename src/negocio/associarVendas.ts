import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";


class AssociarVendas {
    private clientes: Cliente[];
    private produtos: Produto[];
    private servicos: Servico[];

    constructor(clientes: Cliente[], produtos: Produto[], servicos: Servico[]) {
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
    }

    public associar(): void {
        let entrada = new Entrada();
        
        // Selecionar cliente
        let clienteId = entrada.receberNumero("Informe o ID do cliente para associar vendas: ");
        let cliente = this.clientes.find(cliente => cliente.getId() === clienteId);
        
        if (!cliente) {
            console.log("Cliente não encontrado.");
            return;
        }

        // Selecionar produtos consumidos
        let produtosConsumidos: { produto: Produto; quantidade: number }[] = [];
        let continuarProdutos = true;
        while (continuarProdutos) {
            let nomeProduto = entrada.receberTexto("Informe o nome do produto consumido: ");
            let produto = this.produtos.find(produto => produto.getNome() === nomeProduto);
            
            if (produto) {
                let quantidade = entrada.receberNumero("Informe a quantidade consumida: ");
                produtosConsumidos.push({ produto, quantidade });
            } else {
                console.log("Produto não encontrado.");
            }

            let continuar = entrada.receberNumero("Deseja adicionar mais produtos? (1 - Sim, 0 - Não): ");
            if (continuar === 0) {
                continuarProdutos = false;
            }
        }

        // Selecionar serviços consumidos
        let servicosConsumidos: { servico: Servico; quantidade: number }[] = [];
        let continuarServicos = true;
        while (continuarServicos) {
            let nomeServico = entrada.receberTexto("Informe o nome do serviço consumido: ");
            let servico = this.servicos.find(servico => servico.getNome() === nomeServico);

            if (servico) {
                let quantidade = entrada.receberNumero("Informe a quantidade do serviço consumido: ");
                servicosConsumidos.push({ servico, quantidade });
            } else {
                console.log("Serviço não encontrado.");
            }

            let continuar = entrada.receberNumero("Deseja adicionar mais serviços? (1 - Sim, 0 - Não): ");
            if (continuar === 0) {
                continuarServicos = false;
            }
        }

        // Registrar as vendas associadas
        cliente.associarVendaProduto(produtosConsumidos);
        cliente.associarVendaServico(servicosConsumidos);

        console.log(`Vendas associadas com sucesso ao cliente ${cliente.getNome()}.`);
    }
}
