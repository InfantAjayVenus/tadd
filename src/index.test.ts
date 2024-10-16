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
        expect(add("//;1;2;3")).toBe(6);
        expect(add("//;1\n2;4")).toBe(7);
        expect(add("//+1\n2+4")).toBe(7);
    });

    it("should throw an error when a negative number is passed", () => {
        expect(() => add("-1")).toThrow("Negative numbers not allowed -1");
        expect(() => add("1,-1,4")).toThrow("Negative numbers not allowed -1");
        expect(() => add("//*1*-1\n4")).toThrow("Negative numbers not allowed -1");
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
});