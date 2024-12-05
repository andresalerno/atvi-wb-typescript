import Produto from "./produto";
import Servico from "./servico";

interface ItemCompra {
    id: number;
    nome: string;
    quantidade: number;
    subtotal: number;
}

export default class Compra {
    private id: number;
    private dataEvento: Date;
    private produtos: ItemCompra[];
    private servicos: ItemCompra[];
    private totalGeral: number;

    constructor(id: number, dataEvento: Date) {
        this.id = id;
        this.dataEvento = dataEvento;
        this.produtos = [];
        this.servicos = [];
        this.totalGeral = 0;

    }

    private adicionarItem(
        itemList: ItemCompra[],
        item: { id: number; nome: string; preco: number },
        quantidade: number
    ): void {
        if (quantidade <= 0) {
            throw new Error(`A quantidade deve ser maior que zero. Quantidade recebida: ${quantidade}`);
        }

        const existente = itemList.find(i => i.id === item.id);
        if (existente) {
            existente.quantidade += quantidade;
            existente.subtotal += item.preco * quantidade;
        } else {
            itemList.push({
                id: item.id,
                nome: item.nome,
                quantidade: quantidade,
                subtotal: item.preco * quantidade,
            });
        }

        this.recalcularTotalGeral();
    }

    public adicionarProduto(produto: Produto, quantidade: number): void {
        this.adicionarItem(this.produtos, { id: produto.getId(), nome: produto.getNome(), preco: produto.getPreco() }, quantidade);
    }

    public adicionarServico(servico: Servico, quantidade: number): void {
        this.adicionarItem(this.servicos, { id: servico.getId(), nome: servico.getDescricao(), preco: servico.getPreco() }, quantidade);
    }

    public removerProduto(produtoId: number): void {
        this.produtos = this.produtos.filter(produto => produto.id !== produtoId);
        this.recalcularTotalGeral();
    }

    public removerServico(servicoId: number): void {
        this.servicos = this.servicos.filter(servico => servico.id !== servicoId);
        this.recalcularTotalGeral();
    }

    private recalcularTotalGeral(): void {
        const totalProdutos = this.produtos.reduce((total, produto) => total + produto.subtotal, 0);
        const totalServicos = this.servicos.reduce((total, servico) => total + servico.subtotal, 0);
        this.totalGeral = totalProdutos + totalServicos;
    }

    public getId(): number {
        return this.id;
    }

    public getDataEvento(): Date {
        return this.dataEvento;
    }

    public getProdutos(): ItemCompra[] {
        return [...this.produtos]; // Retorna uma cópia
    }

    public getServicos(): ItemCompra[] {
        return [...this.servicos]; // Retorna uma cópia
    }

    public getTotalGeral(): number {
        return this.totalGeral;
    }
}