'use strict'

import { renderizarPagina } from '../main.js'

async function getInformacoesCurso(cursos){
    const url = `https://lion-school-phbo.onrender.com/${cursos}`
    const response = await fetch(url)
    const dados     = await response.json()
    return dados
}

export async function criarInicio(){
    const secao = document.createElement('section')
    secao.id = 'secao'

    const texto = document.createElement('p')
    texto.innerHTML = 'Escolha um <span class="destaque">curso</span> para gerenciar'
    texto.id = 'texto'

    // pc, tablet e celular
    const dispositivos = document.createElement('img')
    dispositivos.src = './img/devices.png'
    dispositivos.id = 'dispositivos'

    // caixa do texto e dispositivos
    const apresentacao = document.createElement('div')
    apresentacao.id = 'apresentacao'

    // imagem de uma estudante
    const estudante = document.createElement('img')
    estudante.src = './img/studant.png'
    estudante.id = 'estudante'

    const cursos = await getInformacoesCurso('cursos')

    // icone de ds
    const iconeDs = document.createElement('img')
    iconeDs.src = cursos[0].icon

    const ds = document.createElement('button')
    ds.textContent = cursos[0].sigla
    ds.onclick = () => renderizarPagina('ds')
    ds.id = 'ds'

    // icone de redes
    const iconeRedes = document.createElement('img')
    iconeRedes.src = cursos[1].icon

    const redes = document.createElement('button')
    redes.textContent = cursos[1].sigla
    redes.onclick = () => renderizarPagina('redes')
    redes.id = 'redes'

    const botoes = document.createElement('div')
    botoes.id = 'botoes'
    
    // if (window.innerWidth <= 480){
        
    // }

    apresentacao.append(texto, dispositivos)

    ds.append(iconeDs)
    redes.append(iconeRedes)

    botoes.append(ds, redes)

    secao.append(apresentacao, estudante, botoes)
    
    return secao
}