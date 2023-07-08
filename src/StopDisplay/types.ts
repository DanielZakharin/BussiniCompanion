export type StopDisplayScreenProps = {
    
}

export type StopWrapper = {
    stop: StopData
}

export type StopData = {
    name: string,
    stopTimesForPattern: [StopTimeForPattern]
}

export type StopTimeForPattern = {
    serviceDay: number
    realtime: boolean
    realtimeDeparture: number
    scheduledDeparture: number
}