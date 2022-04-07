import { Link } from "react-router-dom"

function ProductList(props) {
  // render
  const renderProducts = () => {
    return props.products && props.products.map((product, index) => {
      return (
        <li key={ index }><Link to={`/product/${product.id}`}>{ product.title }</Link></li>
      )
    })
  }
  
  return (
    <ul>
      { renderProducts() }
    </ul>
  )
}

export default ProductList;