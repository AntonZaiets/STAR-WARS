import { Stack } from 'expo-router';
import { ThemeProvider } from "@/components/Context/Context";

const RootLayout = () => {
    return (
        <ThemeProvider>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='(about)' options={{ headerShown: false }} />
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            </Stack>
        </ThemeProvider>
    );
}

export default RootLayout;
