import Entrada from "../io/entrada";
import Produto from "../modelo/produto";

export default class ExcluirProduto {
    private produtos: Array<Produto>;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
    }

    public excluir(): void {
        let entrada = new Entrada();
        let id = entrada.receberNumero("Informe o ID do produto a ser excluído: ");

        let index = this.produtos.findIndex(produto => produto.getId() === id);
        if (index === -1) {
            console.log("Produto não encontrado.");
            return;
        }

        this.produtos.splice(index, 1);
        console.log("Produto excluído com sucesso!");
    }
}
