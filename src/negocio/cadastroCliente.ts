import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import Cadastro from "./cadastro";
import { Genero } from "../modelo/genero";
import Compra from "../modelo/compra";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente. \n Campos com um asterisco são obrigatórios`);

        let idCliente = this.clientes.length + 1;

        // NOME
        let nome: string;
        do {
            nome = this.entrada.receberTexto(`(*) Por favor informe o nome do cliente: `);
            if (!nome.trim()) {
                console.log(`O nome é obrigatório. Por favor, insira um nome válido.`)
            }
        } while (!nome.trim());

        // NOME SOCIAL
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente:`);

        if (!nomeSocial) {
            console.log("Nenhum nome social foi informado.");
        } else {
            console.log(`Nome social informado: ${nomeSocial}`)
        }
        
        // CPF
        let valor: string;
        do {
            valor = this.entrada.receberTexto(`(*) Por favor informe o número do CPF: `);
            if (!valor.trim()) {
                console.log(`O CPF é obrigatório. Por favor, insira um número válido.`)
            }
        } while (!valor.trim());

        // DATA EMISSÃO CPF
        let data: string;

        do {
            data = this.entrada.receberTexto(`(*) Por favor informe a data de emissão do CPF, no padrão dd/mm/aaaa: `).trim();

            if (!data) {
                console.log(`A data de emissão do CPF é obrigatória. Por favor, informe no padrão dd/mm/aaaa.`);
            } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
                console.log(`Formato inválido. A data deve estar no padrão dd/mm/aaaa.`);
                data = "";
            }
        } while (!data);

        console.log(`Data informada: ${data}`);

        let partes = data.split('/');
        let dia = parseInt(partes[0], 10);
        let mes = parseInt(partes[1], 10) - 1; // Subtrair 1 do mês
        let ano = parseInt(partes[2], 10);
        let dataEmissao = new Date(ano, mes, dia);

        console.log(`Data de emissão processada: ${dataEmissao.toLocaleDateString()}`);

        let cpf = new CPF(valor, dataEmissao);

        console.log(`Selecione o gênero do cliente:`);
        console.log(`1 - Masculino`);
        console.log(`2 - Feminino`);
        console.log(`3 - Outro`);
        console.log(`4 - Não desejo declarar`);

        let generoOpcao = this.entrada.receberNumero(`Escolha uma opção de gênero: `);

        let genero: Genero;
        switch (generoOpcao) {
            case 1:
                genero = Genero.MASCULINO;
                break;
            case 2:
                genero = Genero.FEMININO;
                break;
            case 3:
                genero = Genero.OUTRO;
                break;
            case 4:
                genero = Genero.NAODECLARAR;
                break;
            default:
                console.log("Opção inválida. Gênero padrão 'Outro' será atribuído.");
                genero = Genero.OUTRO;
    }


        let cliente = new Cliente(idCliente, nome, nomeSocial, cpf, genero);
        this.clientes.push(cliente)
        console.log(`\nCadastro concluído :)\n`);
    }
}