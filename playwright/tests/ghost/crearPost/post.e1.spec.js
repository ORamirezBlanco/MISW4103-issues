import { test, expect } from '@playwright/test';
import {LoginPage} from './../../../pages/login';
import {UtilsPage} from './../../../pages/utils';
import {PostPage} from './../../../pages/post';


// Escenario 1:
// -	Loguearse al sistema
// -	Ingresar Titulo
// -	Verificar que este en la lista con draft

test('Escenario 1', async ({ page }) => {

  const login = new LoginPage(page);
  const utils = new UtilsPage(page);
  const post = new PostPage(page);

  post.pathFile = post.pathFile + 'E1/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(post.pathFile,'e1_00-post_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile,'e1_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile,'e1_02-post_listado.png');


  // hacer clic para crear un nuevo post
  await post.postNew.first().click();
  await utils.screenshot(post.pathFile,'e1_03-post_crear_vacio.png');

  // colocar un titulo al nuevo post
  await post.postTitle.fill(post.newPostTitle);
  await post.postTitleConfirm.click();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile,'e1_04-post_crear_diligenciado.png');


  // hacer clic para volver a los post y dejarlo en draft
  await post.postsBack.first().click();
  await utils.waitPlease(500);
  await utils.screenshot(post.pathFile,'e1_05-post_listado_posts.png');

  let post_drafts =  await post.draftPost();
  await utils.screenshot(post.pathFile,'e1_06-post_listado_posts_draft.png');


  let elementFound = false;
  for (let i of post_drafts) {

    let text = await i.innerText()
    text = text.replace(/[^A-Z0-9]/ig, '');
    if (text.startsWith( post.newPostTitle )) {
      elementFound = true;
      await i.click();
      await utils.waitPlease(500);
      await utils.screenshot(post.pathFile,'e1_07-post_draft_detalle.png');
      break;
    }
  }

});