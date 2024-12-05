import Cliente from "../modelo/cliente";
import * as fs from 'fs';
import CPF from "../modelo/cpf";
import { Genero } from "../modelo/genero";

export default class ImportacaoClientes {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
    }

    public importar(caminhoArquivo: string): void {
        try {
            const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
            const clientesImportados = JSON.parse(dados);

            clientesImportados.forEach((cliente: any) => {
                const cpf = new CPF(cliente.cpf.valor, new Date(cliente.cpf.dataEmissao));
                const genero = cliente.genero as Genero;

                const clienteObj = new Cliente(
                    cliente.id,
                    cliente.nome,
                    cliente.nomeSocial,
                    cpf,
                    genero
                );

                this.clientes.push(clienteObj);
            });

            console.log(`Clientes importados com sucesso!`);
        } catch (erro) {
            console.log(`Erro ao importar clientes: ${(erro as Error).message}`);
        }
    }
}