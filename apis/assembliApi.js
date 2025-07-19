import axios from "axios"
import { AssemblyAI } from 'assemblyai';
import { API_KEY_ASSEMBLI } from '@env';



const client = new AssemblyAI({
    apiKey: API_KEY_ASSEMBLI, // Tu API Key
  });



const openAi = async (formData) => {
    console.log("aqui esta la data del audio ", formData)
    try {
      const response = await axios.post(whisperEndpoint, formData, {
        headers: {
          Authorization: `Bearer ${apiKey}`, // Cambia este token por el tuyo
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Transcripcion: ", response.data); 
      return response.data; // Retorna la respuesta si necesitas manejarla en otro lugar
    
    } catch (error) {
        console.error('Error al transcribir el audio:', error.response?.data || error.message);}
  };

export default openAi;
