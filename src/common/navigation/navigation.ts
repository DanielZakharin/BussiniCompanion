import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { PatternScreenProps } from "../../Pattern/types"
import { StopScreenProps } from "../../Stops/types"


export enum NavigationScreens {
    Routes = 'Routes',
    Pattern = 'Pattern',
    Stop = 'Stop',
    StopDisplay = 'StopDisplay'
}

export type NavigationParamList = {
    Routes: undefined,
    Pattern: PatternScreenProps,
    Stop: StopScreenProps
    StopDisplay: undefined
}
