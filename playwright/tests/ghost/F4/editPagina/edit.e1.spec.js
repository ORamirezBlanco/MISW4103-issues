import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 1:

//     Ingreso al sistema
//     Creo una nueva página como borrador
//     Vuelvo al listado de página
//     Navego a la nueva página
//     Edito el titulo de la página
//     Verifico que en el listado el título esté editado

test('Escenario 1', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F4/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e1_00-page_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e1_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile, 'e1_02-page_listado.png');

  await pageObj.createPage('e1_',3);
  await pageObj.backPage('e1_',5);

  // page en draft
  let pages = await pageObj.draftPages();
  await utils.screenshot(pageObj.pathFile, 'e1_06-page_listado_pages_draft.png');

  pageObj.newPageTitle = 'PAGINA EDITADA';

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e1_07-page_editar_original.png');
    // colocar un titulo al nuevo page
    await pageObj.pageTitle.fill(pageObj.newPageTitle);
    await pageObj.pageTitleConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e1_08-page_editar_diligenciado.png');

    // hacer clic para volver a los page y dejarlo en draft
    await pageObj.pagesBack.first().click();
    await utils.waitPlease();
    await pageObj.selectAllPages();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e1_09-page_listado_pages.png');

    pages = await pageObj.draftPages();
    await utils.screenshot(pageObj.pathFile, 'e1_10-page_listado_pages_draft.png');

    let elementFound = false;
    for (let i of pages) {
      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = pageObj.newPageTitle.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease();
        await utils.screenshot(pageObj.pathFile, 'e1_11-page_draft_detalle.png');
        break;
      }
    }
  }
});