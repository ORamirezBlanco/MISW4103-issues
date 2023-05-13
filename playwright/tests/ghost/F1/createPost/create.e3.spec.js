import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 3:

//     Ingreso al sistema
//     Creo un nuevo post en borrador
//     Calendarizo el nuevo post
//     Verifico que exista el post creado como calendarizado

test('Escenario 3', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const post = service.post;

  post.pathFile = post.pathFile + 'F1/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(post.pathFile, 'e3_00-post_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e3_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile, 'e3_02-post_listado.png');

  await post.createPost('e3_', 3);
  await post.schedulePost('e3_', 5);
  await post.backPost('e3_', 8);

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