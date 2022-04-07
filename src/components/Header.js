import { Link } from "react-router-dom"

function Header(props) {
  return (
    <header id="header">
      <div id="header-title">
        <span>{ props.title }</span>
      </div>
      <div id="header-menu">
        <Link to="/product/add"><button>Add Product</button></Link>
        &nbsp;
        <Link to="/review/add"><button>Add Review</button></Link>
      </div>
    </header>
  )
}

export default Header;