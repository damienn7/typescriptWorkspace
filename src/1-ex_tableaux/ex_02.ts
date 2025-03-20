const arrSum = (arr: number[], index: number = 0, sum: number = 0): number => {
    if (index < arr.length) {
        sum = sum + arr[index];
        return arrSum(arr, index + 1, sum);
    }
    return sum;
}

export { arrSum };