describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.bg-sky-700 > span').click();
    cy.get('.space-x-4 > :nth-child(2)').click();
    cy.get(':nth-child(3) > span').click();
    cy.get('.space-x-4 > :nth-child(4)').click();
    cy.get(':nth-child(5) > span').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(2) > span').click();
    cy.get(':nth-child(1) > .w-full').click();
    cy.get('.space-y-4 > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('Toque de los botones del menú funcionales', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get('.bg-sky-700 > span').click();
    cy.get(':nth-child(2) > span').click();
    cy.get(':nth-child(3) > span').click();
    cy.get(':nth-child(4) > span').click();
    cy.get(':nth-child(5) > span').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Verificación de datos obligatorios', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(2) > span').click();
    cy.get('.space-y-4 > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de residente con campo de nombre vacio', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(2) > span').click();
    cy.get(':nth-child(1) > .w-full').click();
    cy.get('.grid > :nth-child(2) > .w-full').clear('J');
    cy.get('.grid > :nth-child(2) > .w-full').type('JaRA');
    cy.get(':nth-child(3) > .w-full').clear('1-9');
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(4) > .w-full').clear('0001-07-22');
    cy.get(':nth-child(4) > .w-full').type('1997-07-22');
    cy.get(':nth-child(5) > .w-full').clear('+');
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get(':nth-child(5) > .w-full').click();
    cy.get(':nth-child(6) > .w-full').clear('P');
    cy.get(':nth-child(6) > .w-full').type('Patricio');
    cy.get(':nth-child(7) > .w-full').select('masculino');
    cy.get('.space-y-4 > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de residente con campo de apellido vacio', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(2) > span').click();
    cy.get(':nth-child(1) > .w-full').clear('J');
    cy.get(':nth-child(1) > .w-full').type('Javier');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('1997-07-22');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get(':nth-child(6) > .w-full').clear();
    cy.get(':nth-child(6) > .w-full').type('Patricio');
    cy.get(':nth-child(7) > .w-full').select('masculino');
    cy.get('.space-y-4 > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de residente con rut inválido', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(2) > span').click();
    cy.get(':nth-child(1) > .w-full').clear('J');
    cy.get(':nth-child(1) > .w-full').type('Javier');
    cy.get('.grid > :nth-child(2) > .w-full').clear();
    cy.get('.grid > :nth-child(2) > .w-full').type('Jara');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('11.111.111-1');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('1997-07-22');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get(':nth-child(6) > .w-full').clear();
    cy.get(':nth-child(6) > .w-full').type('Patricio');
    cy.get(':nth-child(7) > .w-full').select('masculino');
    cy.get('.space-y-4 > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de residente con fecha de nacimiento de manera futura', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(2) > span').click();
    cy.get(':nth-child(1) > .w-full').clear('U');
    cy.get(':nth-child(1) > .w-full').type('Susana');
    cy.get('.grid > :nth-child(2) > .w-full').clear();
    cy.get('.grid > :nth-child(2) > .w-full').type('Muñoz');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('2025-07-22');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get(':nth-child(6) > .w-full').clear();
    cy.get(':nth-child(6) > .w-full').type('José');
    cy.get(':nth-child(7) > .w-full').select('femenino');
    cy.get('.space-y-4 > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de residente con fecha de nacimiento de manera futura', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(2) > span').click();
    cy.get(':nth-child(1) > .w-full').clear('M');
    cy.get(':nth-child(1) > .w-full').type('Maria');
    cy.get('.grid > :nth-child(2) > .w-full').clear();
    cy.get('.grid > :nth-child(2) > .w-full').type('Santos');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(4) > .w-full').clear('0001-06-19');
    cy.get(':nth-child(4) > .w-full').type('1962-06-19');
    cy.get(':nth-child(5) > .w-full').clear('+');
    cy.get(':nth-child(6) > .w-full').clear('M');
    cy.get(':nth-child(6) > .w-full').type('Matias');
    cy.get(':nth-child(7) > .w-full').select('femenino');
    cy.get('.space-y-4 > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de genero obligatorio', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get('.space-x-4 > :nth-child(2)').click();
    cy.get(':nth-child(1) > .w-full').clear('J');
    cy.get(':nth-child(1) > .w-full').type('Sofia');
    cy.get('.grid > :nth-child(2) > .w-full').clear();
    cy.get('.grid > :nth-child(2) > .w-full').type('Perez');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('1977-05-19');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get(':nth-child(6) > .w-full').clear();
    cy.get(':nth-child(6) > .w-full').type('Sofia Perez');
    cy.get('.space-y-4 > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de nuevo miembro del personal con nombre vacio', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get('.space-x-4 > :nth-child(4)').click();
    cy.get(':nth-child(1) > .w-full').click();
    cy.get(':nth-child(2) > .w-full').clear();
    cy.get(':nth-child(2) > .w-full').type('Perez');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('sofiaperez@gmail.com');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get(':nth-child(6) > .w-full').select('medico');
    cy.get('.flex > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de nuevo miembro del personal con Apellido vacio', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(4) > span').click();
    cy.get(':nth-child(1) > .w-full').clear('S');
    cy.get(':nth-child(1) > .w-full').type('Sofia');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('sofiaperez@gmail.com');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get(':nth-child(6) > .w-full').select('enfermero');
    cy.get('.flex > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de nuevo miembro del personal con Rut vacio', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(4) > span').click();
    cy.get(':nth-child(1) > .w-full').clear('S');
    cy.get(':nth-child(1) > .w-full').type('Sofia');
    cy.get(':nth-child(2) > .w-full').clear();
    cy.get(':nth-child(2) > .w-full').type('Perez');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('sofiaperez@gmail.com');
    cy.get(':nth-child(5) > .w-full').clear('+');
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get(':nth-child(6) > .w-full').select('medico');
    cy.get('.flex > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de nuevo miembro del personal con rut inválido', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(4) > span').click();
    cy.get(':nth-child(1) > .w-full').clear('S');
    cy.get(':nth-child(1) > .w-full').type('Sofia');
    cy.get(':nth-child(2) > .w-full').clear();
    cy.get(':nth-child(2) > .w-full').type('Perez');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(3) > .w-full').clear('1.976.027-7');
    cy.get(':nth-child(3) > .w-full').type('19.760.277-K');
    cy.get(':nth-child(4) > .w-full').clear('s');
    cy.get(':nth-child(4) > .w-full').type('sofiaperez@gmail.com');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get(':nth-child(6) > .w-full').select('enfermero');
    cy.get('.flex > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de nuevo miembro del personal con correo inválido', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(4) > span').click();
    cy.get(':nth-child(1) > .w-full').clear('S');
    cy.get(':nth-child(1) > .w-full').type('Sofia');
    cy.get(':nth-child(2) > .w-full').clear();
    cy.get(':nth-child(2) > .w-full').type('Perez');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('a');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get(':nth-child(6) > .w-full').select('enfermero');
    cy.get('.flex > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de nuevo miembro del personal con correo inválido', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(4) > span').click();
    cy.get(':nth-child(1) > .w-full').clear('J');
    cy.get(':nth-child(1) > .w-full').type('Javier');
    cy.get(':nth-child(2) > .w-full').clear();
    cy.get(':nth-child(2) > .w-full').type('Jara');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('jara.javierignacio@gmail.com');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get(':nth-child(5) > .w-full').type('+99999999999');
    cy.get(':nth-child(6) > .w-full').select('medico');
    cy.get('.flex > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */
  it('Registro de nuevo miembro del personal sin elegir rol ', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('localhost:3000');
    cy.get(':nth-child(4) > span').click();
    cy.get(':nth-child(1) > .w-full').clear('J');
    cy.get(':nth-child(1) > .w-full').type('Javier');
    cy.get(':nth-child(2) > .w-full').clear();
    cy.get(':nth-child(2) > .w-full').type('Jara');
    cy.get(':nth-child(3) > .w-full').clear();
    cy.get(':nth-child(3) > .w-full').type('19.760.277-5');
    cy.get(':nth-child(4) > .w-full').clear();
    cy.get(':nth-child(4) > .w-full').type('jara.javierig@gmail.com');
    cy.get(':nth-child(5) > .w-full').clear();
    cy.get(':nth-child(5) > .w-full').type('+56991516710');
    cy.get('.flex > .bg-sky-600').click();
    /* ==== End Cypress Studio ==== */
  });
})