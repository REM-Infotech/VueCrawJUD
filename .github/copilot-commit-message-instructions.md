# Instruções para Usar o GitHub Copilot em Mensagens de Commit

O GitHub Copilot pode ajudar a sugerir mensagens de commit automaticamente com base nas alterações realizadas no seu código. Veja como utilizar esse recurso:

## 1. Como Usar o Copilot para Mensagens de Commit

1. **Faça alterações nos arquivos do projeto.**
2. Abra o painel de controle de Git no seu editor (ex: Source Control no VS Code).
3. Clique na caixa de mensagem de commit.
4. O Copilot pode sugerir automaticamente uma mensagem baseada nas alterações feitas.
   - No VS Code, por exemplo, você verá a sugestão em cinza-claro.
   - Pressione `Tab` para aceitar ou `Ctrl+Space` para ver mais sugestões.

## 2. Ativando Sugestões de Commit do Copilot

No VS Code:

- Certifique-se de que o Copilot está habilitado.
- O recurso “Copilot for Commit Messages” deve estar ativado (`github.copilot.enableCommitMessageSuggestions`).

## 3. Atalhos Importantes

- Se a sugestão não aparecer automaticamente, escreva `/` na caixa de commit para acionar sugestões.
- Pressione `Ctrl + Space` para exibir sugestões do Copilot.

## 4. Boas Práticas de Mensagens de Commit

- Seja breve, mas descritivo.
  - Exemplo: `Corrige bug na validação de login`
- Use o imperativo:
  - Exemplo: `Adiciona suporte ao upload de arquivos`
- Se for um commit grande, use um título e, na linha seguinte, explique com mais detalhes.

## 5. Detalhamento das Alterações no Body do Commit

- **Após o título, utilize o corpo (body) da mensagem para detalhar as alterações realizadas em cada arquivo.**
- Para cada arquivo modificado, crie uma linha descrevendo o que foi alterado naquele arquivo.

  - Exemplo de estrutura:

    ```
    Corrige bug na validação de login

    - src/login.js: Ajusta a lógica de validação para aceitar emails com caracteres especiais.
    - src/utils/validator.js: Atualiza função de validação de email.
    - tests/login.test.js: Adiciona testes para casos de emails especiais.
    ```

- Esse detalhamento facilita o entendimento das mudanças e a revisão do histórico do projeto.

## 6. Utilize emojis para cada tipo de commit

- Use emojis para indicar o tipo de alteração (exemplo: ✨ nova feature, 🐛 correção de bug, 🔧 ajustes de configuração, etc).
