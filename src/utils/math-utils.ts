const _sum = (values:number[]) => values.reduce((accumulator, value) => accumulator + value, 0);

export const sum = (values:number[]) => {
    if (values.length === 0){
        return 0;
    }

    return _sum(values);
}

const _integerDivision = (dividend:number, divisor:number) => Math.floor(dividend/divisor);

/**
 * @returns The integer division, rounded towards negative infinity.
 */
export const integerDivision = (dividend:number, divisor:number) => {
    if (divisor === 0){
        return NaN;
    }

    return _integerDivision(dividend, divisor);
}

const _mean = (values:number[]) => _sum(values) / values.length;

export const mean = (values:number[]) => {
    if (values.length === 0){
        return NaN;
    }

    return _mean(values);
}

const _median = (values:number[]) => {
    const sortedCopy = values.slice().sort((x, y) => x - y);
    const middleIndex = _integerDivision(values.length, 2);

    if (sortedCopy.length % 2 === 0){
        return _mean(sortedCopy.slice(middleIndex - 1, middleIndex + 1));
    }

    return sortedCopy[middleIndex];
}

export const median = (values:number[]) => {
    if (values.length === 0){
        return NaN;
    }

    return _median(values);
}