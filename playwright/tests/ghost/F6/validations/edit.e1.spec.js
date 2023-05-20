import { test } from '@playwright/test';
import { Service } from '../../../../pages/service';

// Escenario 1:

//     Ingreso al sistema
//     Creo un post en borrador
//     Vuelvo a la lista de borradores
//     Selecciono el nuevo post
//     Publico el post
//     Voy a la lista de posts publicados
//     Verifico que el post editado exista

test('Escenario 1', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const post = service.post;

  post.pathFile = post.pathFile + 'F6/';

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

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e1_07-post_editar_original.png');

    post.validations = true;
    const newPostTitle = await post.getNewTitle();
    await post.postTitle.fill(newPostTitle);
    await post.postTitleConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e1_08-post_editar_diligenciado.png');
    const postTitleBase = await post.postTitle.inputValue();

    await post.publishPost('e1_', 9);
    await utils.screenshot(post.pathFile, 'e1_09-post_error_posts_not_published.png');
    // hacer clic para volver a los post 

    // Saving failed: Title cannot be longer than 255 characters.
    await post.pagePostTitlePublishError.click();
  }
});