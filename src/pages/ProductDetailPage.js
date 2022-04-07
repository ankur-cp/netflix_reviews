import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import NetflixAPI from "../api/NetflixAPI"

function ProductDetailPage(props) {
  // states
  const [product, setProduct] = useState(null)

  // params
  const params = useParams()

  // effects
  useEffect(() => {
    loadProduct(params.productId);
  }, [params.productId])

  // resources
  const loadProduct = async (productId) => {
    if (productId) {
      const data = await NetflixAPI.getProduct(productId)
      setProduct(data)
    }
  }

  // render
  const renderReviews = () => {
    return product.reviews.map((review, index) => {
      return (
        <div key={ index } 
          className={`review review-${index % 2 ? "odd" : "even"}`}>
          <p>Rating: <span className={`review-rating-${review.rating}`}>{ review.rating }</span></p>
          <p>Comment: <span className={`review-rating-${review.rating}`}>{ review.comment }</span></p>
          <p>User: <span className={`review-rating-${review.rating}`}>{ review.username }</span></p>
        </div>
      )
    })
  }

  if (!product)
    return null

  return (
    <div>
      <h2>{ product.title }</h2>
      <h3>{ product.category.type }</h3>
      <hr />
      <h4>Reviews:</h4>
      { renderReviews() }
    </div>
  )
}

export default ProductDetailPage;