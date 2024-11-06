const delimiterMatchRegex = /\/\/(.|\[(.+)\])(?=\n)/g;

enum IndexFlag {
    Odd = 0,
    Even = 1,
    None = 2
};

export function extractDelimiter(inputString: string): string|undefined {
   return inputString.match(delimiterMatchRegex)?.at(0)
        ?.replace('//', '')
        ?.replace(/\[|\]/g, '')
}

export function extractIndexFlag(inputString: string): IndexFlag {
    const delimiter = extractDelimiter(inputString);

    if(!delimiter || delimiter.length === 0) return IndexFlag.None;

    if(delimiter.includes('0')) return IndexFlag.Odd;
    if(delimiter.includes('1')) return IndexFlag.Even;

    return IndexFlag.None;
}

export function extractNumbersFromString(inputString: string): number[] {
    const delimiter = extractDelimiter(inputString)
            ?.replace(/[0,1]/g, '')
            ?.split('')
            ?.map(char => char.match(/\w/) ? char : `\\${char}`)
            ?.join('') || ',';

    return inputString
        .replace(delimiterMatchRegex, '')
        .replace(new RegExp(delimiter, 'g'), '\n')
        .split('\n')
        .map((number) => parseInt(number))
}

export function add(numbers: string): number {
    if (numbers === "") return 0;

    const parsedNumbers = extractNumbersFromString(numbers);
    const indexFilterFlag = extractIndexFlag(numbers);
    

    const negativeNumbers = parsedNumbers.filter((number) => number < 0);
    if (negativeNumbers.length > 0) {
        throw new Error(`Negative numbers not allowed ${negativeNumbers.join(',')}`);
    }

    return parsedNumbers
        .filter(number => number <= 1000)
        .filter((_, index) => {
            if(indexFilterFlag === IndexFlag.None) return true;
            return (indexFilterFlag === IndexFlag.Odd && (index % 2 !== 0)) 
                    || (indexFilterFlag === IndexFlag.Even && (index % 2 === 0))
        })
        .reduce((sum, number) => sum + number, 0);
}