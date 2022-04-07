import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NetflixAPI from "../api/NetflixAPI"
import ProductList from "../components/ProductList"

function ProductPage(props) {
  // states
  const [title, setTitle] = useState("")
  const [subTitle, setSubTitle] = useState("")
  const [products, setProducts] = useState([])

  // params
  const params = useParams()

  // effects
  useEffect(() => {
    loadProducts(params.categoryId, params.genreId);
  }, [params.categoryId, params.genreId])

  // resources
  const loadProducts = async (categoryId, genreId) => {
    if (categoryId) {
      const data = await NetflixAPI.getCategory(categoryId)
      setTitle(data && `${data.type} Category`)
      setSubTitle("What are you watching?")
      setProducts(data && data.products)
    }
    else if (genreId) {
      const data = await NetflixAPI.getGenre(genreId)
      setTitle(data && `${data.type} Genre`)
      setSubTitle(data && data.tagline)
      setProducts(data && data.products)
    }
    else {
      const data = await NetflixAPI.getAllProducts()
      setTitle("All")
      setSubTitle("Everything we have to offer!")
      setProducts(data)
    }
  }

  // render
  return (
    <div>
      { title && <h2>{ title } Page</h2> }
      { title && subTitle && <h3>{ subTitle }</h3> }
      <hr />
      <ProductList products={ products } />
    </div>
  )
}

export default ProductPage;