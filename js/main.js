const cart_icon = document.querySelector('.header__cart-icon');
const modal = document.querySelector('.modals');
const backdrop = document.querySelector('.backdrop');



cart_icon.addEventListener('click', openModal)
backdrop.addEventListener('click', closeModal)





function openModal() {
    modal.classList.toggle('hidden');
    backdrop.classList.toggle('hidden');
}

function closeModal() {
    modal.classList.toggle('hidden');
    backdrop.classList.toggle('hidden');
}

//-----------------------------------------------------------------------------
import {products_list} from './products.js';



const show_product = document.querySelector('.products');
const cart_value= document.querySelector('.header__cart-count');
const total_price = document.querySelector('.modal__total--price span');
const modal_products = document.querySelector('.modal__products');
const button_clear = document.querySelector('.modal__button-clear');

let cart = []

document.addEventListener('DOMContentLoaded', ()=>{

    LOCALSTORAGE.setProducts()
    console.log(LOCALSTORAGE.getCartProducts())
    const products = new PRODUCTS();
    const products_data = products.getProduct();

    const ui = new UI();
    ui.displayProduct(products_data);
    ui.addToCart();
    ui.cartLogics()
    ui.displayModal(LOCALSTORAGE.getCartProducts())
    cart = LOCALSTORAGE.getCartProducts()
    ui.btnUpdate()

})











class PRODUCTS{
    getProduct(){
        return products_list;
    }
}


class UI {
    displayProduct(product) {
        let result = '';
        product.forEach((item) => {
            result += `<div class="products__card">
                <img src=${item.image} alt="q">
                    <div class="card__description">
                        <p class="card__description--title">
                        ${item.name}
                        </p>
                        <span class="card__description--price">${(item.price).toLocaleString('fa-IR')}</span>
                    </div>
                    <button class="card__button" data-id="${item.id}">add to cart</button>
            </div>`
        })
        show_product.innerHTML = result;

    }

    displayModal(cart) {
        let result = '';
        cart.forEach((item) => {
            result +=
            `<div class="modal__content">
                    <img src="${item.image}" alt="q">
                    <div class="modal__description">
                        <p>${item.name}</p>
                        <p>${item.price}</p>
                    </div>
                <div class="modal__count">
                    <svg class="modal__cart-svg" data-id="${item.id}">
                        <use xlink:href="/assets/images/sprite.svg#chevron"></use>
                    </svg>
                    <span>${item.quantity}</span>
                    <svg class="modal__cart-svg-reverse rotate" data-id="${item.id}">
                        <use xlink:href="/assets/images/sprite.svg#chevron"></use>
                    </svg>
                    </div>
                <div class="modal__remove">
                    <button class="modal__remove-button" >
                        <svg class="modal__remove-svg" data-id="${item.id}">
                            <use xlink:href="/assets/images/sprite.svg#trash"></use>
                        </svg>
                   </button>
                </div>
            </div>`
        })
        modal_products.innerHTML = result;
        this.setCartValue(cart);

    }


    addToCart(){
        const addButtons = document.querySelectorAll('.card__button');
        const arrayButtons = [...addButtons];
        arrayButtons.forEach(item => {
            item.addEventListener('click', (e)=>{
                const cartItem = LOCALSTORAGE.getProduct(Number(item.dataset.id));
                cart = [...cart ,{...cartItem, quantity:1}];
                LOCALSTORAGE.setCartProducts(cart);
                this.setCartValue(cart);
                this.displayModal(cart);
                this.btnUpdate()
            })
        })

    }


    setCartValue(cart){
        let numOfItem = 0
        const totalPrice = cart.reduce((acc, cur) => {
            numOfItem += cur.quantity;
            return parseFloat(acc) + parseFloat(cur.price)*parseFloat(cur.quantity);
        },0)

        cart_value.innerText = numOfItem
        total_price.innerText = totalPrice;

        LOCALSTORAGE.setCartProducts(cart);

    }


    btnUpdate(){
        const addButtons = document.querySelectorAll('.card__button');
        const arrayButtons = [...addButtons];
        arrayButtons.forEach(item => {
            item.innerText = "add to cart!"
            item.disabled = false;
            const cartItem = cart.filter((p) => p.id === parseInt(item.dataset.id));
            cartItem.forEach((button) => {
                if (item.dataset.id == button.id) {
                    item.innerText = "in your cart!"
                    item.disabled = true;
                }
            })
        })
    }


    removeFromCart(id){
        cart = cart.filter((item) => item.id !== id)
        LOCALSTORAGE.setCartProducts(cart);
        this.setCartValue(cart);
        this.btnUpdate()
    }


    cartLogics() {

        button_clear.addEventListener('click', ()=>{
            cart.forEach((item) => {
                this.removeFromCart(item.id)
                this.btnUpdate()
            })
            modal_products.innerHTML = '<p>your cart is empty.</p>';
            closeModal();
        })

        modal_products.addEventListener('click', (e)=>{
            if (e.target.classList.contains('modal__cart-svg')) {
                e.preventDefault();
                const increment=  cart.find((item) => parseInt(item.id) === parseInt(e.target.dataset.id))
                increment.quantity++;
                this.setCartValue(cart);
                this.displayModal(cart);
            }else if(e.target.classList.contains('modal__cart-svg-reverse')) {
                e.preventDefault();
               const decrement = cart.find((item) => parseInt(item.id) === parseInt(e.target.dataset.id))
                decrement.quantity--;
               this.setCartValue(cart);
               this.displayModal(cart);
               if (decrement.quantity === 0) {
                   this.removeFromCart(decrement.id);
                   this.displayModal(cart);
                   this.btnUpdate()
               }
               LOCALSTORAGE.setCartProducts(cart);
            }else if(e.target.classList.contains('modal__remove-svg')) {
                const removeitem = cart.find((item) => parseInt(item.id) === parseInt(e.target.dataset.id))
                this.removeFromCart(removeitem.id);
                LOCALSTORAGE.setCartProducts(cart);
                this.displayModal(cart);
                this.btnUpdate()
            }
        })
    }


}

class LOCALSTORAGE{
    static setProducts(){
        localStorage.setItem('products', JSON.stringify(products_list));
    }
    static getProduct(id){
        const products = JSON.parse(localStorage.getItem('products'));
        return products?.find(p => p.id === parseInt(id));
    }
    static setCartProducts(cart){
        localStorage.setItem('cart-products', JSON.stringify(cart));
    }

    static getCartProducts(){
        return JSON.parse(localStorage.getItem('cart-products'));
    }
}














