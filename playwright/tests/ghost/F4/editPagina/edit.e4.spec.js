import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 4:

//     Ingreso al sistema
//     Creo una nueva página como calendarizada
//     Vuelvo al listado de página
//     Navego a la nueva página
//     Edito la página como borrador
//     Verifico que la nueva página aparezca en el listado como borrador

test('Escenario 4', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const pageObj = service.pageObj;

  pageObj.pathFile = pageObj.pathFile + 'F4/';
  pageObj.newPostTitle = 'POST EDITADO';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(pageObj.pathFile, 'e4_00-page_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile, 'e4_01-page_principal.png');

  // Hacer clic en page para ver el listado de todos los page
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile, 'e4_02-page_listado.png');

  await pageObj.createPage('e4_',3);
  await pageObj.schedulePost('e4_',5);
  await pageObj.backPage('e4_', 7);

  // page en publish
  let pages = await pageObj.scheduledPages();
  await utils.screenshot(pageObj.pathFile, 'e4_08-page_listado_pages_schedule.png');

  if (pages.length > 0) {
    await pages[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(pageObj.pathFile, 'e4_09-page_editar_original.png');

    const pageTitleBase = await pageObj.pageTitle.inputValue();
 
    await pageObj.pageScheduledButton.click();
    await utils.waitPlease(100);
    await utils.screenshot(pageObj.pathFile, 'e4_10-page_menu_actualizar_schedule.png');

    await pageObj.pageUpdateUnPublishOption.first().click();
    await utils.waitPlease(100);
    await utils.screenshot(pageObj.pathFile, 'e4_11-page_menu_actualizar_unpublicar.png');

    await pageObj.pageUnPublishConfirm.click();
    await utils.waitPlease(100);
    await utils.screenshot(pageObj.pathFile, 'e4_12-page_menu_actualizar_unpublicar_confirmar.png');

    await pageObj.backPage('e4_', 13);

    pages = await pageObj.draftPages();
    await utils.screenshot(pageObj.pathFile, 'e4_14-page_listado_pages_draft.png');

    let elementFound = false;
    for (let i of pages) {
      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = pageTitleBase.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease(1000);
        await utils.screenshot(pageObj.pathFile, 'e4_15-page_un_published_detalle.png');
        break;
      }
    }
  }
});