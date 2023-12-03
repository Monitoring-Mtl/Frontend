import * as mathUtils from "@/utils/math-utils";

describe("Test math utility functions.", () => {

    describe("Test the integer division function", () => {
        it("Test the integer division function with positive values.", () => {
            expect(mathUtils.integerDivision(110, 11)).to.be.equal(10);
            expect(mathUtils.integerDivision(7, 2)).to.be.equal(3);
        });
    
        it("Test the integer division function with negative values.", () => {
            expect(mathUtils.integerDivision(-110, 11)).to.be.equal(-10);
            expect(mathUtils.integerDivision(7, -2)).to.be.equal(-4);
            expect(mathUtils.integerDivision(-19, -7)).to.be.equal(2);
        });

        it("Test the integer division function with a zero divisor.", () => {
            expect(mathUtils.integerDivision(-110, 0)).to.be.NaN;
        });
    });

    describe("Test the sum function.", () => {
        it("Test the sum function with positive values.", () => {
            const values = [1, 2, 3, 4, 5]
            expect(mathUtils.sum(values)).to.be.equal(15);
        });
    
        it("Test the sum function with negative values.", () => {
            const values = [-1, 2, -3, 4, -5]
            expect(mathUtils.sum(values)).to.be.equal(-3);
        });

        it("Test the sum function with zeroes.", () => {
            const values = [0, 0, 0,]
            expect(mathUtils.sum(values)).to.be.equal(0);
        });

        it("Test the sum function with an empty array.", () => {
            const values = []
            expect(mathUtils.sum(values)).to.be.equal(0);
        });

        it("Test the sum function with decimal values.", () => {
            const values = [1.5, 2.3, 3.7]
            expect(mathUtils.sum(values)).to.be.equal(7.5);
        });

        it("Test the sum function with mixed values.", () => {
            const values = [1.5, 2.3, 3.7, 7]
            expect(mathUtils.sum(values)).to.be.equal(14.5);
        });

        it("Test the sum function with one value.", () => {
            const values = [7]
            expect(mathUtils.sum(values)).to.be.equal(7);
        });
    });
    
    describe("Test the mean and median functions.", () => {
        it("Test the mean and median functions with positive values.", () => {
            const values = [1, 2, 3, 4, 5];
            expect(mathUtils.mean(values)).to.be.equal(3);
            expect(mathUtils.median(values)).to.be.equal(3);
        });
    
        it("Test the mean and median functions with negative values.", () => {
            const values = [-5, 5, -10, 10];
            expect(mathUtils.mean(values)).to.be.equal(0);
            expect(mathUtils.median(values)).to.be.equal(0);
        });
    
        it("Test the mean and median functions with repeated values.", () => {
            const values = [7, 7, 7, 7, 7, 7, 7];
            expect(mathUtils.mean(values)).to.be.equal(7);
            expect(mathUtils.median(values)).to.be.equal(7);
        });
    
        it("Test the mean and median functions with even number of values.", () => {
            const values = [7, 2, 10, 5];
            expect(mathUtils.mean(values)).to.be.equal(6);
            expect(mathUtils.median(values)).to.be.equal(6);
        });
    
        it("Test the mean and median functions with no values.", () => {
            const values = [];
            expect(mathUtils.mean(values)).to.be.NaN;
            expect(mathUtils.median(values)).to.be.NaN;
        });
    
        it("Test the mean and median functions with one value.", () => {
            const values = [777];
            expect(mathUtils.mean(values)).to.be.equal(777);
            expect(mathUtils.median(values)).to.be.equal(777);
        });
    });
});