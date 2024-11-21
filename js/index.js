import frutiferas from './frutiferas.js';

let frutiferasDiv = document.getElementById('localFrutiferas');

// função que impede o user de colocar uma data no futuro
function definirValorMaximo() {
  const inputData = document.querySelector('#dataPlantio');
  const dataAtual = new Date();

  // Converter a data atual para o formato esperado pelo atributo 'max'
  const dataAtualFormatada = dataAtual.toISOString().split('T')[0];

  // Definir o valor máximo como a data atual
  inputData.setAttribute('max', dataAtualFormatada);
}

definirValorMaximo();

// garante que os item que já estão em localStorage recebam um id único.
frutiferas[0].identificador = Date.now() * 1;
frutiferas[1].identificador = Date.now() * 2;
frutiferas[2].identificador = Date.now() * 3;

// calcula a idade em meses dos items que já estão em localStorage
frutiferas.forEach(frutifera => {
    const dataAtual = new Date();
    const dataPlantio = new Date(frutifera.dataPlantio);
    const meses = (dataAtual.getFullYear() - dataPlantio.getFullYear()) * 12;
    const diferencaMeses = (dataAtual.getMonth() + 1) - (dataPlantio.getMonth() + 1);
    const idadeEmMeses = meses + diferencaMeses;
    frutifera.idadeEmMeses = idadeEmMeses;
});

function definirValoresFormulario(nomePopular = '', nomeCientifico= '', imagem = '', producaoMedia = '', dataPlantio = '') {
  const nomeInput = document.querySelector('#nomePopular');
  const nomeCientificoInput = document.querySelector('#nomeCientifico');
  const imagemInput = document.querySelector('#imagem');
  const producaoMediaInput = document.querySelector('#producaoMedia');
  const dataPlantioInput = document.querySelector('#dataPlantio');

  nomeInput.value = nomePopular;
  nomeCientificoInput.value = nomeCientifico;
  imagemInput.value = imagem;
  producaoMediaInput.value = producaoMedia;
  dataPlantioInput.value = dataPlantio;
}

const criarCartao = (frutifera) => {
  return `<div class='col'>
  <div class="card" style="width: 18rem; background-color: #FAFAFA; margin: 10px 0;">
      <img src="${frutifera.imagem}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Id: ${frutifera.identificador}</h5>
        <p class="card-text"><strong>Nome:</strong> ${frutifera.nomePopular}</p>
        <p class="card-text"><strong>Nome científico:</strong> ${frutifera.nomeCientifico}</p>
        <p class="card-text"><strong>Produção média por safra:</strong> ${frutifera.producaoMedia}Kg</p>
        <p class="card-text"><strong>Idade:</strong> ${frutifera.idadeEmMeses} (em meses)</p>
      </div>
    </div>
  </div>`;
};

const mostrarCartoes = () => {
  for (let frutifera of frutiferas) {
  
  let card = criarCartao(frutifera);
  frutiferasDiv.insertAdjacentHTML('beforeend', card);
  }
};

const carregarFormFrutifera = () => {
  let formFrutifera = document.getElementById('formularioFrutiferas');

  formFrutifera.onsubmit = (event) => {
    event.preventDefault();

    let objetoFrutifera = Object.fromEntries(new FormData(formularioFrutiferas));
    console.log(objetoFrutifera);

    const dataAtual = new Date();
    const dataPlantio = new Date(objetoFrutifera.dataPlantio);
    const meses = (dataAtual.getFullYear() - dataPlantio.getFullYear()) * 12;
    const diferencaMeses = (dataAtual.getMonth() + 1) - (dataPlantio.getMonth() + 1);
    const idadeEmMeses = meses + diferencaMeses;
    objetoFrutifera.idadeEmMeses = idadeEmMeses;

    const identificador = Date.now();
    objetoFrutifera.identificador = identificador;

    let card = criarCartao(objetoFrutifera);
    frutiferasDiv.insertAdjacentHTML('beforeend', card);

    frutiferas.push(objetoFrutifera);

    definirValoresFormulario();

    localStorage.setItem('frutiferas', JSON.stringify(frutiferas));

    $('#formFrutiferaModal').modal('toggle');
  };
};

window.criarFormFrutifera = carregarFormFrutifera;

mostrarCartoes();