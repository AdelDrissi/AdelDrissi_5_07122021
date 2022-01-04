function getOrderId() {
  const queryString = window.location.search;
  searchParams = new URLSearchParams(queryString);
  const orderIdValue = searchParams.get('orderId');

  const orderId = document.querySelector('#orderId');
  orderId.innerHTML = orderIdValue;
}

getOrderId();
