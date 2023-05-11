import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 2:

//     Ingreso al sistema
//     Creo una nueva página en borrador
//     Publico la nueva página
//     Verifico que exista la pagina creada como publicada

test('Escenario 2', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F3/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(pageObj.pathFile, 'e2_00-page_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile, 'e2_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile, 'e2_02-page_listado.png');

  await pageObj.createPage('e2_',3);
  await pageObj.publishPage('e2_',5);
  await pageObj.backPage('e2_', 7);

  let pages = await pageObj.publishedPages(); 
  await utils.screenshot(pageObj.pathFile, 'e2_08-page_listado_pages_published.png');

  let elementFound = false;
  for (let i of pages) {
    let text = await i.innerText()
    text = text.replace(/[^A-Z0-9]/ig, '');
    const textToValidate = pageObj.newPageTitle.replace(/[^A-Z0-9]/ig, '');
    if (text.startsWith(textToValidate)) {
      elementFound = true;
      await i.click();
      await utils.waitPlease(1000);
      await utils.screenshot(pageObj.pathFile, 'e2_09-page_published_detalle.png');
      break;
    }
  }
});