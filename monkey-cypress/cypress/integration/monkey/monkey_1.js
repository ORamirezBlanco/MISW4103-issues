describe('Ghost CMS Monkey Test', () => {
  const email = 'nicohug@gmail.com'; // Cambia a tus credenciales de inicio de sesión de Ghost.
  const password = 'qwerty12345'; // Cambia a tus credenciales de inicio de sesión de Ghost.

  const actions = ['click', 'type', 'hover'];
  const selectors = [
    'a',
    'button',
    'input',
    'textarea',
    '.koenig-editor__editor',
    '.gh-btn',
    '.gh-publishmenu-trigger',
    '.settings-menu-delete-button',
  ];

  beforeEach(() => {
    cy.visit('http://6c5a-45-163-141-50.ngrok-free.app/ghost/#/signin');
    cy.get('input[name="identification"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/ghost/#/site');
  });

  const randomAction = () => actions[Math.floor(Math.random() * actions.length)];
  const randomSelector = () => selectors[Math.floor(Math.random() * selectors.length)];

 const performRandomAction = (action, selector) => {
  cy.get(selector, { timeout: 1000, failOnStatusCode: false }).then((element) => {
    if (element && element.is(':visible')) {
      try {
        switch (action) {
          case 'click':
            cy.wrap(element).click({ force: true });
            break;
          case 'doubleClick':
            cy.wrap(element).dblclick({ force: true });
            break;
          case 'rightClick':
            cy.wrap(element).rightclick({ force: true });
            break;
          case 'type':
            if (element.is('input') || element.is('textarea') || element.is('.koenig-editor__editor')) {
              cy.wrap(element).type(randomText(), { force: true });
            }
            break;
          case 'hover':
            cy.wrap(element).trigger('mouseover', { force: true });
            break;
          case 'scroll':
            cy.wrap(element).scrollIntoView({ force: true });
            break;
          case 'select':
            if (element.is('select')) {
              const optionIndex = Math.floor(Math.random() * element.children().length);
              cy.wrap(element).select(element.children().eq(optionIndex).val(), { force: true });
            }
            break;
        }
      } catch (error) {
        console.log(`Failed to perform action "${action}" on selector "${selector}":`, error.message);
      }
    } else {
      console.log(`Failed to find element with selector "${selector}".`);
    }
  });
};



  it('Perform random actions for 5 minutes', () => {
    const endTime = Date.now() + 300000; // 5 minutes * 60 seconds * 1000 milliseconds
    while (Date.now() < endTime) {
      performRandomAction(randomAction(), randomSelector());
    }
  });
});
