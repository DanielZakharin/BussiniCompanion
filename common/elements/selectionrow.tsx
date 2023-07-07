import { PropsWithChildren } from "react"
import { TouchableOpacity, View, Text, TextComponent } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"

type SelectionRowProps = {
    onClick: () => Promise<void>
    iconName?: string
} & PropsWithChildren

export const SelectionRow = ({ onClick, iconName, children }: SelectionRowProps) => {
    return <TouchableOpacity onPress={async () => {
        await onClick()
    }}>
        <View style={{
            flexDirection: "row",
            padding: 8,
        }}>
            {!!iconName && <Icon name={iconName!!} size={20} />}
            <Text style={{ paddingStart: 12 }}>
                {children}
            </Text>
        </View>
    </TouchableOpacity>
}
//<>{textComponent}</>