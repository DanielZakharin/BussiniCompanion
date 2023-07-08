import { ActivityIndicator, Text } from "react-native";
import Screenroot from "../common/elements/screenroot";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList, NavigationScreens } from "../common/navigation/navigation";
import { useQuery } from "@apollo/client";
import { STOP_DEPARTURES } from "../../apollographql/queries/stop";
import { useEffect, useState } from "react";
import { StorageManager } from "../common/storage";

export type StopDisplayScreenProps = NativeStackScreenProps<NavigationParamList, NavigationScreens.StopDisplay>

type StopAndPatternParams = { stopId: string, patternId: string }

export default ({ navigation, route }: StopDisplayScreenProps) => {

    const [stopAndPattern, setStopAndPattern] = useState<StopAndPatternParams | undefined>(undefined)

    useEffect(() => {
        const getStopAndPatternFromStorage = async () => {
            const params: StopAndPatternParams = await Promise.all([
                StorageManager.readKeyValuePair('STOP_ID_KEY'),
                StorageManager.readKeyValuePair('PATTERN_GTFS_ID_KEY')
            ]).then((res) => {
                return { stopId: res[0]!!, patternId: res[1]!! }
            })
            setStopAndPattern(params)
        }
        if (!stopAndPattern) {
            getStopAndPatternFromStorage()
        }
    })


    const shouldSkip = !stopAndPattern


    const { loading, data, error } = useQuery(STOP_DEPARTURES, {
        // $stopId: String!, $patternId: String!, $numOfDeps: Int!
        variables: { stopId: stopAndPattern?.stopId, patternId: stopAndPattern?.patternId, numOfDeps: 10 },
        skip: shouldSkip
    })


    return <Screenroot >

        {(loading || shouldSkip) && <ActivityIndicator size="large" />}

        {error && <Text>Error!
            {error.message}
        </Text>}

        {data && <Text>Tättädää! {JSON.stringify(data)}</Text>}
    </Screenroot>
}