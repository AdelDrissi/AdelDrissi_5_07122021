/*Initialisation du local storage*/
let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));
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
        produitLocalStorage[produit].idProducts
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
      productPrice.innerHTML =
        produitLocalStorage[produit].prixProduit *
          produitLocalStorage[produit].quantiteProduit +
        ' €';

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
      productQuantity.setAttribute(
        'onchange',
        'getSubTotals("' +
          produitLocalStorage[produit].idProduct +
          '", "' +
          produitLocalStorage[produit].prixProduit +
          '", "' +
          produitLocalStorage[produit].quantiteProduit +
          '"'
      );

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

function prixCanapQuantité() {
  let total = 0;
  let qttModif = document.querySelectorAll('.itemQuantity');
  let productPrice = document.querySelectorAll(
    '.cart__item__content__titlePrice > p '
  );

  const priceCalculation = [];

  for (let k = 0; k < qttModif.length; k++) {
    console.log(produitLocalStorage[k]);
    qttModif[k].addEventListener('change', (event) => {
      if ((produitLocalStorage[k] = produitLocalStorage[k])) {
        const numberProduct =
          produitLocalStorage[k].prixProduit * qttModif[k].value;
        productPrice[k].innerHTML = numberProduct + ' € ';

        /*Selection de l'element à modifier en fonction de son id et sa couleur*/
        let quantityModif = produitLocalStorage[k].quantiteProduit;
        let qttModifValue = qttModif[k].valueAsNumber;
        const resultFind = produitLocalStorage.find(
          (element) =>
            element.couleurProduit === produitLocalStorage[k].couleurProduit
        );
        resultFind.quantiteProduit = qttModifValue;
        produitLocalStorage[k].quantiteProduit = resultFind.quantiteProduit;
      }

      localStorage.setItem('produit', JSON.stringify(produitLocalStorage));

      location.reload(); /* refresh rapide*/
    });
  }

  /* le total des articles du panier*/
  for (let index = 0; index < produitLocalStorage.length; index++) {
    const cartAmout =
      produitLocalStorage[index].prixProduit *
      produitLocalStorage[index].quantiteProduit;
    priceCalculation.push(cartAmout);
    const reduce = (previousValue, currentValue) =>
      previousValue + currentValue;
    total = priceCalculation.reduce(reduce);

    /* Ajout du getElementById pour faire apparaitre le total des articles dans la page panier*/
    const totalPrice = document.getElementById('totalPrice');
    totalPrice.textContent = total;
  }
}

prixCanapQuantité();

/*Suppression d'un Produit*/

function deleteProduct() {
  let btn_delete = document.querySelectorAll('.deleteItem');

  for (let j = 0; j < btn_delete.length; j++) {
    btn_delete[j].addEventListener('click', (event) => {
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

let form = document.querySelector('.cart__order__form');
const btnOrder = document.getElementById('order');

// VERIFICATIONS DE CHAQUE CHAMPS//
btnOrder.addEventListener('click', (event) => {
  event.preventDefault();
  const emailValue = document.getElementById('email').value;
  const lastNameValue = document.getElementById('lastName').value;
  const firstNameValue = document.getElementById('firstName').value;
  const adresseValue = document.getElementById('address').value;
  const cityValue = document.getElementById('city').value;

  //INSTAURATION FORMULAIRE AVEC REGEX //
  //EMAIL VERIFICATION //
  let checkedItems = 0;
  let regexMail = RegExp(
    '^[a-z]([.-]{0,1}[a-z0-9]+)@[a-z0-9]([.-]{0,1}[a-z0-9]+).[a-z0-9]{2,4}$'
  );
  if (!regexMail.test(emailValue)) {
    checkedItems += 1;
    document.getElementById('emailErrorMsg').innerHTML =
      'Email non valide , indiquer une adresse (javascript@javascript.)';
  } else {
    checkedItems += 0;
    document.getElementById('emailErrorMsg').innerHTML = '';
  }

  // VERIFICATION LAST NAME //
  let charRegExp = RegExp("^[a-zA-Z ,.'-]+$");
  if (!charRegExp.test(lastNameValue)) {
    checkedItems += 1;
    document.getElementById('lastNameErrorMsg').innerHTML =
      'Ne peut contenir que des lettres avec 3 caractères minimum';
  } else {
    checkedItems += 0;
    document.getElementById('lastNameErrorMsg').innerHTML = '';
  }

  // VERIFICATION CITY //
  if (!charRegExp.test(cityValue)) {
    checkedItems += 1;
    document.getElementById('cityErrorMsg').innerHTML =
      'Ne peut contenir que des lettres avec 3 caractères minimum';
  } else {
    checkedItems += 0;
    document.getElementById('cityErrorMsg').innerHTML = '';
  }
  // VERIFICATION FIRST NAME //
  if (!charRegExp.test(firstNameValue)) {
    checkedItems += 1;
    document.getElementById('firstNameErrorMsg').innerHTML =
      'Ne peut contenir que des lettres avec 3 caractères minimum';
  } else {
    checkedItems += 0;
    document.getElementById('firstNameErrorMsg').innerHTML = '';
  }
  let addressRegExp = RegExp(
    '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'
  );

  //VERIFICATION ADRESSE //
  if (!addressRegExp.test(adresseValue)) {
    checkedItems += 1;
    document.getElementById('addressErrorMsg').innerHTML =
      'Contient des caractères non valides au format adresse';
  } else {
    checkedItems += 0;
    document.getElementById('addressErrorMsg').innerHTML = '';
  }
  //SI ILS SONT OK ALORS ON SOUMET//
  if (checkedItems === 0) {
    sendOrder();
  }
});

const contactProductsArray = {
  contact: {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  },
};

function createBody() {
  const contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value,
  };

  const products = [];
  for (let index = 0; index < produitLocalStorage.length; index++) {
    products.push(produitLocalStorage[index].idProduct);
  }
  return JSON.stringify({ contact, products });
}

function sendOrder() {
  const bodyValue = createBody();

  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    body: createBody(),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      window.location = `confirmation.html?orderId=${data.orderId}`;
    });
}
