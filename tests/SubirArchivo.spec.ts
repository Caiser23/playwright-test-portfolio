import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe('Pruebas en practice.expandtesting.com', () => {
  test('Subir archivo', async ({ page }) => {
    // Aumentar timeout global del test a 1 minuto
    test.setTimeout(60000);

    // Crear carpeta screenshots si no existe
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    // Función para tomar captura y log
    const takeScreenshot = async (name: string) => {
      console.log(`📸 Captura: ${name}`);
      await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
      await page.waitForTimeout(500); // Pequeña pausa para apreciar en video
    };

    // Navegar a la página de upload
    await page.goto('https://practice.expandtesting.com/upload');
    await takeScreenshot('01-upload-page');

    // Esperar a que el input file esté visible
    const fileInput = page.getByTestId('file-input');
    await fileInput.waitFor({ state: 'visible', timeout: 10000 });
    
    // Subir el archivo
    await fileInput.setInputFiles('Opera Instantánea_2026-02-17_183503_www.reddit.com.png');
    await takeScreenshot('02-file-selected');

    // Hacer clic en el botón de submit
    await page.getByTestId('file-submit').click();
    await takeScreenshot('03-after-submit');

    // Verificar que la subida fue exitosa
    await expect(page.getByRole('heading', { name: 'File Uploaded!' })).toBeVisible({ timeout: 10000 });
    await takeScreenshot('04-upload-success');
    
    console.log('✅ Prueba de subida de archivo completada exitosamente');
  });
});