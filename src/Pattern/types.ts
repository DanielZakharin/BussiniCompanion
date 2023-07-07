import { RouteData } from "../Routes/types"

export type Pattern = {
    directionId: string
    headsign: string
}

export type PatternScreenProps = { selectedRoute: RouteData }