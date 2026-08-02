'use strict'

import { renderizarPagina } from '../main.js'
import { formadoNaoFormado } from "../funcoes/formadoNaoFormado.js"

async function getInformacoesRedes(redes){
    const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=${redes}`
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

function filtrarAlunos(status, container){
    const todosAlunos = container.querySelectorAll('.alunos')

    todosAlunos.forEach(aluno => {
        if(status === 'todos' || aluno.dataset.status === status){
            aluno.style.display = ''
        } else {
            aluno.style.display = 'none'
        }
    })
}

export async function criarAlunosRedes(){
    const secao = document.createElement('section')
    secao.className = 'secao'

    // seção de escolha
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

            // legandas
            const leganda = document.createElement('p')
            leganda.textContent = "LEGENDA"

            // caixa 1
            const caixaAzul = document.createElement('div')
            caixaAzul.className = "caixaCor"

            const corAzul = document.createElement('div')
            corAzul.className = 'corAzul'

            const legandaCursando = document.createElement('p')
            legandaCursando.textContent = "Cursando"

            // caixa 2
            const caixaAmarela = document.createElement('div')
            caixaAmarela.className = "caixaCor"

            const corAmarela = document.createElement('div')
            corAmarela.className = 'corAmarela'

            const legandaFinalizado = document.createElement('p')
            legandaFinalizado.textContent = "Finalizado"

            // guarda a caixa 1 e 2
            const caixaLegenda = document.createElement('div')
            caixaLegenda.className = 'caixaLegenda'

        const statusCaixa = document.createElement('div')
        statusCaixa.className = 'selectCaixa'

    const titulo = document.createElement('h1')
    titulo.textContent = 'Redes'
    titulo.className = 'titulo'
    const dadosAlunos = await getInformacoesRedes(2)

    const caixaAlunos = document.createElement('div')
    caixaAlunos.className = 'caixaAlunos'
   
    dadosAlunos.forEach(async function(aluno){
        const alunos = document.createElement('div') 
        alunos.className = 'alunos'
        alunos.dataset.status = aluno.status

        const statusAluno = await formadoNaoFormado(aluno.status, alunos)

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

    caixaAzul.append(corAzul, legandaCursando)
    caixaAmarela.append(corAmarela, legandaFinalizado)
    caixaLegenda.append(leganda, caixaAzul, caixaAmarela)

    statusCaixa.append(statusSecao, caixaLegenda)

    secao.append(statusCaixa, titulo, caixaAlunos)
    return secao
}