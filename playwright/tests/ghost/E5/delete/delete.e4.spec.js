import { test } from '@playwright/test';
import {Login} from '../../../../pages/login';
import {Utils} from '../../../../pages/utils';
import {Page} from '../../../../pages/page';


// Escenario 1:
// -	Loguearse al sistema
// -	Seleccionar pagina publicado
// -	Borrarlo
// -	Validar



test('Escenario 4', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const pageObj = new Page(page);

  pageObj.pathFile = pageObj.pathFile + 'E5/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(pageObj.pathFile, 'e4_00-page_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile, 'e4_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile, 'e4_02-page_listado.png');


  // page en draft
  let pages = await pageObj.draftPages();
  await utils.screenshot(pageObj.pathFile, 'e4_03-page_listado_pages_publish.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(pageObj.pathFile, 'e4_04-page_editar_original.png');

    await pageObj.pageSettingsButton.click();
    await utils.waitPlease(500);
    await utils.screenshot(pageObj.pathFile, 'e4_05-page_menu_borrar.png');

    await pageObj.pageSettingsDeleteButton.first().click();
    await utils.waitPlease(500);
    await utils.screenshot(pageObj.pathFile, 'e4_06-page_menu_borrar_confirmar.png');

    await pageObj.pageSettingsDeleteButtonConfirm.click();
    await utils.waitPlease(500);
    await utils.screenshot(pageObj.pathFile, 'e4_07-page_menu_borrar_borrad.png');


  }




});