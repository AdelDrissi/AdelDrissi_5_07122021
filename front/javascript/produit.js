var str = window.location.href;
var url = new URL(str);
var productId = url.searchParams.get('id');
console.log(productId);
let article = '';

const colorPicked = document.querySelector('#colors');
const quantityPicked = document.querySelector('#quantity');

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
        getPost(article);
      }
    });
}
function getPost(article) {
  /* Insertion de l'image*/

  let productImg = document.createElement('img');
  document.querySelector('.item__img').appendChild(productImg);
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
  addToCart(article);
}

/*GESTION DU PANIER*/

function addToCart(article) {
  const btn_envoyerPanier = document.querySelector('#addToCart');

  /* QUANTITE ENTRE 1 ET 100 ET COULEUR */

  btn_envoyerPanier.addEventListener('click', (event) => {
    if (
      quantityPicked.value > 0 &&
      quantityPicked.value <= 100 &&
      quantityPicked.value != 0
    ) {
      /*RECUPERATION DU CHOIX DE LA COULEUR*/

      let couleurChoix = colorPicked.value;

      /*RECUPERATION DU CHOIX DE LA QUANTITE*/

      let quantiteChoix = quantityPicked.value;

      /*Récupération des options de l'article à ajouter au panier*/

      let produitOptions = {
        idProduct: productId,
        couleurProduit: couleurChoix,
        quantiteProduit: Number(quantiteChoix),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt,
      };

      /*Initialisation du local storage*/

      let produitDansLocalStorage = JSON.parse(localStorage.getItem('produit'));
      console.log(produitDansLocalStorage);
      
      /* Fonction Pop Up*/
      
      const popupConfirmation = () => {
        /* Si le panier contient un artcile*/
        if (
          window.confirm(`Votre commande de ${quantiteChoix} ${article.name} ${couleurChoix} est ajoutée au panier
      Pour consulter votre panier, cliquez sur OK ou revenir à l'accueil ANNULER`)
        ) {
          window.location.href = 'cart.html';
        } else {
          
          /* Si le produit commandé n'ai pas dans le panier*/
          window.location.href = 'index.html';
        }
      };
      /* Fonction produit ajouter dans le LocalStorage*/
      const ajoutProduitLocalStorage = () => {
        /* Ajout dans le tableau de l'objet avec les valeurs de l'utilisateurs*/
        produitDansLocalStorage.push(produitOptions);
        /* Transformation en format JSON envoyer dans la "key" produit du LocalStorage*/
        localStorage.setItem(
          'produit',
          JSON.stringify(produitDansLocalStorage)
        );
      };
      /* Si il y'a des articles d'enregistré dans le LocalStorage*/
      if (produitDansLocalStorage) {
        ajoutProduitLocalStorage();
        popupConfirmation();
      } else {
        /* Si il n'y a pas des articles d'enregistré dans le LocalStorage*/
        produitDansLocalStorage = [];
        ajoutProduitLocalStorage();
        popupConfirmation();
      }
    }
  });
}
