import { useQuery } from "@apollo/client";
import { GET_ROUTES } from "../../apollographql/queries/routes";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { RouteData, RoutesData } from "./types";

export default () => {
    const { error, loading, data } = useQuery<RoutesData>(GET_ROUTES)

    if (loading) {
        return <View>
            <ActivityIndicator size="large" />
        </View>
    }

    if (error) {
        const errorTxt = error.message
        return <View>
            <Text>Error!...</Text>
            <Text>{errorTxt}</Text>
        </View>
    }

    if (data) {
        return <RoutesList routesData={data} />
    }

    return 'WTF??!'
}

type RoutesListProps = { routesData: RoutesData }

const RoutesList = ({ routesData }: RoutesListProps) => {
    return <FlatList
        data={routesData.routes}
        renderItem={({ item }) => <RouteRow routeData={item} />}
        keyExtractor={(item: RouteData) => item.gtfsId} />

}

type RouteRowProps = { routeData: RouteData }

const RouteRow = ({ routeData }: RouteRowProps) => {
    return <View>
        <Text>
            {routeData.shortName}, {routeData.longName}
        </Text>
    </View>

}