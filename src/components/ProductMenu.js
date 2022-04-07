import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import NetflixAPI from "../api/NetflixAPI"

function ProductMenu(props) {
  // states
  const [categories, setCategories] = useState([])
  const [genres, setGenres] = useState([])

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

  // render
  const renderCategories = () => {
    return categories && categories.map((category, index) => {
      return (
        <Link key={index} to={`/category/${category.id}`}>
          <div className="nav-item">
            { category.type.toUpperCase() + "S" }
          </div>
        </Link>
      )
    })
  }

  const renderGenres = () => {
    return genres && genres.map((genre, index) => {
      return (
        <Link key={index} to={`/genre/${genre.id}`}>
          <div className="nav-item">
            { genre.type.toUpperCase() }
          </div>
        </Link>
      )
    })
  }

  return (
    <nav id="nav">
      <Link to="/">
        <div className="nav-item">
         HOME
        </div>
      </Link>
      <span>&nbsp;</span>

      <div className="nav-header">VIEW:</div>
      <Link to="/all">
        <div className="nav-item">
          ALL
        </div>
      </Link>
      <span>&nbsp;</span>

      <div className="nav-header">CATEGORY:</div>
      { renderCategories() }
      <span>&nbsp;</span>

      <div className="nav-header">GENRE:</div>
      { renderGenres() }
      <span>&nbsp;</span>
    </nav>
  )
}

export default ProductMenu;