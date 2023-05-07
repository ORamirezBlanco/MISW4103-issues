import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login';
import { UtilsPage } from '../../../pages/utils';
import { PostPage } from '../../../pages/post';


// Escenario 1:
// -	Loguearse al sistema
// -	Seleccionar los que están en draft
// -	Cambiar el titulo del primer post
// -	Volver
// -	Verificar que cambie el titulo

test('Escenario 1', async ({ page }) => {

  const login = new LoginPage(page);
  const utils = new UtilsPage(page);
  const post = new PostPage(page);

  post.pathFile = post.pathFile + 'E2/';
  post.newPostTitle = 'POST EDITADO';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(post.pathFile, 'e1_00-post_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e1_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile, 'e1_02-post_listado.png');


  // post en draft
  let posts = await post.draftPost();
  await utils.screenshot(post.pathFile, 'e1_03-post_listado_posts_draft.png');

  if (posts.length > 0) {
    await posts[0].click();
    await utils.waitPlease(1000);
    await utils.screenshot(post.pathFile, 'e1_04-post_editar_original.png');
    // colocar un titulo al nuevo post
    await post.postTitle.fill(post.newPostTitle);
    await post.postTitleConfirm.click();
    await utils.waitPlease(1000);
    await utils.screenshot(post.pathFile, 'e1_05-post_editar_diligenciado.png');

    // hacer clic para volver a los post y dejarlo en draft
    await post.postsBack.first().click();
    await utils.waitPlease(500);
    await post.selectAllPosts();
    await utils.waitPlease(500);
    await utils.screenshot(post.pathFile, 'e1_06-post_listado_posts.png');

    posts = await post.draftPost();
    await utils.screenshot(post.pathFile, 'e1_07-post_listado_posts_draft.png');


    let elementFound = false;
    for (let i of posts) {

      let text = await i.innerText()
      text = text.replace(/[^A-Z0-9]/ig, '');
      const textToValidate = post.newPostTitle.replace(/[^A-Z0-9]/ig, '');
      if (text.startsWith(textToValidate)) {
        elementFound = true;
        await i.click();
        await utils.waitPlease(500);
        await utils.screenshot(post.pathFile, 'e1_08-post_draft_detalle.png');
        break;
      }
    }
  }




});