export function add(numbers: string): number {
    if(numbers === "")  return 0;

    return numbers
        .split(/[,\n]/)
        .map((number) => parseInt(number))
        .reduce((sum, number) => sum + number, 0);
}
