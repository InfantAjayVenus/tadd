import { add } from ".";

describe("add", () => {
    it("should be called", () => {
        expect(add).toBeDefined();
    });

    it("should return 0 when empty string is passed" , () => {
        expect(add("")).toBe(0);
    });

    it("should return the sum of numbers", () => {
        expect(add("1")).toBe(1);
        expect(add("1,2")).toBe(3);
        expect(add("1,2,3")).toBe(6);
    });

    it("should accept new line as delimiter", () => {
        expect(add("1\n2,3")).toBe(6);
    });

    it("should accept custom delimiter", () => {
        expect(add("//;\n1;2;3")).toBe(6);
        expect(add("//;\n1\n2;4")).toBe(7);
        expect(add("//+\n1\n2+4")).toBe(7);
        expect(add("//7\n1\n274")).toBe(7);
        expect(add("//n\n1\n2n4")).toBe(7);
    });

    it("should throw an error when a negative number is passed", () => {
        expect(() => add("-1")).toThrow("Negative numbers not allowed -1");
        expect(() => add("1,-1,4")).toThrow("Negative numbers not allowed -1");
        expect(() => add("//*\n1*-1\n4")).toThrow("Negative numbers not allowed -1");
    });

    it("should throw error on multiple negative numbers", () => {
        expect(() => add("-1,-2")).toThrow("Negative numbers not allowed -1,-2");
        expect(() => add("1,-1,-2")).toThrow("Negative numbers not allowed -1,-2");
    });

    it("should ignore numbers greater than 1000", () => {
        expect(add("1000,1001")).toBe(1000);
        expect(add("1,2\n1234")).toBe(3);
        expect(add("0\n1234")).toBe(0);
    });

    it("should accept a delimiter of any length", () => {
        expect(add("//[|]\n1|2|3")).toBe(6);
        expect(add("//[**]\n1**2**3")).toBe(6);
        expect(add("//[***]\n1***2***3")).toBe(6);
        expect(add("//[;*;]\n2;*;3;*;4")).toBe(9);
        expect(add("//[;*;;]\n2;*;;3;*;;4")).toBe(9);
    });

    it("should ignore 0 as a delimiter", () => {

        expect(add("//0\n102\n3")).toBe(3);
        expect(add("//1\n112\n3")).toBe(112);
    });

    it("should add only numbers in odd indices", () => {
        expect(add("//0\n1\n3\n4")).toBe(3);
    })
});
