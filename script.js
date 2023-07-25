const imageContainer = document.getElementById('image_cont');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages= 0;


let photosArray = [];

function imageLoaded(){
   
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        loader.hidden= true;
        ready= true;
    }
}

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos(){
    imagesLoaded=0;
    totalImages=photosArray.length ;
    
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank',
        })

        const img = document.createElement('img');
        
        setAttributes(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })

        img.addEventListener('load', imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

const count = 30;
const uKey = 'KJDMhNO7maztuN8AhdR85MPbTNVF6y8vvWcfLuYMFq8';
const url=`https://api.unsplash.com/photos/random/?client_id=${uKey}&count=${count}`;

async function getPhotos(){
    try{
        const response = await fetch(url);
        photosArray = await response.json();
        displayPhotos();

    }catch(error){

    }

}


window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 && ready){
        ready= false;
        getPhotos();
    }
})

getPhotos();