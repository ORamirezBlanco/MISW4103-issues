import { test } from '@playwright/test';
import {Login} from '../../../../pages/login';
import {Utils} from '../../../../pages/utils';
import {Post} from '../../../../pages/post';


// Escenario 1:
// -	Loguearse al sistema
// -	Seleccionar post publicado
// -	Borrarlo
// -	Validar



test('Escenario 1', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const post = new Post(page);

  post.pathFile = post.pathFile + 'E5/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(post.pathFile, 'e1_00-post_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e1_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile, 'e1_02-post_listado.png');


  // post en publish
  let posts = await post.publishedPost();
  await utils.screenshot(post.pathFile, 'e1_03-post_listado_posts_publish.png');

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(post.pathFile, 'e1_04-post_editar_original.png');

    await post.postSettingsButton.click();
    await utils.waitPlease(100);
    await utils.screenshot(post.pathFile, 'e1_05-post_menu_borrar.png');

    await post.postSettingsDeleteButton.first().click();
    await utils.waitPlease(100);
    await utils.screenshot(post.pathFile, 'e1_06-post_menu_borrar_confirmar.png');

    await post.postSettingsDeleteButtonConfirm.click();
    await utils.waitPlease(100);
    await utils.screenshot(post.pathFile, 'e1_07-post_menu_borrar_borrad.png');


  }




});