import { Tabs, Redirect } from 'expo-router';
import {StatusBar} from "expo-status-bar";
import {useTheme} from "@/components/Context/Context";

const TabsLayout = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: "#FFF33F",
                    tabBarInactiveTintColor: "#CDCDE0",
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        borderTopWidth: 1,
                        borderTopColor: 'transparent',
                        height: 85,
                        position: 'absolute',
                        zIndex: 0,  // Зменшений пріоритет для таб бара
                    },
                }}
            >
                <Tabs.Screen
                    name='Characters'
                    options={{ title: 'Characters', headerShown: false, }}
                />
                <Tabs.Screen
                    name='Starships'
                    options={{ title: 'Starships', headerShown: false, }}
                />
                <Tabs.Screen
                    name='Planets'
                    options={{ title: 'Planets', headerShown: false, }}
                />
                <Tabs.Screen
                    name='Films'
                    options={{ title: 'Films', headerShown: false, }}
                />
            </Tabs>
            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
}

export default TabsLayout;