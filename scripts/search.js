
//!Seçiciler

// Erişim Anahtarı
const accessKey = "E4-qnZNSlKeJTE0ft-Ql1u4FBhhvUgaB6xDOGvGHIQg";
const loadingOverlay = document.querySelector(".loading-overlay");

const picturesList = document.getElementById("pictures-list");
const likedPicturesList = document.getElementById("liked-pictures-list");

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const showMoreBtn = document.getElementById("show-more-btn");
const imageBox = document.querySelector(".image-box");


const alertBox = document.querySelector(".alert-box");
const alrtBox = document.getElementById("alt-box");
const alertMessage = document.getElementById("alert-message");
const alertImg = document.getElementById("alertImg");

const downloadBtn = document.getElementById("download-btn");
const downloadLink = document.getElementById("downloadLink");
const deleteAllImages = document.getElementById("deleteAllImages");
const TitleContent = document.getElementById("titleContent");
const noFoundBackground = document.getElementById("noFoundBackground");



// Modal
const modal = document.getElementById('myModal');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');






//!Veri çekme ve işleme




let keyword = "";
let page = 1;
let selectedDownload = "";

const likedPhotos = JSON.parse(localStorage.getItem('likedPhotos')) || [];

async function searchImages() {

  BGImageCloseFunc();

  try {
    loadingOverlay.style.display = "flex";
    loadingOverlay.style.opacity="1";
    keyword = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    // Sayfa Sayısını Belirleme (Daha fazla sonuç);
    if (page === 1) {
      picturesList.innerHTML = "";
    }

    const results = data.results;

    if (results === null || results.length === 0) {
      alertMessage.innerHTML = "There is no result.";
      errorAlert();
      BGImageFunc()
      picturesList.innerHTML = "";
      showMoreBtn.style.display = "none";
    }
    else {

      results.map((result) => {
        const pictureDiv = document.createElement("div");
        pictureDiv.className = "picture";
        pictureDiv.innerHTML = `
      <img style="width: 100%; height: 300px;" src="${result.urls.regular}" alt="" class="result-image" loading="lazy" decoding="async">
      <button class="like-image-btn" style="display:none"><span class="material-symbols-outlined">favorite</span></button>
      <button class="look-image-btn" style="display:none"><span class="material-symbols-outlined">visibility</span></button>`;


        // Seçilen Fotoğraf Bilgileri.

        const lookImageBtn = pictureDiv.querySelector(".look-image-btn");
        const likeImageBtn = pictureDiv.querySelector(".like-image-btn");
        const likeImageBtnSpan = pictureDiv.querySelector(".like-image-btn span");


        const updateButtonVisibility = () => {
          lookImageBtn.style.display = "flex";
          likeImageBtn.style.display = "flex";
          pictureDiv.querySelector("img").style = "width:auto; height:auto;";
        };

        pictureDiv.querySelector("img").addEventListener("load", updateButtonVisibility);

        let selectedLikes = result.likes;
        let selectedCreatorPP = result.user.profile_image.medium;
        let selectedCreator = result.user.name;
        let selectedImageUrl = result.urls.regular;
        let selectedLink = result.links.html;
        let selectedDownload = result.links.download;


        lookImageBtn.addEventListener("click", () => {
          showPictureInfo(selectedImageUrl, selectedCreator, selectedLink, selectedCreatorPP, selectedLikes, selectedDownload);
        });

        likeImageBtn.addEventListener("click", () => {
          onLikeButtonClick(selectedImageUrl, selectedLikes, selectedCreator, selectedLink, selectedCreatorPP, selectedDownload);
          likeImageBtnSpan.innerHTML = "check";
        });


        picturesList.appendChild(pictureDiv)
      });

      loadingOverlay.style.display = "none";
      loadingOverlay.style.opacity="0";
      showMoreBtn.style.display = "block";
    }

  } catch (error) {
    alertMessage.innerHTML = "Something went wrong!";
    errorAlert();
    BGImageFunc();
  }
}















//! Seçilen Fotoğrafı Görüntüle

const currentlyImage = document.getElementById("currentlyImage");
const creatorPPImg = document.getElementById("creatorPPImg");
const imageSource = document.getElementById("imageSource");
const creatorName = document.getElementById("creatorName");
const Likes = document.getElementById("likes");



function showPictureInfo(img, creator, link, creatorpp, likes, download) {

  selectedImgBox.style.display = "flex";
  closeBtn.style.display = "flex";
  Likes.innerHTML = likes;
  currentlyImage.src = `${img}`;
  creatorPPImg.src = `${creatorpp}`;
  imageSource.href = `${link}`;
  creatorName.innerHTML = `${creator}`;
  imageSource.target = "_blank";
  downloadLink.href = download;
}


function onLikeButtonClick(likedImg, likes, creator, link, creatorPP, download) {
  const likedImage = {
    img: likedImg,
    likes: likes,
    creator: creator,
    link: link,
    creatorPP: creatorPP,
    download: download
  };

  likedPhotos.push(likedImage);
  localStorage.setItem('likedPhotos', JSON.stringify(likedPhotos));
}



// Fotoğrafları Listeleme

