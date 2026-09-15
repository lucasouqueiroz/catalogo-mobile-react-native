# Urban Store — Catálogo Interativo Mobile

Aplicativo acadêmico de catálogo para e-commerce, desenvolvido com **React Native e Expo**. O projeto simula o acesso de um usuário e permite navegar entre produtos masculinos e femininos, consultar detalhes de cada item e encerrar a sessão.

> Trabalho da disciplina **Mobile Development**. O projeto utiliza uma API REST real, componentes reutilizáveis, navegação entre telas e gerenciamento temporário de autenticação com Redux Toolkit.

## Funcionalidades

- Login simulado com validação de e-mail e senha.
- Armazenamento temporário do usuário autenticado usando Redux Toolkit.
- Catálogo organizado em abas: **Masculino** e **Feminino**.
- Consumo da API DummyJSON com Axios.
- Exibição de carregamento, mensagem de erro e recarregamento por pull-to-refresh.
- Tela de detalhes com imagem, nome, categoria, preço original, preço promocional, desconto e descrição.
- Navegação por ID do produto.
- Logout que remove os dados temporários e retorna à tela de login.
- Layout responsivo: uma coluna em celular, duas em telas médias e até quatro no navegador.

## Tecnologias

| Tecnologia | Finalidade |
|---|---|
| React Native | Construção da interface mobile multiplataforma |
| Expo | Ambiente de desenvolvimento e execução do aplicativo |
| Axios | Requisições HTTP à API REST |
| Redux Toolkit + React Redux | Estado temporário do usuário autenticado |
| React Navigation | Navegação entre Login, Catálogo e Detalhes |
| DummyJSON | API pública de produtos para desenvolvimento |

## Requisitos

- **Node.js LTS** instalado.
- Git instalado.
- Um dos ambientes abaixo:
  - Navegador web (Chrome, Edge ou similar).
  - Expo Go instalado no celular Android/iOS.
  - Android Studio e Android SDK, apenas se desejar usar um emulador Android.

## Execução no Windows PowerShell

### 1. Instalar Node.js

Se `node`, `npm` ou `npx` não forem reconhecidos, instale o Node.js LTS em [nodejs.org](https://nodejs.org/) e feche/abra o PowerShell após a instalação.

Valide a instalação:

```powershell
node -v
npm -v
```

### 2. Permitir scripts do npm no PowerShell

Se o PowerShell informar que `npm.ps1` não pode ser carregado porque a execução de scripts está desabilitada, execute uma única vez:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Quando solicitado, confirme com `S` ou `Y`.

### 3. Clonar e iniciar o projeto

```powershell
git clone https://github.com/lucasouqueiroz/catalogo-mobile-react-native.git
cd catalogo-mobile-react-native
npm install
npx expo start
```

> Execute os comandos dentro da pasta `catalogo-mobile-react-native`. Se estiver em `C:\Users\lucas`, o npm não encontrará o arquivo `package.json`.

### 4. Abrir o aplicativo

Após `npx expo start`, escolha uma opção no terminal:

| Tecla / ação | Resultado |
|---|---|
| `w` | Abre o projeto no navegador web |
| Ler o QR Code | Abre no Expo Go do celular |
| `a` | Abre no emulador Android, se Android Studio/SDK estiverem instalados |
| `r` | Recarrega o aplicativo |
| `Ctrl + C` | Encerra o servidor Expo |

## Execução no celular com Expo Go

1. Instale o aplicativo **Expo Go** no celular.
2. Conecte computador e celular à mesma rede Wi-Fi.
3. Rode `npx expo start` no terminal, dentro da pasta do projeto.
4. Abra o Expo Go e leia o QR Code exibido no terminal.
5. Caso a rede local bloqueie a conexão, no terminal do Expo altere o modo de conexão para **Tunnel**.

## Compatibilidade web

As dependências de web já estão configuradas no projeto. Se você clonou uma versão antiga e o Expo solicitar suporte web, execute dentro da pasta do projeto:

```powershell
npx expo install react-dom react-native-web @expo/metro-runtime
```

Depois, rode novamente:

```powershell
npx expo start
```

## Problemas comuns

### `npm` ou `npx` não é reconhecido

O Node.js não está instalado ou o terminal ainda não foi reiniciado. Instale a versão LTS e abra um novo PowerShell.

### `npm.ps1` não pode ser carregado

Execute:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### `package.json` não existe

Você está na pasta incorreta. Use:

```powershell
cd C:\Users\lucas\catalogo-mobile-react-native
```

Em seguida, rode `npm install`.

### `adb` não é reconhecido ou Android SDK não foi encontrado

Isso significa que o Android Studio/SDK não está instalado. Não é necessário para testar no navegador (`w`) ou no Expo Go. Para emulador Android, instale o Android Studio e configure o Android SDK.

### Dependência ausente ou erro após atualizar o projeto

No PowerShell, dentro da pasta do projeto:

```powershell
git pull
npm install
npx expo start
```

## Credenciais de teste

```text
E-mail: aluno@exemplo.com
Senha: 123456
```

O login é simulado. Também são aceitos outros e-mails válidos e senhas com seis ou mais caracteres.

## API utilizada

- Produtos por categoria: `https://dummyjson.com/products/category/{categoria}`
- Detalhes por ID: `https://dummyjson.com/products/{id}`
- Documentação: [DummyJSON Products](https://dummyjson.com/docs/products)

### Categorias obrigatórias implementadas

**Masculino**

- `mens-shirts`
- `mens-shoes`
- `mens-watches`

**Feminino**

- `womens-bags`
- `womens-dresses`
- `womens-jewellery`
- `womens-shoes`
- `womens-watches`

## Estrutura do projeto

```text
src/
├── components/       # ProductCard, Loading e ErrorMessage
├── navigation/       # Navegação entre as telas
├── screens/          # Login, Home e detalhes do produto
├── services/         # Cliente Axios e funções da API
├── store/            # Store Redux e slice de autenticação
└── theme/            # Tokens de cor da interface
```

## Checklist de testes

- [ ] Validar o login com campos vazios, e-mail inválido e senha curta.
- [ ] Fazer login com `aluno@exemplo.com` e `123456`.
- [ ] Alternar entre abas Masculino e Feminino.
- [ ] Abrir detalhes de produtos diferentes.
- [ ] Conferir imagem, nome, preço, desconto e descrição.
- [ ] Testar a atualização da lista puxando-a para baixo no celular.
- [ ] Clicar em **Sair** e confirmar o retorno ao login.
- [ ] Abrir no navegador e verificar a grade responsiva ao alterar o tamanho da janela.

## Autor

**Lucas Queiroz**

- GitHub: [@lucasouqueiroz](https://github.com/lucasouqueiroz)

## Licença

Projeto acadêmico desenvolvido para a disciplina de **Mobile Development**.
