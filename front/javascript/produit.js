const fetchKanap = async () => {
  await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((products) => {
      displayProducts(products);
    });
};

fetchKanap();

let productCanape = [];

function displayProducts(products) {
  /*DÉCLARATION VARIABLES*/
  let itemimgHtml = '';
  /* RÉCUPERATION PRODUIT*/
  const myProduct = products.find((product) => product._id === id);
  console.log(myProduct);
  /* RÉCUPERATION IMAGE*/
  itemimgHtml += `<img src="${myProduct.imageUrl}" alt="${myProduct.altTxt}">`;
  /*NOEUD POUR INSERTION IMAGE */
  const itemImg = document.querySelector('.item__img');
  /*INNERHTML IMG-ITEM*/
  itemImg.innerHTML = itemimgHtml;
}

/*RÉCUPERATION CHAINE DE REQUÊTE DANS L'URL*/
const queryString_url_id = window.location.search;
console.log(queryString_url_id);

/* METHODE URLSEARCHPARAMS*/

const urlSearchParams = new URLSearchParams(queryString_url_id);
console.log(urlSearchParams);

const id = urlSearchParams.get('id');
console.log(id);
