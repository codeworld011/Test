import React, { useState } from "react";
import { View, Image, Button, Text, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Circle from "./components/Circle";
import { AntDesign } from "@expo/vector-icons";

const App = () => {
  const host = "http://localhost:8000";
  const [image, setImage] = useState({ url: "" });
  const [uploadImage, setuploadImage] = useState("");
  const handUpload = async() => {
    let permissonResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissonResult.granted === false){
      alert("camera access is required");
      return;
    }
    //get image from image
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    })
   //console.log("result", pickerResult)
   if (pickerResult.cancelled === true){
     return;
   }
   // for preview
   let base64Image = `data:image/jpg;base64,${pickerResult.base64}`;
   setuploadImage(base64Image)
   // saving in mongo
  
   const fetchImage = async () =>{
    const data = new FormData();
data.append('name', 'workImage');
    let res = await fetch(`${host}/api/upload`,
      {
        method: 'POST',
       
        headers: {
          'Content-Type': 'multipart/form-data; ',
        },
      }
    
    );
    console.log(res)

    let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert('Upload Successful');
      }
    } 
  
   // console.log(fetchImage)
    fetchImage()
};

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Circle>
        {image && image.url ? (
          <Image
            source={{ uri: image.url }}
            style={{ width: 200, height: 200, marginVertical: 20 }}
          />
        ) : uploadImage ?  <Image
        source={{ uri: uploadImage }}
        style={{ width: 200, height: 200, marginVertical: 20, borderRadius: 100, }}
      /> :   (
          <TouchableOpacity onPress={handUpload}>
            <AntDesign name="user" size={24} color="black" />
          </TouchableOpacity>
        )}
      </Circle>
      {image && image.url ? (
        <TouchableOpacity onPress={handUpload}>
          <AntDesign
            name="user"
            size={24}
            color="black"
            style={{
              marginTop: -5,
              marginBottom: 10,
              alignSelf: center,
            }}
          />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default App;
