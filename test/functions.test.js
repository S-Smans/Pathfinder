const functions = require("./functions");

test("Ja rinda nav bloķēta, tad nobloķē.", () => {
  expect(functions.addWall("row")).toBe("row blocked");
});

test("Ja rinda ir bloķēta, tad atbloķē.", () => {
  expect(functions.addWall("row blocked")).toBe("row");
});

test("objekta iztukšošana.", () => {
  expect(functions.emptyObject({title: "Name of The Wind",author: "Patrick rothfuss"})).toStrictEqual({});
});
