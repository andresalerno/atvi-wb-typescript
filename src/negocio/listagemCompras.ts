import Cliente from "../modelo/cliente";
import Compra from "../modelo/compra";

export default class ListagemCompras {
    private compras: Compra[];
    private clientes: Cliente[];

    constructor(compras: Compra[], clientes: Cliente[]) {
        this.compras = compras;
        this.clientes = clientes;
    }

    public listar(): void {
        if (this.compras.length === 0) {
            console.log(`\nNenhuma compra registrada no sistema.\n`);
            return;
        }

        console.log(`\nListagem de Compras:\n`);

        const dadosCompras = this.compras.map((compra, index) => {
            // Encontrar o cliente associado à compra
            const cliente = this.clientes.find(c => c.getCompras().some(compraCliente => compraCliente.getId() === compra.getId()));
            const nomeCliente = cliente ? cliente.getNome() : "Cliente não encontrado";
            const idCliente = cliente ? cliente.getId() : "N/A";

            const produtos = compra.getProdutos()
                .map(p => `ID: ${p.id}, Qtde: ${p.quantidade}, Subtotal: R$ ${p.subtotal.toFixed(2)}`)
                .join(" | ") || "Nenhum produto";

            const servicos = compra.getServicos()
                .map(s => `ID: ${s.id}, Qtde: ${s.quantidade}, Subtotal: R$ ${s.subtotal.toFixed(2)}`)
                .join(" | ") || "Nenhum serviço";

            return {
                "Compra #": index + 1,
                "ID Compra": compra.getId(),
                "Data do Evento": compra.getDataEvento().toLocaleDateString(),
                "ID Cliente": idCliente,
                "Nome Cliente": nomeCliente,
                Produtos: produtos,
                Serviços: servicos,
                "Total Geral (R$)": compra.getTotalGeral().toFixed(2),
            };
        });

        console.table(dadosCompras);
    }

    public listarPorPreco(): void {
        if (this.compras.length === 0) {
            console.log(`\nNenhuma compra registrada no sistema.\n`);
            return;
        }

        console.log(`\nListagem de Compras Ordenadas por Preço (Total Geral):\n`);

        const comprasOrdenadas = [...this.compras].sort(
            (a, b) => b.getTotalGeral() - a.getTotalGeral()
        );

        const dadosCompras = comprasOrdenadas.map((compra, index) => {
            // Encontrar o cliente associado à compra
            const cliente = this.clientes.find(c => c.getCompras().includes(compra));
            const nomeCliente = cliente ? cliente.getNome() : "Cliente não encontrado";
            const idCliente = cliente ? cliente.getId() : "N/A";

            return {
                "Compra #": index + 1,
                "ID Compra": compra.getId(),
                "Data do Evento": compra.getDataEvento().toLocaleDateString(),
                "ID Cliente": idCliente,
                "Nome Cliente": nomeCliente,
                "Total Geral (R$)": compra.getTotalGeral().toFixed(2),
            };
        });

        console.table(dadosCompras);
    }
}
