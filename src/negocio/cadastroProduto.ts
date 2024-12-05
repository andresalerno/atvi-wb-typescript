import Entrada from "../io/entrada";
import Produto from "../modelo/produto";

export default class CadastroProduto {
    private produtos: Array<Produto>;

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos;
    }

    public cadastrar(): void {
        let entrada = new Entrada();
        let id = this.produtos.length + 1;
        let nome = entrada.receberTexto("Informe o nome do produto: ");
        let preco = entrada.receberNumero("Informe o preço do produto: ");


        let produto = new Produto(id, nome, preco);
        this.produtos.push(produto);

        console.log("Produto cadastrado com sucesso!");
    }
}
