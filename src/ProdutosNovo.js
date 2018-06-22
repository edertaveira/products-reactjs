import React, {Component} from 'react'
import { Redirect } from 'react-router-dom' 

class ProdutosNovo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect : false
        }

        this.handleNewProduto = this.handleNewProduto.bind(this) 
    } 

    handleNewProduto() {
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }
        this.props.createProduto(produto)
            .then((res) => {
                this.setState({redirect : '/produtos/categoria/' + produto.categoria})
            })
    }

    render() {
        const {categorias} = this.props

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h2>Novo Produto</h2>

                <p>
                    <select className="form-control" ref="categoria">
                        {categorias.map((c) => {
                            return <option key={c.id} value={c.id}>{c.categoria}</option>
                        })}
                    </select>
                </p>

                <p>
                    <input ref='produto' placeholder="Nome do novo produto" className="form-control" />
                </p>
                    
                <button className="btn btn-success" onClick={this.handleNewProduto}>Salvar</button>
            </div>
        )
    }


}

export default ProdutosNovo