import axios from "axios"
import { API_KEY_OPENAI } from '@env';



const apiKey = API_KEY_OPENAI; // Reemplázalo con tu clave de OpenAI
const whisperEndpoint = 'https://api.openai.com/v1/audio/transcriptions';


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
