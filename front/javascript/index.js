const fetchKanap = async () => {
  await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((products) => {
      console.table(products);
      displayProducts(products);
    });
};

fetchKanap();

function displayProducts(products) {
  let CanapeHtml = '';
  products.forEach((product) => {
    CanapeHtml += `<a href="./product.html?id=${product._id}">
                            <article>
                                <img src="${product.imageUrl}" alt="${product.altTxt}">
                                <h3 class="productName"> ${product.name} </h3>
                                <p class="Description"> ${product.description} </p>
                            </article>
                        </a>`;
  });
  document.getElementById('items').innerHTML = CanapeHtml;
}
