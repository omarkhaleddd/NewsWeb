var xhttp = new XMLHttpRequest();




var c = "general";
region = "us";
var category;
getNews(c,region);
var n = 0;
//DOM
var links = document.querySelectorAll('.nav-link');
//adding event listeners to nav bar
for (let index = 3; index < links.length; index++) {
    links[index].addEventListener('click',function(e){
        category = e.target.innerText;
        var activeToggle = document.querySelectorAll('.active');
        activeToggle[0].classList.remove('active');
        links[index].classList.toggle('active');
        getNews(category,region);
    })    
}
var general = document.querySelectorAll(".navbar-brand");
general[0].addEventListener('click',function(){
    var activeToggle = document.querySelectorAll('.active');
    activeToggle[0].classList.remove('active');
    general[0].classList.toggle('active')
    getNews(c,region);
})

//Ajax => Asynchronous Javascript And Xml
function getNews(c,region,query,size){
    xhttp.open('GET',`https://newsapi.org/v2/top-headlines?category=${c}${size==null?'':'&pageSize=' + size }${region==null?'':'&country=' + region }${query==null?'':'&q=' + query }&apiKey=e15f10fdf1414a348b772e97440bef11`);
    xhttp.send();

    items = []
    xhttp.addEventListener('readystatechange',function(){
    if(xhttp.readyState == 4 && xhttp.status == 200){
        items = JSON.parse(xhttp.response).articles;
        displayPosts();
        displayCarousel();
    }
})
}
function displayPosts(){
    var cartona = ``;
    for (let i = n; i < items.length; i++) {
        if(items[i].title=="[Removed]" || items[i].description == "[Removed]" ){
            continue;
        }
        cartona += `<div class = "col-md-4 p-2 position-relative">
            <img src="${items[i].urlToImage == null ? '../assets/breakingnews.jpg' : items[i].urlToImage }" class = "w-100 h-50">
            <h3>${items[i].title == null ? 'Title' : items[i].title}</h3>
            <p>${items[i].description == null ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ':items[i].description}</p>
            <a href="${items[i].url}" class="stretched-link text-decoration-none text-dark">
            </div>`        
    }
    document.getElementById('rowData').innerHTML = cartona ;
}

var searchInput = document.getElementById('searchBar');
searchInput.addEventListener('input',function(){
    var query = searchInput.value;
    searchBarFunction(query);
})

// search bar using Ajax
function searchBarFunction(query){
    getNews(c,null,query,6);
    displayPosts();
};
//carousel 
function carousel(){
    getNews(c,null,null,3);
    displayCarousel();
}
function displayCarousel(){
    cartona=``;
    if(localStorage.getItem('carousel')!=null){
        cartona = localStorage.getItem('carousel');
        document.getElementById('carouselAjax').innerHTML=cartona;
    }
    else{
    for (let index = 0;n!=3; index++) {
        if(items[index].title=="[Removed]" || items[index].description == "[Removed]"){
            continue;
        }
        if(n ==1){
            cartona+=`
            <div class="carousel-item active">`;
        }
        else
        {
            cartona+=`
            <div class="carousel-item">`;
        }
        cartona+=`
        <img class="d-block w-100" src="${items[index].urlToImage == null ? '../assets/breakingnews.jpg' : items[index].urlToImage }">
        <div class="carousel-caption d-none d-md-block">
                <h5>${items[index].title}</h5>
                <p class="text-truncate" >${items[index].description}</p>
            </div>
        </div>
        `;
        n++;
    }}
    localStorage.setItem('carousel',cartona)
    document.getElementById('carouselAjax').innerHTML=cartona;
}
