import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/profile/ProfileScreen";
import Header from "../../components/Header";

const Stack = createNativeStackNavigator();

const ProfileStack = () =>{
return(
    <Stack.Navigator
    initialRouteName="UserProfile"
    screenOptions={{
        headerShown: true,
    }}
    >
        <Stack.Screen name="UserProfile" component={ProfileScreen}
         options={{ 
            header: () => <Header title="Mi Perfil" />
            
           

          }}
        />

    </Stack.Navigator>
)

}

export default ProfileStack;