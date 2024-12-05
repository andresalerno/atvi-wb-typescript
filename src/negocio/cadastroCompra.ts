import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Compra from "../modelo/compra";
import Empresa from "../modelo/empresa";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";

export default class CadastroCompra {
    private empresa: Empresa;
    private clientes: Cliente[];
    private produtos: Produto[];
    private servicos: Servico[];
    private entrada: Entrada;
    private nextCompraId: number;

    constructor(empresa: Empresa, clientes: Cliente[], produtos: Produto[], servicos: Servico[]) {
        this.empresa = empresa;
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
        this.entrada = new Entrada();
        // Definir o próximo ID de compra com base no maior ID existente
        this.nextCompraId = Math.max(0, ...this.empresa.getCompras().map(c => c.getId())) + 1;
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro de uma nova compra.\n`);

        // Exibir lista de clientes
        console.table(
            this.clientes.map(c => ({
                ID: c.getId(),
                Nome: c.getNome(),
                CPF: c.getCpf().getValor,
            }))
        );

        // Seleção do cliente com validação
        let cliente: Cliente | undefined;
        while (!cliente) {
            const clienteId = this.entrada.receberNumero(`Informe o ID do cliente: `);
            cliente = this.clientes.find(c => c.getId() === clienteId);
            if (!cliente) {
                console.log(`Cliente com ID ${clienteId} não encontrado. Tente novamente.`);
            }
        }

        // Criar uma nova compra
        const compraId = this.nextCompraId++; // Garantir IDs sequenciais
        const dataEvento = new Date();
        const compra = new Compra(compraId, dataEvento);

        let continuarAdicionando = true;

        while (continuarAdicionando) {
            console.log(`\nO que você deseja adicionar à compra?`);
            console.log(`1 - Produto`);
            console.log(`2 - Serviço`);
            console.log(`3 - Finalizar compra`);

            const opcao = this.entrada.receberNumero(`Escolha uma opção: `);

            if (opcao === 1) {
                // Adicionar produto com validação
                let produto: Produto | undefined;
                while (!produto) {
                    console.table(
                        this.produtos.map(p => ({
                            ID: p.getId(),
                            Nome: p.getNome(),
                            Preço: `R$ ${p.getPreco().toFixed(2)}`,
                        }))
                    );
                    const produtoId = this.entrada.receberNumero(`Informe o ID do produto: `);
                    produto = this.produtos.find(p => p.getId() === produtoId);
                    if (!produto) {
                        console.log(`Produto com ID ${produtoId} não encontrado. Tente novamente.`);
                    }
                }
                const quantidade = this.entrada.receberNumero(`Informe a quantidade consumida: `);
                compra.adicionarProduto(produto, quantidade);
                console.log(`Produto adicionado com sucesso!`);
            } else if (opcao === 2) {
                // Adicionar serviço com validação
                let servico: Servico | undefined;
                while (!servico) {
                    console.table(
                        this.servicos.map(s => ({
                            ID: s.getId(),
                            Descrição: s.getDescricao(),
                            Preço: `R$ ${s.getPreco().toFixed(2)}`,
                        }))
                    );
                    const servicoId = this.entrada.receberNumero(`Informe o ID do serviço: `);
                    servico = this.servicos.find(s => s.getId() === servicoId);
                    if (!servico) {
                        console.log(`Serviço com ID ${servicoId} não encontrado. Tente novamente.`);
                    }
                }
                const quantidade = this.entrada.receberNumero(`Informe a quantidade consumida: `);
                compra.adicionarServico(servico, quantidade);
                console.log(`Serviço adicionado com sucesso!`);
            } else if (opcao === 3) {
                // Finalizar compra
                continuarAdicionando = false;
            } else {
                console.log(`Opção inválida.`);
            }
        }

        // Verificar se a compra tem itens
        if (compra.getProdutos().length > 0 || compra.getServicos().length > 0) {
            cliente.adicionarCompra(compra); // Adiciona a compra ao cliente
            this.empresa.adicionarCompra(compra); // Adiciona a compra à empresa

            console.log(`\nCompra registrada com sucesso!`);
            console.table([{
                "ID Compra": compra.getId(),
                "Data do Evento": compra.getDataEvento().toLocaleDateString(),
                "Produtos": compra.getProdutos().map(p => `ID: ${p.id}, Qtde: ${p.quantidade}, Subtotal: R$ ${p.subtotal.toFixed(2)}`).join(" | ") || "Nenhum produto",
                "Serviços": compra.getServicos().map(s => `ID: ${s.id}, Qtde: ${s.quantidade}, Subtotal: R$ ${s.subtotal.toFixed(2)}`).join(" | ") || "Nenhum serviço",
                "Total Geral (R$)": compra.getTotalGeral().toFixed(2),
            }]);

            // Atualizar a tabela com todas as compras
            console.log(`\nTabela de Compras Atualizada:\n`);
            console.table(
                this.empresa.getCompras().map((c, index) => ({
                    "Compra #": index + 1,
                    "ID Compra": c.getId(),
                    "Data do Evento": c.getDataEvento().toLocaleDateString(),
                    "Produtos": c.getProdutos().map(p => `ID: ${p.id}, Qtde: ${p.quantidade}, Subtotal: R$ ${p.subtotal.toFixed(2)}`).join(" | ") || "Nenhum produto",
                    "Serviços": c.getServicos().map(s => `ID: ${s.id}, Qtde: ${s.quantidade}, Subtotal: R$ ${s.subtotal.toFixed(2)}`).join(" | ") || "Nenhum serviço",
                    "Total Geral (R$)": c.getTotalGeral().toFixed(2),
                }))
            );
        } else {
            console.log(`Nenhum item foi adicionado. A compra não foi registrada.`);
        }
    }
}
