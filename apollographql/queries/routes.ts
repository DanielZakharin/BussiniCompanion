import { gql, useQuery } from '@apollo/client'

export const GET_ROUTES = gql`query GetRoutes {
      routes(transportModes:BUS) {
        gtfsId
        shortName
        longName
        patterns {
          directionId
          headsign
        }
      }
  }`
