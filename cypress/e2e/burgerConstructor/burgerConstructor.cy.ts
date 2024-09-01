describe('test constructor', ()=>{
  beforeEach(()=>{
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'})
    cy.visit('http://localhost:4000/');
  })

  it('add ingredient', ()=>{
    cy.get('[data-cy=mains]').contains('Добавить').click();
    cy.get('[data-cy=sauces]').contains('Добавить').click();
    cy.get('[data-cy=ingredientsConstructor]').contains('testSauce').should('exist');
    cy.get('[data-cy=ingredientsConstructor]').contains('testMain').should('exist')
  })
})

describe('test modal', ()=>{
  beforeEach(()=>{
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('ingredients');
    cy.visit('http://localhost:4000/');
  })

  it('open modal', ()=> {
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.contains('Модальное окно с информацией об ингридиенте').should('exist');
  })

  it('close modal', ()=>{
    cy.contains('Флюоресцентная булка R2-D3').click();
    cy.contains('Модальное окно с информацией об ингридиенте').should('exist');
    cy.get('[data-cy=modalCloseButton]').click();
    cy.contains('Модальное окно с информацией об ингридиенте').should('not.exist');
  })
})


describe('test order', ()=>{
  beforeEach(()=>{
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'}).as('postOrder');
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.setCookie('accessToken', 'test');
    localStorage.setItem('refreshToken', 'test');
    cy.visit('http://localhost:4000/');
  })
  afterEach(()=>{
    cy.clearLocalStorage();
    cy.clearCookies();
  })
  it('make order', ()=>{
    cy.get('[data-cy=mains]').contains('Добавить').click();
    cy.get('[data-cy=buns]').contains('Добавить').click();

    cy.get('[data-cy=priceTotal]').contains('Оформить заказ').click();

    cy.contains('555555').should('exist');

    cy.get('[data-cy=order-modal-close]').click();
    cy.contains('555555').should('not.exist');

    cy.get('[data-cy=ingredientsConstructor]').contains('Флюоресцентная булка R2-D3').should('not.exist');
    cy.get('[data-cy=ingredientsConstructor]').contains('testMain').should('not.exist')
  })
  
})

