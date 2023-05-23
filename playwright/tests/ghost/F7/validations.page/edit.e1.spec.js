import { test } from '@playwright/test';
import { Service } from '../../../../pages/service';

// Escenario 1:

//     Ingreso al sistema
//     Creo un page en borrador
//     Vuelvo a la lista de borradores
//     Selecciono el nuevo page
//     Se actualiza el texto con un string de mas de 255 caracteres
//     Se intenta publicar el page
//     Se identifica un mensaje de error indicando que el texto es largo

test('Escenario 1', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F7/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e1_00-page_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e1_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e1_02-page_listado.png');

  await pageObj.createPage('e1_', 3);
  await pageObj.backPage('e1_', 5);

  // page en draft
  let pages = await pageObj.draftPages();
  await utils.screenshot(pageObj.pathFile, 'e1_06-page_listado_pages_draft.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e1_07-page_editar_original.png');

    pageObj.validations = true;
    const newPageTitle = await pageObj.getNewTitle();
    await pageObj.pageTitle.fill(newPageTitle);
    await pageObj.pageTitleConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e1_08-page_editar_diligenciado.png');

    await pageObj.pagePublishButton.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e1_09-page_crear_publish_menu.png');

    await pageObj.pagePublishConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e1_10-page_crear_publish_confirm.png');

    await utils.screenshot(pageObj.pathFile, 'e1_11-page_error_pages_not_published.png');
    // hacer clic para volver a los page 

  }
});