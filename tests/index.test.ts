import { handler, sharedState, ClaimedEventParams } from "../src/index";
import { claimSepoliaLonActionEvent } from "./fixtures/claimedActionEvent";
import { expect } from "chai";

describe("Handler and sharedState Tests", () => {
  beforeEach(() => {
    Object.keys(sharedState).forEach((key) => delete sharedState[key]);
  });

  it("should initialize sharedState as an empty object", () => {
    expect(sharedState).to.deep.equal({});
  });

  it("should update sharedState with the correct key-value pair", async () => {
    await handler(claimSepoliaLonActionEvent);

    const claimedEvent: ClaimedEventParams[] = sharedState[
      "ClaimedEvent"
    ] as ClaimedEventParams[];

    expect(claimedEvent[0].tokenAddress).to.eq(
      "0x6C1851b852F05bdc7c0BE1A088532E4999fD94Fa"
    );
  });

  it("should not retain state between tests", () => {
    expect(sharedState).to.deep.equal({});
  });
});
