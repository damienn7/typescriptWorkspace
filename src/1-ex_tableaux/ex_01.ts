const arrToString = (arr: number[]): string => {
    let stringToCompute: string = '[';
    arr.forEach((item, index) => {
        if (arr.length - 1 == index) {
            stringToCompute += `${item}`;
        } else {
            stringToCompute += `${item}, `;
        }
    });
    stringToCompute += ']';
    return stringToCompute;
};

export { arrToString };