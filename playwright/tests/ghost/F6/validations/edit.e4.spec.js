import { test } from '@playwright/test';
import { Service } from '../../../../pages/service';

// Escenario 1:

//     Ingreso al sistema
//     Creo un 
test('Escenario 4', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const post = service.post;

  post.pathFile = post.pathFile + 'F6/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e4_00-post_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e4_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e4_02-post_listado.png');

  await post.createPost('e4_', 3);
  await post.backPost('e4_', 5);

  // post en draft
  let posts = await post.draftPost();
  await utils.screenshot(post.pathFile, 'e4_06-post_listado_posts_draft.png');

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e4_07-post_editar_original.png');


    await post.postSettingsButton.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e4_08-post_settings_menu.png');


    const twoLetters = await post.getWordsError();
    await post.pagePostSettingsHourError.fill(twoLetters);
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e4_09-post_settings_words.png');


    await post.pagePostSettingsConfirmError.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e4_10-post_settings_error.png');



  }
});