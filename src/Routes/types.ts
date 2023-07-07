import { Pattern } from "../Pattern/types"

export type RoutesData = {
    routes: [RouteData]
}

export type RouteData = {
    gtfsId: string
    shortName: string
    longName: string
    patterns: [Pattern]
}
