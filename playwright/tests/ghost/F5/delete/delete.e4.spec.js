import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 4:

//     Ingreso al sistema
//     Creo una nueva página como borrador
//     Verifico que la página exista
//     Borro la página
//     Verifico que la página no exista

test('Escenario 4', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F5/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e4_00-page_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e4_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile, 'e4_02-page_listado.png');

  await pageObj.createPage('e4_',3);
  await pageObj.backPage('e4_',5);

  // page en draft
  let pages = await pageObj.draftPages();
  await utils.screenshot(pageObj.pathFile, 'e4_06-page_listado_pages_draft.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e4_07-page_editar_original.png');

    await pageObj.pageSettingsButton.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e4_08-page_menu_borrar.png');

    await pageObj.pageSettingsDeleteButton.first().click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e4_09-page_menu_borrar_confirmar.png');

    await pageObj.pageSettingsDeleteButtonConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e4_10-page_menu_borrar_borrad.png');
  }
});