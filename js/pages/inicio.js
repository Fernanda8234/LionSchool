'use strict'

async function getInformacoesCurso(cursos){
    const url = `https://lion-school-phbo.onrender.com/${cursos}`
    const response = await fetch(url)
    const dados     = await response.json()
    return dados
}

export async function criarInicio() {
    const secao = document.createElement('section')
    secao.id = 'secao'

    const texto = document.createElement('p')
    texto.innerHTML = 'Escolha um <span class="destaque">curso</span> para gerenciar'
    texto.id = 'texto'

    const dispositivos = document.createElement('img')
    dispositivos.src = './img/devices.png'
    dispositivos.id = 'dispositivos'

    const apresentacao = document.createElement('div')
    apresentacao.id = 'apresentacao'

    const estudante = document.createElement('img')
    estudante.src = './img/studant.png'
    estudante.id = 'estudante'

    const cursos = await getInformacoesCurso('cursos')

    const iconeDs = document.createElement('img')
    iconeDs.src = cursos[0].icon

    const ds = document.createElement('button')
    ds.textContent = cursos[0].sigla
    ds.id = 'ds'

    const iconeRedes = document.createElement('img')
    iconeRedes.src = cursos[1].icon

    const redes = document.createElement('button')
    redes.textContent = cursos[1].sigla
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