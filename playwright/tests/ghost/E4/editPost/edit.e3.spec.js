import { test } from '@playwright/test';
import {Login} from './../../../../pages/login';
import {Utils} from './../../../../pages/utils';
import {Page} from './../../../../pages/page';


// Escenario 3:
// -	Loguearse al sistema
// -	Seleccionar los que están en publicado
// -	Pasarlo a drafo
// -	Volver
// -	Verificar que cambio el estado



test('Escenario 3', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const pageObj = new Page(page);

  pageObj.pathFile = pageObj.pathFile + 'E4/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(pageObj.pathFile, 'e3_00-page_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile, 'e3_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile, 'e3_02-page_listado.png');


  // page en publish
  let pages = await pageObj.publishedPages();
  await utils.screenshot(pageObj.pathFile, 'e3_03-page_listado_pages_publish.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(pageObj.pathFile, 'e3_04-page_editar_original.png');

    const pageTitleBase = await pageObj.pageTitle.inputValue();

    await pageObj.pageUpdateButton.click();
    await utils.waitPlease(100);
    await utils.screenshot(pageObj.pathFile, 'e3_05-page_menu_actualizar.png');

    await pageObj.pageUpdateUnPublishOption.first().click();
    await utils.waitPlease(100);
    await utils.screenshot(pageObj.pathFile, 'e3_06-page_menu_actualizar_unpublicar.png');

    await pageObj.pageUpdateUnPublishConfirm.click();
    await utils.waitPlease(100);
    await utils.screenshot(pageObj.pathFile, 'e3_07-page_menu_actualizar_unpublicar_confirmar.png');


    // hacer clic para volver a los page 
    await pageObj.pagesBack.first().click();
    await utils.waitPlease(500);
    await utils.screenshot(pageObj.pathFile, 'e3_08-page_listado_pages.png');


    pages = await pageObj.draftPages();
    await utils.screenshot(pageObj.pathFile, 'e3_09-page_listado_pages_draft.png');


    let elementFound = false;
    for (let i of pages) {

      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = pageTitleBase.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease(1000);
        await utils.screenshot(pageObj.pathFile, 'e3_10-page_un_published_detalle.png');
        break;
      }
    }


  }




});