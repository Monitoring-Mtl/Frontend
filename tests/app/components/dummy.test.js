// dummy.test.js
const { add } = require("../../../src/app/components/dummyFunction.js");

test("add function adds two numbers correctly", () => {
  const result = add(2, 3);
  expect(result).toBe(5);
});