import { test, expect } from '@playwright/test';

test.describe('Pruebas en practice.expandtesting.com', () => {
  test('Registro y login con usuario aleatorio', async ({ page }) => {
    // Timeout estándar
    test.setTimeout(30000); // 30 segundos

    // Genera username aleatorio
    const username = `testuser${Math.floor(Math.random() * 10000)}`;
    const password = 'Test123!';

    // 1. Registro
    await page.goto('https://practice.expandtesting.com/register');
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Verificar registro exitoso
    await page.waitForSelector('text=Successfully registered', { timeout: 5000 });

    // 2. Login
    await page.goto('https://practice.expandtesting.com/login');
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Verificación final
    await expect(page.getByText('You logged into a secure area!')).toBeVisible({ timeout: 5000 });
    
    // Opcional: una sola captura al final (sin crear carpeta)
    await page.screenshot({ path: 'test-final.png', fullPage: true });
  });
});