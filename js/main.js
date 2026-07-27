'use strict'

import { criarInicio } from './pages/inicio.js'
import { criarAlunosDS } from './pages/ds.js'

const paginas = {
    inicio: {
        titulo: 'inicio',
        renderizar: criarInicio
    },
    ds: {
        titulo: 'ds',
        renderizar: criarAlunosDS
    }
}

export async function renderizarPagina(nomePagina){
    const main = document.getElementById('main-content')
    const pagina = await paginas[nomePagina].renderizar()
    main.replaceChildren(pagina)
}

renderizarPagina('inicio')