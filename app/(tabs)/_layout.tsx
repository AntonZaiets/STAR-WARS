import { Tabs } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { useTheme } from "@/components/Context/Context";
import { Ionicons } from "@expo/vector-icons";

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
                        zIndex: 0,
                    },
                }}
            >
                <Tabs.Screen
                    name='Characters'
                    options={{
                        title: 'Characters',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="people-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='Starships'
                    options={{
                        title: 'Starships',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="rocket-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='Planets'
                    options={{
                        title: 'Planets',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="planet-outline" color={color} size={size} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name='Films'
                    options={{
                        title: 'Films',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="film-outline" color={color} size={size} />
                        ),
                    }}
                />
            </Tabs>
            <StatusBar backgroundColor="#161622" style="light" />
        </>
    );
}

export default TabsLayout;
