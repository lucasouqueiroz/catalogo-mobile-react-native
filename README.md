# Catálogo Interativo Mobile

Aplicativo acadêmico em **React Native com Expo** para listar produtos masculinos e femininos usando a API pública DummyJSON.

## Funcionalidades

- Login simulado com validação de e-mail e senha.
- Armazenamento temporário do usuário com Redux Toolkit.
- Listagem por abas: Masculino e Feminino.
- Consumo da API REST DummyJSON com Axios.
- Tela de detalhes usando o ID do produto na navegação.
- Exibição de nome, imagem, descrição, preço e desconto.
- Estados de carregamento, erro e recarregamento.
- Logout que limpa o estado e retorna ao login.

## Tecnologias

- React Native
- Expo
- Axios
- Redux Toolkit e React Redux
- React Navigation
- DummyJSON API

## Como executar

```bash
git clone https://github.com/lucasouqueiroz/catalogo-mobile-react-native.git
cd catalogo-mobile-react-native
npm install
npx expo start
```

Use o **Expo Go** para ler o QR Code ou pressione `a` para Android, `i` para iOS e `w` para web.

## Credenciais de teste

- E-mail: `aluno@exemplo.com`
- Senha: `123456`

Qualquer e-mail válido e senha com ao menos seis caracteres também funcionam, pois o login é simulado.

## Endpoints utilizados

- Produtos por categoria: `https://dummyjson.com/products/category/{categoria}`
- Produto por ID: `https://dummyjson.com/products/{id}`

### Categorias masculinas

- `mens-shirts`
- `mens-shoes`
- `mens-watches`

### Categorias femininas

- `womens-bags`
- `womens-dresses`
- `womens-jewellery`
- `womens-shoes`
- `womens-watches`

## Estrutura

```text
src/
  components/     Componentes reutilizáveis
  navigation/     Navegação entre Login, Home e Detalhes
  screens/        Telas do aplicativo
  services/       Cliente Axios e acesso à API
  store/          Store e slice Redux de autenticação
  theme/          Cores compartilhadas
```

## Autor

Lucas Queiroz
