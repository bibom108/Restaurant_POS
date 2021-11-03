let foodTag = new Map([
    ["Bún thịt nướng", "pho_bo"]
]);

let selectedItem = {
    name: "",
    tag: "",                            // to get the image of each product
    price: 0,
    quantity: 0
}



function AddToCart(){
    let productNumber = localStorage.getItem('productNumber');
    productNumber = parseInt(productNumber);

    selectedItem.name = document.getElementsByClassName('product-full-card__title')[0].innerHTML;
    selectedItem.price = parseFloat((document.getElementById('price-value').innerHTML).substring(1));
    selectedItem.quantity = parseInt(document.getElementById('counter-value').value);
    selectedItem.tag = foodTag.get(selectedItem.name);

    console.log(selectedItem);

    let productItem = localStorage.getItem('productItem');
    productItem = JSON.parse(productItem);
    if (productItem != null){
        if (productItem[selectedItem.tag] == undefined){
            productItem = {
                ...productItem,
                [selectedItem.tag] : selectedItem
            }
            localStorage.setItem('productNumber', productNumber + 1);
        }
        else {
            productItem[selectedItem.tag].quantity += selectedItem.quantity;
        }
    }
    else {
        productItem = {
            [selectedItem.tag] : selectedItem
        };
        localStorage.setItem('productNumber', 1);
    }
    localStorage.setItem('productItem', JSON.stringify(productItem));

    alert("Order Received");
}


/*=================CART PAGE ================*/
function MinusBtn(tag){
    let productItem = localStorage.getItem('productItem');
    productItem = JSON.parse(productItem);
    productItem[tag].quantity--;
    localStorage.setItem('productItem', JSON.stringify(productItem));
    if (productItem[tag].quantity == 0){
        CloseBtn(tag);
    }
    else DisplayCart();
}

function PlusBtn(tag){
    let productItem = localStorage.getItem('productItem');
    productItem = JSON.parse(productItem);
    productItem[tag].quantity++;
    localStorage.setItem('productItem', JSON.stringify(productItem));
    DisplayCart();
}

function CloseBtn(tag){
    let product_name = document.getElementsByClassName('product__' + tag)[0];
    product_name.remove();

    let productItem = localStorage.getItem('productItem');
    productItem = JSON.parse(productItem);

    delete productItem[tag];                                                // delete item

    localStorage.setItem('productItem', JSON.stringify(productItem));

    let productNumber = localStorage.getItem('productNumber');              // update total number of product
    productNumber = parseInt(productNumber);
    localStorage.setItem('productNumber', productNumber - 1);
    if (productNumber-1 == 0){
        console.log('x');
        ChangeUI();
    }
    else DisplayCart();
}

function DisplayCart(){
    let productItem = localStorage.getItem('productItem');
    productItem = JSON.parse(productItem);
    let container = document.getElementsByClassName('page-cart__list')[0];
    let total = 0;

    Object.values(productItem).map(item => {
        let myProduct = document.getElementsByClassName('product__' + item.tag)[0];
        if (myProduct == undefined){
            container.innerHTML += ''
                + '<div class="product product__' + item.tag + '">'
                + '<h5 class="product__title">' + '<img class="product__img" src="assets/img/products/' + item.tag + '.png">' + item.name + '</h5>'
                + '<h5 class="product__price">' + item.price + '</h5>'
                + '<h5 class="product__quantity">' + '<span class="counter" style = "font-style: normal;"><span class="minus" onclick="MinusBtn(\'' + item.tag + '\')">-</span><input type="text" value="' + item.quantity + '" /><span onclick="PlusBtn(\'' + item.tag + '\')" class="plus">+</span></span>' + '</h5>'
                + '<h5 class="product__total">'+ item.price * item.quantity + '<a onclick="CloseBtn(\'' + item.tag + '\')" class = "product__close"> <img src="https://img.icons8.com/ios-glyphs/30/ffffff/macos-close.png"/> </a>' + '</h5>'
                + '</div>';
        }
        else {
            let childrens = document.getElementsByClassName('product__' + item.tag)[0].childNodes;
            childrens[2].innerHTML = '<span class="counter" style = "font-style: normal;"><span class="minus" onclick="MinusBtn(\'' + item.tag + '\')">-</span><input type="text" value="' + item.quantity + '" /><span onclick="PlusBtn(\'' + item.tag + '\')" class="plus">+</span></span>';
            childrens[3].innerHTML = item.price * item.quantity + '<a onclick="CloseBtn(\'' + item.tag + '\')" class = "product__close"> <img src="https://img.icons8.com/ios-glyphs/30/ffffff/macos-close.png"/> </a>';
        }

        total += parseFloat(item.price * item.quantity);
    });

    var totalEle = document.getElementsByClassName('page-cart__title')[0];
    totalEle.innerHTML = 'Total:  ' + total;
}

function ChangeUI(){
    let productNumber = localStorage.getItem('productNumber');
    productNumber = parseInt(productNumber);

    if (productNumber > 0){
        var btn = document.getElementById('page-cart__control-btn');
        btn.href = 'page-payment.html';
        btn.innerHTML = 'PAYMENT';
        document.getElementsByClassName('page-cart__img')[0].style.display = 'none';
        var total = document.getElementsByClassName('page-cart__title')[0];
        total.style.textAlign = 'right';
        total.style.marginRight = '50px';
        document.getElementsByClassName('page-cart__list')[0].style.display = 'block';
        DisplayCart();
    }
    else {
        var btn = document.getElementById('page-cart__control-btn');
        btn.href = 'page-catalog.html';
        btn.innerHTML = 'RETURN TO SHOP';
        document.getElementsByClassName('page-cart__img')[0].style.display = 'block';
        var total = document.getElementsByClassName('page-cart__title')[0];
        total.innerHTML = 'Your cart is currently empty.';
        total.style.textAlign = 'center';
        total.style.marginRight = '0px';
        document.getElementsByClassName('page-cart__list')[0].style.display = 'none';
    }
}

ChangeUI();