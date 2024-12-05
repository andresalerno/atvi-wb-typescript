import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CompraUtils from "./compraUtils";

export default class ExcluirCompra {
    private clientes: Cliente[];
    private entrada: Entrada;
    private compraUtils: CompraUtils;

    constructor(clientes: Cliente[]) {
        this.clientes = clientes;
        this.entrada = new Entrada();
        this.compraUtils = new CompraUtils();
    }

    public excluir(): void {
        console.log(`\nInício da exclusão de uma compra.\n`);

        const clienteId = this.entrada.receberNumero(`Informe o ID do cliente: `);
        const cliente = this.clientes.find(c => c.getId() === clienteId);

        if (!cliente) {
            console.log(`Cliente com ID ${clienteId} não encontrado. Operação cancelada.`);
            return;
        }

        this.compraUtils.excluirCompra(cliente);
    }
}
