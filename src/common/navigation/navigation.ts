import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { PatternScreenProps } from "../../Pattern/types"
import { StopScreenProps } from "../../Stop/types"


export enum NavigationScreens {
    Routes = 'Routes',
    Pattern = 'Pattern',
    Stop = 'Stop'
}

export type NavigationParamList = {
    Routes: undefined,
    Pattern: PatternScreenProps,
    Stop: StopScreenProps
}

export type NavigationProps = NativeStackScreenProps<NavigationParamList, NavigationScreens>