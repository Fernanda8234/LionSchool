'use strict'

import { criarInicio } from './pages/inicio.js'

const paginas = {
    inicio: {
        titulo: 'inicio',
        renderizar: criarInicio
    }
}

export function renderizarPagina(nomePagina){
    const main = document.getElementById('main-content')
    const pagina = paginas[nomePagina].renderizar()
    main.replaceChildren(pagina)
}

renderizarPagina('inicio')