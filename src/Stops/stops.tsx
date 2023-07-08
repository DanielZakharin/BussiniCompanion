import { ActivityIndicator, FlatList, Text } from "react-native";
import Screenroot from "../common/elements/screenroot";
import { NavigationParamList, NavigationScreens } from "../common/navigation/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { GET_PATTERN } from "../../apollographql/queries/pattern";
import { StopData, StopsData, StopsWrapper } from "./types";
import { SelectionRow } from "../common/elements/selectionrow";
import StorageManager from "../common/storage"
import { CommonActions } from "@react-navigation/native";

export type StopNavProps = NativeStackScreenProps<NavigationParamList, NavigationScreens.Stop>


export default ({ navigation, route }: StopNavProps) => {
    const { selectedRoutePatternGtfsId } = route.params
    const { loading, data, error } = useQuery<StopsWrapper>(GET_PATTERN, {
        variables: { id: selectedRoutePatternGtfsId },
    })

    const onStopClicked = async (item: StopData) => {
        console.log(`Clicked ${JSON.stringify(item)}`)
        const writeStorageSuccess = (await Promise.all([
            StorageManager.saveKeyValuePair('STOP_ID_KEY', item.gtfsId),
            StorageManager.saveKeyValuePair('PATTERN_GTFS_ID_KEY', selectedRoutePatternGtfsId)
        ])).every((res) => res)
        if (writeStorageSuccess) {
            // navigate to stop display, drop previous screens from stack
            navigation.dispatch(
                CommonActions.reset(
                    {
                        index: 0,
                        routes: [
                            { name: NavigationScreens.StopDisplay },
                        ],
                    }
                )
            )
        } else {
            // TODO show error
        }
    }

    return <Screenroot >

        {loading && <ActivityIndicator size="large" />}

        {error && <Text>Error!
            {error.message}
        </Text>}

        {data && <StopsList stopsData={data.pattern} onStopClicked={onStopClicked} />}
    </Screenroot>
}

const StopsList = ({ stopsData, onStopClicked }: { stopsData: StopsData, onStopClicked: (item: StopData) => void }) => {
    return <FlatList
        data={stopsData.stops}
        renderItem={({ item }) => <StopItem item={item} onStopClicked={onStopClicked} />}
    />
}

const StopItem = ({ item, onStopClicked }: { item: StopData, onStopClicked: (item: StopData) => void }) => {
    return <SelectionRow onClick={async () => {
        onStopClicked(item)
    }} iconName="bus-stop-covered">
        <Text >{item.name}</Text>
    </SelectionRow>
}
