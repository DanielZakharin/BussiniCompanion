export const makeGtfsId = (
    route?: string,
    direction?: string,
    variation: string = '01'
): string => {
    return `${route ? route : ''}${direction ? ':' + direction : ''}${variation ? ':' + variation : ''}`
}