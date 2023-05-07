import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/login';
import { UtilsPage } from '../../../pages/utils';
import { PostPage } from '../../../pages/post';


// Escenario 4:
// -	Loguearse al sistema
// -	Ingresar Titulo
// -	Validar que aparezca el botón borrar

test('Escenario 4', async ({ page }) => {

  const login = new LoginPage(page);
  const utils = new UtilsPage(page);
  const post = new PostPage(page);

  post.pathFile = post.pathFile + 'E1/';

  await login.gotoLoginPage();
  await utils.waitPlease(100);
  await utils.screenshot(post.pathFile, 'e4_00-post_login.png');
  await login.login();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e4_01-post_principal.png');

  // Hacer clic en post para ver el listado de todos los post
  await post.postsLink.click();
  await utils.screenshot(post.pathFile, 'e4_02-post_listado.png');


  // hacer clic para crear un nuevo post
  await post.postNew.first().click();
  await utils.screenshot(post.pathFile, 'e4_03-post_crear_vacio.png');

  // colocar un titulo al nuevo post
  await post.postTitle.fill(post.newPostTitle);
  await post.postTitleConfirm.click();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e4_04-post_crear_diligenciado.png');

  /////////// 


  
  await post.postSettingsButton.click();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e4_05-post_settings.png');
  
  await post.postSettingsDeleteButton.click();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e4_06-post_settings_delete.png');

  await post.postSettingsCancelButton.click();
  await utils.waitPlease(1000);
  await utils.screenshot(post.pathFile, 'e4_07-post_settings_cancel.png');

});