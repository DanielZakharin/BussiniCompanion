export const makeGtfsId = (
    route?: string,
    direction?: string,
    stop?: string
): string => {
    return `${!!route ? route + ':' : ''}${direction ? direction + ':' : ''}${stop ? stop + ':' : ''}`
}