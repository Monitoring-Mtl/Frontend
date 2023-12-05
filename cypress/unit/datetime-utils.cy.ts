import { toEpoch } from "@/utils/datetime-utils";

it("Test the conversion of a date and time to epoch.", () => {
    expect(toEpoch("2023-11-09", "00:00")).to.be.equal(1699506000);
    expect(toEpoch("2023-11-09", "23:59")).to.be.equal(1699592340);
});