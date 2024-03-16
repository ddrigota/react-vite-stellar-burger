import api from "../../src/utils/api";

const BASE_URL = api.BASE_URL;

describe("drag and drop to constructor works correctly", () => {
  beforeEach(() => {
    cy.intercept("GET", `${BASE_URL}/ingredients`, { fixture: "ingredients.json" });
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
  });
  it("shoud drag bun to constructor", () => {
    cy.get('[data-cy="ingredients"]').contains("Булка").trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="bun-top"]').contains("Булка").should("exist");
    cy.get('[data-cy="bun-bottom"]').contains("Булка").should("exist");
  });
  it("should drag ingredient to constructor", () => {
    cy.get('[data-cy="ingredients"]').contains("Начинка 1").trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="ingredients"]').contains("Начинка 2").trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="constructor-ingredients"]').contains("Начинка 1").should("exist");
    cy.get('[data-cy="constructor-ingredients"]').contains("Начинка 2").should("exist");
  });
});

describe("ingredient modal works correctly", () => {
  beforeEach(() => {
    cy.intercept("GET", `${BASE_URL}/ingredients`, { fixture: "ingredients.json" });
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
  });
  it("should open modal on click", () => {
    cy.get('[data-cy="modal"]').should("not.exist");
    cy.contains("Булка").click();
    cy.get('[data-cy="modal"]').should("exist");
    cy.get('[data-cy="modal-heading"]').contains("Детали Ингредиента").should("exist");
    cy.get("#modals").contains("Булка").should("exist");
  });
  it("should close modal on click", () => {
    cy.contains("Булка").click();
    cy.get('[data-cy="modal"]').should("exist");
    cy.get('[data-cy="close-modal"]').click();
    cy.get('[data-cy="modal"]').should("not.exist");
  });
  it("should close modal on overlay click", () => {
    cy.contains("Булка").click();
    cy.get('[data-cy="modal"]').should("exist");
    cy.get('[data-cy="modal-overlay"]').click("topRight", { force: true });
    cy.get('[data-cy="modal"]').should("not.exist");
  });
});

describe("order works correctly", () => {
  beforeEach(() => {
    cy.intercept("GET", `${BASE_URL}/ingredients`, { fixture: "ingredients.json" });
    cy.intercept("GET", `${BASE_URL}/auth/user`, { fixture: "login.json" });
    cy.intercept("POST", `${BASE_URL}/orders`, { fixture: "post-order.json" });
    cy.setCookie("accessToken", "mockAccessToken");
    cy.setCookie("refreshToken", "mockRefreshToken");
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
  });
  afterEach(() => {
    cy.clearCookies();
  });
  it("should create order", () => {
    cy.get('[data-cy="ingredients"]').contains("Булка").trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="ingredients"]').contains("Начинка 1").trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="order-button"]').click();
    cy.get('[data-cy="order-number"]').contains("12345").should("exist");
  });
  it("should clear constructor after order", () => {
    cy.get('[data-cy="ingredients"]').contains("Булка").trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="ingredients"]').contains("Начинка 1").trigger("dragstart");
    cy.get('[data-cy="constructor"]').trigger("drop");
    cy.get('[data-cy="order-button"]').click();
    cy.get('[data-cy="close-modal"]').click();
    cy.get('[data-cy="order-number"]').should("not.exist");
    cy.get('[data-cy="constructor-ingredients"]').contains("Начинка 1").should("not.exist");
  });
});
