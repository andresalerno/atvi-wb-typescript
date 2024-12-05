import promptSync from "prompt-sync";
export default class Entrada {
    public receberNumero(mensagem: string): number {
        let prompt = promptSync();
        let numero: number;
    
        while (true) {
            let valor = prompt(mensagem).trim(); // Remove espaços extras ou caracteres invisíveis
            numero = Number(valor);
    
            if (!isNaN(numero)) {
                return numero;
            } else {
                console.log("Valor inválido. Digite um número válido.");
            }
        }
    }
    
    
    public receberTexto(mensagem: string): string {
        let prompt = promptSync();
        let texto = prompt(mensagem)
        return texto
    }
}