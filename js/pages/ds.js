'use strict'

import { renderizarPagina } from '../main.js'
import { formadoNaoFormado } from "../funcoes/formadoNaoFormado.js"

async function getInformacoesDS(ds){
    const url = `https://lion-school-phbo.onrender.com/alunos?curso_id=${ds}`
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

// função que decide quais alunos aparecem na tela, conforme o filtro escolhido
function filtrarAlunos(status, container){
    // pega todos os cards de aluno que existem dentro do container
    const todosAlunos = container.querySelectorAll('.alunos')

    // passa por cada card, um de cada vez
    todosAlunos.forEach(aluno => {
        // se o filtro for "todos" OU o status do card bater com o filtro escolhido...
        if(status === 'todos' || aluno.dataset.status === status){
            aluno.style.display = '' // ...mostra o card (volta ao normal)
        } else {
            aluno.style.display = 'none' // ...senão, esconde o card
        }
    })
}

export async function criarAlunosDS(){
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

    // é o titulo :p
    const titulo = document.createElement('h1')
    titulo.textContent = 'Desenvolvimento de Sistemas'
    titulo.className = 'titulo'

    // dados dos alunos de ds
    const dadosAlunos = await getInformacoesDS(1)

    const caixaAlunos = document.createElement('div')
    caixaAlunos.className = 'caixaAlunos'

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
        alunos.dataset.status = aluno.status // guarda o status do aluno como uma etiqueta no card (data-status)

        const statusAluno = await formadoNaoFormado(aluno.status, alunos)

        // carrega a pagina do aluno com base no seun id
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

    // escuta o select: toda vez que o valor dele mudar, roda essa função
    statusSecao.addEventListener('change', (e) => {
        filtrarAlunos(e.target.value, caixaAlunos) // chama o filtro passando o valor escolhido e o container dos alunos
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