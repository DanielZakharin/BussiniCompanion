import { useQuery } from "@apollo/client";
import { GET_ROUTES } from "../../apollographql/queries/routes";
import { View, Text } from "react-native";


export default () => {
    const { error, loading, data } = useQuery(GET_ROUTES)

    if (loading) {
        return <View>
            <Text>Loading...</Text>
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
        return <View><Text>
            {JSON.stringify(data)}
        </Text>
        </View>
    }

    return 'WTF??!'
}