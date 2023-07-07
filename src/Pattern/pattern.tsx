import { FlatList, Text } from "react-native"
import Screenroot from "../common/elements/screenroot"
import { SelectionRow } from "../common/elements/selectionrow"
import { NavigationParamList, NavigationProps, NavigationScreens } from "../common/navigation/navigation"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import StorageManager from '../common/storage'
import { makeGtfsId } from "../common/utils"

export type PatternNavProps = NativeStackScreenProps<NavigationParamList, NavigationScreens.Pattern>

export default ({ navigation, route }: PatternNavProps) => {
    const selectedRoute = route.params?.selectedRoute
    return <Screenroot>
        <FlatList data={selectedRoute?.patterns}
            renderItem={({ item }) =>
                <SelectionRow
                    onClick={async () => {
                        console.log(`selected pattern ${JSON.stringify(item)}`)
                        const gtfsIdSoFar =  makeGtfsId(selectedRoute.gtfsId, item.directionId.toString())
                        console.log(`full gtfsId so far ${gtfsIdSoFar}`)
                        if (await StorageManager.saveKeyValuePair('PATTERN_KEY', item.directionId.toString())) {
                            navigation.navigate('Stop', { selectedRoutePatternGtfsId: gtfsIdSoFar })
                        }

                    }}
                    iconName="swap-horiz" >
                    <Text>{item.headsign}</Text>
                </SelectionRow>
            }
        />
    </Screenroot>
}