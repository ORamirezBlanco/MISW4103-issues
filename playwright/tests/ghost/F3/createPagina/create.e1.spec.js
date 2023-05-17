import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 1:

//     Ingreso al sistema
//     Creo una nueva página en borrador
//     Verifico que exista la pagina creada como borrador

test('Escenario 1', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F3/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile,'e1_00-page_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile,'e1_01-page_principal.png');

  // Hacer clic en pagina para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile,'e1_02-page_listado.png');

  await pageObj.createPage('e1_',3);
  await pageObj.backPage('e1_',5);

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
      await utils.waitPlease();
      await utils.screenshot(pageObj.pathFile,'e1_07-page_draft_detalle.png');
      break;
    }
  }
});