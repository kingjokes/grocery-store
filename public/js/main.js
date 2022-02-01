$(document).ready(function(){
    //handles logging in for users
    $('#login-form').on('submit', function(e){
        e.preventDefault()

        $.ajax({
            method:'POST',
            url:'/user/login',
            data:$(this).serialize(),
            dataType:'json',
            beforeSend: function(){
                $('#login_button').text('Checking details...').prop('disabled',true)
                $('#success, #error').fadeOut();
            },
            success: function(response){

                if(response.status === 200){
                    $('#success').fadeIn().text(response.message)
                    $('#error').fadeOut()
                    sessionStorage.setItem('userEmail',response.user)
                    return  setTimeout(function(){
                        window.location.href=response.redirect
                    }, 3000)

                }
                $('#error').fadeIn().text(response.message)
                $('#success').fadeOut();
                $('#login_button').text('Login').prop('disabled',false)


            }

        })

    })

    //handles user registration
    $('#register-form').on('submit', function(e){
        e.preventDefault()

        $.ajax({
            method:'POST',
            url:'/user/register',
            data:$(this).serialize(),
            dataType:'json',
            beforeSend: function(){
                $('#reg_button').text('Submitting...').prop('disabled',true)
                $('#success, #error').fadeOut();
            },
            success: function(response){
                window.scroll(0,0)
                if(response.status === 200){
                    $('#success').fadeIn().text(response.message)
                    $('#error').fadeOut()
                    return  setTimeout(function(){
                        window.location.href=response.redirect
                    }, 3000)

                }
                $('#error').fadeIn().text(response.message)
                $('#success').fadeOut();
                $('#reg_button').text('Register').prop('disabled',false)


            }

        })

    })

    //handles user logging out
    $('#logout').click(function (){
        localStorage.clear()
        return sessionStorage.clear()
    })
    $(window).on('scroll',function(){
         window.pageYOffset>=15 ?  $('.header').addClass('scroll') : $('.header').removeClass('scroll')

    })

    //verify password and confirm password on user registration page
    $('#pass,#cpass').on('keyup keypress blur change',function(){
        console.log($('#cpass').val())
        if($('#pass').val()=== $('#cpass').val()){
            $('#pass,#cpass').addClass('w3-border w3-border-green').removeClass('w3-border-red')
            return $('#reg_button').prop('disabled',false)
        }

        $('#pass,#cpass').removeClass('w3-border w3-border-green')
        return $('#reg_button').prop('disabled',true)

    })

    //shows or hides cart list
    $('#showCart').click(function(e){
        if(window.outerWidth<= 500){
            $('.sideBar').css({
                width:'70%'
            })
        }else {
            $('.sideBar').css({
                width:'30%'
            })
        }
        $('.sideBar').slideToggle('slow')
    })
    $('.closeSideBar').click(function(e){

        $('.sideBar').slideUp('fast')
    })


})
// default cart variable, which assumes the value of cart stored in local storage
// if the localstorage is not empty, JSON.parse to convert into array format
// else cart is an empty array
let cart =!!localStorage.cart ? JSON.parse(localStorage.cart) : []


$(document).ready(function(){
    //on window load the following actions are fired
    $(window).on('load', function(){
        CartUpdater(cart)//this function contains several functions

        //handles how the side bar would be displayed
        if(window.outerWidth<= 500){
            $('.sideBar').css({
                width:'70%'
            })
        }else {
            $('.sideBar').css({
                width:'30%'
            })
        }

    })
})

//this method allows jquery to communicate with elements added with javascript
//takes 3 parameters : i. event ii.element iii. function to perform
$(document).on('click', '.add-item',function(){
    //this listens to click events on add-item buttons
    ItemChecker(cart, $(this).attr('data-item-name')) // this method performs a check to avoid duplication of entries
        ?   cart.push(
            {
                itemName: $(this).attr('data-item-name'),
                itemPrice: parseFloat($(this).attr('data-item-price')),
                itemQuantity: 1,
                itemImage:$(this).attr('data-item-image')
            }
        ) // if element does not exist, push into cart

        : quantityIncremental(cart, $(this).attr('data-item-name')) //if element exist update the quantity of element

    localStorage.setItem('cart',JSON.stringify(cart)) //store new cart into localStorage

    return CartUpdater(JSON.parse(localStorage.cart))

})

