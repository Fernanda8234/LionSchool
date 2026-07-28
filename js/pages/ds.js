'use strict'

import { formadoNaoFormado } from "./formadoNaoFormado.js"

async function getInformacoesDS(ds){
    const url = `https://lion-school-phbo.onrender.com/alunos?curso=${ds}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
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
        nomeAluno.textContent = aluno.nome

        alunos.append(fotoAluno, nomeAluno)
        caixaAlunos.append(alunos)

        console.log(alunos)
    })

    secao.append(caixaAlunos)
    return secao
}