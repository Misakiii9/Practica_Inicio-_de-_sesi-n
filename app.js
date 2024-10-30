import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Button, Alert, TextInput } from 'react-native';
import image from './assets/heart.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUri, setImageUri] = useState('https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg');

  const pickImageGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri);
    }
  };

  const pickImageFoto = async (fromCamera = false) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }
    if (!result.canceled) {
      setSelectedImage({ localUri: result.uri });
    }
  };

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permisos son requeridos');
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled === true) {
      return;
    }
    setSelectedImage({ localUri: pickerResult.uri });
  };

  return (
    <View style={style.container}>
      <View style={style.subcontainer}>
        <Text style={style.title}>Inicio de Sesión</Text>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <Image source={{ uri: imageUri }} style={style.image} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Sharing.shareAsync(imageUri)} style={style.buton3}>
          <Text style={style.butontext}>COMPARTIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={style.buton2} onPress={() => pickImageFoto(true)}>
          <Text style={style.butontext}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>

        <View style={style.subcontainer2}>
          <Text style={style.subtitle}>Nombre de usuario:</Text>
          <TextInput style={style.input} placeholder="Nombre" />

          <Text style={style.subtitle}>Contraseña: </Text>
          <TextInput style={style.input} placeholder="Contraseña" />
        </View>

        <TouchableOpacity style={style.buton} onPress={() => alert('Usuario Registrado')}>
          <Text style={style.butontext}>ACEPTAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' },
  subcontainer2: { marginTop: 25, marginBottom: 15 },
  subcontainer: { borderColor: '#294AEC', backgroundColor: '#1E1E1F', borderWidth: 2, alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: 50 },
  title: { fontSize: 20, fontFamily: 'Courier', fontWeight: '500', color: '#E0FFFF' },
  subtitle: { fontSize: 14, fontFamily: 'monospace', color: '#87CEFA' },
  text: { fontSize: 19, fontFamily: 'monospace', color: '#87CEFA' },
  image: { height: 180, width: 180, borderRadius: 5, marginTop: 25, marginBottom: 15, borderColor: '#294AEC', borderWidth: 3 },
  input: { padding: 5, height: 25, width: 200, borderRadius: 5, backgroundColor: "#FFFFFF", color: '#000000', marginTop: 5, marginBottom: 10, borderColor: '#5975FE', borderWidth: 2 },
  buton: { height: 30, width: 90, backgroundColor: "#191970", borderRadius: 8, borderColor: '#5975FE', borderWidth: 1.5, justifyContent: "center", alignItems: 'center' },
  buton2: { height: 30, width: 120, backgroundColor: "#191970", borderRadius: 8, borderColor: '#5975FE', borderWidth: 1.5, justifyContent: "center", alignItems: 'center' },
  buton3: { padding: 5, marginBottom: 10, height: 30, width: 90, backgroundColor: "#191970", borderRadius: 8, borderColor: '#5975FE', borderWidth: 1.5, justifyContent: "center", alignItems: 'center' },
  butontext: { color: "#E0FFFF", fontSize: 12, textAlign: 'center' }
});

export default App;
