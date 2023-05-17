import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 1:

//     Ingreso al sistema
//     Creo un nuevo post como publicado
//     Verifico que el post exista
//     Borro el post
//     Verifico que el post no exista

test('Escenario 1', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const post = service.post;

  post.pathFile = post.pathFile + 'F5/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e1_00-post_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e1_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile, 'e1_02-post_listado.png');

  await post.createPost('e1_',3);
  await post.publishPost('e1_',5);
  await post.backPost('e1_', 7);

  // post en publish
  let posts = await post.publishedPost();
  await utils.screenshot(post.pathFile, 'e1_08-post_listado_posts_publish.png');

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e1_09-post_editar_original.png');

    await post.postSettingsButton.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e1_10-post_menu_borrar.png');

    await post.postSettingsDeleteButton.first().click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e1_11-post_menu_borrar_confirmar.png');

    await post.postSettingsDeleteButtonConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e1_12-post_menu_borrar_borrad.png');
  }
});