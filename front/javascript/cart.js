/*Initialisation du local storage*/
let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));
console.log(produitLocalStorage);
const positionEmptyCart = document.querySelector('#cart__items');

/* Si le panier est vide*/
function getCart() {
  if (produitLocalStorage === null || produitLocalStorage == 0) {
    const emptyCart = `<p>Votre panier est vide</p>`;
    positionEmptyCart.innerHTML = emptyCart;
  } else {
    for (let produit in produitLocalStorage) {
      /* Insertion de l'élément "article"*/
      let productArticle = document.createElement('article');
      document.querySelector('#cart__items').appendChild(productArticle);
      productArticle.className = 'cart__item';
      productArticle.setAttribute(
        'data-id',
        produitLocalStorage[produit].idProduit
      );

      /* Insertion de l'élément "div"*/
      let productDivImg = document.createElement('div');
      productArticle.appendChild(productDivImg);
      productDivImg.className = 'cart__item__img';

      /* Insertion de l'image*/
      let productImg = document.createElement('img');
      productDivImg.appendChild(productImg);
      productImg.src = produitLocalStorage[produit].imgProduit;
      productImg.alt = produitLocalStorage[produit].altImgProduit;

      /* Insertion de l'élément "div"*/
      let productItemContent = document.createElement('div');
      productArticle.appendChild(productItemContent);
      productItemContent.className = 'cart__item__content';

      /* Insertion de l'élément "div"*/
      let productItemContentTitlePrice = document.createElement('div');
      productItemContent.appendChild(productItemContentTitlePrice);
      productItemContentTitlePrice.className =
        'cart__item__content__titlePrice';

      /* Insertion du titre h2*/
      let productTitle = document.createElement('h2');
      productItemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML = produitLocalStorage[produit].nomProduit;

      /* Insertion de la couleur*/
      let productColor = document.createElement('p');
      productTitle.appendChild(productColor);
      productColor.innerHTML = produitLocalStorage[produit].couleurProduit;
      productColor.style.fontSize = '20px';

      /* Insertion du prix*/
      let productPrice = document.createElement('p');
      productItemContentTitlePrice.appendChild(productPrice);
      productPrice.innerHTML = produitLocalStorage[produit].prixProduit + ' €';

      /* Insertion de l'élément "div"*/
      let productItemContentSettings = document.createElement('div');
      productItemContent.appendChild(productItemContentSettings);
      productItemContentSettings.className = 'cart__item__content__settings';

      /* Insertion de l'élément "div"*/
      let productItemContentQuantity = document.createElement('div');
      productItemContentSettings.appendChild(productItemContentQuantity);
      productItemContentQuantity.className =
        'cart__item__content__settings__quantity';

      /* Insertion de "Qté : "*/
      let productQte = document.createElement('p');
      productItemContentQuantity.appendChild(productQte);
      productQte.innerHTML = 'Qté : ';

      /* Insertion de la quantité*/
      let productQuantity = document.createElement('input');
      productItemContentQuantity.appendChild(productQuantity);
      productQuantity.value = produitLocalStorage[produit].quantiteProduit;
      productQuantity.className = 'itemQuantity';
      productQuantity.setAttribute('type', 'number');
      productQuantity.setAttribute('min', '1');
      productQuantity.setAttribute('max', '100');
      productQuantity.setAttribute('name', 'itemQuantity');

      /* Insertion de l'élément "div"*/
      let productItemContentSettingsDelete = document.createElement('div');
      productItemContentSettings.appendChild(productItemContentSettingsDelete);
      productItemContentSettingsDelete.className =
        'cart__item__content__settings__delete';

      /* Insertion de "p" supprimer*/
      let productDelete = document.createElement('p');
      productItemContentSettingsDelete.appendChild(productDelete);
      productDelete.className = 'deleteItem';
      productDelete.innerHTML = 'Supprimer';
    }
  }
}
getCart();

/* Modification d'une quantité de produit*/

function modifyQtt() {
  let qttModif = document.querySelectorAll('.itemQuantity');

  for (let k = 0; k < qttModif.length; k++) {
    qttModif[k].addEventListener('change', (event) => {
      event.preventDefault();

      /*Selection de l'element à modifier en fonction de son id ET sa couleur*/
      let quantityModif = produitLocalStorage[k].quantiteProduit;
      let qttModifValue = qttModif[k].valueAsNumber;

      const resultFind = produitLocalStorage.find(
        (element) => element.qttModifValue !== quantityModif
      );

      resultFind.quantiteProduit = qttModifValue;
      produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;

      localStorage.setItem('produit', JSON.stringify(produitLocalStorage));

      /* refresh rapide*/
      location.reload();
    });
  }
}
modifyQtt();

function getTotals() {
  /*Récupération du total des quantités*/
  let elemsQtt = document.getElementsByClassName('itemQuantity');
  let myLength = elemsQtt.length,
    totalQtt = 0;

  for (let i = 0; i < myLength; ++i) {
    totalQtt += elemsQtt[i].valueAsNumber;
  }
  let productTotalQuantity = document.getElementById('totalQuantity');
  productTotalQuantity.innerHTML = totalQtt;

  /* Récupération du prix total*/
  totalPrice = 0;
  for (let i = 0; i < myLength; ++i) {
    totalPrice += elemsQtt[i].valueAsNumber * produitLocalStorage[i].priceKanap;
  }

  let productTotalPrice = document.getElementById('totalPrice');
  productTotalPrice.innerHTML = totalPrice;
}
getTotals();

/*Suppression d'un Produit*/
function deleteProduct() {
  let btn_supprimer = document.querySelectorAll('.deleteItem');

  for (let j = 0; j < btn_supprimer.length; j++) {
    btn_supprimer[j].addEventListener('click', (event) => {
      event.preventDefault();

      /*Selection de l'element à supprimer en fonction de son id et sa couleur*/
      let idDelete = produitLocalStorage[j].idProduit;
      let colorDelete = produitLocalStorage[j].couleurProduit;

      produitLocalStorage = produitLocalStorage.filter(
        (element) =>
          element.idProduit !== idDelete ||
          element.couleurProduit !== colorDelete
      );

      localStorage.setItem('produit', JSON.stringify(produitLocalStorage));

      /*Alerte produit supprimé et refresh*/
      alert('Ce produit a bien été supprimé du panier');
      location.reload();
    });
  }
}
deleteProduct();

let prixTotal = [];

for (let m = 0; m < produitLocalStorage.length; m++) {
  let prixProduitPanier = produitLocalStorage[m].prixProduit;

  /* Additioner les prix qu'il y'a dans le tableau de la variable "prixTotal"*/
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const prixProduit = prixTotal.reduce(reducer, 0);
  console.log(prixProduit);

  let idProducts = [];
  for (let i = 0; i < produitLocalStorage.length; i++) {
    idProducts.push(produitLocalStorage[i].idProduit);
  }
}

/*Instauration formulaire avec regex*/
function getForm() {
  /* Ajout des Regex*/
  let form = document.querySelector('.cart__order__form');

  let emailRegExp = new RegExp(
    '^[a-z]([.-]{0,1}[a-z0-9]+)@[a-z0-9]([.-]{0,1}[a-z0-9]+).[a-z0-9]{2,4}$'
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'
  );
}
