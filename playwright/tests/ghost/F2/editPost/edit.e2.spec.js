import { test } from '@playwright/test';
import {Login} from '../../../../pages/login';
import {Utils} from '../../../../pages/utils';
import {Post} from '../../../../pages/post';

// Escenario 2:

//     Ingreso al sistema
//     Creo un post en borrador
//     Vuelvo a la lista de borradores
//     Selecciono el nuevo post
//     Publico el post
//     Voy a la lista de posts publicados
//     Verifico que el post editado exista

test('Escenario 2', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const post = new Post(page);

  post.pathFile = post.pathFile + 'F2/';
  post.newPostTitle = 'POST EDITADO';

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
  await post.backPost('e2_', 5);

  // post en draft
  let posts = await post.draftPost();
  await utils.screenshot(post.pathFile, 'e2_06-post_listado_posts_draft.png');

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(post.pathFile, 'e2_07-post_editar_original.png');

    const postTitleBase = await post.postTitle.inputValue();

    await post.publishPost('e2_',8);

    // hacer clic para volver a los post 
    await post.postsBack.first().click();
    await utils.waitPlease(500);
    await utils.screenshot(post.pathFile, 'e2_10-post_listado_posts.png');

    posts = await post.publishedPost();
    await utils.screenshot(post.pathFile, 'e2_11-post_listado_posts_published.png');

    let elementFound = false;
    for (let i of posts) {
      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = postTitleBase.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease(1000);
        await utils.screenshot(post.pathFile, 'e2_12-post_published_detalle.png');
        break;
      }
    }
  }
});