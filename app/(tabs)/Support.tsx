import React, {useState} from 'react';
import {View, Text, Button, Linking, Image, Platform} from 'react-native';
import PageForm from "@/components/PageForm";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import {tls} from "node-forge";
import Alert = module

const Support = () => {

    const [file, setFile] = useState<DocumentPicker.DocumentPickerResult | null>(null);
    const [image, setImage] = useState<DocumentPicker.DocumentPickerResult | null>(null);
    const sendEmail = () => {
        const email = 'antonfifa19@gmail.com';
        const subject = 'Hello from React Native';
        const body = 'This is a test email.';

        // Шаблонная строка с использованием обратных кавычек
        const emailUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        // Открываем почтовый клиент
        Linking.openURL(emailUrl).catch((err) => {
            console.error('Error in opening mail client', err);
        });
    };

    const selectDoc = async () => {
        try {
            const doc = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                multiple: false,
            });
            setFile(doc)
            console.log(doc)
        } catch (err) {
            console.log('Error in document picking: ', err);
        }
    };


    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Функция для запроса разрешений
    const requestPermission = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Извините, нам нужно разрешение на доступ к вашим фото для работы!');
            }
        }
    };

    // Функция для выбора изображения из галереи
    const pickImage = async () => {
        requestPermission();
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images, // Выбираем только изображения
                allowsEditing: true, // Разрешаем редактирование изображения
                aspect: [4, 3], // Соотношение сторон
                quality: 1, // Качество изображения (от 0 до 1)
            });
            console.log(result);

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri); // Сохраняем URI изображения
                console.log(selectedImage);
            }
        } catch (error) {
            console.log('Ошибка выбора изображения: ', error);
        }
    };


    return (
        <PageForm
            content={
                <>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{color: 'white'}}>Open Mail Client Example</Text>
                        <Button title="Send Email" onPress={sendEmail} />
                        <Text
                            style={{
                                color: 'black',
                                fontSize: 28,
                                textAlign: 'center',
                                marginVertical: 40,
                            }}>
                            Document Picker
                        </Text>
                        <View style={{marginHorizontal: 40}}>
                            <Button title="Select Document" onPress={selectDoc} />
                            <Button title="Select Image" onPress={pickImage} />
                        </View>
                        <Image style={{width: 200, height: 200}} source={{ uri: selectedImage } as never} />
                    </View>
                </>
            }>
        </PageForm>
    );
};

export default Support;
