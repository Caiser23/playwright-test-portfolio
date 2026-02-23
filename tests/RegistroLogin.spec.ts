import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe('Pruebas en practice.expandtesting.com', () => {
  test('Registro y login con usuario aleatorio', async ({ page }) => {
    // Crear carpeta screenshots si no existe
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    // Función auxiliar para tomar captura
    const takeScreenshot = async (name: string) => {
      await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    };

    // Genera username solo alfanumérico
    const username = `testuser${Math.floor(Math.random() * 10000)}`;
    const password = 'Test123!';

    // Paso 1: Navegar a la página de registro
    await page.goto('https://practice.expandtesting.com/register');
    await takeScreenshot('01-register-page');

    // Paso 2: Llenar formulario de registro
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password', exact: true }).fill(password);
    await page.getByRole('textbox', { name: 'Confirm Password' }).fill(password);
    await takeScreenshot('02-register-form-filled');

    // Paso 3: Hacer clic en Registrar
    await page.getByRole('button', { name: 'Register' }).click();
    await takeScreenshot('03-after-register-click');

    // Paso 4: Verificar mensaje de éxito
    await page.getByText('Successfully registered, you').click();
    await takeScreenshot('04-register-success');

    // Paso 5: Navegar a login
    await page.goto('https://practice.expandtesting.com/login');
    await takeScreenshot('05-login-page');

    // Paso 6: Llenar formulario de login
    await page.getByRole('textbox', { name: 'Username' }).fill(username);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await takeScreenshot('06-login-form-filled');

    // Paso 7: Hacer clic en Login
    await page.getByRole('button', { name: 'Login' }).click();
    await takeScreenshot('07-after-login-click');

    // Paso 8: Verificar login exitoso
    await page.getByText('You logged into a secure area!').click();
    await takeScreenshot('08-login-success');

    // Captura final (opcional, ya tenemos muchas)
    await page.screenshot({ path: 'final-state.png', fullPage: true });
  });
});