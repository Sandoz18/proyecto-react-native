import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from './auth/AuthStackNavigator';
import TabNavigator from './tab/TabNavigator';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setImage, setLocalId, setEmail } from '../store/slices/userSlice';
import { colors } from '../global/colors';
import { useGetProfilePictureQuery } from '../services/profileApi';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { initSessionTable, getSession } from "../components/db/db";

const MainNavigator = () => {
    const localId = useSelector(state => state.user.localId);
    const [checkingSession, setCheckingSession] = useState(true);

    const dispatch = useDispatch();

    const { data: profilePicture } = useGetProfilePictureQuery(localId);
 useEffect(() => {
    const bootstrap = async () => {
        try {
            await initSessionTable();
            const session = await getSession();
            if (session) {
                console.log('session', session);
                dispatch(setEmail(session.email));
                dispatch(setLocalId(session.localId));
            }
        } catch (err) {
            console.log('Error al obtener sesión:', err);
        } finally {
            // Esto garantiza que la pantalla de carga se oculta
            setCheckingSession(false);
        }
    };
    bootstrap();
}, []);

   
    useEffect(() => {
       
        if (profilePicture) {
            dispatch(setImage(profilePicture.image));
        }
    }, [profilePicture, dispatch]);

    if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.cobaltBlue} />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {
            localId ? <TabNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    );
};

export default MainNavigator;

const styles = StyleSheet.create({});