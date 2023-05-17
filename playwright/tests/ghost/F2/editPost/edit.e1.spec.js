import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 1:

//     Ingreso al sistema
//     Creo un post en borrador
//     Vuelvo a la lista de borradores
//     Selecciono el nuevo post
//     Edito el título del post
//     Vuelvo a la lista de borradores
//     Verifico que el título haya cambiado

test('Escenario 1', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const post = service.post;

  post.pathFile = post.pathFile + 'F2/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e1_00-post_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e1_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e1_02-post_listado.png');

  await post.createPost('e1_', 3);
  await post.backPost('e1_', 5);

  // post en draft
  let posts = await post.draftPost();
  await utils.screenshot(post.pathFile, 'e1_06-post_listado_posts_draft.png');

  post.newPostTitle = await post.getEditTitle();
  
  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e1_07-post_editar_original.png');
    // colocar un titulo al nuevo post
    await post.postTitle.fill(post.newPostTitle);
    await post.postTitleConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e1_08-post_editar_diligenciado.png');

    // hacer clic para volver a los post y dejarlo en draft
    await post.postsBack.first().click();
    await utils.waitPlease();
    await post.selectAllPosts();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e1_09-post_listado_posts.png');

    posts = await post.draftPost();
    await utils.screenshot(post.pathFile, 'e1_10-post_listado_posts_draft.png');

    let elementFound = false;
    for (let i of posts) {
      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = post.newPostTitle.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease();
        await utils.screenshot(post.pathFile, 'e1_11-post_draft_detalle.png');
        break;
      }
    }
  }
});