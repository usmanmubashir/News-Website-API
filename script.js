// https://newsapi.org/v2/everything?q=tesla&from=2023-11-04&sortBy=publishedAt&apiKey=14b28a4f27a845b1bb777f07258bc23b

let apiLink="https://newsapi.org/v2/everything?q=";
let apiKey="14b28a4f27a845b1bb777f07258bc23b";
// let query="pakistan";

let cardTemplate=document.getElementById('card-template');
let cardParent=document.getElementById('card-parent');



function getPastDate(daysAgo) {
    let currentDate = new Date();
    let pastDate = new Date(currentDate);
    pastDate.setDate(currentDate.getDate() - daysAgo);

    // Format the date as YYYY-MM-DD
    let year = pastDate.getFullYear();
    let month = (pastDate.getMonth() + 1).toString().padStart(2, '0');
    let day = pastDate.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}

// Example: Get the date from 7 days ago
let sevenDaysAgo = getPastDate(7);



window.addEventListener('load', fetchApi('trending'));

async function fetchApi(query){
    cardParent.innerHTML='';
let response= await fetch(`${apiLink}${query}&from=${sevenDaysAgo}&sortBy=publishedAt&apiKey=${apiKey}`);
let data= await response.json();
let articalsData=data.articles;
// console.log(data);
dataBuilding(articalsData);
}



function dataBuilding(articalsData){
    let cardTemplate=document.getElementById('card-template');
    let cardParent=document.getElementById('card-parent');

articalsData.forEach(e => {
    if(e.urlToImage === null){
        return
    };

    const cloneCard=cardTemplate.content.cloneNode(true);
fillData(e, cloneCard)
cardParent.appendChild(cloneCard);

});
   
    };


function fillData(articles, cloneData){
    let cardImage=cloneData.getElementById('cardImage');
    let title=cloneData.getElementById('title');
    let secondTitle=cloneData.getElementById('secondTitle');
    let description=cloneData.getElementById('description');

let date=new Date(articles.publishedAt);
let dateFormate=date.toLocaleDateString();

cardImage.src=`${articles.urlToImage}`;
title.innerHTML=`${articles.title}`;
secondTitle.innerHTML=`${dateFormate} : ${articles.source.name}`;
description.innerHTML=`${articles.description}`;

cloneData.firstElementChild.addEventListener('click', ()=>{
    window.open(articles.url,  '_blank');
})
}



function onNavItemClick(id){
    fetchApi(id);
};

function inputSearch(){
    let searchInput=document.getElementById('srchinpt');
    searchInputValue=searchInput.value;
    fetchApi(searchInputValue);
    searchInput.value='';


}
