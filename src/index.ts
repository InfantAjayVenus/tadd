export function add(numbers: string): number {
    if(numbers === "")  return 0;

    const delimiter = numbers.match(/\/\/(.+?)/)?.pop() || ',';
    
    return numbers
        .replace(/\/\/(.+?)/, '')
        .replace(new RegExp(`\\${delimiter}`, 'g'), '\n')
        .split('\n')
        .map((number) => parseInt(number))
        .reduce((sum, number) => {
            if(number < 0) {
                throw new Error(`Negative numbers not allowed ${number}`);
            }
            return sum + number;
        }, 0);
}
