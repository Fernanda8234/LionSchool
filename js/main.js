'use strict'

import { criarInicio } from './pages/inicio.js'
import { criarAlunosCurso } from './pages/cursos.js'
import { criarDadosAluno } from './pages/dadosAluno.js'

const paginas = {
    inicio: {
        titulo: 'inicio',
        renderizar: criarInicio
    },
    ds: {
        titulo: 'ds',
        renderizar: () => criarAlunosCurso(1, 'Desenvolvimento de Sistemas')
    },
    redes: {
        titulo: 'redes',
        renderizar: () => criarAlunosCurso(2, 'Redes')
    },
    aluno: {
        titulo: 'aluno',
        renderizar: criarDadosAluno
    }
}

// o id é caso uma página precise de um id para renderizar, como a página do aluno
export async function renderizarPagina(nomePagina, id = null, origem = null){
    const main = document.getElementById('main-content')
    const pagina = await paginas[nomePagina].renderizar(id, origem)
    main.replaceChildren(pagina)
}

renderizarPagina('inicio')