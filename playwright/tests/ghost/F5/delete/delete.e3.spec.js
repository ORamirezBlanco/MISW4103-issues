import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 3:

//     Ingreso al sistema
//     Creo una nueva pagina como publicada
//     Verifico que la pagina exista
//     Borro la página
//     Verifico que la página no exista

test('Escenario 3', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F5/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e3_00-page_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e3_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e3_02-page_listado.png');

  await pageObj.createPage('e3_',3);
  await pageObj.publishPage('e3_',5);
  await pageObj.backPage('e3_', 7);

  // page en publish
  let pages = await pageObj.publishedPages();
  await utils.screenshot(pageObj.pathFile, 'e3_08-page_listado_pages_publish.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e3_09-page_editar_original.png');

    await pageObj.pageSettingsButton.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e3_10-page_menu_borrar.png');

    await pageObj.pageSettingsDeleteButton.first().click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e3_11-page_menu_borrar_confirmar.png');

    await pageObj.pageSettingsDeleteButtonConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e3_12-page_menu_borrar_borrado.png');
  }
});