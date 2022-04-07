
import axios from "axios"


const tryCatchFetch = async (axiosCall) => {
  try {
    const response = await axiosCall()
    console.log(response)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    }
    else {
      throw new Error(`${response.status}: ${response.statusText} ${response.data}`)
    }
  }
  catch (e) {
    console.error("!!!! ERROR FETCHING !!!!", e)
    return null
  }
}


const myExports = { }

const BASE_URL = "http://localhost:8000/netflix_api/"

// category

myExports.getAllCategories = async () => {
  return await tryCatchFetch(() => axios.get(`${BASE_URL}categories/`))
}

myExports.getCategory = async (categoryId) => {
  return await tryCatchFetch(() => axios.get(`${BASE_URL}categories/${categoryId}/`))
}

// genre

myExports.getAllGenres = async () => {
  return await tryCatchFetch(() => axios.get(`${BASE_URL}genres/`))
}

myExports.getGenre = async (genreId) => {
  return await tryCatchFetch(() => axios.get(`${BASE_URL}genres/${genreId}/`))
}

// product

myExports.getAllProducts = async () => {
  return await tryCatchFetch(() => axios.get(`${BASE_URL}products/`))
}

myExports.addProduct = async (productData) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}products/`, productData))
}

myExports.getProduct = async (productId) => {
  return await tryCatchFetch(() => axios.get(`${BASE_URL}products/${productId}`))
}

// review

myExports.addReview = async (reviewData) => {
  return await tryCatchFetch(() => axios.post(`${BASE_URL}reviews/`, reviewData))
}

export default myExports