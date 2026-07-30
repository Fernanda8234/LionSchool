'use strict'

import { criarInicio } from './pages/inicio.js'
import { criarAlunosDS } from './pages/ds.js'
import { criarAlunosRedes } from './pages/redes.js'
import { criarDadosAluno } from './pages/aluno.js'

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
    },
    aluno: {
        titulo: 'aluno',
        renderizar: criarDadosAluno
    }
}

// o id é caso uma página precise de um id para renderizar, como a página do aluno
export async function renderizarPagina(nomePagina, id = null){
    const main = document.getElementById('main-content')
    const pagina = await paginas[nomePagina].renderizar(id)
    main.replaceChildren(pagina)
}

renderizarPagina('inicio')