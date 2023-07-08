import { Text } from "react-native";
import Screenroot from "../common/elements/screenroot";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { NavigationParamList, NavigationScreens } from "../common/navigation/navigation";

export type StopDisplayScreenProps = NativeStackScreenProps<NavigationParamList, NavigationScreens.StopDisplay>

export default ({ navigation, route }: StopDisplayScreenProps) => <Screenroot >
    <Text >
        Hello! Stop display here
    </Text>
</Screenroot>