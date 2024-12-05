import Cliente from "../modelo/cliente";
import Entrada from "../io/entrada";

export default class CompraUtils {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada();
    }

    public excluirCompra(cliente: Cliente): boolean {
        const compras = cliente.getCompras();

        if (compras.length === 0) {
            console.log(`O cliente não possui compras registradas.`);
            return false;
        }

        console.log(`Compras registradas para o cliente:`);
        compras.forEach((compra, index) => {
            console.log(`ID: ${index + 1}`);
            console.log(`  Data do Evento: ${compra.getDataEvento().toLocaleDateString()}`);
            console.log(`  Total Geral: R$ ${compra.getTotalGeral().toFixed(2)}`);
        });

        const compraIndex = this.entrada.receberNumero(`Informe o ID da compra que deseja excluir: `) - 1;

        if (compraIndex < 0 || compraIndex >= compras.length) {
            console.log(`ID de compra inválido. Operação cancelada.`);
            return false;
        }

        compras.splice(compraIndex, 1);
        console.log(`Compra excluída com sucesso!`);
        return true;
    }
}