//function checks if item name exist in the cart
//returns a boolean as response
const ItemChecker =(array, itemName) =>{
    let find = array.find(item => item.itemName === itemName )
    return find === undefined
}

//function increases the quantity of item found in the cart
const quantityIncremental = (array, itemName) =>{
    let index = array.findIndex(item => item.itemName === itemName )
    if(index !== -1) return array[index].itemQuantity +=1

}

//function gets the count of items in cart
//updates the dom in charge of showing cart item count
const cartStatus = (array)=>{
    return $('.cart').html(array.length)
}
//function controls how to display  item list in the cart
const cartListChecker = (array)=>{
    if(array.length > 0){
        $('.notEmptyCart').show()
        return $('.noItem').hide()
    }
    $('.notEmptyCart').hide()
    return $('.noItem').show()

}

//function gets the list of items in the cart and displays them
const cartLister = (array) =>{
    let list=''
    //if item list is not zero, display each item with name, quantity, price and subtotal
    array.map(item=>{
        list+=`<div class="cartItemHolder">
                <div class="d-flex flex-row justify-content-between">
                    <div style="margin-top: 5px">
                        <div class="d-flex flex-column w3-center justify-content-center">
                            <a href="javascript:void(0)" data-code="${item.itemName}" style="color:inherit" class="itemIncreaser">
                              <i class="fa fa-plus"></i>
                            </a>
                            <span>${item.itemQuantity}</span>
                            <a href="javascript:void(0)" data-code="${item.itemName}" style="color:inherit" class="itemDecreaser">
                                <i class="fa fa-minus"></i>
                            </a>
                        </div>
                    </div>
                    <div>
                        <img class="w3-image" src="/public/img/${item.itemImage}" style="width:80px; height: 80px!important; ">
                    </div>
                    <div>
                        <div class="d-flex flex-column">
                            <div class="cartItemTitle">
                                ${item.itemName}
                            </div>
                            <div class="cartItemQuantity">
                                
                                <span>${'$'+formatAmount(item.itemPrice)}</span> * <span>(${item.itemQuantity})</span>
                            </div>
                            <div class="cartItemPrice">
                               ${'$'+formatAmount((item.itemQuantity* parseFloat(item.itemPrice)).toFixed(2))}
                            </div>

                        </div>
                    </div>
                    <div>
                        <div style="margin-top: 10px">
                            <button class="btn cartItemDelete remove-item" data-code="${item.itemName}">
                                <i class="fa fa-times"></i>
                            </button>
                        </div>

                    </div>
                </div>
            </div>`

    })
    let total = array.reduce((total,item)=> total+ (item.itemQuantity* parseFloat(item.itemPrice)), 0)



    //displays on html dom
    $('.totalPrice').html('$'+formatAmount(total.toFixed(2)))
    return $('#cart-list').html(list)
}

//function in charge of listing item on the check-out page
const cartTableLister= (array)=>{
    let data =''

    //if no item is the cart, display cart is empty
    if(array.length===0) return $('#item-list').html(`
            <div class="justify-content-center w3-center w3-margin">
                <p class="checkoutItem">Your Cart is empty</p>
            </div>
    `)

    //if item is more than zero,display each item as row with name, price , subtotal, and quantity
    array.map(item => {
        data+=`<div class="d-flex flex-row justify-content-between">
                    <p class="checkoutItem">
                        <a href="javascript:void(0)" class="itemDecreaser" data-code="${item.itemName}">
                            <i class="fa fa-minus  w3-margin-right"></i>
                        </a>
                         <span class="">  ${item.itemQuantity}</span>
                        <a href="javascript:void(0)" class="itemIncreaser" data-code="${item.itemName}">
                            <i class="fa fa-plus w3-margin-left w3-margin-right"></i>
                        </a>

                         x
                        <span class="w3-margin-left">${item.itemName}</span>
                    </p>
                    <p>&nbsp;</p>
                    <p class="checkoutPrice">${'$'+ formatAmount( (parseFloat(item.itemPrice) * parseFloat(item.itemQuantity)).toFixed(2))}</p>
                </div>
`
    })

    //displays content in the table
    return $('#item-list').html(data)



}

