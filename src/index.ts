const delimiterMatchRegex = /\/\/(.|\[(.+)\])(?=\n)/g;

export function extractNumbersFromString(inputString: string): number[] {
    const delimiter = inputString.match(delimiterMatchRegex)?.at(0)
        ?.replace('//', '')
        ?.replace(/\[|\]/g, '')
        ?.split('')
        ?.map(char => char.match(/\w/) ? char : `\\${char}`)
        ?.join('')
        || ',';

    return inputString
        .replace(delimiterMatchRegex, '')
        .replace(new RegExp(delimiter, 'g'), '\n')
        .split('\n')
        .map((number) => parseInt(number))
}

export function add(numbers: string): number {
    if (numbers === "") return 0;

    const parsedNumbers = extractNumbersFromString(numbers);

    const negativeNumbers = parsedNumbers.filter((number) => number < 0);
    if (negativeNumbers.length > 0) {
        throw new Error(`Negative numbers not allowed ${negativeNumbers.join(',')}`);
    }

    return parsedNumbers
        .filter(number => number <= 1000)
        .reduce((sum, number) => sum + number, 0);
}
