const Product = require("./product");
describe("Product", () => {
  describe("#validateProduct", () => {
    it("should return Name cannot be empty", () => {
      const product = {
        price: 100
      };
      const response = Product.validateProduct(product);
      expect(response).toContain("Name cannot be empty");
    });
    it("should return Price cannot be empty", () => {
      const product = {
        name: "test"
      };
      const response = Product.validateProduct(product);
      expect(response).toContain("Price cannot be empty");
    });
    it("should return Price cannot be less than 0", () => {
      const product = {
        name: "test",
        price: -1
      };
      const response = Product.validateProduct(product);
      expect(response).toContain("Price cannot be less than 0");
    });
    it("should return Price cannot be invalid", () => {
      const product = {
        name: "test",
        price: 100.001
      };
      const response = Product.validateProduct(product);
      expect(response).toContain("Invalid price");
    });
    it("should return Invalid Image URL", () => {
      const product = {
        name: "test",
        price: 100.0,
        image: "test"
      };
      const response = Product.validateProduct(product);
      expect(response).toContain("Invalid Image URL");
    });
    it("should return Invalid tags", () => {
      const product = {
        name: "test",
        price: 100.0,
        image: "https://www.google.com",
        tags: "test"
      };
      const response = Product.validateProduct(product);
      expect(response).toContain("Invalid tags");
    });
    it("should return Invalid tags", () => {
      const product = {
        name: "test",
        price: 100.0,
        image: "https://www.google.com",
        tags: ["test", undefined]
      };
      const response = Product.validateProduct(product);
      expect(response).toContain("Invalid tag");
    });
    it("should return no errors", () => {
      const product = {
        name: "test",
        price: 100.0,
        image: "https://www.google.com",
        tags: ["test"]
      };
      const response = Product.validateProduct(product);
      expect(response.length).toEqual(0);
    });
  });
  describe("#createTagArray", () => {
    it("should return an array", () => {
      const response = Product.createTagArray("test,test2");
      expect(response.length).toEqual(2);
    });
  });
});
