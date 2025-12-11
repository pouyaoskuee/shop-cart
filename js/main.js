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


const show_product = document.querySelector('.products');
const cart_value= document.querySelector('.header__cart-count');
const total_price = document.querySelector('.modal__total--price span');
const modal_products = document.querySelector('.modal__products');
const button_clear = document.querySelector('.modal__button-clear');





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
                        <span class="card__description--price">${(item.price).toLocaleString('fa-IR')}</span>
                    </div>
                    <button class="card__button" data-id="${item.id}">add to cart</button>
            </div>`
        })
        show_product.innerHTML = result;

    }

    modaldisplay(cart) {
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
                    <svg class="modal__cart-svg-reverse rotate data-id="${item.id}"">
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
        this.removetocart()


    }

    addtocart(){

        const addbtn = document.querySelectorAll('.card__button');
        const arryaddbtn = [...addbtn];
        arryaddbtn.forEach(item => {
            const id = item.dataset.id;
            const isincart =  cart.find((p) => p.id === parseInt(id));
            if(isincart){
                item.innerText = 'in your cart!';
                item.disable = true;
            }else {
                item.innerText = 'add to cart!';
                item.removeAttribute("disabled");
            }

            item.addEventListener('click', (e)=>{
                console.log('hi')
                e.target.innerText = "in your cart!"
                e.target.disabled = true;
                const cartitem = LOCALSTORAGE.getProduct(id);
                console.log(cart)
                cart = [...cart ,{...cartitem, quantity:1}];
                LOCALSTORAGE.setcartProducts(cart);
                this.setcartvalue(cart);
                this.modaldisplay(cart);
                console.log(cart);





            })

        })


    }

    setcartvalue(cart){
        let tempcartitem = 0
        const totalprice = cart.reduce((acc, cur) => {
            tempcartitem += cur.quantity;
            return parseFloat(acc) + parseFloat(cur.price)*parseFloat(cur.quantity);
        },0)

        cart_value.innerText = tempcartitem;
        total_price.innerText = totalprice;

    }

    setupapp(){
        cart = LOCALSTORAGE.getcartvalue() ||[]
        cart.forEach((item) => {
            this.modaldisplay(cart);
            this.setcartvalue(cart);
        })

    }

    removetocart(id){
        cart = cart.filter((item) => item.id !== id)
        LOCALSTORAGE.setcartProducts(cart);
        this.setcartvalue(cart);




        // const button_remove = document.querySelector('.modal__remove-button');
        // button_remove.addEventListener('click', (e)=>{
        //     cart.forEach((item) => {
        //     })
        //
        //
        // })


    }

    cartlogic() {

        button_clear.addEventListener('click', ()=>{
            cart.forEach((item) => {
                this.removetocart(item.id)

                const addbtn = document.querySelectorAll('.card__button');
                const arryaddbtn = [...addbtn];
                arryaddbtn.forEach(item => {
                    const id = item.dataset.id;
                    const isincart = cart.find((p) => p.id === parseInt(id));
                    if (isincart) {
                        item.innerText = 'in your cart!';
                        item.disable = true;
                    } else {
                        item.innerText = 'add to cart!';
                        item.removeAttribute("disabled");
                    }
                })
            })
            modal_products.innerHTML = '<p>your cart is empty.</p>';
            closemodal();


        })

        modal_products.addEventListener('click', (e)=>{
            if (e.target.classList.contains('modal__cart-svg')) {
                const addmore=  cart.find((item) => item.id == e.target.dataset.id)
                console.log(addmore);
                addmore.quantity++;
                this.setcartvalue(cart);
                LOCALSTORAGE.setcartProducts(cart);
                this.modaldisplay(cart);
            }
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
    static setcartProducts(cart){
        localStorage.setItem('cart-products', JSON.stringify(cart));
    }

    static getcartvalue(){
        return JSON.parse(localStorage.getItem('cart-products'));
    }
}


document.addEventListener('DOMContentLoaded', ()=>{
    const products = new PRODUCTS();
    const products_data = products.getProduct();

    const ui = new UI();
    ui.displatproduct(products_data);
    ui.setupapp()
    ui.addtocart();
    ui.cartlogic()
    ui.removetocart()




    LOCALSTORAGE.saveproduct();

})










