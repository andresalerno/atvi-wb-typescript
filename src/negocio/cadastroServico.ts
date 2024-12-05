import Entrada from "../io/entrada";
import Servico from "../modelo/servico";

export default class CadastroServico {
    private servicos: Array<Servico>;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
    }

    public cadastrar(): void {
        let entrada = new Entrada();
        let id = this.servicos.length + 1;
        let descricao = entrada.receberTexto("Informe a descrição do serviço: ");
        let preco = entrada.receberNumero("Informe o preço do serviço: ");


        let servico = new Servico(id, descricao, preco);
        this.servicos.push(servico);

        console.log("Serviço cadastrado com sucesso!");
    }
}
