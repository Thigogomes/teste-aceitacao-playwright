# ACEITACAO.md

**Integrantes:** _Nome 1_ e _Nome 2_
**App:** Lista de compras (HTML + CSS + JS puro, dados no `localStorage`)

## Como rodar (do zero)

```bash
npm i
npx playwright install chromium   # só na primeira vez
npx playwright test               # sobe o app sozinho (webServer) e roda os 3 testes
npx playwright show-report        # abre o relatório HTML
```

No Linux/WSL, se faltar biblioteca: `npx playwright install --with-deps chromium`.

## Critérios, testes e evidências

| # | Critério (Dado / Quando / Então) | Teste (arquivo:linha) | O que prova | Evidência |
|---|---|---|---|---|
| C1 · Caminho principal | Dado que estou na lista, quando digito "Café" e clico em *Adicionar*, então vejo "Café" na lista e o resumo mostra `1 item · 0 concluídos` | `tests/lista-de-compras.spec.js:9` — *adiciona um item e atualiza o resumo* | O item entra na lista e o resumo é atualizado | `playwright-report/` (verde) |
| C2 · Regra que barra erro | Dado que estou na lista, quando envio só espaços, então vejo "Digite um item antes de adicionar." e a lista continua vazia | `tests/lista-de-compras.spec.js:19` — *recusa item vazio e mantém a lista intacta* | O app recusa entrada inválida, avisa o usuário e não altera a lista | `playwright-report/` (verde) |
| C3 · Regra de estado | Dado que "Café" está na lista, quando marco o item e recarrego a página, então ele continua marcado e o resumo mostra `1 item · 1 concluído` | `tests/lista-de-compras.spec.js:29` — *conclui um item e o estado sobrevive ao recarregar* | O estado é persistido no `localStorage` e sobrevive ao `reload` | `playwright-report/` (verde) |

## Anti-teste (quebrei o app de propósito)

| Teste | O que quebrei | Resultado | Depois de desfazer |
|---|---|---|---|
| C1 | _ex.: comentei `itens.push(...)` em `index.html`_ | _vermelho_ | _verde_ |
| C2 | _ex.: comentei o `if (!nome) {...}` em `index.html`_ | _vermelho_ | _verde_ |
| C3 | _ex.: comentei `salvar()` no `change` do checkbox_ | _vermelho_ | _verde_ |

> Preencham esta tabela depois de rodar de verdade (e guardem um print do vermelho).
