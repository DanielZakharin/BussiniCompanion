import { ActivityIndicator, FlatList, Text } from "react-native";
import Screenroot from "../common/elements/screenroot";
import { NavigationParamList, NavigationProps, NavigationScreens } from "../common/navigation/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@apollo/client";
import { GET_PATTERN } from "../../apollographql/queries/pattern";
import { StopData, StopsData, StopsWrapper } from "./types";
import { SelectionRow } from "../common/elements/selectionrow";

export type StopNavProps = NativeStackScreenProps<NavigationParamList, NavigationScreens.Stop>


export default ({ navigation, route }: StopNavProps) => {
    const { selectedRoutePatternGtfsId } = route.params
    const { loading, data, error } = useQuery<StopsWrapper>(GET_PATTERN, {
        variables: { id: selectedRoutePatternGtfsId },
    })
    return <Screenroot >

        {loading && <ActivityIndicator size="large" />}

        {error && <Text>Error!
            {error.message}
        </Text>}

        {data && <StopsList stopsData={data.pattern} />}
    </Screenroot>
}

const StopsList = ({ stopsData }: { stopsData: StopsData }) => {
    return <FlatList
        data={stopsData.stops}
        renderItem={({ item }) => <StopItem item={item} />}
    />
}

const StopItem = ({ item }: { item: StopData }) => {
    return <SelectionRow onClick={async () => {
        console.log(`Clicked ${JSON.stringify(item)}`)
    }} iconName="bus-stop-covered">
        <Text >{item.name}</Text>
    </SelectionRow>
}