import { test } from '@playwright/test';
import {Login} from './../../../../pages/login';
import {Utils} from './../../../../pages/utils';
import {Post} from './../../../../pages/post';


// Escenario 3:
// -	Loguearse al sistema
// -	Seleccionar los que están en publicado
// -	Pasarlo a drafo
// -	Volver
// -	Verificar que cambio el estado



test('Escenario 3', async ({ page }) => {

  const login = new Login(page);
  const utils = new Utils(page);
  const post = new Post(page);

  post.pathFile = post.pathFile + 'E2/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(post.pathFile, 'e3_00-post_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e3_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile, 'e3_02-post_listado.png');


  // post en publish
  let posts = await post.publishedPost();
  await utils.screenshot(post.pathFile, 'e3_03-post_listado_posts_publish.png');

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(post.pathFile, 'e3_04-post_editar_original.png');

    const postTitleBase = await post.postTitle.inputValue();

    await post.postUpdateButton.click();
    await utils.waitPlease(100);
    await utils.screenshot(post.pathFile, 'e3_05-post_menu_actualizar.png');

    await post.postUpdateUnPublishOption.first().click();
    await utils.waitPlease(100);
    await utils.screenshot(post.pathFile, 'e3_06-post_menu_actualizar_unpublicar.png');

    await post.postUpdateUnPublishConfirm.click();
    await utils.waitPlease(100);
    await utils.screenshot(post.pathFile, 'e3_07-post_menu_actualizar_unpublicar_confirmar.png');


    // hacer clic para volver a los post 
    await post.postsBack.first().click();
    await utils.waitPlease(500);
    await utils.screenshot(post.pathFile, 'e3_08-post_listado_posts.png');


    posts = await post.draftPost();
    await utils.screenshot(post.pathFile, 'e3_09-post_listado_posts_draft.png');


    let elementFound = false;
    for (let i of posts) {

      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = postTitleBase.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease(1000);
        await utils.screenshot(post.pathFile, 'e3_10-post_un_published_detalle.png');
        break;
      }
    }


  }




});