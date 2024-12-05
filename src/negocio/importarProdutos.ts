import fs from 'fs';
import Produto from "../modelo/produto";

export default class ImportacaoProdutos {
    private produtos: Array<Produto>;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
    }

    public importar(filePath: string): void {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const produtosJSON = JSON.parse(jsonData);

        produtosJSON.forEach((p: { id: number; nome: string; preco: number }) => {
            const produto = new Produto(p.id, p.nome, p.preco);
            this.produtos.push(produto);
        });
    }
}
