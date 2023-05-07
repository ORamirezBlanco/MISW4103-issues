import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const postTitle = "Relojes";
  const postContent = "Relojes content";
  await page.goto('http://localhost:2368/ghost/#/signin');
  await page.getByPlaceholder('Email Address').click();
  await page.getByPlaceholder('Email Address').fill('o.ramirezb@uniandes.edu.co');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('P4ssw0rdS3gur0!');
  await page.screenshot({ path: './results/post/00-post_login.png' });
  await page.getByRole('button', { name: 'Sign in' }).click();
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: './results/post/01-post_principal.png' });
  await page.getByRole('link', { name: 'Posts' }).click();
  await page.screenshot({ path: './results/post/02-post_listado.png' });
  await page.locator('a:has-text("New post")').first().click();
  await page.screenshot({ path: './results/post/03-post_crear_vacio.png' });
  await page.locator('[placeholder="Post Title"]').fill(postTitle);
  await page.click('css=div.koenig-editor__editor.__mobiledoc-editor.__has-no-content');

  //await page.click('css=button.koenig-plus-menu-button.flex.justify-center.items-center.relative.w9.h9.ba.b--midlightgrey-l2.bg-white.br-100.anim-normal');
  // await page.getByRole('button', { name: 'Add a card' }).click();
  // await new Promise(r => setTimeout(r, 1000));
  // await page.screenshot({ path: './results/post/03-1add card option.png' });
  // await page.getByRole('menuitem', { name: 'Markdown Insert a Markdown editor card' }).click();
  // await new Promise(r => setTimeout(r, 500));
  // await page.locator('css=div.koenig-editor__editor.__mobiledoc-editor').fill(postContent);
  
  await page.screenshot({ path: './results/post/04-post_crear_diligenciado.png' });
  await page.getByRole('button', { name: 'Publish' }).click();
  await new Promise(r => setTimeout(r, 500));
  await page.getByRole('button', { name: 'Publish', exact: true }).click();
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: './results/post/05-post_crear_publicado.png' });
  await page.goto('http://localhost:2368/');
  await page.screenshot({ path: './results/post/06-post_publicados.png' });
  let post_cards_title = await page.$$('css=h2.post-card-title');

  let elementFound = false;
  for (let i of post_cards_title) {

    const text = await i.innerText()
    console.log(text);
    if (text === postTitle) {
      elementFound = true;
      await i.click()
      await page.screenshot({ path: './results/post/07-post_detalle.png' });
      break;
    }
  }

});