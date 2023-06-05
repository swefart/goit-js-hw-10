import Notiflix from "notiflix";
import SlimSelect from 'slim-select';
import "slim-select/dist/slimselect.css";
import { fetchBreeds, fetchCatByBreed } from "./Api/cat-api"




const refs = {
    select: document.querySelector('.breed-select'),
    info: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
}
document.addEventListener("DOMContentLoaded", onReload)
refs.select.addEventListener('change', onSelect)

function onReload() {
   
    fetchBreeds().then((res) => {
        refs.select.classList.remove('visible')
        refs.loader.classList.add('visible')
        createSelectList(res)
        new SlimSelect({
            select: '#selectElement',
            settings: {
            showSearch: false,},          
})
    }).catch(() => {
        refs.select.classList.add('visible')
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!')
    })

}

function createSelectList(res) {
        const markuplist = res.reduce((pre, bread) => {
      return pre + `<option value="${bread.id}">${bread.name}</option>`
        }, "")

  refs.select.insertAdjacentHTML('beforeend', markuplist) 
}

function onSelect() {
    refs.loader.classList.remove('visible')
    refs.info.innerHTML = "";

    fetchCatByBreed(refs.select.value).then((res) => {
        refs.loader.classList.add('visible')
        createMarkupForBreed(res[0])
    }).catch(() => {
       Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!') 
    });
;
}

function createMarkupForBreed({ breeds, url }) {
    const {name, description, temperament, alt_names} = breeds[0];
    const markup = `    <div style="width: 400px"><img
            class="cat-img"
            src="${url}"
            alt="${alt_names}"
          /></div>
          <div class="cat-info-box">
            <h1 class="cat-name">${name}</h1>
            <p class="cat-description">
              ${description}
            </p>
            <p class="cat-temp">
              <span class="cat-temp-title">Temperament:</span> ${temperament}
            </p>
          </div>`
    
      refs.info.insertAdjacentHTML("afterbegin", markup )
}
