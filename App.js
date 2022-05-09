import React,{useState} from 'react';
import { View, Image, Button, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import image from '../backendimg/models/image';


const SERVER_URL = 'http://localhost:8000';


const App = () => {
  const [photo, setPhoto] = useState(null);


  const handleChoosePhoto = async () => {
    await ImagePicker.requestMediaLibraryPermissionsAsync();
      // console.log(response);
      const result = await ImagePicker.launchImageLibraryAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPhoto(result.uri);
      console.log(result.uri);
    }
  

  };
 


  const handleUploadPhoto = async() => {
   // if (singleFile != null) {
      //If file selected then create FormData
     // const fileToUpload = singleFile;
     const formdata = new FormData();
  formdata.append('workImage', {
    name: image.filename,
  })
    //}
   const res = await fetch(`${SERVER_URL}/api/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data; ',
      },
    })
    const responseJson = await res.json();
    if (responseJson.status == 1) {
      alert('Upload Successful');
    }
        
      
     
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {photo && (
      <View>
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}/>
          
          <Button title="Upload Photo" onPress={handleUploadPhoto} />
      </View>
      )}
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
    </View>
  );
};

export default App;
