import { gql } from "@apollo/client";

export const GET_PATTERN =  gql`query Pattern ($id: String!) {
    pattern (id: $id) {
        id
        directionId
        stops {
            gtfsId
            name
        }
    }
}`