const API_KEY = "live_cbCPECHWE1RdpXbX7LfXx0dVbdUD3z65sdu4lipcdTfuU0rnN7CRcMhO0kfC3Gx1";
const BASE_URL = "https://api.thecatapi.com/v1/";

function fetchBreeds() {
   const urlApi = `${BASE_URL}breeds`
    return fetch(urlApi).then((res) => res.json())
}


function fetchCatByBreed(breed) {
    const urlByBread = `${BASE_URL}images/search?breed_ids=${breed}&api_key=${API_KEY}`
     return fetch(urlByBread).then((res) => res.json())
}
export {fetchBreeds, fetchCatByBreed}

