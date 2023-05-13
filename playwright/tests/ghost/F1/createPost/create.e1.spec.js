import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 1:

//     Ingreso al sistema
//     Navego a crear post
//     Ingreso el titulo del nuevo post
//     Vuelvo al listado de post
//     Verifico que el post creado exista en la lista de post borradores

test('Escenario 1', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const post = service.post;

  post.pathFile = post.pathFile + 'F1/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(post.pathFile,'e1_00-post_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile,'e1_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile,'e1_02-post_listado.png');

  await post.createPost('e1_', 3);
  await post.backPost('e1_', 5);

  let post_drafts =  await post.draftPost();
  await utils.screenshot(post.pathFile,'e1_06-post_listado_posts_draft.png');

  let elementFound = false;
  for (let i of post_drafts) {
    let text = await i.innerText()
    text = text.replace(/[^A-Z0-9]/ig, '');
    if (text.startsWith( post.newPostTitle )) {
      elementFound = true;
      await i.click();
      await utils.waitPlease(500);
      await utils.screenshot(post.pathFile,'e1_07-post_draft_detalle.png');
      break;
    }
  }
});