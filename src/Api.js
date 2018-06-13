import axios from 'axios'
const api = axios.create({
    baseURL : 'http://localhost:3001/'
})
const apis = {
    loadCategorias :()=> api.get('categorias'),
    deleteCategorias :(id)=> api.delete('categorias/'+ id),
    createCategoria: (categoria)=> api.post('categorias', categoria),
    editCategoria: (categoria)=> api.put('categorias/'+categoria.id, categoria)
} 
export default apis;