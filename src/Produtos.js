import React, {Component} from 'react'
import {Route, Link} from 'react-router-dom'

import ProdutosHome from './ProdutosHome'
import Categoria from './Categoria'
import ProdutosNovo from './ProdutosNovo'
import ProdutosEditar from './ProdutosEditar'

class Produtos extends Component {
    constructor(props) {
        super(props)
        this.handleNewCategoria = this.handleNewCategoria.bind(this)
        this.renderCategoria = this.renderCategoria.bind(this)
        this.editCategoria = this.editCategoria.bind(this)
        this.cancelCategoria = this.cancelCategoria.bind(this)
        this.handleEditCategoria = this.handleEditCategoria.bind(this)

        this.state = {
            editingCategoria: ''
        }
    }

    editCategoria(categoria) {
        this.setState({
            editingCategoria: categoria.id
        })
    }
   
    cancelCategoria() {
        this.setState({
            editingCategoria: ''
        })
    }
    
    componentDidMount() {
        this.props.loadCategorias()
    }
    renderCategoria(cat) {
        return (
            <li className="list-group-item" key={cat.id}>
                {this.state.editingCategoria !== cat.id && <div>
                    <Link to={`/produtos/categoria/${cat.id}`} >{cat.categoria}</Link> 
                    <button onClick={()=> this.props.removeCategoria(cat)} className="btn btn-sm float-right">
                        <span className="fas fa-trash-alt"></span>
                    </button>
                    <button onClick={()=> this.editCategoria(cat)} className="btn btn-sm float-right">
                        <span className="fas fa-edit"></span>
                    </button>
                </div> }
                {this.state.editingCategoria === cat.id && <div className="input-group mb-3">
                    <input type="text"
                        ref={'cat-' + cat.id}
                        onKeyUp={(e) => this.handleEditCategoria(e)} defaultValue={cat.categoria} className="form-control" />
                    <div className="input-group-append">
                        <button onClick={()=> this.cancelCategoria()} className="btn btn-danger" type="button">Cancel</button>
                    </div>
                </div>}
            </li>
        )
    }

    handleEditCategoria(key) {
        if (key.keyCode === 13) {
            this.props.editCategoria({
                    id: this.state.editingCategoria,
                    categoria: this.refs['cat-' + this.state.editingCategoria].value
            })
            this.setState({
                editingCategoria: ''
            })
        }
    }

    handleNewCategoria(key) {
        if (key.keyCode === 13) {
            this.props.createCategoria({
                    categoria: this.refs.categoria.value
            })
            this.refs.categoria.value = ''
        }
    }
    render() {
        const { match, categorias } = this.props
        return(
            <div className="row">
                <div className="col-lg-3">
                    <h3>Categorias</h3>
                    <ul className="list-group">
                    {categorias.map(this.renderCategoria)}
                    </ul>
                    <br/>
                    <div className="card">
                        <div className="card-body">
                            <input 
                                onKeyUp={this.handleNewCategoria}
                                type="text" ref="categoria" placeholder="Nova Categoria" className="form-control" />
                        </div>
                    </div>
                    <br/>
                    <Link to="/produtos/novo" className="btn btn-primary" >Novo Produto</Link>
                </div>
                <div className="col-lg-9">
                    
                    <h1>Produtos</h1>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={match.url + '/novo'} render={(props) => {
                        return <ProdutosNovo {...props} categorias={categorias} createProduto={this.props.createProduto} />
                    }} />
                    <Route path={match.url+"/categoria/:catId"} render={ (props) => {
                        return <Categoria {...props}  loadProdutos={this.props.loadProdutos} 
                            produtos={this.props.produtos} loadCategoria={this.props.loadCategoria} categoria={this.props.categoria}
                            removeProduto={this.props.removeProduto} />

                        }
                    }
                    />

                    <Route path={match.url + "/editar/:id"}
                        render={(props) => {
                            return <ProdutosEditar {...props} readProduto={this.props.readProduto} editProduto={this.props.editProduto}
                                categorias={categorias} />
                        }}
                    />
                    
                </div>

            </div>
        )
    }
}
export default Produtos