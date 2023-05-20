import { test } from '@playwright/test';
import { Service } from '../../../../pages/service';

// Escenario 1:

//     

test('Escenario 3', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const post = service.post;

  post.pathFile = post.pathFile + 'F6/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e3_00-post_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e3_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e3_02-post_listado.png');

  await post.createPost('e3_', 3);
  await post.backPost('e3_', 5);

  // post en draft
  let posts = await post.draftPost();
  await utils.screenshot(post.pathFile, 'e3_06-post_listado_posts_draft.png');

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e3_07-post_editar_original.png');



    await post.postPublishButton.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e3_08-post_crear_publish_menu.png');

    await post.pagePostScheduleCheck.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e3_09-post_crear_publish_schedule_select.png');

    const twoLetters = await post.getWordsError();
    await post.pagePostScheduleDayError.fill(twoLetters);
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e3_10-post_crear_publish_schedule_words.png');


    await post.pagePostScheduleConfirm.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e3_11-post_crear_publish_schedule_error.png');

    await utils.screenshot(post.pathFile, 'e3_12-post_error_posts_not_publish_schedule.png');
    // hacer clic para volver a los post 


  }
});