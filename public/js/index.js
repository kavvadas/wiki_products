var outer;
var fetched_data;
function list_categories(){
    let url = "https://wiki-shop.onrender.com/categories";
    let headers = new Headers();
    headers.append('Accept','application/json');
    let init = {
        method: 'GET',
        headers:headers
    }
    fetch(url,init)
    .then(response => response.json())
    .then(data=>{
        fetched_data = parseData(data);
        outer = document.getElementById("category_list");
        outer.innerHTML = templates(fetched_data); 
    })
}
list_categories();
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

