import { useQuery } from "@apollo/client";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { NavigationProps, NavigationScreens } from "../../App";
import { GET_ROUTES } from "../../apollographql/queries/routes";
import Screenroot from "../../common/elements/screenroot";
import { SelectionRow } from "../../common/elements/selectionrow";
import StorageManager from '../../common/storage';
import { RouteData, RoutesData } from "./types";

export default ({ navigation }: NavigationProps) => {
    const { error, loading, data } = useQuery<RoutesData>(GET_ROUTES)

    return <Screenroot>

        {loading && <ActivityIndicator size="large" />}

        {error && <Text>Error!
            {error.message}
        </Text>}

        {data && <RoutesList onRouteClick={
            async (route) => {
                console.log(`clicked route ${route.gtfsId}`)
                if (await StorageManager.saveKeyValuePair('ROUTE_KEY', route.gtfsId)) {
                    console.log(`should pass ${JSON.stringify(route)}`)
                    navigation.navigate(NavigationScreens.Pattern, {
                        selectedRoute: route
                    })
                } else {
                    console.log('Could not save to storage')
                }
            }
        } routesData={data} />}

    </Screenroot >
}

/*
const RoutesHeader = () => {
    return <View style={{ padding: 8 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Select Route</Text>
    </View >
}
*/

type RoutesListProps = { routesData: RoutesData, onRouteClick: (route: RouteData) => void }

const RoutesList = ({ onRouteClick, routesData }: RoutesListProps) => {

    const sortedRoutes = sortRoutes(routesData.routes)
    return <FlatList
        data={sortedRoutes}
        renderItem={({ item }) => <RouteRow routeData={item} onRouteClick={onRouteClick} />}
        keyExtractor={(item: RouteData) => item.gtfsId} />

}

type RouteRowProps = { routeData: RouteData, onRouteClick: (route: RouteData) => void }

const RouteRow = (props: RouteRowProps) => {
    const { routeData, onRouteClick } = props
    const innerText = () => { return <Text><Text style={{ fontWeight: "bold" }}>{routeData.shortName}</Text>, {routeData.longName}</Text > }
    return <SelectionRow
        onClick={async () => { return await onRouteClick(routeData) }}
        iconName="directions-bus">
        <Text style={{ fontWeight: "bold" }}>{routeData.shortName}</Text>, {routeData.longName}
    </SelectionRow>

}

const sortRoutes = (routes: [RouteData]) => {
    return routes.slice().sort((a, b) => {
        const anum = parseInt(a.shortName, 10)
        const bnum = parseInt(b.shortName, 10)
        return anum - bnum
    })
}