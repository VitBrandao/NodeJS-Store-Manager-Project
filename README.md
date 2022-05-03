# Habilidades

Nesse projeto, você será capaz de:

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do seu app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.

---

## Desenvolvimento

Você vai desenvolver todas as camadas da API (Models, Services caso necessário, e Controllers).

Através dessa aplicação, será possível realizar as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`, para as pessoas mais mais íntimas 😜).

Você deve utilizar o banco MySQL para a gestão de dados. Além disso, a API deve ser RESTful.

---

# Como desenvolver

## Padrões e conexões - ⚠️ Leia-os atentamente e siga à risca o que for pedido. ⚠️

### Todos os seus endpoints devem estar no padrão REST

- Use os verbos HTTP adequados para cada operação.

- Agrupe e padronize suas URL em cada recurso.

- Garanta que seus endpoints sempre retornem uma resposta, havendo sucesso nas operações ou não.

- Retorne os códigos de status corretos (recurso criado, erro de validação, autorização, etc).

### Cada camada da sua API deve estar em sua respectiva pasta

- Models devem estar na pasta `models`, **na raiz do projeto**

- Services devem estar na pasta `services`, **na raiz do projeto**

- Controllers devem estar na pasta `controllers`, **na raiz do projeto**

- Middlewares devem estar na pasta `middlewares`, **na raiz do projeto**

**:warning: Os diretórios estão criados, não altere os nomes, não mova de lugar e nem os deixe vázio :warning:**

### Para escrever seus própios arquivos de teste

- Utilize o **mocha**, **chai** e **sinon** para escrever seus testes

- Coloque todos os testes de `models`, `services` e `controllers` dentro da pasta `test/unit` 

**Nota**: É preciso criar a pasta `unit` dentro da pasta `test`.

**Dica**: Aqui uma sugestão de arquivos para criar os teste unitários:
```tree
.
├─ ...
├─ test                              
│   └─ unit  
|       ├─ controllers
│            ├─ productsControllers.js
│            └─ salesControllers.js 
|       ├─ services   
│            ├─ productsServices.js            
│            └─ salesServices.js 
|       └─ models
│            ├─ productsModels.js 
│            └─ salesModels.js 
└─ ...
```
