import { PropsWithChildren } from "react"
import { TouchableOpacity, View, Text, TextComponent } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import IconC from "react-native-vector-icons/MaterialCommunityIcons"

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
            {iconName && <MaterialOrCommunityIcon iconName={iconName} />}
            <Text style={{ paddingStart: 12 }}>
                {children}
            </Text>
        </View>
    </TouchableOpacity>
}

const MaterialOrCommunityIcon = ({ iconName }: { iconName: string }) => {
    return Icon.hasIcon(iconName) ? <Icon name={iconName} size={20} /> : (
        IconC.hasIcon(iconName) ? <IconC name={iconName} size={20} /> : undefined
    )
}