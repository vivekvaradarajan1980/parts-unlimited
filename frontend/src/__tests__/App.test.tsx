import React from "react";
import {render, screen} from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import {updateProduct,createProduct, getProducts} from "../productsApiClient";
import {fireInputEvent} from "@testing-library/user-event/dist/keyboard/shared";

jest.mock("../productsApiClient");

const mockGetProducts = getProducts as jest.MockedFunction<typeof getProducts>;
const mockCreateProduct = createProduct as jest.MockedFunction<typeof createProduct>;
const mockUpdateProduct = updateProduct as jest.MockedFunction<typeof updateProduct>;

const addProduct = (product: string, quantity: number) => {
  userEvent.type(screen.getByLabelText("Product to add"), product);
  userEvent.type(screen.getByLabelText("Quantity"), String(quantity));
  userEvent.click(screen.getByRole("button", {name: /submit/i}));
}

describe("inventory", () => {
  describe("when I view the inventory", () => {
    it("should display the products", async () => {
      mockGetProducts.mockResolvedValue([{id:1, name: "1 product", quantity: 0}]);

      render(<App/>);

      expect(screen.getByText("Parts Unlimited Inventory")).toBeInTheDocument();
      expect(screen.getByText("Product")).toBeInTheDocument();
      expect(await screen.findByText("1 product")).toBeInTheDocument();

    });

    it("should display the products' quantities", async () => {
      mockGetProducts.mockResolvedValue([{id:1,name: "a product", quantity: 0}]);

      render(<App/>);

     // expect(screen.getByText("Quantity")).toBeInTheDocument();
      expect(await screen.findByText("0")).toBeInTheDocument();
    });
  });

  describe("when I add a new product", () => {
    it("should display the new product", async () => {
      mockCreateProduct.mockResolvedValueOnce({id:1,name: "shiny new product", quantity: 0});
      mockGetProducts.mockResolvedValueOnce([]);
      mockGetProducts.mockResolvedValueOnce([{id:1,name: "shiny new product", quantity: 4}]);

      render(<App/>);
      addProduct("shiny new product",4);

     // expect(mockCreateProduct).toHaveBeenCalledWith("shiny new product");
      expect(await screen.findByText("shiny new product")).toBeInTheDocument();

    });

    it("should display the update inventory button", async () => {

      mockGetProducts.mockResolvedValueOnce([{id:1,name: "shiny new product", quantity: 0}]);
      mockUpdateProduct.mockResolvedValueOnce({id:1, name: "shiny new product", quantity: 0});

      render(<App/>)

      expect(await screen.findByText("shiny new product")).toBeInTheDocument();
      userEvent.click(screen.getByRole('checkbox', {name:"shiny new product"}));

      userEvent.type(screen.getByLabelText("Quantity"), "4");
      userEvent.click(screen.getByRole('button', {name:/Update inventory/i}));

      expect(mockUpdateProduct).toHaveBeenCalledWith("http:localhost:8080/products/1");

      expect(screen.getByText("0")).toBeInTheDocument();

    });

    it("Increasa inventory", async () => {
      mockUpdateProduct.mockResolvedValueOnce({id:1,name: "shiny new product", quantity: 0});
      mockGetProducts.mockResolvedValueOnce([{id:1,name: "shiny new product", quantity: 4}]);


      render(<App/>)

      expect(await screen.findAllByText("shiny new product")).toBeTruthy();
      userEvent.type(screen.getByRole("spinbutton",{name:/Quantity/i}),"4");

      expect(screen.getAllByRole('option',{name:/shiny new product/})[0]).toBeInTheDocument();

   ///  expect(mockUpdateProduct).toHaveBeenCalledWith(4,1);

     // expect(screen.getByText("4")).toBeInTheDocument();

    });
  });
});
