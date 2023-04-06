// Внутри был кусочек шаблона
const cartWrapper = document.querySelector(".cart-wrapper");

// проверочка на клик по окну, которая кидает нас на родительский элемент
// карты, а потом, элемент с шаблонной строкой в корзину
window.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-cart")) {
        const card = event.target.closest(".card");

        // объект с информицией по картам
        const productInfo = {
            id: card.dataset.id,
            imgSrc: card.querySelector(".product-img").getAttribute("src"),
            title: card.querySelector(".item-title").innerText,
            itemsInBox: card.querySelector("[data-items-in-box]").innerText,
            weight: card.querySelector(".price__weight").innerText,
            price: card.querySelector(".price__currency").innerText,
            counter: card.querySelector("[data-counter]").innerText,
        };
        // константа для проверки наличия такого элемента в корзине
        const itemInCart = cartWrapper.querySelector(
            `[data-id="${productInfo.id}"]`
        );
        // Сережа, тут мы проверяем есть ли у нас такой элемент в корзине) ПО АЙДИ)))
        // И КСТАТИ ДОБАВЛЯЕМ НУЖНУЮ ЦИФЕРКУ
        // Тут мы делаем проверку на это
        if (itemInCart) {
            const counterElement = itemInCart.querySelector("[data-counter]");
            counterElement.innerText =
                parseInt(counterElement.innerText) +
                parseInt(productInfo.counter);
            // если нету, добавляем новый элемент (вкладочку с сушами)
        } else {
            const cartItemHTML = `<div class="cart-item" data-id="${productInfo.id}">
								<div class="cart-item__top">
									<div class="cart-item__img">
										<img src="${productInfo.imgSrc}" alt="">
									</div>
									<div class="cart-item__desc">
										<div class="cart-item__title">${productInfo.title}</div>
										<div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

										<div class="cart-item__details">

											<div class="items items--small counter-wrapper">
												<div class="items__control" data-action="minus">-</div>
												<div class="items__current" data-counter="">${productInfo.counter}</div>
												<div class="items__control" data-action="plus">+</div>
											</div>

											<div class="price">
												<div class="price__currency">${productInfo.price}</div>
											</div>

										</div>

									</div>
								</div>
							</div>`;
            cartWrapper.insertAdjacentHTML("beforeend", cartItemHTML);
        }
    }
});
