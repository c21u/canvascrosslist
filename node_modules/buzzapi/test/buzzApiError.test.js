import { expect } from "chai";
import BuzzApiError from "../buzzApiError.js";

describe("BuzzApiErrors", () => {
  it("Sets default values", () => {
    const err = new BuzzApiError();
    expect(err.name).to.equal("BuzzAPIError");
    expect(err.message).to.equal("BuzzApi error");
  });
});
