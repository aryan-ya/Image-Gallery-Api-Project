
const imagesWrapper = document.querySelector(".images");
const loadMoreBtn = document.querySelector(".load-more");
const searchInput = document.querySelector(".search-box input");
const lightBox = document.querySelector(".lightbox");
// API KEY SEARCH IMAGINATION

const apiKey ="HoVqRzgSmSVVjZh7mgTPX59eI5AT99bQ5yFTxZbspGHUiYFNV3qGPWzk";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;


const downloadIMG  = (imgURL) =>{
    // converting receiving  img to blob creating download
  fetch(imgURL).then(res => res.blob()).then(file =>{
  const a = document.createElement("a");
  a.href= URL.createObjectURL(file);
  a.download = new Date().getTime();
  a.click();
 
  }).catch(()=>  alert("Failed to download image "));
}


const showLightbox  = () =>{
    lightBox.classList.add('show');
}
const   generateHTML = (images) =>{
    // making  li of all fetched image and adding  them to the existing
    imagesWrapper.innerHTML += images.map(img => `
    <li class="card" onclick= "showLightbox()">
    <img src="${img.src.large2x}" alt="img" srcset="">
    <div class="details">
        <div class="photographer">
            <i class="uil uil-camera"></i>
            <span>${img.photographer}</span>

        </div>
        <button onclick="downloadIMG('${img.src.large2x}')">
        <i class="uil uil-import"></i>
        </button>
    </div>
    
    
    
    
    </li>
    
    
    `).join("");
} 

const getImages  = (apiURL) =>{
    // fetching images by api call with Authorization header
    loadMoreBtn.innerText = "LOADING ..";
    loadMoreBtn.classList.add ("disabled");
     fetch(apiURL ,{
        headers: {Authorization : apiKey}
    }).then(res => res.json()).then(data =>{
        // console.log(data);
        generateHTML(data.photos);
        loadMoreBtn.innerText = "LOAd more ...";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert ("failed to load images!"));
}

const loadMoreImages =() =>{
    currentPage++;
    let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
    apiURL =searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page{perPage}`: apiURL;
    getImages(apiURL);

}
const loadSearchImages =(e) => {
    if (e.target.value === "") return searchTerm = null;
    // if pressed the key  
  if (e.key === "Enter" ) {
    currentPage = 1;
    searchTerm = e.target.value;
    imagesWrapper.innerHTML = "";
    getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
    // getImages( `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);
  }

}

getImages( `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`);

loadMoreBtn.addEventListener("click", loadMoreImages);
searchInput.addEventListener("keyup", loadSearchImages);