import { test } from '@playwright/test';
import { Service } from '../../../../pages/service';

// Escenario 2:

//     Ingreso al sistema
//     Creo un page en borrador
//     Vuelvo a la lista de borradores
//     Selecciono el nuevo page
//     Calendarizo el nuevo page
//     Se intenta colocar texto en el campo hora de la calendarizaci[on]
//     Se identifica un mensaje de error indicando que el el formato de hora no es correcto

test('Escenario 2', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F7/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e2_00-page_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e2_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.waitPlease();
  await utils.screenshot(pageObj.pathFile, 'e2_02-page_listado.png');

  await pageObj.createPage('e2_', 3);
  await pageObj.backPage('e2_', 5);

  // page en draft
  let pages = await pageObj.draftPages();
  await utils.screenshot(pageObj.pathFile, 'e2_06-page_listado_pages_draft.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e2_07-page_editar_original.png');



    await pageObj.pagePublishButton.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e2_08-page_crear_publish_menu.png');

    await pageObj.pagePageScheduleCheck.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e2_09-page_crear_publish_schedule_select.png');

    const twoLetters = await pageObj.getWordsError();
    await pageObj.pagePageScheduleHourError.fill(twoLetters);
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e2_10-page_crear_publish_schedule_words.png');


    await pageObj.pagePageScheduleConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(pageObj.pathFile, 'e2_11-page_crear_publish_schedule_error.png');

    await utils.screenshot(pageObj.pathFile, 'e2_12-page_error_pages_not_publish_schedule.png');
    // hacer clic para volver a los page 


  }
});