import * as Font from 'expo-font';

export const loadFonts = async () => {
    await Font.loadAsync({
        'CustomFont-Regular': require('./Soloist3D-3vP6.otf'),
        'CustomFont-Regular-Fill': require('./Soloist-Z6M8.otf'),
        'CustomFont-Regular-Empty': require('./SoloistOutline-V6lw.otf'),
    });
};