function likedImagesShow() {
  const uniqueLikedPhotos = new Set();

  likedPhotos.forEach((imageData) => {
    uniqueLikedPhotos.add(JSON.stringify(imageData));
  });

  const uniqueLikedPhotosArray = Array.from(uniqueLikedPhotos).map((imageDataStr) => JSON.parse(imageDataStr));



  uniqueLikedPhotosArray.forEach((imageData) => {
    const pictureDiv = document.createElement("div");
    pictureDiv.className = "picture";
    pictureDiv.innerHTML = `
      <img src="${imageData.img}" alt="${imageData.img}" class="result-image">
      <button class="like-image-btn" id="deleteImgBtn"><span class="material-symbols-outlined">delete</span></button>
      <button class="look-image-btn"><span class="material-symbols-outlined">visibility</span></button>
    `;

    likedPicturesList.appendChild(pictureDiv);


    const deleteImageBtn = pictureDiv.querySelector("#deleteImgBtn");
    const lookImageBtn = pictureDiv.querySelector(".look-image-btn");

    lookImageBtn.addEventListener("click", () => {
      showPictureInfo(
        imageData.img, imageData.creator, imageData.link, imageData.creatorPP, imageData.likes, imageData.download);
    });

    deleteImageBtn.addEventListener("click", (e) => {
      ModalContent.innerHTML = "Do you want to delete this image from your favorite lists?";
      showModal();

      confirmButton.onclick = () => {
        removeLikedImage(imageData);
        pictureDiv.remove();
        closeModal();
        SuccesfulAlert();


        const divCount = likedPicturesList.querySelectorAll('div').length;
        deleteAllImages.style.display = divCount === 0 ? 'none' : 'flex';
        if (divCount == 0) {
          ThereIsNoImage();
        }
        else {
          ThereIsImage();
        }
      };

      cancelButton.onclick = () => {
        closeModal();
      };
    });
  });

  const divCount = likedPicturesList.querySelectorAll('div').length;
  deleteAllImages.style.display = divCount === 0 ? 'none' : 'flex';
  if (divCount == 0) {
    ThereIsNoImage();
  }
  else {
    ThereIsImage();
  }
}


function removeLikedImage(imageData) {
  const likedPhotos = JSON.parse(localStorage.getItem('likedPhotos')) || [];
  const updatedLikedPhotos = likedPhotos.filter((image) => image.img !== imageData.img);
  localStorage.setItem('likedPhotos', JSON.stringify(updatedLikedPhotos));
}













//!Bazı Fonksiyonlar

function alertFunc() {

  alrtBox.style.display = "flex";
  alrtBox.style.opacity = "1";

  setTimeout(() => {
    alrtBox.style.display = "none";
    alrtBox.style.opacity = "0";
  }, 4000);
}

function errorAlert() {
  alertBox.style.borderBottom = "2px solid rgb(225, 18, 18)";
  alertImg.src = "images/error.png";
  alertFunc();
}


// Favoriye Eklenen Bütün Resimleri Silme İşlemi

const ModalContent = document.querySelector(".modal-content p");

function deleteImages() {
  ModalContent.innerHTML = "Are you sure want to delete all images in your favorite list?";
  showModal();

  confirmButton.onclick = () => {
    localStorage.clear();
    likedPicturesList.innerHTML = "";
    closeModal();
    SuccesfulAlert();
    ThereIsNoImage();
  };

  cancelButton.onclick = () => {
    closeModal();
  };

}

deleteAllImages.addEventListener("click", deleteImages);




function SuccesfulAlert() {
  alertBox.style.borderBottom = "2px solid rgb(4, 189, 84)";
  alertMessage.innerHTML = "Succesful";
  alertImg.src = "images/checkImg.png";
  alertFunc();
}

function BGImageCloseFunc() {
  imageBox.style.backgroundImage = "url('')";
  imageBox.style.height = "100%";
};

function ThereIsNoImage() {
  deleteAllImages.style.display = "none";
  noFoundBackground.style.display = "flex";
  TitleContent.style.display = "none";
  GeneralBox2.style.height = "100vh";
  GeneralBox2.style.padding = "160px 5px 0px 5px;";
}

function ThereIsImage() {
  const divCount = likedPicturesList.querySelectorAll('div').length;
  TitleContent.display = "flex";
  TitleContent.innerHTML = `Your Favorite Images (${divCount}) `;
  GeneralBox2.style.height = "auto";
  deleteAllImages.style.marginRight = "20px";
}


function BGImageFunc() {
  picturesList.innerHTML = "";
  imageBox.style.backgroundImage = "url('/images/findVector.png')";
  imageBox.style.height = "300px";
  loadingOverlay.style.display = "none";
  showMoreBtn.style.display = "none";
}

if (searchButton) {
  searchButton.addEventListener("click", () => {
    page = 1;
    searchImages();
  });
}


if (picturesList) {
  picturesList.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
  })
}

if (showMoreBtn) {
  showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
  });
}

function showModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}














//! Tuş ve Eylemler

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {

    selectedImgBox.style.display = "none";
    closeBtn.style.display = "none";
  }
  if (event.key === "Enter") {
    showMoreBtn.style.display = "none";
    picturesList.innerHTML = ``;
    searchImages();
  }
});


const backButton = document.getElementById("back-button");
const currentlyAdress = document.getElementById("currentlyAdress");

backButton.addEventListener("click", (e) => {
  if (favoritePicButton.style.display === "none") {
    currentlyAdress.href = "searchimage.html";
  } else {
    currentlyAdress.href = "main.html";
  }

  currentlyAdress.click();
  e.preventDefault();
});




const selectedImgBox = document.querySelector(".selected-image-box");
const GeneralBox1 = document.getElementById("gb1");
const GeneralBox2 = document.getElementById("gb2");
const closeBtn = document.querySelector("#closeButton");
const favoritePicButton = document.querySelector('#favoritePic-button');
const bgClose = document.getElementById("bgClose");


favoritePicButton.addEventListener("click", () => {
  GeneralBox1.style.display = "none";
  GeneralBox2.style.display = "flex";
  favoritePicButton.style.display = "none";
  bgClose.style.backgroundImage = "url('')";
  bgClose.style.height = "100%";
  likedImagesShow();
})

closeBtn.addEventListener("click", () => {
  selectedImgBox.style.display = "none";
  closeBtn.style.display = "none";
})



