import { test } from '@playwright/test';
import {Login} from '../../../pages/login';
import {Utils} from '../../../pages/utils';
import {Post} from '../../../pages/post';


// Escenario 3:
// -	Loguearse al sistema
// -	Ingresar Titulo
// -	Publciarlo con calendarizacion
// -	Verificar que este en la lista con calendarización

test('Escenario 3', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const post = new Post(page);

  post.pathFile = post.pathFile + 'E1/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(post.pathFile, 'e3_00-post_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e3_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile, 'e3_02-post_listado.png');


  // hacer clic para crear un nuevo post
  await post.postNew.first().click();
  await utils.screenshot(post.pathFile, 'e3_03-post_crear_vacio.png');

  // colocar un titulo al nuevo post
  await post.postTitle.fill(post.newPostTitle);
  await post.postTitleConfirm.click();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e3_04-post_crear_diligenciado.png');


  await post.postPublishButton.click();
  await utils.waitPlease(100);
  await utils.screenshot(post.pathFile, 'e3_05-post_crear_publish_menu.png');

/////////

await post.pagePostScheduleCheck.click();
await utils.waitPlease(100);
await utils.screenshot(post.pathFile, 'e3_06-post_crear_publish_schedule_select.png');
// await page.locator('div:nth-child(2) > .gh-publishmenu-radio-button').click();

await post.pagePostScheduleConfirm.click();
await utils.waitPlease(100);
await utils.screenshot(post.pathFile, 'e3_07-post_crear_publish_schedule_confirm.png');

//await page.getByRole('button', { name: 'Schedule', exact: true }).click();



  // hacer clic para volver a los post 
  await post.postsBack.first().click();
  await utils.waitPlease(500);
  await utils.screenshot(post.pathFile, 'e3_08-post_listado_posts.png');


  let post_scheduled = await post.scheduledPost(); 
  await utils.screenshot(post.pathFile, 'e3_09-post_listado_posts_scheduled.png');


  let elementFound = false;
  for (let i of post_scheduled) {

    let text = await i.innerText()
    text = text.replace(/[^A-Z0-9]/ig, '');
    if (text.startsWith(post.newPostTitle)) {
      elementFound = true;
      await i.click();
      await utils.waitPlease(1000);
      await utils.screenshot(post.pathFile, 'e3_10-post_scheduled_detalle.png');
      break;
    }
  }

});