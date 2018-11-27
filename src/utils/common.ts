export function delay(seconds: number = 500) {
    return new Promise(
        (resolve, __) => {
            setTimeout(() => {
                resolve();
            }, seconds);
        }
    )
}
