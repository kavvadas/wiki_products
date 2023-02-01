

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('id');
let username = urlParams.get('username');
var fetchedData;
var outer;
var fetchedCost;
var logged_in;
var cart_size_logged_in;
var categories_data;

window.addEventListener('load',(event)=>{
    
    cartItems();
    let url = "https://wiki-shop.onrender.com/categories";
    let headers = new Headers();
       headers.append('Accept','application/json');
    let init = {
        method: 'GET',
        headers:headers
    }
    fetch(url,init)
    .then(response => response.json())
    .then(cat_data=>{
       
        categories_data = parseCategories(cat_data);
        
        outer = document.getElementById("category_list");
        outer.innerHTML = templates(categories_data); 
    })
})

function add_cart(index){
    let tmpToc = logged_in;
    let toc = JSON.parse(JSON.stringify(tmpToc));
    let cartItems = toc.cart.cartItems;
    for(let i = 0;i<cartItems.length;i++){
        if(i===index){
            cartItems[i].quantity++;    
            toc.cart.totalcost +=cartItems[i].cost;
            break;
        }
    }
    cart_size_logged_in.size+=1; 
    outer = document.getElementById("cart_size");
    outer.innerHTML = templates.cart_size(cart_size_logged_in);
    fetch('/add_cart',{
        method:'PATCH',
        body: JSON.stringify(toc),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response =>response.json())
    .then(data =>{
        logged_in =data;
        fetchedData = parseItems(data.cart.cartItems);
        outer = document.getElementById("user_cart");
        outer.innerHTML = templates.viewCart(fetchedData);
        logged_in = data;
        outer = document.getElementById("total_cost");
        console.log(data.cart.totalcost);
        outer.innerHTML = templates.viewCost({cost: data.cart.totalcost});
    }).catch(error =>{
        console.log("error on login",error)
    });
}

function remove_cart(index){
    let tmpToc = logged_in;
    let toc = JSON.parse(JSON.stringify(tmpToc));
    let cartItems = toc.cart.cartItems;
    for(let i = 0;i<cartItems.length;i++){
        console.log(i);
        console.log(index);

        if(i==index){
            //console.log("id"+index,"\n"+i);
            if(cartItems[i].quantity>1){
                cartItems[i].quantity--;    
                toc.cart.totalcost -=cartItems[i].cost;
            }else{
                toc.cart.cartItems =  toc.cart.cartItems.slice(0, index).concat(toc.cart.cartItems.slice(index + 1));;
                toc.cart.totalcost -=cartItems[i].cost;

                console.log(toc.cart.cartItems);
                alert("This item will be erased from your cart");
                break;
            }
        }
    }
    
    cart_size_logged_in.size-=1; 
    outer = document.getElementById("cart_size");
    outer.innerHTML = templates.cart_size(cart_size_logged_in);
    fetch('/remove_cart',{
        method:'PATCH',
        body: JSON.stringify(toc),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(response =>response.json())
    .then(data =>{
        logged_in =data;
        fetchedData = parseItems(data.cart.cartItems);
        outer = document.getElementById("user_cart");
        outer.innerHTML = templates.viewCart(fetchedData);
        outer = document.getElementById("total_cost");
        console.log(data.cart.totalcost);
        outer.innerHTML = templates.viewCost({cost: data.cart.totalcost});
    }).catch(error =>{
        console.log("error on login",error)
    });
    
}



function cartItems(){
    fetch('/user/cart',{
        method:'POST',
        body:JSON.stringify({username,id}),
        headers:{
            'Content-Type':'application/json'
        }
    })
    .then(data => data.json())
    .then(data=>{
         fetchedData = parseItems(data.cart.cartItems);
         outer = document.getElementById("user_cart");
         outer.innerHTML = templates.viewCart(fetchedData); 

        
        logged_in = data;
        outer = document.getElementById("total_cost");
        outer.innerHTML = templates.viewCost({cost: data.cart.totalcost});
        fetch('/cart_size',{
            method:'POST',
            body: JSON.stringify(logged_in),
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res => res.json())
        .then(size=>{
            cart_size_logged_in = size;
            outer = document.getElementById("cart_size");
            outer.innerHTML = templates.cart_size(size);
        })
    })
    .catch(error =>{
        console.log(error);
    })

}
function parseItems(data){
    var items = {};
    var items_arr = [];
    for(let item of data){
        var tmp = {};
        tmp.title = item.title;
        tmp.cost = item.cost;
        tmp.quantity = item.quantity;
        tmp.image = item.image;
        items_arr.push(tmp);
    }
    items['items'] = items_arr;
    return items;
}


function parseData(data){
    var categories = {};
    var categories_arr = [];
    for(let categories of data){
        var tmp = {};
        tmp.id = categories.id;
        tmp.title = categories.title;
        tmp.img_url = categories.img_url;
        categories_arr.push(tmp);
    }
    categories["categories"] = categories_arr;
    return categories;
}
function parseCategories(data){
    var categories = {};
    var categories_arr = [];
    for(let categories of data){
        var tmp = {};
        tmp.id = categories.id;
        tmp.title = categories.title;
        tmp.img_url = categories.img_url;
        categories_arr.push(tmp);
    }
    categories["categories"] = categories_arr;
    return categories;
}




