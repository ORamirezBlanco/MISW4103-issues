import { test } from '@playwright/test';
import {Login} from '../../../../pages/login';
import {Utils} from '../../../../pages/utils';
import {Page} from '../../../../pages/page';

// Escenario 2:

//     Ingreso al sistema
//     Creo una nueva página como borrador
//     Vuelvo al listado de página
//     Navego a la nueva página
//     Publico la página
//     Verifico que la nueva página aparezca en el listado como publicada

test('Escenario 2', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const pageObj = new Page(page);

  pageObj.pathFile = pageObj.pathFile + 'F4/';
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

  await pageObj.createPage('e2_',3);
  await pageObj.backPage('e2_',5);
  // page en draft
  let pages = await pageObj.draftPages();
  await utils.screenshot(pageObj.pathFile, 'e2_06-page_listado_pages_draft.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(pageObj.pathFile, 'e2_07-page_editar_original.png');

    const pageTitleBase = await pageObj.pageTitle.inputValue();

    await pageObj.pagePublishButton.click();
    await utils.waitPlease(100);
    await utils.screenshot(pageObj.pathFile, 'e2_08-page_editar_publish_menu.png');

    await pageObj.pagePublishConfirm.click();
    await utils.waitPlease(100);
    await utils.screenshot(pageObj.pathFile, 'e2_09-page_editar_publish_confirm.png');

    await pageObj.backPage('e3_', 10);

    pages = await pageObj.publishedPages();
    await utils.screenshot(pageObj.pathFile, 'e2_11-page_listado_pages_published.png');

    let elementFound = false;
    for (let i of pages) {

      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = pageTitleBase.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease(1000);
        await utils.screenshot(pageObj.pathFile, 'e2_12-page_published_detalle.png');
        break;
      }
    }
  }
});