import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NetflixAPI from "../api/NetflixAPI"

function AddReviewPage(props) {
  // states
  const [products, setProducts] = useState([])

  // router values
  const navigate = useNavigate()
  const params = useParams()

  // effects
  useEffect(() => {
    loadProducts()
  }, [])

  // resources
  const loadProducts = async () => {
    const data = await NetflixAPI.getAllProducts()
    setProducts(data)
  }

  // event handlers
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log(evt.target.attributes)

    let formData = new FormData(evt.target)
    
    const data = {
      product: parseInt(formData.get("product")),
      rating: parseInt(formData.get("rating")),
      comment: formData.get("comment"),
      username: formData.get("username")
    }

    let review = await NetflixAPI.addReview(data)
    if (review) {
      navigate(`/product/${review.product.id}`)
    }
  }

  // render
  const renderProducts = () => {
    return products && products.map((product, index) => {
      let selected = params.productId == product.id ? "selected" : ""
      return (
        <option selected={ selected } key={ index } value={ product.id }>{ product.title } ({product.category.type})</option>
      )
    })
  }

  return (
    <div>
      <h2>Add Review Page</h2>
      <h3>Tell me what you thought!</h3>
      <hr />
      <form onSubmit={ handleSubmit } >
        <div className="form-container">
          <div className="form-row">
            <p className="form-label">Product:</p>
            <select className="form-input" type="text" name="product">
              <option disabled selected value> -- select a product -- </option>
              { renderProducts() }
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Rating:</label>
            <select className="form-input" type="text" name="rating" defaultValue="3">
              <option value="1">Awful</option>
              <option value="2">Decent</option>
              <option value="3">Average</option>
              <option value="4">Good</option>
              <option value="5">Amazing</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Comment:</label>
            <textarea className="form-input" name="comment" />
          </div>
          <div className="form-row">
            <label className="form-label">Username:</label>
            <input className="form-input" type="text" name="username" placeholder="Enter Username"/>
          </div>
          <div className="form-row">
            <button className="form-input w100p" type="submit">Add</button> 
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddReviewPage;