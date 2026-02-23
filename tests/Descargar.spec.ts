import { test, expect } from '@playwright/test';

test('Descargar archivo con screenshots', async ({ page }) => {
  console.log('🚀 Iniciando prueba de descarga...');
  
  // PASO 1: Ir a la página
  console.log('📱 Navegando a la página de descargas...');
  await page.goto('https://practice.expandtesting.com/download');
  await page.screenshot({ path: 'download-01-pagina-inicial.png', fullPage: true });
  console.log('✅ Página cargada');

  // PASO 2: Verificar que el elemento existe
  console.log('🔍 Buscando archivo para descargar...');
  await expect(page.getByTestId('cdct.jpg')).toBeVisible();
  await page.screenshot({ path: 'download-02-archivo-visible.png' });
  console.log('✅ Archivo encontrado');

  // PASO 3: Configurar la espera de descarga ANTES de hacer click
  console.log('⬇️ Preparando descarga...');
  const downloadPromise = page.waitForEvent('download');
  
  // PASO 4: Hacer click para iniciar descarga
  console.log('🖱️ Haciendo click en el archivo...');
  await page.getByTestId('cdct.jpg').click();
  await page.screenshot({ path: 'download-03-click-realizado.png' });
  console.log('✅ Click realizado');

  // PASO 5: Esperar a que la descarga comience
  console.log('⏳ Esperando que inicie la descarga...');
  const download = await downloadPromise;
  await page.screenshot({ path: 'download-04-descarga-iniciada.png' });
  console.log('✅ Descarga iniciada');

  // PASO 6: Guardar el archivo
  console.log('💾 Guardando archivo...');
  await download.saveAs('cdct-descargado.jpg');
  await page.screenshot({ path: 'download-05-archivo-guardado.png' });
  console.log('✅ Archivo guardado como: cdct-descargado.jpg');

  // PASO 7: Resumen final
  console.log('\n📊 RESUMEN:');
  console.log('===========');
  console.log('✅ 5 screenshots guardados');
  console.log('✅ Archivo descargado correctamente');
  console.log('🎉 Prueba completada con éxito');
});