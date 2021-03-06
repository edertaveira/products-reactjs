import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route, 
  Link
} from 'react-router-dom'
import Home from './Home'
import Sobre from './Sobre'
import Produtos from './Produtos'


class App extends Component {
  constructor(props) {
    super(props)
    this.loadCategorias = this.loadCategorias.bind(this)
    this.removeCategoria = this.removeCategoria.bind(this)
    this.createCategoria = this.createCategoria.bind(this)
    this.editCategoria = this.editCategoria.bind(this)
    this.createProduto = this.createProduto.bind(this)
    this.loadProdutos = this.loadProdutos.bind(this)
    this.loadCategoria = this.loadCategoria.bind(this)
    this.removeProduto = this.removeProduto.bind(this)
    this.readProduto = this.readProduto.bind(this)
    this.editProduto = this.editProduto.bind(this)

    this.state = {
      categorias : [],
      categoria: {},
      produtos: []
    }

  }

  loadCategorias() {
    this.props.api.loadCategorias().then(res => {
        this.setState({
            categorias : res.data
        })
    })
  }
  createCategoria(categoria) {
    this.props.api.createCategoria(categoria).then(res => {
        this.loadCategorias();
    })
  }

  editCategoria(categoria) {
    this.props.api.editCategoria(categoria).then(res => {
        this.loadCategorias();
    })
  }

  removeCategoria (cat) {
    this.props.api.deleteCategorias(cat.id).then(res => this.loadCategorias())
  }

  createProduto(produto) {
    return this.props.api.createProduto(produto)
  }

  editProduto(produto) {
    return this.props.api.editProduto(produto)
  }

  removeProduto (prod) {
    return this.props.api.deleteProdutos(prod.id)
  }

  loadProdutos(categoria) {
    this.props.api.loadProdutos(categoria)
      .then(res => {
          this.setState({
              produtos: res.data
          })
      })
  }

  readProduto(id) {
    return this.props.api.readProduto(id)
  }

  loadCategoria(categoria) {
    
    this.props.api.readCategoria(categoria)
    .then(res => {
        this.setState({
            categoria: res.data
        })
    })
  }

  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <span className="navbar-brand">GM</span>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Home </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/produtos">Produtos</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/sobre">Sobre</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <br/>
          <div className="container">
            <Route exact path="/" component={Home} />
            <Route path="/produtos" 
              render={ (props) => <Produtos {...props} 
                loadCategorias={this.loadCategorias}
                removeCategoria={this.removeCategoria}
                createCategoria={this.createCategoria}
                editCategoria={this.editCategoria}
                categorias={this.state.categorias}
                createProduto={this.createProduto}
                loadProdutos={this.loadProdutos}
                produtos={this.state.produtos}
                loadCategoria={this.loadCategoria}
                categoria={this.state.categoria}
                removeProduto={this.removeProduto}
                editProduto={this.editProduto}

                readProduto={this.readProduto}
              /> }
              
            />
            <Route exact path="/sobre" component={Sobre} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
