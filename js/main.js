const cart_icon = document.querySelector('.header__cart-icon');
const modal = document.querySelector('.modals');
const backdrop = document.querySelector('.backdrop');



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

//-----------------------------------------------------------------------------
import {products_list} from './products.js';
let cart = []
let arry= [{
    id: 1,
    name: 'A',
    price: '1',
},
    {
        id: 2,
        name: 'B',
        price: '2',
    }]

const show_product = document.querySelector('.products');



class PRODUCTS{
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
                    <button class="card__button" data-id="${item.id}">add to cart</button>
            </div>`
        })
        show_product.innerHTML = result;

    }
    addtocart(){
        const addbtn = document.querySelectorAll('.card__button');
        const arryaddbtn = [...addbtn];
        arryaddbtn.forEach(item => {
            const id = item.dataset.id;
            const isincart = cart.find(p => p.id === 1);
            if(isincart){
                item.innerText = 'in your cart!';
                item.disable = true;
            }
            item.addEventListener('click', (e)=>{
                e.target.innerText = "in your cart!"
                e.target.disabled = true;
                const cartitem = LOCALSTORAGE.getProduct(id);
                cart = [...cart , {...cartitem, quantity:1}];
                LOCALSTORAGE.setcartProducts(cart);

            })
        })
    }

}


class  LOCALSTORAGE{
    static saveproduct(){
        localStorage.setItem('products', JSON.stringify(products_list));
    }
    static getProduct(id){
        const products = JSON.parse(localStorage.getItem('products'));
        return products.find(p => p.id === parseInt(id));
    }
    static setcartProducts(seter){
        localStorage.setItem('cart-products', JSON.stringify(seter));
    }
}


document.addEventListener('DOMContentLoaded', ()=>{
    const products = new PRODUCTS();
    const products_data = products.getProduct();

    const ui = new UI();
    ui.displatproduct(products_data);
    ui.addtocart();

    LOCALSTORAGE.saveproduct();



})











