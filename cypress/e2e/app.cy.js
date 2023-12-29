const login = (email, pass = "!qlIb08ue9Ljabfd") => {
  cy.session([email, pass], () => {
    cy.visit("/");
    cy.get("#email-input").type(email);
    cy.get("#submit").click();
    cy.get("#current-password").type(pass);
    cy.get("#submit").click();
    cy.get("main").contains("You have successfully logged in");
    cy.url().should("contain", "/");
  });
  cy.visit("/profile");
};

const users = require("../fixtures/users.json");

const groupOneUsers = users.slice(0, 2);
const groupTwoUsers = users.slice(2);

describe("Shared TodoList App", () => {
  describe("Initial state", () => {
    it("displays a Stytch login form", () => {
      cy.visit("/");
      cy.get("#email-input").should("exist");
      cy.get("#submit").should("exist");
    });

    it("should not display a logout button", () => {
      cy.get("#btn-logout").should("not.exist");
    });
  });
  describe("Authenticated state - GROUP_1", () => {
    groupOneUsers.forEach(({ email }) => {
      beforeEach(() => {
        login(email);
      });
      it(`displays a shared todo list ${email}`, () => {
        cy.get("[data-test=todo-list]").should("exist");
        cy.get("[data-test=todo-list] li").should("have.length.lte", 2);
      });
      it(`displays only todos from GROUP_1 users ${email}`, () => {
        cy.get("[data-test=todo-list]").should("exist");
        cy.get("[data-test=todo-list] li").should(
          "not.contain",
          groupTwoUsers[0].email
        );
      });
    });
  });
  describe("Authenticated state - GROUP_2", () => {
    groupTwoUsers.forEach(({ email }) => {
      beforeEach(() => {
        login(email);
      });
      it(`displays a shared todo list ${email}`, () => {
        cy.get("[data-test=todo-list]").should("exist");
        cy.get("[data-test=todo-list] li").should("have.length.lte", 2);
      });
      it(`displays only todos from GROUP_2 users ${email}`, () => {
        cy.get("[data-test=todo-list]").should("exist");
        cy.get("[data-test=todo-list] li").should(
          "not.contain",
          groupOneUsers[0].email
        );
      });
    });
  });
});
