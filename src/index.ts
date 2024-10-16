const delimiterMatchRegex = /\/\/(.*)(?=\n)/
export function add(numbers: string): number {
    if (numbers === "") return 0;

    const delimiter = numbers.match(delimiterMatchRegex)?.pop() || ',';

    const parsedNumbers = numbers
        .replace(delimiterMatchRegex, '')
        .replace(new RegExp(`\\${delimiter}`, 'g'), '\n')
        .split('\n')
        .map((number) => parseInt(number))

    const negativeNumbers = parsedNumbers.filter((number) => number < 0);
    if (negativeNumbers.length > 0) {
        throw new Error(`Negative numbers not allowed ${negativeNumbers.join(',')}`);
    }

    return parsedNumbers
    .filter(number => number <= 1000)
    .reduce((sum, number) => {
        if (number < 0) {
            throw new Error(`Negative numbers not allowed ${number}`);
        }
        return sum + number;
    }, 0);
}
