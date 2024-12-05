# Sistema de Gerenciamento do Grupo World Beauty

Objetivo: ddesenvolver uma agenda de cliente para o Grupo WB (CLI - Command-line Interface).

Este sistema oferece diversas funcionalidades para gerenciar clientes, produtos, serviços e compras.

# Observação Importante

Para que o cliente possa realizar os devidos testes nessa aplicação desenvolvida por nossa equipe, criamos uma pasta dentro de source (src) chamada carga. Ao iniciar o sistema, automaticamente já são carregados os arquivos:

- clientes.json
- compras.json
- produtos.json
- servicos.json

Segue endereço:

```bash
./src/carga
```

### Estrutura do Menu e Submenus

```java
Menu Principal
  ├── Gerenciar Clientes
  │     ├── Cadastrar Cliente
  │     ├── Listar Clientes
  │     │     ├── Listar Todos os Clientes
  │     │     ├── Top 10 Clientes que Mais Consumiram
  │     │     ├── Top 10 Clientes que Menos Consumiram
  │     │     ├── Top 5 Clientes por Valor Consumido
  │     │     └── Listar Clientes por Gênero
  │     ├── Editar Cliente
  │     └── Excluir Cliente
  ├── Gerenciar Produtos
  │     ├── Cadastrar Produto
  │     ├── Listar Produtos
  │     ├── Editar Produto
  │     └── Excluir Produto
  ├── Gerenciar Serviços
  │     ├── Cadastrar Serviço
  │     ├── Listar Serviços
  │     ├── Editar Serviço
  │     └── Excluir Serviço
  └── Gerenciar Compras
        ├── Cadastrar Compra
        ├── Listar Compras
        ├── Produtos Mais Consumidos
        ├── Serviços Mais Consumidos
        ├── Produtos Mais Consumidos por Gênero
        ├── Serviços Mais Consumidos por Gênero
        ├── Editar Compra
        └── Cancelar Compra
```

### Instruções de Uso

1. Ao iniciar o sistema, escolha a opção desejada no menu principal.
2. Navegue pelos submenus para realizar ações específicas.
3. As listagens oferecem relatórios organizados para tomada de decisão.
4. Utilize as opções de edição e exclusão com cuidado, pois impactam os registros existentes.

Para a execução do sistema, deve-se digitar no terminal:

```bash
./npm start
```


# Menu Principal
- **1 - Gerenciar Clientes**
- **2 - Gerenciar Produtos**
- **3 - Gerenciar Serviços**
- **4 - Gerenciar Compras**
- **0 - Sair**

---

## 1. Gerenciar Clientes (submenu)
- **1 - Cadastrar Cliente**

Aqui você pode realizar o cadsatramento de um cliente.

- **2 - Listar Clientes**

Nesse submenu de Gerenciar Clientes, na opção número 2 você poderá listar os clientes de algumas formas, e parte delas foi determinada pelo cliente (Grupo WB).

  - **1 - Listar Todos os Clientes**
  - **2 - Listar Top 10 Clientes que Mais Consumiram (Produtos e Serviços)**

  Atendimento da funcionalidade #1.

  - **3 - Listar Top 10 Clientes que Menos Consumiram (Produtos e Serviços)**

  Atendimento da funcionalidade #5.

  - **4 - Listar Top 5 Clientes que Mais Consumiram em Valor (R$)**

  Atendimento da funcionalidade #6.

  - **5 - Listar Clientes por Gênero**

  Atendimento da funcionalide #2.

  - **0 - Voltar**
- **3 - Editar Cliente**

É possível realizar a edição de dados do cliente.

- **4 - Excluir Cliente**

Aqui você poderá exclui-lo. ou seja, somada as funcionalidades acima, temos o CRUD (Create, Read, Update e Delete) completos.

- **0 - Voltar ao Menu Principal**

---

### 2. Gerenciar Produtos
- **1 - Cadastrar Produto**

Cadastro de um produto à lista de produtos comercializados pelo Grupo WB.

- **2 - Listar Produtos**

Listar todos os produtos já previamente cadastrados. Para que a equipe de TI do Grupo WB tenha o devido conhecimento, os produtos estão nesse formato JSON.


```json
# esse é o padrão do arquivo json sobre produtos
[
    {
        "id": 1,
        "nome": "Shampoo Item 1",
        "preco": 133.04
    }
]
```
- **3 - Editar Produto**

O usuário poderá editar um produto.

- **4 - Excluir Produto**

Caso entenda ser necessário, poderá deletar um produto.

- **0 - Voltar ao Menu Principal**

Retorno ao Menu Principal

---

### 3. Gerenciar Serviços
- **1 - Cadastrar Serviço**
- **2 - Listar Serviços**
- **3 - Editar Serviço**
- **4 - Excluir Serviço**
- **0 - Voltar ao Menu Principal**

---

### 4. Gerenciar Compras
- **1 - Cadastrar Compra**

Principais etapas para o cadastramento de um compra:

- a. selecione o ID de um cliente previamente cadastrado. Terá uma lista de clientes logo acima para que seja facilitada essa escolha.
- b.  Virá a seguinte pergunta na sequência: "O que você deseja adicionar na compra?" Selecione: 1 - Produto; 2 - Serviço; 3 - Finalizar Compra
- c. Digitando a opção 1 virá uma lista de produtos já previamente cadastrados. Selecione pelo id (segunda coluna)
- d. informe a quantidade desejada
- e. Logo após essa adição, você voltará para o menu de cadastramento de compras caso queira adicionar mais produtos ou serviços


- **2 - Listar Compras**

Após cadastrar uma compra no item anterior, você poderá acessar "Listar Compras" e verá que o cliente 50 (escolhido como teste) foi adicionado com 2 produtos, totalizando R$ 393.28 (dados simulados para essa apresentação)

- **3 - Listar Produtos Mais Consumidos**

Atendimento da funcionalidade #3.

- **4 - Listar Serviços Mais Consumidos**

Atendimento da funcionalidade #3

- **5 - Listar Produtos Mais Consumidos por Gênero**

Atendimento da funcionalidade #4

- **6 - Listar Serviços Mais Consumidos por Gênero**

Atendimento da funcionalidade #4.

- **7 - Editar Compra**
- **8 - Cancelar Compra**
- **0 - Voltar ao Menu Principal**

---

### Funcionalidades Detalhadas

#### Gerenciamento de Clientes
- Cadastro, edição e exclusão de clientes.
- Listagem por:
  - Quantidade de consumo (top 10 mais e menos).
  - Gênero.
  - Valor total consumido (top 5 clientes).

#### Gerenciamento de Produtos e Serviços
- Cadastro, edição e exclusão de itens.
- Listagem detalhada dos mais consumidos por gênero ou globalmente.

#### Gerenciamento de Compras
- Registro de compras com detalhamento de produtos e serviços adquiridos.
- Listagem e edição das compras realizadas.
- Cancelamento de compras.




