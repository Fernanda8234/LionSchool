'use strict'

async function getInformacoesAlunos(dadosDosAlunos){
    const url = `https://lion-school-phbo.onrender.com/alunos?status=${dadosDosAlunos}`
    const response = await fetch(url)
    const dados = await response.json()
    return dados
}

export async function formadoNaoFormado(status, elemento){
    const dadosAlunos = await getInformacoesAlunos(status)

    if(dadosAlunos[0].status === 'finalizado'){
        elemento.classList.add('formado')
    } else{
        elemento.classList.add('nao-formado')
    }
    return elemento
}