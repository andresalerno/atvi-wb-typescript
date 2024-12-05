import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import Empresa from "../modelo/empresa";
import { Genero } from "../modelo/genero";

export default class EditarCliente {
    private clientes: Array<Cliente>;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
    }

    public editar(): void {
        console.log("Confira na tabela acima o ID do cliente a ser editado:");
        const listaEdicao = this.clientes.map(cliente => ({
            id: cliente.getId(),
            nome: cliente.getNome(),
            nomeSocial: cliente.getNomeSocial(),
            cpf: cliente.getCpf().getValor, // Corrigido para acessar o getter sem parênteses
            genero: cliente.getGenero(),
        }));
        console.table(listaEdicao);

        let entrada = new Entrada();
        let idCliente = entrada.receberNumero("Informe o ID do cliente a ser editado: ");
        let cliente = this.clientes.find(cliente => cliente.getId() === idCliente);

        if (!cliente) {
            console.log("Cliente não encontrado.");
            return;
        }

        console.log(`Cliente encontrado: ${cliente.getNome()}`);

        let novoNome = entrada.receberTexto("Informe o novo nome: ");
        let novoNomeSocial = entrada.receberTexto("Informe o novo nome social: ");
        let novoCpf = entrada.receberTexto("Informe o novo CPF: ");
        let generoOpcao: number;

        do {
            generoOpcao = entrada.receberNumero(
                "Escolha o novo gênero do cliente:\n1. Masculino\n2. Feminino\n3. Outro\n4. Não declarar\n"
            );
            if (![1, 2, 3, 4].includes(generoOpcao)) {
                console.log("Opção inválida. Tente novamente.");
            }
        } while (![1, 2, 3, 4].includes(generoOpcao));

        let novoGenero: Genero;
        switch (generoOpcao) {
            case 1:
                novoGenero = Genero.MASCULINO;
                break;
            case 2:
                novoGenero = Genero.FEMININO;
                break;
            case 3:
                novoGenero = Genero.OUTRO;
                break;
            case 4:
                novoGenero = Genero.NAODECLARAR;
                break;
            default:
                novoGenero = Genero.OUTRO;
        }

        cliente.setNome(novoNome);
        cliente.setNomeSocial(novoNomeSocial);
        cliente.setCpf(new CPF(novoCpf, new Date()));
        cliente.setGenero(novoGenero);

        const listaEdicaoFinalizada = this.clientes.map(cliente => ({
            id: cliente.getId(),
            nome: cliente.getNome(),
            nomeSocial: cliente.getNomeSocial(),
            cpf: cliente.getCpf().getValor,
            genero: cliente.getGenero(),
        }));
        console.table(listaEdicaoFinalizada);

        console.log("Cliente editado com sucesso!");
    }
}


