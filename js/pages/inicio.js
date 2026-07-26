'use strict'

import { renderizarPagina } from '../main.js'

export function criarInicio(){
    const formulario = document.createElement('form')
    formulario.id = 'formulario'

    const texto = document.createElement('p')
    texto.innerHTML = 'Escolha um <span class="destaque">curso</span> para gerenciar'
    texto.id = 'texto'

    const dispositivos = document.createElement('img')
    dispositivos.src = '../../img/devices.png'
    dispositivos.id = 'dispositivos'

    const apresentacao = document.createElement('div')
    apresentacao.id = 'apresentacao'

    const estudante = document.createElement('img')
    estudante.src = '../../img/studant.png'
    estudante.id = 'estudante'

    const ds = document.createElement('button')
    ds.src = '../../img/ds.png'
    ds.textContent = 'DS'
    ds.id = 'ds'

    const redes = document.createElement('button')
    redes.src = '../../img/redes.png'
    redes.textContent = 'REDES'
    redes.id = 'redes'

    const botoes = document.createElement('div')
    botoes.id = 'botoes'

    apresentacao.append(texto, dispositivos)
    botoes.append(ds, redes)
    formulario.append(apresentacao, estudante, botoes)

    return formulario
}