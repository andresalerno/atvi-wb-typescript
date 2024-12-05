import Servico from "../modelo/servico";
import * as fs from 'fs';

export default class ImportacaoServicos {
    private servicos: Array<Servico>;

    constructor(servicos: Array<Servico>) {
        this.servicos = servicos;
    }

    public importar(filePath: string): void {
        try {
            // Lendo o conteúdo do arquivo JSON
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            const servicosJSON = JSON.parse(jsonData);

            // Processando os dados do JSON
            servicosJSON.forEach((p: { id: number; descricao: string; preco: number }) => {
                const servico = new Servico(p.id, p.descricao, p.preco);
                this.servicos.push(servico);
            });

            console.log('Serviços importados com sucesso!');
        } catch (error) {
            // Tratando erros de leitura ou parsing
            console.error('Erro ao importar serviços:', error);
        }
    }
}
