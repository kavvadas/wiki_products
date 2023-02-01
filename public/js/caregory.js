var outer;
var fetched_data;
var logged_in;
var fetched_size;
var cart_size_logged_in;
var data_logged;


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let id = urlParams.get('categoryId');
console.log(id);

window.addEventListener('load', (event) => {

    if(!logged_in){
        outer = document.getElementById("cart");
        outer.innerHTML = templates.Gocart(data_logged);
    }
    

    const login_form = document.getElementById("login");
    login_form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const formData = new FormData(login_form);
        const username = formData.get('username');
        const password = formData.get('password');
        fetch('/login',{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then(response =>response.json())
        .then(data =>{
            logged_in=data;
           
            data_logged = parseCreds(data);
            outer = document.getElementById("logged_user");
            outer.innerHTML = templates.logged_in(data_logged);

            outer = document.getElementById("cart");
            outer.innerHTML = templates.Gocart(data_logged);
            console.log(data);
            if(data.status=="FAIL"||(username==""||password=="")){
                alert("Please check your username or password");
                
            }else{
                alert("Welcome"+"\n"+username);
                fetch('/cart_size',{
                    method:'POST',
                    body: JSON.stringify({username,password}),
                    headers:{
                        'Content-Type':'application/json'
                    }
                }).then(res => res.json())
                .then(size=>{
                    cart_size_logged_in = size;
                    outer = document.getElementById("cart_size");
                    outer.innerHTML = templates.cart_size(size);
                })
            }
        }).catch(error =>{
            console.log("error on login",error);
            alert("Please signup");
        });
    })
});

//could be coded different but its cool
function parseCreds(data){
    var creds = {};
    var creds_arr = []; 
    if(data._id==undefined){return;}
    var tmp ={};
    tmp.id = data._id;
    tmp.username = data.username;
    tmp.password = data.password;
    tmp.cart = data.cart;
    creds_arr.push(tmp);
    creds['creds'] = creds_arr;
    return creds;
}

function list_products(filter){
    let url = "https://wiki-shop.onrender.com/categories/"+id+"/products";
    let headers = new Headers();
    let init = {
        method:'GET',
        headers:headers
    }
    fetch(url,init)
    .then(response => response.json())
    .then(data => {
        
        fetched_data = parseProducts(data,filter);
        outer = document.getElementById("product_list");
        outer.innerHTML = templates.list(fetched_data);

    }).catch(error =>{
        console.log("error",error);
    });
}

function parseProducts(data,filter){
    var products = {};
    var products_arr = [];
    if(filter!='0'){
        for(let products of data){
            var tmp = {};
            if(products.subcategory_id==filter){
                tmp.id = products.id;
                tmp.title = products.title;
                tmp.subcategory_id = products.subcategory_id;
                tmp.description = products.description;
                tmp.cost = products.cost;
                tmp.image = products.image;
                products_arr.push(tmp);
            }
        }
    }else if(filter=='0'){
        for(let products of data){
            var tmp = {};
            tmp.id = products.id;
            tmp.title = products.title;
            tmp.subcategory_id = products.subcategory_id;
            tmp.description = products.description;
            tmp.cost = products.cost;
            tmp.image = products.image;
            products_arr.push(tmp);
        }
    }
    products["products"] = products_arr;
    return products;
}

function list_subcategories(){
    let url = "https://wiki-shop.onrender.com/categories/"+id+"/subcategories";
    let headers = new Headers();
    let init = {
        method:'GET',
        headers:headers
    }
    fetch(url,init)
    .then(response => response.json())
    .then(data => {
        fetched_data = parseSubcategories(data);    
        outer = document.getElementById("subcategory_list");
        outer.innerHTML = templates.form(fetched_data);
        
        const filterBtns = outer.querySelectorAll("input[name=subcategory]");
        let selected =document.querySelector("input[name='subcategory']:checked").id;
        list_products(selected);

        let findSelected = () => {
            selected = document.querySelector("input[name='subcategory']:checked").id;
            list_products(selected);
        }
        filterBtns.forEach(filterBtn => {
            filterBtn.addEventListener("change",findSelected);
        });
    })
}

function parseSubcategories(data){
    var subcategories = {};
    var subcategories_arr = [];
    var tmp = {};
    tmp.id = 0;
    tmp.category_id = 0;
    tmp.title = 'All';
    tmp.checked = true;
    subcategories_arr.push(tmp);
    for(let subcategory of data){
        var tmp = {};
        tmp.id = subcategory.id;
        tmp.category_id = subcategory.category_id;
        tmp.title = subcategory.title;
        tmp.checked = false;
        subcategories_arr.push(tmp);
    }
    subcategories["subcategories"] = subcategories_arr;
    return subcategories;


}


function addToc(index){
    if(!logged_in){
        alert("Please sign in before adding to cart!");
        return;
    }
    let tmpToc = logged_in;
    let toc = JSON.parse(JSON.stringify(tmpToc));
    let tmp_product = fetched_data.products[index];
    let product = JSON.parse(JSON.stringify(tmp_product));
    
    let exists = false;

    let cartItems = toc.cart.cartItems;
    for(let i = 0;i<cartItems.length;i++){
        if(cartItems[i].title===product.title){
            cartItems[i].quantity++;
            exists=true;
            
            break;
        }
    }
    if(!exists){
        cartItems.push({
            title: product.title,
            cost: product.cost,
            quantity:1,
            image:product.image
        });
        
    }
    cart_size_logged_in.size+=1;
    outer = document.getElementById("cart_size");
    outer.innerHTML = templates.cart_size(cart_size_logged_in);
    toc.cart.totalcost+=product.cost;
    

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
        console.log(logged_in.cart);
    }).catch(error =>{
        console.log("error on login",error)
    });

}

function goToCart(){
    if(!logged_in){alert("Please login so you can access your cart."); return;}
    
}

list_subcategories();
