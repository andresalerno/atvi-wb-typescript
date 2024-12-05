export default class Servico {
    private id: number;
    private descricao: string;
    private preco: number;

    constructor(id: number, descricao: string, preco: number) {
        this.id = id;
        this.descricao = descricao;
        this.preco = preco;
    }

    public getId(): number {
        return this.id;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public getPreco(): number {
        return this.preco;
    }

    public setDescricao(descricao: string): void {
        this.descricao = descricao;
    }

    public setPreco(preco: number): void {
        this.preco = preco;
    }
}
