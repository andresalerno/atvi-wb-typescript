import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";
import Cliente from "../modelo/cliente";
import Compra from "../modelo/compra";
import CompraUtils from "./compraUtils";

export default class EditarCompra {
    private clientes: Cliente[];
    private produtos: Produto[];
    private servicos: Servico[];
    private entrada: Entrada;
    private compraUtils: CompraUtils;

    constructor(clientes: Cliente[], produtos: Produto[], servicos: Servico[]) {
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
        this.entrada = new Entrada();
        this.compraUtils = new CompraUtils();
    }

    public editar(): void {
        console.log(`\nInício da edição de uma compra.\n`);

        const cliente = this.selecionarCliente();
        if (!cliente) return;

        const compra = this.selecionarCompra(cliente);
        if (!compra) return;

        let continuarEditando = true;

        while (continuarEditando) {
            console.log(`\nO que você deseja fazer?`);
            console.log(`1 - Adicionar item`);
            console.log(`2 - Remover item`);
            console.log(`3 - Alterar quantidade`);
            console.log(`4 - Concluir edição`);

            const opcao = this.entrada.receberNumero(`Escolha uma opção: `);

            switch (opcao) {
                case 1:
                    this.adicionarItem(compra);
                    break;
                case 2:
                    this.compraUtils.excluirCompra(cliente); // Reutiliza a lógica de exclusão
                    break;
                case 3:
                    this.alterarQuantidade(compra);
                    break;
                case 4:
                    continuarEditando = false;
                    break;
                default:
                    console.log(`Opção inválida.`);
            }
        }

        console.log(`\nEdição da compra concluída.`);
    }

    private selecionarCliente(): Cliente | null {
        const clienteId = this.entrada.receberNumero(`Informe o ID do cliente: `);
        const cliente = this.clientes.find(c => c.getId() === clienteId);

        if (!cliente) {
            console.log(`Cliente com ID ${clienteId} não encontrado. Operação cancelada.`);
            return null;
        }

        return cliente;
    }

    private selecionarCompra(cliente: Cliente): Compra | null {
        const compras = cliente.getCompras();
        if (compras.length === 0) {
            console.log(`O cliente não possui compras registradas.`);
            return null;
        }

        console.log(`Compras registradas:`);
        compras.forEach((compra, index) => {
            console.log(`ID: ${index + 1}`);
            console.log(`  Data do Evento: ${compra.getDataEvento().toLocaleDateString()}`);
            console.log(`  Total Geral: R$ ${compra.getTotalGeral().toFixed(2)}`);
        });

        const compraIndex = this.entrada.receberNumero(`Informe o ID da compra que deseja editar: `) - 1;

        if (compraIndex < 0 || compraIndex >= compras.length) {
            console.log(`ID de compra inválido. Operação cancelada.`);
            return null;
        }

        return compras[compraIndex];
    }

    private adicionarItem(compra: Compra): void {
        // Implementação do método de adicionar itens
    }

    private alterarQuantidade(compra: Compra): void {
        // Implementação do método de alterar quantidade
    }
}
