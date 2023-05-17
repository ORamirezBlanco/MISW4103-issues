import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 4:

//     Ingreso al sistema
//     Creo una nueva página en borrador
//     Verifico que se genere el id de la pagina / verifico que aparezca el botón borrar

test('Escenario 4', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F3/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e4_00-page_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e4_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e4_02-page_listado.png');

  await pageObj.createPage('e4_',3);

  await pageObj.pageSettingsButton.click();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e4_05-page_settings.png');
  
  await pageObj.pageSettingsDeleteButton.click();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e4_06-page_settings_delete.png');

  await pageObj.pageSettingsCancelButton.click();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e4_07-page_settings_cancel.png');

});