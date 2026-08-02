'use strict'

import { renderizarPagina } from '../main.js'
import { voltarInicio, filtrarAlunos, statusFormacao, criarLegenda } from "../funcoes/funcoes.js"

async function getInformacoesCurso(cursoId){
    const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=${cursoId}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

export async function criarAlunosCurso(cursoId, tituloCurso){
    const secao = document.createElement('section')
    secao.className = 'secao'

    const statusSecao = document.createElement('select')
    statusSecao.className = 'selectStatus'

    const opcaoStatus = document.createElement('option')
    opcaoStatus.textContent = 'Status'
    opcaoStatus.value = 'todos'

    const opcaoFinalizado = document.createElement('option')
    opcaoFinalizado.textContent = 'Finalizado'
    opcaoFinalizado.value = 'finalizado'

    const opcaoCursando = document.createElement('option')
    opcaoCursando.textContent = 'Cursando'
    opcaoCursando.value = 'cursando'

    const leganda = criarLegenda()

    const statusCaixa = document.createElement('div')
    statusCaixa.className = 'selectCaixa'

    const titulo = document.createElement('h1')
    titulo.textContent = tituloCurso
    titulo.className = 'titulo'

    const dadosAlunos = await getInformacoesCurso(cursoId)

    const caixaAlunos = document.createElement('div')
    caixaAlunos.className = 'caixaAlunos'

    dadosAlunos.forEach(function(aluno){
        const alunos = document.createElement('div')
        alunos.className = 'alunos'
        alunos.dataset.status = aluno.status

        statusFormacao(aluno.status, alunos)

        alunos.addEventListener('click', () => {
            renderizarPagina('aluno', aluno.id)
        })

        const fotoAluno = document.createElement('img')
        fotoAluno.src = aluno.foto

        const nomeAluno = document.createElement('p')
        nomeAluno.textContent = aluno.nome.toUpperCase()

        alunos.append(fotoAluno, nomeAluno)
        caixaAlunos.append(alunos)
    })

    statusSecao.addEventListener('change', (e) => {
        filtrarAlunos(e.target.value, caixaAlunos)
    })

    voltarInicio()

    statusSecao.append(opcaoStatus, opcaoFinalizado, opcaoCursando)
    statusCaixa.append(statusSecao, leganda)
    secao.append(statusCaixa, titulo, caixaAlunos)

    return secao
}