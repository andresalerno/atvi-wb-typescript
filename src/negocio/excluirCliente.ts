import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";

export default class ExcluirCliente {
    private clientes: Array<Cliente>;
    
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
    }

    public excluir(): void {
        let entrada = new Entrada();
        let idCliente = entrada.receberNumero("Informe o ID do cliente a ser excluído: ");
        
        let clienteIndex = this.clientes.findIndex(cliente => cliente.getId() === idCliente);
        if (clienteIndex === -1) {
            console.log("Cliente não encontrado.");
            return;
        }
        
        this.clientes.splice(clienteIndex, 1); // Remove o cliente da lista
        
        console.log("Cliente excluído com sucesso!");
    }
}
