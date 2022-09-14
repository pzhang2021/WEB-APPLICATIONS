"use strict";

/**
 *
 * Do not make any changes in this file. This file is used to validate your code changes in hw1.js
 * This file and any changes you make here will be discarded during grading.
 * Make all your changes in hw1.js
 *
 **/

const { Homework1, Circle, Student, Product } = require("./hw1");

test("add 1+2 to equal 3", () => {
  expect(Homework1.sum(1, 2)).toBe(3);
});

test("instantiate Circle class", () => {
  const circle = new Circle(5, "red");
  expect(circle.radius).toBeDefined();
  expect(circle.color).toBeDefined();
  expect(circle.radius).toBe(5);
  expect(circle.color).toBe("red");
});

test("validate Circle calcArea method", () => {
  const circle = new Circle(98, "red");
  expect(circle.calcArea).toBeDefined();
  expect(circle.calcArea()).toBeCloseTo(
    circle.radius * circle.radius * Math.PI
  );
});

test("instantiate Student class", () => {
  const student = new Student("First", "Last", 4.0, "Graduate");
  expect(student.firstName).toBeDefined();
  expect(student.lastName).toBeDefined();
  expect(student.gpa).toBeDefined();
  expect(student.degreeType).toBeDefined();

  expect(student.firstName).toBe("First");
  expect(student.lastName).toBe("Last");
  expect(student.gpa).toBe(4.0);
  expect(student.degreeType).toBe("Graduate");

  expect(student.grade).not.toBeDefined();
  expect(student.graduated).toBe(false);
});

test("instantiate Product class", () => {
  const product = new Product("Apple,1.00,In Stock");
  expect(product.name).toBeDefined();
  expect(product.price).toBeDefined();
  expect(product.availability).toBeDefined();

  expect(product.name).toBe("Apple");
  expect(product.price).toBe(1);
  expect(product.availability).toBe("In Stock");
});

const products = [
  new Product("Apple,1.00,In Stock"),
  new Product("Carrot,0.50,Out of Stock"),
  new Product("Bread,3.00,In Stock"),
  new Product("Beef,7.00,Out of Stock"),
];

test("calls Product.inStock() method, passing a list of products, asserts a list of only in stock products is returned", () => {
  const availableProducts = Product.inStock(products);

  expect(availableProducts.length).toBe(2);
  expect(availableProducts[0].name).toBe("Apple");
  expect(availableProducts[1].name).toBe("Bread");
});

test("calls Product.halfOff() method, passing a list of products, asserts a list of products is returned with all prices discounted 50%", () => {
  const reducedProducts = Product.halfOff(products);

  expect(reducedProducts.length).toBe(4);
  expect(reducedProducts[0].price).toBe(products[0].price * 0.5);
  expect(reducedProducts[1].price).toBe(products[1].price * 0.5);
  expect(reducedProducts[2].price).toBe(products[2].price * 0.5);
  expect(reducedProducts[3].price).toBe(products[3].price * 0.5);
});

test("calls Product.printProducts() method, passing a list of products, asserts all products are printed matching specific formatting provided", () => {
  console.log = jest.fn();
  Product.printProducts(products);

  expect(console.log).toHaveBeenCalledTimes(4);
  expect(console.log).toHaveBeenCalledWith(
    "Product: Apple, Cost: $1.00, Availability: Yes"
  );
  expect(console.log).toHaveBeenCalledWith(
    "Product: Carrot, Cost: $0.50, Availability: No"
  );
  expect(console.log).toHaveBeenCalledWith(
    "Product: Bread, Cost: $3.00, Availability: Yes"
  );
  expect(console.log).toHaveBeenCalledWith(
    "Product: Beef, Cost: $7.00, Availability: No"
  );
});
