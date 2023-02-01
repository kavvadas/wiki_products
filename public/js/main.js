//Handlebars
Handlebars.registerHelper('ifState', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });



  var templates = {};

  var catList = "{{#if categories}} \
                    <ul class='categories'> \
                        {{#each categories}} \
                            <li class='category smaller'> \
                                <a href='category.html?categoryId={{id}}'> \
                                <img class='imageC' src={{img_url}}> \
                                </a> \
                                <section class='category_info'> \
                                    <h3> {{title}}</h3> \
                                    <h3> {{id}}</id> \
                                </section> \
                            </li> \
                            {{/each}} \
                            </ul> \
                    {{/if}}";
templates = Handlebars.compile(catList);

var prodList = "{{#if products}} \
                    <ul class='products'> \
                        {{#each products}} \
                            <li class='product'> \
                            <div class='product_info'> \
                                <img class='image' src={{image}}> \
                            </div'> \
                                <section class='product_info'> \
                                    <h2>{{title}}</h2> \
                                    <h3>{{description}}</h3> \
                                    <h4>{{cost}}€</h4> \
                                    <button class='search_button' id='{{@index}}' onclick=addToc({{@index}})>Add to cart</button>\
                                </section> \
                            </li> \
                        {{/each}} \
                    </ul> \
                    {{/if}}";
templates.list = Handlebars.compile(prodList);

var subcList = "{{#if subcategories}} \
                        {{#each subcategories}} \
                            <input type='radio' name='subcategory' id={{id}} value={{title}} {{#if checked}}checked{{/if}}> \
                            <label for='{{title}}'>{{title}}</label> \
                        {{/each}} \
                    {{/if}}";

templates.form = Handlebars.compile(subcList);

var userCreds = 
                    "{{#if creds}} \
                        {{#each creds}} \
                            <h2>Username:{{username}}</h1> \
                            <h2>Id:{{id}}</h2> \
                        {{/each}} \
                    {{/if}}";

templates.logged_in = Handlebars.compile(userCreds);

var cart_size ="<h1>{{size}}</h1>";
templates.cart_size = Handlebars.compile(cart_size);



var cart = " \{{#if creds}} \
                    {{#each creds}} \
                        <a href='cart.html?username={{username}}&id={{id}}' onclick=goToCart()><img src='./images/cart.png' alt=''></a> \
                    {{/each}} \
               {{else}} \
                    <a href='' target='_self' onclick=goToCart()><img src='./images/cart.png' alt=''></a> \
               {{/if}}"
templates.Gocart = Handlebars.compile(cart);

var cartProducts = "{{#if items}} \
                        <table class='cart_table'> \
                        {{#each items}} \
                            <tr class='cart_item'> \
                                <td><img class='image' src={{image}}></td> \
                                <td><div class='some_space'><h2>{{title}}</h2></td></div> \
                                <td><div class='some_space'><h3>quantity:{{quantity}}</h3> \
                                <button id='{{@index}}' class='update_button' onclick=remove_cart({{@index}})>-</button> \
                                <button id='{{@index}}' class='update_button' onclick=add_cart({{@index}})>+</button> \
                                </div></td> \
                                <td><div class='some_space'><h3>cost:{{cost}}€</h3></div></td> \
                            </tr> \
                        {{/each}} \
                        </table> \
                    {{else}} \
                        <div id='empty cart'><h1>THIS CART IS EMPTY.</h1></div> \
                    {{/if}}"
templates.viewCart = Handlebars.compile(cartProducts);  

var totalCost = "<h2>TOTAL COST:    {{#if cost}}{{cost}}€{{/if}}</h2>"
templates.viewCost = Handlebars.compile(totalCost);

    