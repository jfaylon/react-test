const ProductController = require("./product");
const ProductModel = require("../models/product");
const ProductService = require("../services/product");

jest.mock("../services/product", () => ({
  createTagArray: jest.fn(),
  validateProduct: jest.fn()
}));

describe("#ProductController", () => {
  describe("#createProduct", () => {
    beforeEach(() => {});
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return 400 due to validation errors", async () => {
      ProductService.validateProduct.mockReturnValue(["test"]);
      const req = {
        body: {}
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.createProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should return 500 due to error", async () => {
      ProductService.validateProduct.mockReturnValue([]);
      // mockingoose(ProductModel).toReturn(new Error("error"), "save");
      jest
        .spyOn(ProductModel.prototype, "save")
        .mockImplementationOnce(() => Promise.reject("error"));
      const req = {
        body: {}
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.createProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
    it("should return 201", async () => {
      ProductService.validateProduct.mockReturnValue([]);
      jest
        .spyOn(ProductModel.prototype, "save")
        .mockImplementationOnce(() => Promise.resolve({}));
      const req = {
        body: {
          name: "test",
          price: 100
        }
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.createProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(201);
    });
  });
  describe("#getProduct", () => {
    it("should return 400", async () => {
      jest
        .spyOn(ProductModel, "findById")
        .mockImplementationOnce(() => Promise.resolve({}));
      const req = {
        params: {
          id: "test"
        }
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.getProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should return 500", async () => {
      jest
        .spyOn(ProductModel, "findById")
        .mockImplementationOnce(() => Promise.reject(new Error()));
      const req = {
        params: {
          id: "test"
        }
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.getProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
    it("should return 200", async () => {
      jest
        .spyOn(ProductModel, "findById")
        .mockImplementationOnce(() => Promise.resolve({ test: "test" }));
      const req = {
        params: {
          id: "test"
        }
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.getProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("#editProduct", () => {
    beforeEach(() => {});
    afterEach(() => {
      jest.clearAllMocks();
    });
    it("should return 400 due to validation errors", async () => {
      ProductService.validateProduct.mockReturnValue(["test"]);
      const req = {
        params: {
          id: "test"
        },
        body: {}
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.editProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should return 200", async () => {
      ProductService.validateProduct.mockReturnValue([]);
      jest
        .spyOn(ProductModel, "findByIdAndUpdate")
        .mockImplementationOnce(() => Promise.resolve({}));
      const req = {
        params: {
          id: "test"
        },
        body: {
          name: "test",
          price: 100
        }
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.editProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should return 500", async () => {
      ProductService.validateProduct.mockReturnValue([]);
      jest
        .spyOn(ProductModel, "findByIdAndUpdate")
        .mockImplementationOnce(() => Promise.reject(new Error()));
      const req = {
        params: {
          id: "test"
        },
        body: {
          name: "test",
          price: 100
        }
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.editProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
  describe("#deleteProduct", () => {
    it("should return 400", async () => {
      jest
        .spyOn(ProductModel, "findByIdAndDelete")
        .mockImplementationOnce(() => Promise.resolve({}));
      const req = {
        params: {
          id: "test"
        },
        body: {
          name: "test",
          price: 100
        }
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.deleteProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
    });
    it("should return 500", async () => {
      jest
        .spyOn(ProductModel, "findByIdAndDelete")
        .mockImplementationOnce(() => Promise.reject(new Error()));
      const req = {
        params: {
          id: "test"
        },
        body: {
          name: "test",
          price: 100
        }
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.deleteProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
    it("should return 200", async () => {
      jest
        .spyOn(ProductModel, "findByIdAndDelete")
        .mockImplementationOnce(() => Promise.resolve({ id: "test" }));
      const req = {
        params: {
          id: "test"
        },
        body: {
          name: "test",
          price: 100
        }
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.deleteProduct(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("#getAllProducts", () => {
    it("should return 200", async () => {
      jest
        .spyOn(ProductModel, "find")
        .mockImplementationOnce(() => Promise.resolve({}));
      const req = {
        params: {},
        body: {}
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.getAllProducts(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should return 200", async () => {
      jest
        .spyOn(ProductModel, "find")
        .mockImplementationOnce(() => Promise.reject(new Error()));
      const req = {
        params: {},
        body: {}
      };
      const res = {
        status: jest.fn(),
        json: jest.fn()
      };

      await ProductController.getAllProducts(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
