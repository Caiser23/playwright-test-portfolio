import { test, expect } from '@playwright/test';
import * as fs from 'fs';

test.describe('Pruebas en practice.expandtesting.com', () => {
  test('Agregar y eliminar elementos', async ({ page }) => {
    // Aumentar timeout del test para que no falle por las esperas
    test.setTimeout(120000); // 2 minutos

    // Crear carpeta screenshots si no existe
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    // Función auxiliar para tomar captura y esperar
    const takeScreenshot = async (name: string) => {
      await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
      await page.waitForTimeout(5000); // Esperar 5 segundos después de cada captura
    };

    // 1. Navegar a la página de Add/Remove Elements
    await page.goto('https://practice.expandtesting.com/add-remove-elements');
    await takeScreenshot('01-add-remove-page');

    // 2. Agregar 5 elementos (uno por uno) con captura después de cada clic
    const addButton = page.getByRole('button', { name: 'Add Element' });
    for (let i = 1; i <= 5; i++) {
      await addButton.click();
      await takeScreenshot(`02-after-add-${i}`);
    }

    // 3. Verificar que hay 5 botones "Delete"
    let deleteButtons = page.getByRole('button', { name: 'Delete' });
    await expect(deleteButtons).toHaveCount(5);
    await takeScreenshot('03-five-delete-buttons');

    // 4. Eliminar todos los elementos en orden inverso (siempre el último)
    let count = 5;
    while (count > 0) {
      // Obtener el último botón Delete
      const lastDelete = deleteButtons.last();
      await lastDelete.click();
      await takeScreenshot(`04-after-delete-${5 - count + 1}`);
      // Actualizar el contador y la lista de botones
      count--;
      deleteButtons = page.getByRole('button', { name: 'Delete' });
    }

    // 5. Verificar que ya no hay botones Delete
    await expect(deleteButtons).toHaveCount(0);
    await takeScreenshot('05-all-deleted');
  });
});