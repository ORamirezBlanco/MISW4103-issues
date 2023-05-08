import { test } from '@playwright/test';
import {Login} from '../../../../pages/login';
import {Utils} from '../../../../pages/utils';
import {Post} from '../../../../pages/post';

// Escenario 2:

//     Ingreso al sistema
//     Navego a crear post
//     Ingreso el titulo del post
//     Publico el nuevo post
//     Vuelvo al listado de post
//     Verifico que el post creado exista en la lista de post publicados

test('Escenario 2', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const post = new Post(page);

  post.pathFile = post.pathFile + 'F1/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(post.pathFile, 'e2_00-post_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e2_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile, 'e2_02-post_listado.png');

  await post.createPost('e2_', 3);
  await post.publishPost('e2_', 5)
  await post.backPost('e2_', 7);

  let post_published = await post.publishedPost(); 
  await utils.screenshot(post.pathFile, 'e2_08-post_listado_posts_published.png');

  let elementFound = false;
  for (let i of post_published) {
    let text = await i.innerText()
    text = text.replace(/[^A-Z0-9]/ig, '');
    if (text.startsWith(post.newPostTitle)) {
      elementFound = true;
      await i.click();
      await utils.waitPlease(1000);
      await utils.screenshot(post.pathFile, 'e2_09-post_published_detalle.png');
      break;
    }
  }
});