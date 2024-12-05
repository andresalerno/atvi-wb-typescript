import Entrada from "../io/entrada";
import Servico from "../modelo/servico";

export default class ExcluirServico {
    private servicos: Array<Servico>;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
    }

    public excluir(): void {
        let entrada = new Entrada();
        let id = entrada.receberNumero("Informe o ID do serviço a ser excluído: ");

        let index = this.servicos.findIndex(servico => servico.getId() === id);
        if (index === -1) {
            console.log("Serviço não encontrado.");
            return;
        }

        this.servicos.splice(index, 1);
        console.log("Serviço excluído com sucesso!");
    }
}
