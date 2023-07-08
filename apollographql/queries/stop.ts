import { gql } from "@apollo/client";

export const STOP_DEPARTURES = gql`query Stop($stopId: String!, $patternId: String!, $numOfDeps: Int!) {
    stop(id: $stopId) {
        name
        stopTimesForPattern(id: $patternId, numberOfDepartures: $numOfDeps) {
            serviceDay
            realtime
            realtimeDeparture
            scheduledDeparture
        }
    }
}`