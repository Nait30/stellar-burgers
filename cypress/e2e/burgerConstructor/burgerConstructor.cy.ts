const testUrl = 'http://localhost:4000/';
const constructorItems = '[data-cy=ingredientsConstructor]'
const mains = '[data-cy=mains]'
const sauces = '[data-cy=sauces]'
const testBun = 'Флюоресцентная булка R2-D3'
const modal = 'Модальное окно с информацией об ингридиенте'

describe('test constructor', ()=>{
  beforeEach(()=>{
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'})
    cy.visit(testUrl);
  })

  it('add ingredient', ()=>{
    cy.get(mains).contains('Добавить').click();
    cy.get(sauces).contains('Добавить').click();
    cy.get(constructorItems).contains('testSauce').should('exist');
    cy.get(constructorItems).contains('testMain').should('exist')
  })
})

describe('test modal', ()=>{
  beforeEach(()=>{
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'}).as('ingredients');
    cy.visit(testUrl);
  })

  it('open modal', ()=> {
    cy.contains(testBun).click();
    cy.contains(modal).should('exist');
  })

  it('close modal', ()=>{
    cy.contains(testBun).click();
    cy.contains(modal).should('exist');
    cy.get('[data-cy=modalCloseButton]').click();
    cy.contains(modal).should('not.exist');
  })
})


describe('test order', ()=>{
  beforeEach(()=>{
    cy.intercept('POST', 'api/orders', {fixture: 'order.json'}).as('postOrder');
    cy.intercept('GET', 'api/auth/user', {fixture: 'user.json'});
    cy.intercept('GET', 'api/ingredients', {fixture: 'ingredients.json'});
    cy.setCookie('accessToken', 'test');
    localStorage.setItem('refreshToken', 'test');
    cy.visit(testUrl);
  })
  afterEach(()=>{
    cy.clearLocalStorage();
    cy.clearCookies();
  })
  it('make order', ()=>{
    cy.get(mains).contains('Добавить').click();
    cy.get('[data-cy=buns]').contains('Добавить').click();

    cy.get('[data-cy=priceTotal]').contains('Оформить заказ').click();

    cy.contains('555555').should('exist');

    cy.get('[data-cy=order-modal-close]').click();
    cy.contains('555555').should('not.exist');

    cy.get(constructorItems).contains(testBun).should('not.exist');
    cy.get(constructorItems).contains('testMain').should('not.exist')
  })
  
})

