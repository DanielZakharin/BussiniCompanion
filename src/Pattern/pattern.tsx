import { Text } from "react-native"
import { NavigationProps } from "../../App"
import Screenroot from "../../common/elements/screenroot"

export default ({ navigation, route }: NavigationProps) => {
    const selectedRoute = route.params?.selectedRoute
    console.log(`props ${selectedRoute}`)
    return <Screenroot>
        <Text>
            Hello this will be the pattern page. Selected route {JSON.stringify(selectedRoute)}
        </Text>
    </Screenroot>
}