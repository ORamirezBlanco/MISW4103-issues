import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login';
import { UtilsPage } from '../../../pages/utils';
import { PostPage } from '../../../pages/post';


// Escenario 2:
// -	Loguearse al sistema
// -	Seleccionar los que están en draft
// -	publicado
// -	Volver
// -	Verificar que cambio el estado


test('Escenario 2', async ({ page }) => {

  const login = new LoginPage(page);
  const utils = new UtilsPage(page);
  const post = new PostPage(page);

  post.pathFile = post.pathFile + 'E2/';
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


  // post en draft
  let posts = await post.draftPost();
  await utils.screenshot(post.pathFile, 'e2_03-post_listado_posts_draft.png');

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(post.pathFile, 'e2_04-post_editar_original.png');


    await post.postPublishButton.click();
    await utils.waitPlease(100);
    await utils.screenshot(post.pathFile, 'e2_05-post_editar_publish_menu.png');

    await post.postPublishConfirm.click();
    await utils.waitPlease(100);
    await utils.screenshot(post.pathFile, 'e2_06-post_editar_publish_confirm.png');


    // hacer clic para volver a los post 
    await post.postsBack.first().click();
    await utils.waitPlease(500);
    await utils.screenshot(post.pathFile, 'e2_07-post_listado_posts.png');


    posts = await post.publishedPost();
    await utils.screenshot(post.pathFile, 'e2_08-post_listado_posts_published.png');


    let elementFound = false;
    for (let i of posts) {

      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = post.newPostTitle.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease(1000);
        await utils.screenshot(post.pathFile, 'e2_09-post_published_detalle.png');
        break;
      }
    }


  }




});