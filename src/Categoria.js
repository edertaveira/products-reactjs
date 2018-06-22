import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Categoria extends Component {

    constructor(props) {
        super(props)
        this.loadData = this.loadData.bind(this)
        this.renderProduto = this.renderProduto.bind(this)

        this.state = {
            produtos : [], 
            categoria: {},
            id: null
        }

    }
    loadData(id) {
        this.setState({id})
        this.props.loadProdutos(id)
        this.props.loadCategoria(id)
    }
    componentDidMount() {

        //console.log(this.props.match.params);
        //const { id } = this.props.match.params.catId
    
        this.loadData(this.props.match.params.catId)
    }
    componentWillReceiveProps(newProps) {
        if (newProps.match.params.catId !== this.state.id ) {
            this.loadData(newProps.match.params.catId)
        }
    }
    renderProduto(produto) {
        return(
            <li className="list-group-item" key={produto.id}>{produto.produto} 
            <button className="btn btn-danger btn-sm float-right" onClick={() => 
                this.props.removeProduto(produto)
                 .then((res) => {
                     this.loadData(this.props.match.params.catId)
                 })
            }><i className="fa fa-times"></i> Excluir</button>

                <Link to={'/produtos/editar/' + produto.id} className="btn btn-sm float-right" >Editar </Link>
            </li>

            
        )
    }
    render() {
        
        return (
            <div>
                <h2>{this.props.categoria.categoria}</h2>

                {this.props.produtos.length === 0 && 
                <p className="alert alert-danger">Nenhum produto.</p> }

                <ul className="list-group">{this.props.produtos.map(this.renderProduto)}</ul>
            </div>
        )
    }

}

export default Categoria