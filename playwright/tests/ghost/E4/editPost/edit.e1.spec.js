import { test } from '@playwright/test';
import {Login} from './../../../../pages/login';
import {Utils} from './../../../../pages/utils';
import {Page} from './../../../../pages/page';


// Escenario 1:
// -	Loguearse al sistema
// -	Seleccionar los que están en draft
// -	Cambiar el titulo del primer page
// -	Volver
// -	Verificar que cambie el titulo

test('Escenario 1', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const pageObj = new Page(page);

  pageObj.pathFile = pageObj.pathFile + 'E4/';
  pageObj.newPageTitle = 'PAGINA EDITADA';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(pageObj.pathFile, 'e1_00-page_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile, 'e1_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile, 'e1_02-page_listado.png');


  // page en draft
  let pages = await pageObj.draftPages();
  await utils.screenshot(pageObj.pathFile, 'e1_03-page_listado_pages_draft.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(pageObj.pathFile, 'e1_04-page_editar_original.png');
    // colocar un titulo al nuevo page
    await pageObj.pageTitle.fill(pageObj.newPageTitle);
    await pageObj.pageTitleConfirm.click();
    await utils.waitPlease(1000);
    await utils.screenshot(pageObj.pathFile, 'e1_05-page_editar_diligenciado.png');

    // hacer clic para volver a los page y dejarlo en draft
    await pageObj.pagesBack.first().click();
    await utils.waitPlease(500);
    await pageObj.selectAllPages();
    await utils.waitPlease(500);
    await utils.screenshot(pageObj.pathFile, 'e1_06-page_listado_pages.png');

    pages = await pageObj.draftPages();
    await utils.screenshot(pageObj.pathFile, 'e1_07-page_listado_pages_draft.png');


    let elementFound = false;
    for (let i of pages) {

      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = pageObj.newPageTitle.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease(500);
        await utils.screenshot(pageObj.pathFile, 'e1_08-page_draft_detalle.png');
        break;
      }
    }
  }




});