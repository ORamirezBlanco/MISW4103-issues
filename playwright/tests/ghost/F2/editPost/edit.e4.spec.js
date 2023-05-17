import { test } from '@playwright/test';
import {Service} from './../../../../pages/service';

// Escenario 4:

//     Ingreso al sistema
//     Creo un post como calendarizado
//     Vuelvo a la lista de calendarizados
//     Selecciono el nuevo post
//     Edito el post como borrador
//     Vuelvo a la lista de borradores
//     Verifico que el post existe como borrador

test('Escenario 4', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const post = service.post;

  post.pathFile = post.pathFile + 'F2/';
  post.newPostTitle = 'POST EDITADO';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e4_00-post_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e4_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile, 'e4_02-post_listado.png');

  await post.createPost('e4_', 3);
  await post.schedulePost('e4_', 5);
  await post.backPost('e4_', 8);

  // post en publish
  let posts = await post.scheduledPost();
  await utils.screenshot(post.pathFile, 'e4_09-post_listado_posts_schedule.png');

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e4_10-post_editar_original.png');

    const postTitleBase = await post.postTitle.inputValue();
 
    await post.postScheduledButton.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e4_11-post_menu_actualizar_schedule.png');

    await post.postUpdateUnPublishOption.first().click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e4_12-post_menu_actualizar_unpublicar.png');

    await post.postUnPublishConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e4_13-post_menu_actualizar_unpublicar_confirmar.png');

    // hacer clic para volver a los post 
    await post.postsBack.first().click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e4_14-post_listado_posts.png');

    posts = await post.draftPost();
    await utils.screenshot(post.pathFile, 'e4_15-post_listado_posts_draft.png');

    let elementFound = false;
    for (let i of posts) {
      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = postTitleBase.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease();
        await utils.screenshot(post.pathFile, 'e4_16-post_un_published_detalle.png');
        break;
      }
    }
  }
});