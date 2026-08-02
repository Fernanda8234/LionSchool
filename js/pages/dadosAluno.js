'use strict'

import { renderizarPagina } from '../main.js'

async function getInformacoesAluno(id){
    const url = `https://lion-school-phbo.onrender.com/alunos/${id}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

export async function criarDadosAluno(id){
    const secao = document.createElement('section')
    secao.className = 'secao'

    const caixaAluno = document.createElement('div')
    caixaAluno.className = 'caixaAluno'

    const aluno = await getInformacoesAluno(id)

        const alunos = document.createElement('div')
        alunos.className = 'alunos'

        const fotoAluno = document.createElement('img')
        fotoAluno.src = aluno.foto

        const nomeAluno = document.createElement('p')
        nomeAluno.textContent = aluno.nome.toUpperCase()

    const caixaDados = document.createElement('div')
    caixaDados.className = 'caixaDados'

    const grafico = document.createElement('div')
    grafico.className = 'grafico'

        aluno.desempenho.forEach(function(desempenho){
            const itensCaixa = document.createElement('div')
            itensCaixa.className = 'itensCaixa'
            
            const numero = document.createElement('p')
            numero.textContent = desempenho.valor
            numero.className = 'numero'

            const barra = document.createElement('div')
            barra.className = 'barra'

            const barraCaixa = document.createElement('div')
            barraCaixa.className = 'barraCaixa'

            barra.textContent = desempenho.valor
            barra.style.height = desempenho.valor + '%'
            barra.textContent = ''

            if(desempenho.valor >= 70){
                barra.style.backgroundColor = '#3347B0'
                numero.style.color = '#3347B0'
            } else if(desempenho.valor >= 50){
                barra.style.backgroundColor = '#E5B657'
                numero.style.color = '#E5B657'
            } else{
                barra.style.backgroundColor = '#C11010'
                numero.style.color = '#C11010'
            }

            const legenda = document.createElement('p')
            legenda.textContent = desempenho.categoria
            legenda.className = 'legenda'

            barraCaixa.append(barra)

            itensCaixa.append(numero, barraCaixa, legenda)

            grafico.append(itensCaixa)
        })

    const containerDados = document.createElement('div')
    containerDados.className = 'containerDados'

    alunos.append(fotoAluno, nomeAluno)
    caixaAluno.append(alunos)

    caixaDados.append(grafico)

    containerDados.append(caixaAluno, caixaDados)

    secao.append(containerDados)
    return secao
}