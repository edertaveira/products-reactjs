import React, {Component} from 'react'
import axios from 'axios'

class Categoria extends Component {

    constructor(props) {
        super(props)
        this.loadData = this.loadData.bind(this)
        this.state = {
            produtos : [], 
            categoria: {}
        }
    }
    loadData(id) {


        this.props.loadProdutos(id)
        this.props.loadCategoria(id)
    }
    componentDidMount() {

        //console.log(this.props.match.params);
        //const { id } = this.props.match.params.catId
    
        this.loadData(this.props.match.params.catId)
    }
    componentWillReceiveProps(newProps) {
        this.loadData(newProps.match.params.catId)
    }
    renderProduto(produto) {
        return(
            <li key={produto.id}>{produto.produto}</li>
        )
    }
    render() {
        
        return (
            <div>
                <h1>{this.state.categoria.categoria}</h1>
                <ul>{this.state.produtos.map(this.renderProduto)}</ul>
            </div>
        )
    }

}

export default Categoria