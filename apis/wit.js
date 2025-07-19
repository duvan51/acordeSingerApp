import axios from "axios"


const url = "https://api.wit.ai/speech";


const sendToWitAI = async (formData) => {
    console.log("aqui esta la data del audio ", formData)
    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: "Bearer 3AZSOIW52BQAYN76A3I2JAA55DGLINHX", // Cambia este token por el tuyo
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Respuesta de Wit.ai:", response.data); 
      return response.data; // Retorna la respuesta si necesitas manejarla en otro lugar
    } catch (error) {
      console.error("Error al enviar el audio a Wit.ai:", error);
      throw error; // Puedes lanzar el error para manejarlo en el componente que llama esta función
    }
  };
export default sendToWitAI;

