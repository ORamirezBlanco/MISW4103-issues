import { test } from '@playwright/test';
import {Login} from './../../../../pages/login';
import {Utils} from './../../../../pages/utils';
import {Page} from './../../../../pages/page';


// Escenario 2:
// -	Loguearse al sistema
// -	Seleccionar los que están en draft
// -	publicar el primero
// -	Volver
// -	Verificar que cambio el estado


test('Escenario 2', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const pageObj = new Page(page);

  pageObj.pathFile = pageObj.pathFile + 'E4/';
  pageObj.newPageTitle = 'PAGINA EDITADO';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(pageObj.pathFile, 'e2_00-page_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile, 'e2_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile, 'e2_02-page_listado.png');


  // page en draft
  let pages = await pageObj.draftPages();
  await utils.screenshot(pageObj.pathFile, 'e2_03-page_listado_pages_draft.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(pageObj.pathFile, 'e2_04-page_editar_original.png');

    const pageTitleBase = await pageObj.pageTitle.inputValue();

    await pageObj.pagePublishButton.click();
    await utils.waitPlease(100);
    await utils.screenshot(pageObj.pathFile, 'e2_05-page_editar_publish_menu.png');

    await pageObj.pagePublishConfirm.click();
    await utils.waitPlease(100);
    await utils.screenshot(pageObj.pathFile, 'e2_06-page_editar_publish_confirm.png');


    // hacer clic para volver a los page 
    await pageObj.pagesBack.first().click();
    await utils.waitPlease(500);
    await utils.screenshot(pageObj.pathFile, 'e2_07-page_listado_pages.png');


    pages = await pageObj.publishedPages();
    await utils.screenshot(pageObj.pathFile, 'e2_08-page_listado_pages_published.png');


    let elementFound = false;
    for (let i of pages) {

      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = pageTitleBase.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease(1000);
        await utils.screenshot(pageObj.pathFile, 'e2_09-page_published_detalle.png');
        break;
      }
    }


  }




});