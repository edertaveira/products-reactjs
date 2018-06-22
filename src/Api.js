import axios from 'axios'
const api = axios.create({
    baseURL : 'http://localhost:3001/'
})
const apis = {
    loadCategorias :()=> api.get('categorias'),
    deleteCategorias :(id)=> api.delete('categorias/'+ id),
    createCategoria: (categoria)=> api.post('categorias', categoria),
    editCategoria: (categoria)=> api.put('categorias/'+categoria.id, categoria),

    createProduto: (produto)=> api.post('produtos', produto),
    editProduto: (produto)=> api.put('produtos/' + produto.id, produto),
    loadProdutos: (categoria) =>  api.get('produtos?categoria=' + categoria),
    deleteProdutos: (id) => api.delete('produtos/'+ id),
    readCategoria: (categoria) =>  api.get('categorias/' + categoria),

    readProduto: (id) => api.get('produtos/' + id)
} 
export default apis;