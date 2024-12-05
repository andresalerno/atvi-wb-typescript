import Cliente from "./cliente";
import Compra from "./compra";
import Produto from "./produto";
import Servico from "./servico";

export default class Empresa {
    private clientes: Cliente[];
    private produtos: Produto[];
    private servicos: Servico[];
    private compras: Compra[];

    constructor() {
        this.clientes = [];
        this.produtos = [];
        this.servicos = [];
        this.compras = [];
    }

    public getClientes(): Cliente[] {
        return this.clientes;
    }

    public getProdutos(): Produto[] {
        return this.produtos;
    }

    public getServicos(): Servico[] {
        return this.servicos;
    }

    public getCompras(): Compra[] { // Retorna todas as compras
        return this.compras;
    }

    public adicionarCompra(compra: Compra): void {
        this.compras.push(compra);
    }
}
