import axios from "axios";

//const search = "http://127.0.0.1:8000/api/search?query="

//const categories = "http://127.0.0.1:8000/api/category";

//const url2= "https://afternoon-brook-57512-4e3e1dbab78c.herokuapp.com/public/api/songs";

//const CloudPhp = "https://tan-owl-223510.hostingersite.com/api"  //--> produccion
//const CloudPhp = "http://10.0.2.2:8000/api"  //-> enmulador android
//const CloudPhp = "http://127.0.0.1:8000/api";  //-> web android

const CloudPhp = "https://api.musikoord.com/api";

//const CloudPhp = "http://82.25.90.180:8000/api"; //-> web android

export const getSongs = async () => {
  try {
    const response = await axios.get(`${CloudPhp}/songs`);
    // console.log("res=>:", response.data);
    return response.data; // Retorna la respuesta si necesitas manejarla en otro lugar
  } catch (error) {
    console.error("error al obtener canciones:", error);
    throw error; // Puedes lanzar el error para manejarlo en el componente que llama esta función
  }
};

export const getSongById = async (id) => {
  try {
    const response = await axios.get(`${CloudPhp}/songs/${id}`);
    // console.log("res=>:", response.data);
    return response.data; // Retorna la respuesta si necesitas manejarla en otro lugar
  } catch (error) {
    console.error("Error al obtener cancion:", error);
    throw error; // Puedes lanzar el error para manejarlo en el componente que llama esta función
  }
};

export const createSong = async (data) => {
  try {
    const response = await axios.post(`${CloudPhp}/songs`, data);
    // console.log("post realizado correctamente", response)
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateSong = async (id, data) => {
  console.log("data=> ", data, "id=>  ", id);

  console.log("🌐 Llamando a:", `${CloudPhp}/category`);

  try {
    const response = await axios.put(`${CloudPhp}/songs/${id}`, {
      song: data.song,
      categories: data.categories,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



export const getCategories = async () => {
  try {
    const url = `${CloudPhp}/category`;
    console.log("🌐 Solicitando categorías desde:", url);

    const response = await axios.get(url);
    console.log("✅ Respuesta completa:", response);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("❌ Error con respuesta:", error.response.status);
      console.error("➡️ Datos:", error.response.data);
    } else if (error.request) {
      console.error("❌ No hubo respuesta del backend:", error.request);
    } else {
      console.error("❌ Error al hacer la petición:", error.message);
    }
    throw error;
  }
};






export const createCategorie = async (data) => {
  try {
    const response = await axios.post(`${CloudPhp}/category`, data);
    //  console.log("este es el response=> ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error  crear la categoria:", error);
    throw error;
  }
};
export const UpdateCategorie = async (id, data) => {
  console.log("data=> ", data, "id=>  ", id);
  try {
    const response = await axios.put(`${CloudPhp}/category/${id}`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const searchingSongs = async (query) => {
  try {
    const response = await axios.get(`${CloudPhp}/search?query=${query}`);
    //console.log("este es el response=> ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error al buscar canciones:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${CloudPhp}/login`, {
      email,
      password,
    });
    //   console.log("datos del user=> ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export const loginGoogle = async (email, name, googleId, profile_picture) => {
  try {
    const response = await axios.post(`${CloudPhp}/login-google`, {
      email,
      name,
      googleId,
      profile_picture,
    });
    //   console.log("datos del user=> ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    throw error;
  }
};

export const createUser = async (data) => {
  try {
    const response = await axios.post(`${CloudPhp}/users`, data);
    //  console.log("este es el response => ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error  al crear el usuario:", error);
    throw error;
  }
};

export const getUserById = async (id, token) => {
  console.log("idUser  => ", id);
  console.log("token id=> ", token);
  try {
    const response = await axios.get(`${CloudPhp}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json", // Esto también es recomendado para Laravel
      },
    });
    //console.log("res=>:", response);
    return response.data; // Retorna la respuesta si necesitas manejarla en otro lugar
  } catch (error) {
    console.error("Error al obtener datos del usuario:", error);
    throw error; // Puedes lanzar el error para manejarlo en el componente que llama esta función
  }
};

export const getGroupById = async (id) => {
  try {
    const response = await axios.get(`${CloudPhp}/groups/${id}`);
    // console.log("res=  >:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el grupo:", error);
    throw error;
  }
};

export const createGroups = async (data) => {
  try {
    const response = await axios.post(`${CloudPhp}/groups`, data);
    // console.log("este es el response=> ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error  crear la categoria:", error);
    throw error;
  }
};

export const createRepertorio = async (data) => {
  try {
    const response = await axios.post(`${CloudPhp}/repertorios`, data);
    // console.log("este es el response=> ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error  crear la categoria:", error);
    throw error;
  }
};

export const getRepertorioId = async (id) => {
  try {
    const response = await axios.get(`${CloudPhp}/repertorios/${id}`);
    // console.log("reperotrio desde api ----> :", response.data);
    return response.data;
  } catch (error) {
    console.error("Error el repertorio:", error);
    throw error;
  }
};

export const getRepertorioSongCategoryId = async (id) => {
  try {
    const response = await axios.get(
      `${CloudPhp}/repertoriosongcategory/${id}`
    );
    // console.log("reperotrio desde api ----> :", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el grupo del repertorio:", error);
    throw error;
  }
};

export const createRepertorioSongCategory = async (data) => {
  try {
    const response = await axios.post(
      `${CloudPhp}/repertoriosongcategory`,
      data
    );
    // console.log("este es el response=> ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error  crear la categoria del repertorio:", error);
    throw error;
  }
};

export const createComentarios = async (data) => {
  try {
    const response = await axios.post(`${CloudPhp}/comentarios`, data);
    // console.log("este es el response=> ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error al crear comentario:", error);
    throw error;
  }
};

// custom song
export const getCustomSongById = async (id) => {
  try {
    const response = await axios.get(`${CloudPhp}/customSong/${id}`);
    // console.log("reperotrio desde api ----> :", response.data);
    return response.data;
  } catch (error) {
    console.error("Error a obtener la song:", error);
    throw error;
  }
};

export const createCustomSong = async (data) => {
  try {
    const response = await axios.post(`${CloudPhp}/customSong`, data);
    // console.log("este es el response=> ",response.data)
    return response.data;
  } catch (error) {
    console.error("Error  crear la categoria del repertorio:", error);
    throw error;
  }
};

export const UpdateCustomSong = async (id, data) => {
  try {
    const response = await axios.put(`${CloudPhp}/customSong/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const DeletedCustom = async (id) => {
  try {
    const response = await axios.delete(`${CloudPhp}/customSong/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
