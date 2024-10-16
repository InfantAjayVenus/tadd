import { add } from ".";

describe("add", () => {
    it("should be called", () => {
        expect(add).toBeDefined();
    });

    it("should return 0 when empty string is passed" , () => {
        expect(add("")).toBe(0);
    });
});