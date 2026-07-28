'use strict'

import { renderizarPagina } from '../main.js'
import { formadoNaoFormado } from "./formadoNaoFormado.js"

async function getInformacoesDS(ds){
    const url = `https://lion-school-phbo.onrender.com/alunos?curso=${ds}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

function voltarInicio(){
    const voltar = document.getElementById('sair')
    voltar.textContent = "Voltar"
    voltar.onclick = () => {
        renderizarPagina('inicio')
        location.reload()
    }
    return voltar
}

export async function criarAlunosDS(){
    const secao = document.createElement('section')
    secao.id = 'secaoDS'

    const dadosAlunos = await getInformacoesDS('ds')

    const caixaAlunos = document.createElement('div')
    caixaAlunos.id = 'caixaAlunos'

    /*dadosAlunos.map(async aluno => {
        const alunos = document.createElement('div')
        alunos.className = 'alunos'

        const statusAluno = await formadoNaoFormado(aluno.status, alunos)
        statusAluno.className = 'statusAluno'

        const fotoAluno = document.createElement('img')
        fotoAluno.src = aluno.foto

        const nomeAluno = document.createElement('p')
        nomeAluno.textContent = aluno.nome

        alunos.append(fotoAluno, nomeAluno, statusAluno)
        caixaAlunos.append(alunos)
    })*/
   
    dadosAlunos.forEach(async function(aluno){
        const alunos = document.createElement('div')
        alunos.className = 'alunos'

        const statusAluno = await formadoNaoFormado(aluno.status, alunos)

        const fotoAluno = document.createElement('img')
        fotoAluno.src = aluno.foto

        const nomeAluno = document.createElement('p')
        nomeAluno.textContent = aluno.nome.toUpperCase()

        alunos.append(fotoAluno, nomeAluno)
        caixaAlunos.append(alunos)
    })

    voltarInicio()
    secao.append(caixaAlunos)
    return secao
}