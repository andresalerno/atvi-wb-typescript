import CPF from "./cpf";
import Produto from "./produto";
import RG from "./rg";
import Servico from "./servico";
import Telefone from "./telefone";
import { Genero } from "./genero";
import Compra from "./compra";

export default class Cliente {
    private id: number;
    public nome: string;
    public nomeSocial: string;
    private cpf: CPF;
    private rgs: Array<RG>;
    private dataCadastro: Date;
    private telefones: Array<Telefone>;
    private genero: Genero;
    private compras: Compra[];

    constructor(id: number, nome: string, nomeSocial: string, cpf: CPF, genero: Genero) {
        this.id = id;
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.cpf = cpf;
        this.rgs = [];
        this.dataCadastro = new Date();
        this.telefones = [];
        this.genero = genero;
        this.compras = [];
    }

    public getId(): number {
        return this.id;
    }

    public getGenero(): Genero {
        return this.genero;
    }

    public setGenero(genero: Genero): void {
        this.genero = genero;
    }

    public getNome(): string {
        return this.nome;
    }

    public setNome(nome: string): void {
        this.nome = nome;
    }

    public getNomeSocial(): string {
        return this.nomeSocial;
    }

    public setNomeSocial(nomeSocial: string): void {
        this.nomeSocial = nomeSocial;
    }

    public getCpf(): CPF {
        return this.cpf;
    }

    public setCpf(cpf: CPF): void {
        this.cpf = cpf;
    }

    public getRgs(): Array<RG> {
        return this.rgs;
    }

    public getDataCadastro(): Date {
        return this.dataCadastro;
    }

    public getTelefones(): Array<Telefone> {
        return this.telefones;
    }

    public getCompras(): Compra[] {
        return this.compras;
    }

    public adicionarCompra(compra: Compra): void {
        this.compras.push(compra);
    }

    public getProdutosAgrupados(): { produto: Produto; quantidade: number }[] {
        const produtosAgrupados: { [id: number]: { produto: Produto; quantidade: number } } = {};

        this.compras.forEach(compra => {
            compra.getProdutos().forEach(item => {
                if (!produtosAgrupados[item.id]) {
                    produtosAgrupados[item.id] = {
                        produto: new Produto(item.id, item.nome, item.subtotal / item.quantidade),
                        quantidade: 0,
                    };
                }
                produtosAgrupados[item.id].quantidade += item.quantidade;
            });
        });

        return Object.values(produtosAgrupados).sort((a, b) => b.quantidade - a.quantidade);
    }

    public getServicosAgrupados(): { servico: Servico; quantidade: number }[] {
        const servicosAgrupados: { [id: number]: { servico: Servico; quantidade: number } } = {};

        this.compras.forEach(compra => {
            compra.getServicos().forEach(item => {
                if (!servicosAgrupados[item.id]) {
                    servicosAgrupados[item.id] = {
                        servico: new Servico(item.id, item.nome, item.subtotal / item.quantidade),
                        quantidade: 0,
                    };
                }
                servicosAgrupados[item.id].quantidade += item.quantidade;
            });
        });

        return Object.values(servicosAgrupados).sort((a, b) => b.quantidade - a.quantidade);
    }

    public getQuantidadeConsumidaProduto(produto: Produto): number {
        return this.getProdutosAgrupados()
            .find(item => item.produto.getId() === produto.getId())
            ?.quantidade || 0;
    }

    public getQuantidadeConsumidaServico(servico: Servico): number {
        return this.getServicosAgrupados()
            .find(item => item.servico.getId() === servico.getId())
            ?.quantidade || 0;
    }
}
