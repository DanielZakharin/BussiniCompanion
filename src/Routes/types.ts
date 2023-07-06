

export type RoutesData = {
    routes: [RouteData]
}

export type RouteData = {
    gtfsId: string
    shortName: string
    longName: string
    patterns: [Pattern]
}

export type Pattern = {
    directionId: any
    headsign: string
}
