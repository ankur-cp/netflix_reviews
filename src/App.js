import './App.css';
import { useEffect, useState } from "react"
import axios from "axios"

function App() {
  // states
  const [products, setProducts] = useState([])

  // effects
  useEffect(() => {
    const getProducts = async () => {
      try {
        let response = await axios.get("http://localhost:8000/netflix_api/products/")
        console.log(response)
        let data = response.data
        console.log(data)
        setProducts(data)
      }
      catch (e) {
        console.log(e)
      }
    }

    getProducts();
  }, [])

  // render
  const renderProducts = () => {
    return products.map((item, index) => {
      return <li key={ index }>{ item.title }</li>
    })
  }

  return (
    <div className="App">
      <h2>Products</h2>
      <ul>
        { renderProducts() }
      </ul>
    </div>
  );
}

export default App;
