import Entrada from "../io/entrada";
import Servico from "../modelo/servico";

export default class EditarServico {
    private servicos: Array<Servico>;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
    }

    public editar(): void {
        let entrada = new Entrada();
        let id = entrada.receberNumero("Informe o ID do serviço a ser editado: ");

        let servico = this.servicos.find(servico => servico.getId() === id);
        if (!servico) {
            console.log("Serviço não encontrado.");
            return;
        }

        let novaDescricao = entrada.receberTexto("Informe a nova descrição do serviço: ");
        let novoPreco = entrada.receberNumero("Informe o novo preço do serviço: ");

        servico.setDescricao(novaDescricao);
        servico.setPreco(novoPreco);

        console.log("Serviço editado com sucesso!");
    }
}
