# ACEITACAO.md

**Integrantes:** Felipe Gabriel de Carvalho e Thiago Henrique Gomes Feliciano
**App:** Lista de compras (HTML + CSS + JS puro, dados no `localStorage`)

## Como rodar

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

| Teste | O que quebrei | Resultado com o app quebrado | Depois de desfazer |
|---|---|---|---|
| C1 · `lista-de-compras.spec.js:9` | Comentei `itens.push({ nome, feito: false });` em `index.html` (linha 83) | Vermelho: `toHaveCount(1)` esperava 1 e recebeu 0 (o C3 também falhou, pois depende de adicionar o item) | Verde |
| C2 · `lista-de-compras.spec.js:19` | Comentei o bloco `if (!nome) { ... return; }` em `index.html` (linhas 77 a 81) | Vermelho: `getByRole('alert')` não foi encontrado, então o aviso não apareceu (C1 e C3 continuaram verdes) | Verde |
| C3 · `lista-de-compras.spec.js:29` | Comentei `salvar();` no `change` do checkbox em `index.html` (linha 51) | Vermelho: `toBeChecked()` esperava `checked` e recebeu `unchecked` depois do `reload` (C1 e C2 continuaram verdes) | Verde |

Depois de cada quebra, desfiz a alteração e rodei `npx playwright test` de novo: os 3 testes voltaram a passar (`3 passed`).
> Preencham esta tabela depois de rodar de verdade (e guardem um print do vermelho).
