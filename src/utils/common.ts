export function IsNumber(str: string) {
    let res = Number(str)
    return !isNaN(res);
}
