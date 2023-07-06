import { useQuery } from "@apollo/client";
import { GET_ROUTES } from "../../apollographql/queries/routes";
import { View, Text, ActivityIndicator, FlatList, Pressable, ToastAndroid, TouchableOpacity } from "react-native";
import { RouteData, RoutesData } from "./types";
import Icon from 'react-native-vector-icons/MaterialIcons'

export default () => {
    const { error, loading, data } = useQuery<RoutesData>(GET_ROUTES)

    return <View>

        <RoutesHeader />

        {loading && <ActivityIndicator size="large" />}

        {error && <Text>Error!<br />{error.message}</Text>}

        {data && <RoutesList routesData={data} />}

    </View >
}

const RoutesHeader = () => {
    return <View style={{ padding: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Select Route</Text>
    </View >
}

type RoutesListProps = { routesData: RoutesData }

const RoutesList = ({ routesData }: RoutesListProps) => {
    const sortedRoutes = sortRoutes(routesData.routes)
    return <FlatList
        data={sortedRoutes}
        renderItem={({ item }) => <RouteRow routeData={item} />}
        keyExtractor={(item: RouteData) => item.gtfsId} />

}

type RouteRowProps = { routeData: RouteData }

const RouteRow = ({ routeData }: RouteRowProps) => {
    return <TouchableOpacity onPress={() => {
        // debug
        ToastAndroid.show(`Pressed on route ${routeData.shortName}`, ToastAndroid.SHORT)
    }}>
        <View style={{
            flexDirection: "row",
            padding: 8,
        }}>
            <Icon name="directions-bus" size={20} />
            <Text style={{ paddingStart: 12 }}>
                <Text style={{ fontWeight: "bold" }}>{routeData.shortName}</Text>, {routeData.longName}
            </Text>
        </View>
    </TouchableOpacity>

}

const sortRoutes = (routes: [RouteData]) => {
    return routes.slice().sort((a, b) => {
        const anum = parseInt(a.shortName, 10)
        const bnum = parseInt(b.shortName, 10)
        return anum - bnum
    })
}