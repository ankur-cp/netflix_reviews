import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NetflixAPI from "../api/NetflixAPI"

function AddProductPage(props) {
  // states
  const [categories, setCategories] = useState([])
  const [genres, setGenres] = useState([])

  const navigate = useNavigate()

  // effects
  useEffect(() => {
    loadCategories()
    loadGenres()
  }, [])
  
  // resources
  const loadCategories = async () => {
    const data = await NetflixAPI.getAllCategories()
    setCategories(data)
  }

  const loadGenres = async () => {
    const data = await NetflixAPI.getAllGenres()
    setGenres(data)
  }

  // event handlers
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    console.log(evt.target.attributes)

    let formData = new FormData(evt.target)
    
    let genres = []
    for (var [field, value] of formData.entries()) {
      if (field.startsWith("genre")) {
        genres.push(parseInt(value))
      } 
    }
    
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: parseInt(formData.get("category")),
      genres: genres
    }

    let product = await NetflixAPI.addProduct(data)
    if (product) {
      navigate(`/product/${product.id}`)
    }
  }

  // render
  const renderCategories = () => {
    return categories && categories.map((category, index) => {
      return (
        <option key={ index } value={ category.id }>{ category.type }</option>
      )
    })
  }

  const renderGenres = () => {
    return genres && genres.map((genre, index) => {
      return (
        <div key={ index }>
          <input type="checkbox" name={`genre-${genre.id}`}value={ genre.id }/>
          <label>{ genre.type }</label>
        </div>
      )
    })
  }

  return (
    <div>
      <h2>Add Product Page</h2>
      <h3>Tell me what you're watching!</h3>
      <hr />
      <form onSubmit={ handleSubmit } >
        <div className="form-container">
          <div className="form-row">
            <p className="form-label">Title:</p>
            <input className="form-input" type="text" name="title" placeholder="Enter Title"/>
          </div>
          <div className="form-row">
            <label className="form-label">Description:</label>
            <input className="form-input" type="text" name="description" placeholder="Enter Description"/>
          </div>
          <div className="form-row">
            <label className="form-label">Category:</label>
            <select className="form-input" type="text" name="category">
              { renderCategories() }
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Genre(s):</label>
            <div className="form-input">
              { renderGenres() }
            </div>        
          </div>
          <div className="form-row">
            <button className="form-input w100p" type="submit">Add</button> 
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddProductPage;