import { FlatList, Text } from "react-native"
import { NavigationProps } from "../../App"
import Screenroot from "../../common/elements/screenroot"
import { SelectionRow } from "../../common/elements/selectionrow"

export default ({ navigation, route }: NavigationProps) => {
    const selectedRoute = route.params?.selectedRoute
    console.log(`props ${selectedRoute}`)
    return <Screenroot>
        <FlatList data={selectedRoute?.patterns}
            renderItem={({ item }) =>
                <SelectionRow
                    onClick={async () => {
                        console.log(`selected pattern ${JSON.stringify(item)}`)
                        console.log(`full gtfsId so far ${selectedRoute?.gtfsId}:${item.directionId}`)
                    }}
                    iconName="swap-horiz" >
                    <Text>{item.headsign}</Text>
                </SelectionRow>
            }
        />
    </Screenroot>
}