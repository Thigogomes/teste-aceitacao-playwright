// tests/lista-de-compras.spec.js
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/'); // usa o baseURL do config
});

// C1 · caminho principal
test('adiciona um item e atualiza o resumo', async ({ page }) => {
  await page.getByLabel('Novo item').fill('Café');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  await expect(page.getByRole('listitem')).toHaveCount(1);
  await expect(page.getByText('Café', { exact: true })).toBeVisible();
  await expect(page.getByText('1 item · 0 concluídos')).toBeVisible();
});

// C2 · regra que barra erro
test('recusa item vazio e mantém a lista intacta', async ({ page }) => {
  await page.getByLabel('Novo item').fill('   ');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  await expect(page.getByRole('alert')).toHaveText('Digite um item antes de adicionar.');
  await expect(page.getByRole('listitem')).toHaveCount(0);
  await expect(page.getByText('Nenhum item na lista.')).toBeVisible();
});

// C3 · regra de estado
test('conclui um item e o estado sobrevive ao recarregar', async ({ page }) => {
  await page.getByLabel('Novo item').fill('Café');
  await page.getByRole('button', { name: 'Adicionar' }).click();

  await page.getByRole('checkbox', { name: 'Concluir Café' }).check();
  await expect(page.getByText('1 item · 1 concluído')).toBeVisible();

  await page.reload();
  await expect(page.getByRole('checkbox', { name: 'Concluir Café' })).toBeChecked();
  await expect(page.getByText('1 item · 1 concluído')).toBeVisible();
});
