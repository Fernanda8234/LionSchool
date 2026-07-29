'use strict'

import { criarInicio } from './pages/inicio.js'
import { criarAlunosDS } from './pages/ds.js'
import { criarAlunosRedes } from './pages/redes.js'

const paginas = {
    inicio: {
        titulo: 'inicio',
        renderizar: criarInicio
    },
    ds: {
        titulo: 'ds',
        renderizar: criarAlunosDS
    },
    redes: {
        titulo: 'redes',
        renderizar: criarAlunosRedes
    }
}

export async function renderizarPagina(nomePagina){
    const main = document.getElementById('main-content')
    const pagina = await paginas[nomePagina].renderizar()
    main.replaceChildren(pagina)
}

renderizarPagina('inicio')