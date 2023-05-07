import { test } from '@playwright/test';
import {Login} from './../../../../pages/login';
import {Utils} from './../../../../pages/utils';
import {Page} from './../../../../pages/page';


// Escenario 1:
// -	Loguearse al sistema
// -	Ingresar Titulo
// -	Verificar que este en la lista con draft

test('Escenario 1', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const pageObj = new Page(page);

  pageObj.pathFile = pageObj.pathFile + 'E3/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(pageObj.pathFile,'e1_00-page_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile,'e1_01-page_principal.png');

  // Hacer clic en pagina para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile,'e1_02-page_listado.png');


  // hacer clic para crear un nuevo page
  await pageObj.pageNew.first().click();
  await utils.screenshot(pageObj.pathFile,'e1_03-page_crear_vacio.png');

  // colocar un titulo al nuevo page
  await pageObj.pageTitle.fill(pageObj.newPageTitle);
  await pageObj.pageTitleConfirm.click();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile,'e1_04-page_crear_diligenciado.png');


  // hacer clic para volver a los page y dejarlo en draft
  await pageObj.pagesBack.first().click();
  await utils.waitPlease(500);
  await utils.screenshot(pageObj.pathFile,'e1_05-page_listado_pages.png');

  let pages =  await pageObj.draftPages();
  await utils.screenshot(pageObj.pathFile,'e1_06-page_listado_pages_draft.png');


  let elementFound = false;
  for (let i of pages) {

    let text = await i.innerText()
    text = text.replace(/[^A-Z0-9]/ig, '');
    const textToValidate = pageObj.newPageTitle.replace(/[^A-Z0-9]/ig, '');
    if (text.startsWith(textToValidate)) {
      elementFound = true;
      await i.click();
      await utils.waitPlease(500);
      await utils.screenshot(pageObj.pathFile,'e1_07-page_draft_detalle.png');
      break;
    }
  }

});