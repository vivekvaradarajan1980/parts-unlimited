const addProduct = (product: string) => {
  cy.findByLabelText("Product to add").type(product);
  cy.findByLabelText("Quantity").type("0");
  cy.findByRole("button", {name:/Submit/i}).click();
}

const updateProduct = (product: string) => {
  cy.visit("http://localhost:3000/");

  cy.findByLabelText("Quantity").type("3");
  cy.findAllByRole("button",{name:/Update Inventory/i}).first().click();

  cy.findAllByText("shiny-new-product").first().should("exist");
  cy.findByText("3").should("exist");
}
describe("inventory", () => {
  describe("when adding a product offering", () => {
    it("should display the new product with a default quantity of 0", () => {
      cy.visit("http://localhost:3000");
      addProduct("shiny-new-product");
      cy.findAllByText("shiny-new-product").first().should("exist");
      cy.findAllByText("0").first().should("exist");
    });

    it("should display the updated information for a product that was saved", () => {

      updateProduct("shiny-new-product");

    });
  });
});
