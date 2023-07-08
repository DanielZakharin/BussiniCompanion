import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { FlatList, Text } from "react-native"
import Screenroot from "../common/elements/screenroot"
import { SelectionRow } from "../common/elements/selectionrow"
import { NavigationParamList, NavigationScreens } from "../common/navigation/navigation"
import { makeGtfsId } from "../common/utils"

export type PatternNavProps = NativeStackScreenProps<NavigationParamList, NavigationScreens.Pattern>

export default ({ navigation, route }: PatternNavProps) => {
    const selectedRoute = route.params?.selectedRoute
    return <Screenroot>
        <FlatList data={selectedRoute?.patterns}
            renderItem={({ item }) =>
                <SelectionRow
                    onClick={async () => {
                        const gtfsIdSoFar = makeGtfsId(selectedRoute.gtfsId, item.directionId.toString(), '01')
                        console.log(`full gtfsId so far ${gtfsIdSoFar}`)
                        navigation.navigate('Stop', { selectedRoutePatternGtfsId: gtfsIdSoFar })

                    }}
                    iconName="swap-horiz" >
                    <Text>{item.headsign}</Text>
                </SelectionRow>
            }
        />
    </Screenroot>
}