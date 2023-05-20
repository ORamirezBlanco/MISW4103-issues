import { test } from '@playwright/test';
import { Service } from '../../../../pages/service';

// Escenario 1:

//     Ingreso al sistema
//     Creo un pos

test('Escenario 5', async ({ page }) => {

  const service = new Service(page);

  const login = service.login;
  const utils = service.utils;
  const post = service.post;

  post.pathFile = post.pathFile + 'F6/';

  await login.gotoLoginPage();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e5_00-post_login.png');
  await login.login();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e5_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.waitPlease();
  await utils.screenshot(post.pathFile, 'e5_02-post_listado.png');

  await post.createPost('e5_', 3);
  await post.backPost('e5_', 5);

  // post en draft
  let posts = await post.draftPost();
  await utils.screenshot(post.pathFile, 'e5_06-post_listado_posts_draft.png');

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e5_07-post_editar_original.png');


    await post.postSettingsButton.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e5_08-post_settings_menu.png');


    const twoLetters = await post.getWordsError();
    await post.pagePostSettingsDayError.fill(twoLetters);
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e5_09-post_settings_words.png');


    await post.pagePostSettingsConfirmError.click();
    await utils.waitPlease();
    await utils.screenshot(post.pathFile, 'e5_10-post_settings_error.png');



  }
});