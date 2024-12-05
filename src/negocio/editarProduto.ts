import Entrada from "../io/entrada";
import Produto from "../modelo/produto";

export default class EditarProduto {
    private produtos: Array<Produto>;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
    }

    public editar(): void {
        let entrada = new Entrada();
        let id = entrada.receberNumero("Informe o ID do produto a ser editado: ");

        let produto = this.produtos.find(produto => produto.getId() === id);
        if (!produto) {
            console.log("Produto não encontrado.");
            return;
        }

        let novoNome = entrada.receberTexto("Informe o novo nome do produto: ");
        let novoPreco = entrada.receberNumero("Informe o novo preço do produto: ");

        produto.setNome(novoNome);
        produto.setPreco(novoPreco);

        console.log("Produto editado com sucesso!");
    }
}
