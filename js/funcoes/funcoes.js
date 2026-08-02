'use strict'

import { renderizarPagina } from '../main.js'

async function getInformacoesAlunos(dadosDosAlunos){
    const url = `https://lion-school-phbo.onrender.com/alunos?status=${dadosDosAlunos}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

export function voltarInicio(){
    const voltar = document.querySelector('.botaovoltar')

    const texto = document.getElementById('sair')
    texto.textContent = "Voltar"

    voltar.onclick = () => {
        renderizarPagina('inicio')
        location.reload()
    }

    return voltar
}

export function filtrarAlunos(status, container){
    const todosAlunos = container.querySelectorAll('.alunos')

    todosAlunos.forEach(aluno => {
        if(status === 'todos' || aluno.dataset.status === status){
            aluno.style.display = ''
        } else {
            aluno.style.display = 'none'
        }
    })
}

export function statusFormacao(status, aluno){
    if(status === 'finalizado'){
        aluno.classList.add('formado')
    } else {
        aluno.classList.add('nao-formado')
    }
    return aluno
}

export function criarLegenda(){
    const section = document.createElement('section')
    section.className = 'legendaSection'

    if(window.innerWidth <= 480){
        const selectLegenda = document.createElement('select')
        selectLegenda.className = 'selectLegenda'

        const opcoes = [
            { valor: 'todos', texto: 'LEGENDA' },
            { valor: 'cursando', texto: 'Cursando' },
            { valor: 'finalizado', texto: 'Finalizado' }
        ]

        opcoes.forEach(opcao => {
            const option = document.createElement('option')
            option.value = opcao.valor
            option.textContent = opcao.texto

            selectLegenda.appendChild(option)
        })

        section.appendChild(selectLegenda)

        return section
    }

    const leganda = document.createElement('p')
    leganda.textContent = "LEGENDA"
    section.appendChild(leganda)

    const caixaLegenda = document.createElement('div')
    caixaLegenda.className = 'caixaLegenda'
    section.appendChild(caixaLegenda)

    const options = [
        { status: 'cursando', texto: 'Cursando' },
        { status: 'finalizado', texto: 'Finalizado' }
    ]

    options.forEach(opcao => {
        const caixaCor = document.createElement('div')
        caixaCor.className = 'caixaCor'

        const cor = document.createElement('div')
        cor.className = 'cor'
        statusFormacao(opcao.status, cor)

        const texto = document.createElement('p')
        texto.textContent = opcao.texto

        caixaCor.appendChild(cor)
        caixaCor.appendChild(texto)
        caixaLegenda.appendChild(caixaCor)
    })

    return section
}