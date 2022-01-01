/*Initialisation du local storage*/
let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));
console.table(produitLocalStorage);
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
    qttModif[k].addEventListener('change', (event) => {
      if ((produitLocalStorage[k] = produitLocalStorage[k])) {
        const numberProduct =
          produitLocalStorage[k].prixProduit * qttModif[k].value;
        productPrice[k].innerHTML = numberProduct + ' € ';

        /*Selection de l'element à modifier en fonction de son id et sa couleur*/
        let quantityModif = produitLocalStorage[k].quantiteProduit;
        let qttModifValue = qttModif[k].valueAsNumber;
        const resultFind = produitLocalStorage.find(
          (element) => element.idProduct === produitLocalStorage[k].idProduct
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

/*Instauration formulaire avec Regex*/

let form = document.querySelector('.cart__order__form');

console.log(form);

function getForm() {
  /* Ajout des Regex*/

  let emailRegExp = new RegExp(
    '^[a-z]([.-]{0,1}[a-z0-9]+)@[a-z0-9]([.-]{0,1}[a-z0-9]+).[a-z0-9]{2,4}$'
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    '^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+'
  );

  /* Ecoute de la modification du prénom*/
  form.firstName.addEventListener('change', function () {
    validFirstName(this);
  });

  /* Ecoute de la modification du nom*/
  form.lastName.addEventListener('change', function () {
    validLastName(this);
  });

  /* Ecoute de la modification de l'adresse*/
  form.address.addEventListener('change', function () {
    validAddress(this);
  });

  /* Ecoute de la modification de la ville*/
  form.city.addEventListener('change', function () {
    validCity(this);
  });

  /* Ecoute de la modification de l'email*/
  form.email.addEventListener('change', function () {
    validEmail(this);
  });

  /*validation du prénom*/
  let validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = '';
    } else {
      firstNameErrorMsg.innerHTML = 'Veuillez renseigner le champ ici.';
    }
  };

  /*validation du nom*/
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = '';
    } else {
      lastNameErrorMsg.innerHTML = 'Veuillez renseigner le champ ici.';
    }
  };

  /*validation de l'adresse*/
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = '';
    } else {
      addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ ici.';
    }
  };

  /*validation de la ville*/
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerHTML = '';
    } else {
      cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ ici .';
    }
  };

  /*validation de l'email*/
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = '';
    } else {
      emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
    }
  };
  getForm();
}
