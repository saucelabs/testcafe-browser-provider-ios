// This test is from TestCafe example
// https://github.com/DevExpress/testcafe-examples/tree/8f4a2e3556d410d8ffe865bf06b9b887b79b7d0e/examples/change-element-style
import { ClientFunction, Selector } from "testcafe";

fixture`Change Element Style`
  .page`https://devexpress.github.io/testcafe/example`;

test("Hide an element", async (t) => {
  const populateButton = Selector("#populate");

  const hidePopulateButton = ClientFunction(() => {
    document.getElementById("populate").style.display = "none";
  });

  await t.expect(populateButton.visible).ok();

  await hidePopulateButton();

  await t.expect(populateButton.visible).notOk();
});

test("Change header color", async (t) => {
  const header = Selector("h1");
  const removeHeaderColor = ClientFunction(() => {
    document.querySelector("h1").style.color = "#111";
  });

  await t.expect(header.getStyleProperty("color")).eql("rgb(47, 164, 207)");

  await removeHeaderColor();

  await t.expect(header.getStyleProperty("color")).eql("rgb(17, 17, 17)");
});
