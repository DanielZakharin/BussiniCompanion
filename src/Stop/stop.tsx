import { Text } from "react-native";
import Screenroot from "../common/elements/screenroot";
import { NavigationParamList, NavigationProps, NavigationScreens } from "../common/navigation/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type StopNavProps = NativeStackScreenProps<NavigationParamList, NavigationScreens.Stop>


export default ({navigation, route}: StopNavProps) => {
    const { selectedRoutePatternGtfsId } = route.params
    return <Screenroot >
        <Text>
            Hello!
            {selectedRoutePatternGtfsId}
        </Text>
    </Screenroot>
    
}