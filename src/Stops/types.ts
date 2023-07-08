export type StopScreenProps = {
    selectedRoutePatternGtfsId: string
}

export type StopsWrapper = {
    pattern: StopsData
}

export type StopsData = {
    id: string,
    directionId: string,
    stops: [any]//StopData[]
}

export type StopData = {
    gtfsId: string,
    name: string
}