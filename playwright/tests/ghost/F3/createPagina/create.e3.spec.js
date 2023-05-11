import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 3:

//     Ingreso al sistema
//     Creo una nueva página en borrador
//     Calendarizo la nueva página
//     Verifico que exista la pagina creada como calendarizada

test('Escenario 3', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F3/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(pageObj.pathFile, 'e3_00-page_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile, 'e3_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile, 'e3_02-page_listado.png');

  await pageObj.createPage('e3_',3);
  await pageObj.schedulePost('e3_',5);
  await pageObj.backPage('e3_', 7);

  // hacer clic para volver a los page 
  await pageObj.pagesBack.first().click();

  let pages = await pageObj.scheduledPages(); 
  await utils.screenshot(pageObj.pathFile, 'e3_09-page_listado_pages_scheduled.png');

  let elementFound = false;
  for (let i of pages) {
    let text = await i.innerText()
    text = text.replace(/[^A-Z0-9]/ig, '');
    const textToValidate = pageObj.newPageTitle.replace(/[^A-Z0-9]/ig, '');
    if (text.startsWith(textToValidate)) {
      elementFound = true;
      await i.click();
      await utils.waitPlease(1000);
      await utils.screenshot(pageObj.pathFile, 'e3_10-page_scheduled_detalle.png');
      break;
    }
  }
});