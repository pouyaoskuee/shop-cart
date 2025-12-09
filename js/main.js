import {products_list} from './products.js';

const cart_icon = document.querySelector('.header__cart-icon');
const modal = document.querySelector('.modals');
const backdrop = document.querySelector('.backdrop');

const show_product = document.querySelector('.products');




class products_class{
    getProduct(){
        return products_list;
    }
}

class UI {
    displatproduct(product) {
        let result = '';
        product.forEach((item) => {
            result += `<div class="products__card">
                <img src=${item.image} alt="q">
                    <div class="card__description">
                        <p class="card__description--title">
                        ${item.name}
                        </p>
                        <span class="card__description--price">${item.price}</span>
                    </div>
                    <button class="card__button data-id="${item.id}" ">add to cart</button>
            </div>`
        })
        show_product.innerHTML = result;
    }

}


document.addEventListener('DOMContentLoaded', ()=>{
    const products = new products_class();
    const products_data = products.getProduct();
    const ui = new UI();
    ui.displatproduct(products_data);
})
cart_icon.addEventListener('click', open_modal)
backdrop.addEventListener('click', closemodal)






function open_modal() {
    modal.classList.toggle('hidden');
    backdrop.classList.toggle('hidden');
}

function closemodal() {
    modal.classList.toggle('hidden');
    backdrop.classList.toggle('hidden');
}






