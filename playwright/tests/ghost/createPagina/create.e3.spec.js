import { test } from '@playwright/test';
import {Login} from '../../../pages/login';
import {Utils} from '../../../pages/utils';
import {Page} from '../../../pages/page';


// Escenario 3:
// -	Loguearse al sistema
// -	Ingresar Titulo
// -	Publciarlo con calendarizacion
// -	Verificar que este en la lista con calendarización

test('Escenario 3', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const pageObj = new Page(page);

  pageObj.pathFile = pageObj.pathFile + 'E3/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(pageObj.pathFile, 'e3_00-page_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile, 'e3_01-page_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await pageObj.pagesLink.click();
  await utils.screenshot(pageObj.pathFile, 'e3_02-page_listado.png');


  // hacer clic para crear un nuevo post
  await pageObj.pageNew.first().click();
  await utils.screenshot(pageObj.pathFile, 'e3_03-page_crear_vacio.png');

  // colocar un titulo al nuevo post
  await pageObj.pageTitle.fill(pageObj.newPageTitle);
  await pageObj.pageTitleConfirm.click();
  await utils.waitPlease(1000);
  await utils.screenshot(pageObj.pathFile, 'e3_04-page_crear_diligenciado.png');


  await pageObj.pagePublishButton.click();
  await utils.waitPlease(100);
  await utils.screenshot(pageObj.pathFile, 'e3_05-page_crear_publish_menu.png');

/////////

await pageObj.pagePageScheduleCheck.click();
await utils.waitPlease(100);
await utils.screenshot(pageObj.pathFile, 'e3_06-page_crear_publish_schedule_select.png');
// await page.locator('div:nth-child(2) > .gh-publishmenu-radio-button').click();

await pageObj.pagePageScheduleConfirm.click();
await utils.waitPlease(100);
await utils.screenshot(pageObj.pathFile, 'e3_07-page_crear_publish_schedule_confirm.png');

//await page.getByRole('button', { name: 'Schedule', exact: true }).click();



  // hacer clic para volver a los post 
  await pageObj.pagesBack.first().click();
  await utils.waitPlease(500);
  await utils.screenshot(pageObj.pathFile, 'e3_08-page_listado_posts.png');


  let pages = await pageObj.scheduledPages(); 
  await utils.screenshot(pageObj.pathFile, 'e3_09-page_listado_posts_scheduled.png');


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