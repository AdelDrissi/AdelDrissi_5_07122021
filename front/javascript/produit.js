// const fetchKanap = async () => {
//   await fetch('http://localhost:3000/api/products')
//     .then((res) => res.json())
//     .then((products) => {
//       displayProducts(products);
//     });
// };

// fetchKanap();

// let productCanape = [];

// function displayProducts(products) {
//   /*DÉCLARATION VARIABLES*/
//   let itemimgHtml = '';
//   /* RÉCUPERATION PRODUIT*/
//   const myProduct = products.find((product) => product._id === id);
//   console.log(myProduct);
//   /* RÉCUPERATION IMAGE*/
//   itemimgHtml += `<img src="${myProduct.imageUrl}" alt="${myProduct.altTxt}">`;
//   /*NOEUD POUR INSERTION IMAGE */
//   let itemImg = document.querySelector('.item__img');
//   /*INNERHTML IMG-ITEM*/
//   itemImg.innerHTML = itemimgHtml;
//   /*PRICE ITEMS*/
//   const priceItems = document.getElementById('price');

// }

// /*RÉCUPERATION CHAINE DE REQUÊTE DANS L'URL*/
// const queryString_url_id = window.location.search;
// console.log(queryString_url_id);

// /* METHODE URLSEARCHPARAMS*/

// const urlSearchParams = new URLSearchParams(queryString_url_id);
// console.log(urlSearchParams);

// const id = urlSearchParams.get('id');
// console.log(id);

const str = window.location.href;
const url = new URL(str);
const productId = url.searchParams.get('id');
console.log(productId);
let article = '';

getArticle();

/*Récuperation des articles de l'API*/

function getArticle() {
  fetch('http://localhost:3000/api/products/' + productId)
    .then((res) => {
      return res.json();
    })

    /*Répartition de l'API dans le DOM*/

    .then(async function (resultAPI) {
      article = await resultAPI;
      if (article) {
        getPost(article)
      }
    });
}
function getPost(article) {
  /* Insertion de l'image*/
  let productImg = document.createElement('img');
  document.querySelector('.item__img') .appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  /* Modification du titre "h1"*/
  let productName = document.getElementById('title');
  productName.innerHTML = article.name;

  /* Modification du prix*/
  let productPrice = document.getElementById('price');
  productPrice.innerHTML = article.price;

  /* Modification de la description*/
  let productDescription = document.getElementById('description');
  productDescription.innerHTML = article.description;

  /* Insertion des options de couleurs*/
  for (let colors of article.colors) {
    let productColors = document.createElement('option');
    document.querySelector('#colors').appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
}
