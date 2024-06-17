const imgUrl = document.querySelector("#img-url");
const imgDesc = document.querySelector("#decription");
const imgName = document.querySelector("#name");
const addBtn = document.querySelector("#add-btn");
const container = document.querySelector(".container");
const contProducts = document.querySelector(".container-products");
const deleteBtn = document.querySelector(".delete-btn");
const containerDetails = document.querySelector(".container-product-details");

const arrOfProducts = [];

const addToArr = (arr, obj) => {
  arr.push(obj);
};

const renderArr = (arr, divContainer) => {
  divContainer.innerHTML = "";
  arr.forEach((el) => {
    let product = document.createElement("div");
    product.className = "product";
    product.setAttribute("data-id", el.id);

    product.addEventListener("click", function () {
      moreInformation(arr, this, containerDetails);
    });

    const productName = document.createElement("div");
    productName.className = "product-name";
    productName.textContent = el.name;
    product.append(productName);

    const productDesc = document.createElement("div");
    productDesc.className = "product-desc";
    productDesc.textContent = el.desc;
    product.append(productDesc);

    const productImg = document.createElement("img");
    productImg.src = el.url;
    product.append(productImg);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    product.append(deleteBtn);

    deleteBtn.addEventListener("click", function () {
      deleteObject(arr, this, divContainer);
    });

    divContainer.append(product);
  });
};

const deleteObject = function (arr, target, divContainer) {
  const parent = target.parentNode;
  const parentId = parent.getAttribute("data-id");
  for (let i = 0; i < arr.length; i++) {
    let el = arr[i];
    if (el.id === +parentId) {
      arr.splice(i, 1);
    }
  }

  renderArr(arr, divContainer);
};

const moreInformation = function (arr, target, div) {
  const element = target;
  const elementId = element.getAttribute("data-id");

  for (let i = 0; i < arr.length; i++) {
    let el = arr[i];
    if (el.id === +elementId) {
      let productDetails = "";

      productDetails = `
               <div class = "product-details"> 
                 <img src = ${el.url}>
                 <div class = "product-details-name"> Имя: ${el.name} </div>
                 <div class = "product-derails-desc"> Описание: ${el.desc} </div>
               </div>
              `;
      div.innerHTML = productDetails;
    }
  }
};

container.addEventListener("click", (event) => {
  const target = event.target;
  if (target === addBtn) {
    if (imgName.value === "" || imgUrl.value === "" || imgDesc.value === "") {
      alert("Заполните все поля!!!");
    } else {
      const objProducs = {
        url: imgUrl.value,
        name: imgName.value,
        desc: imgDesc.value,
        id: arrOfProducts.length + 1,
      };
      imgName.value = "";
      imgDesc.value = "";
      imgUrl.value = "";

      addToArr(arrOfProducts, objProducs);
      renderArr(arrOfProducts, contProducts);
    }
  }
});
