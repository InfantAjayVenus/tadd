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
    });
});