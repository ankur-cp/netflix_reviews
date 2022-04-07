
import axios from "axios"


const tryCatchFetch = async (axiosCall, url, options = null) => {
  try {
    const response = await axiosCall(url)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    }
    else {
      throw new Error(`${response.status}: ${response.statusText}`)
    }
  }
  catch (e) {
    console.error("!!!! ERROR FETCHING !!!!", e)
    return null
  }
}


const myExports = { }

const BASE_URL = "http://localhost:8000/netflix_api/"

myExports.getAllProducts = async () => {
  return await tryCatchFetch(axios.get, `${BASE_URL}products/`)
}

myExports.getProduct = async (productId) => {
  return await tryCatchFetch(axios.get, `${BASE_URL}products/${productId}`)
}

myExports.getAllCategories = async () => {
  return await tryCatchFetch(axios.get, `${BASE_URL}categories/`)
}

myExports.getCategory = async (categoryId) => {
  return await tryCatchFetch(axios.get, `${BASE_URL}categories/${categoryId}/`)
}

myExports.getAllGenres = async () => {
  return await tryCatchFetch(axios.get, `${BASE_URL}genres/`)
}

myExports.getGenre = async (genreId) => {
  return await tryCatchFetch(axios.get, `${BASE_URL}genres/${genreId}/`)
}

export default myExports