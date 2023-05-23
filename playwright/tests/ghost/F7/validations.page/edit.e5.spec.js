import { test } from '@playwright/test';
import { Service } from '../../../../pages/service';

// Escenario 5:

//     Ingreso al sistema
//     Creo un page en borrador
//     Vuelvo a la lista de borradores
//     Selecciono el nuevo page
//     Entro a las opciones del page
//     Se intenta colocar texto en el campo dia de la publicación
//     Se identifica un mensaje de error indicando que el el formato de hora no es correcto

test('Escenario 5', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F7/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e5_00-page_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e5_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e5_02-page_listado.png');

  await pageObj.createPage('e5_', 3);
  await pageObj.backPage('e5_', 5);

  // page en draft
  let pages = await pageObj.draftPages();
  await utils.screenshot(pageObj.pathFile, 'e5_06-page_listado_pages_draft.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e5_07-page_editar_original.png');


    await pageObj.pageSettingsButton.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e5_08-page_settings_menu.png');


    const twoLetters = await pageObj.getWordsError();
    await pageObj.pagePageSettingsDayError.fill(twoLetters);
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e5_09-page_settings_words.png');


    await pageObj.pagePageSettingsConfirmError.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e5_10-page_settings_error.png');



  }
});