import { toEpoch, toEpochMillis } from "@/utils/datetime-utils";

describe("Date-Time Conversion Tests", () => {
  it("Should convert date and time to epoch seconds correctly", () => {
    expect(toEpoch("2023-11-09", "00:00")).to.be.equal(1699506000);
    expect(toEpoch("2023-11-09", "23:59")).to.be.equal(1699592340);
  });

  it("Should handle default time '00:00' if time is not explicitly provided", () => {
    expect(toEpoch("2023-11-09")).to.be.equal(1699506000);
  });

  it("Should convert date and time to epoch milliseconds correctly", () => {
    expect(toEpochMillis("2023-11-09", "00:00")).to.be.equal(1699506000000);
    expect(toEpochMillis("2023-11-09", "23:59")).to.be.equal(1699592340000);
  });

  it("Should handle default time '00:00' if time is not explicitly provided for milliseconds conversion", () => {
    expect(toEpochMillis("2023-11-09")).to.be.equal(1699506000000);
  });
});