//function in charge of removing element from the cart
$(document).on('click', '.remove-item', function(){

    let cart = JSON.parse(localStorage.cart) //convert content in localStorage to array format
    let find = cart.findIndex(item => item.itemName === $(this).attr('data-code')) //find index of item using item name
    find !== -1 //if found
        ? cart.splice(find,1) //remove item
        : '' //else do nothing

    //return
    return CartUpdater(cart)
} )

//function  displays sum of item price on the check-out page
const cartTableSum = (array)=>{

    //if no item found in  the cart, display $0
    if(array.length===0) return  $('#cart-sum').html('$0')

    //if item found, display the total of the prices* quantity of each item
    return $('#cart-sum').html('$'+formatAmount((array.reduce((total,item)=> total+ (item.itemQuantity* parseFloat(item.itemPrice)), 0)).toFixed(2)))

}


//function updates the quantity of items on the check-out page
$(document). on('change', '.quantity', function(){
    let cart =JSON.parse(localStorage.cart) //convert localStorage cart to array form
    let find = cart.find(item => item.itemName === $(this).attr('data-code')) //find item in cart using name
    //if the quantity entered by user is 1 or more
    if($(this).val() >= 1){
        find !== undefined //if item was found
            ? find.itemQuantity=$(this).val() //update the item quantity
            :'' //else do nothing

        //update dom
        return CartUpdater(cart)
    }
    //else,alert users and return item value to 1
    window.alert("Quantity can not be less than 1")
    return $(this).val(1)


})

//function to increase item quantity
$(document). on('click', '.itemIncreaser', function(){
    let cart =JSON.parse(localStorage.cart) //convert localStorage cart to array form
    let find = cart.find(item => item.itemName === $(this).attr('data-code')) //find item in cart using name
    //if the quantity entered by user is 1 or more
    find !== undefined //if item was found
        ? find.itemQuantity+=1//update the item quantity
        :'' //else do nothing

    //update dom
    return CartUpdater(cart)


})

//function to decrease item quantity
$(document). on('click', '.itemDecreaser', function(){
    let cart =JSON.parse(localStorage.cart) //convert localStorage cart to array form
    let find = cart.find(item => item.itemName === $(this).attr('data-code')) //find item in cart using name

    if(find !== undefined){
        if(find.itemQuantity >1){
             find.itemQuantity-=1
            //update dom
            return CartUpdater(cart)
        }
         window.alert("Item quantity can't be less than 1")
    }




})

//function calls other functions in-charge of updating html dom, all explained individually
const CartUpdater= (cart) =>{
    localStorage.setItem('cart',JSON.stringify(cart)) //converts cart into string format before storing in local storage
    cartStatus(JSON.parse(localStorage.cart)) //gets cart item count
    cartLister(JSON.parse(localStorage.cart)) //lists cart item
    cartTableLister(JSON.parse(localStorage.cart)) //lists cart item on check out page
    cartTableSum(JSON.parse(localStorage.cart)) //shows sum of item prices * quantity
    checkOutButtonStatus(JSON.parse(localStorage.cart),'#checkout') //updates the checkout button
    cartListChecker(JSON.parse(localStorage.cart))//controls how to show item in the cart
}

//function to check out users
const checkOut = () =>{
    //user confirmation for checking out
    let condition = window.confirm("Are you sure you want to check out")

    //if users confirms
    if(condition){
        window.alert("Thank you for shopping with us") //alert user
        localStorage.removeItem('cart') //remove cart item from localStorage
        window.location.href='/home' //redirects user to home page
        return
    }

    return false
}

//function updates checkout button
const checkOutButtonStatus = (cart, element) =>{
    //if cart item is zero, disable check out button
    if(cart.length !==0) return $(element).prop('disabled',false).removeClass('w3-disabled')

    //else enable button
    return $(element).prop('disabled',true).addClass('w3-disabled')
}

//format Amount
const formatAmount= (nStr) =>{
    if(nStr === undefined) return 0
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
