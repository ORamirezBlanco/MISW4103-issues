import { test } from '@playwright/test';
import {Login} from './../../../../pages/login';
import {Utils} from './../../../../pages/utils';
import {Page} from './../../../../pages/page';


// Escenario 4:
// -	Loguearse al sistema
// -	Ingresar Titulo
// -	Validar que aparezca el botón borrar

test('Escenario 4', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const pagesObj = new Page(page);

  pagesObj.pathFile = pagesObj.pathFile + 'E3/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(pagesObj.pathFile, 'e4_00-page_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(pagesObj.pathFile, 'e4_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pagesObj.pagesLink.click();
  await utils.screenshot(pagesObj.pathFile, 'e4_02-page_listado.png');


  // hacer clic para crear un nuevo page
  await pagesObj.pageNew.first().click();
  await utils.screenshot(pagesObj.pathFile, 'e4_03-page_crear_vacio.png');

  // colocar un titulo al nuevo page
  await pagesObj.pageTitle.fill(pagesObj.newPageTitle);
  await pagesObj.pageTitleConfirm.click();
  await utils.waitPlease(1000);
  await utils.screenshot(pagesObj.pathFile, 'e4_04-page_crear_diligenciado.png');

  /////////// 


  
  await pagesObj.pageSettingsButton.click();
  await utils.waitPlease(1000);
  await utils.screenshot(pagesObj.pathFile, 'e4_05-page_settings.png');
  
  await pagesObj.pageSettingsDeleteButton.click();
  await utils.waitPlease(1000);
  await utils.screenshot(pagesObj.pathFile, 'e4_06-page_settings_delete.png');

  await pagesObj.pageSettingsCancelButton.click();
  await utils.waitPlease(1000);
  await utils.screenshot(pagesObj.pathFile, 'e4_07-page_settings_cancel.png');

});