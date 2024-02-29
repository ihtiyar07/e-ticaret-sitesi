// var responsiveSlider = function () {
//   let slider = document.getElementById("slider");
//   let slideList = document.getElementById("slideWrap");
//   let count = 1;

//   let item = slideList.querySelectorAll("li").length;

//   let nextSlide = function () {
//     if (count < item) {
//       slideList.style.left = `calc(-${count}*100%)`;
//       count++;
//     } else if ((count = item)) {
//       slideList.style.left = "0px";
//       count = 1;
//     }
//   };

//   setInterval(function () {
//     nextSlide();
//   }, 3000);
// };
// window.onload = function () {
//   responsiveSlider();
// };

// fetch("http://localhost:5000/products", {
//   method: "GET",
// })
//   .then((res) => res.json())
//   .then((datas) => {
//     console.log(datas);
//     // Tüm "recomender" sınıfına sahip öğeleri seç
//     var productRecomenders = document.querySelector(".recomender");
//     // Her bir "recomender" öğesini ele al
//     for (const data of datas) {
//       console.log(data);
//       // Yeni bir div öğesi oluştur
//       var newDiv = document.createElement("div");
//       newDiv.className = "card";

//       // Yeni bir img öğesi oluştur
//       var newImg = document.createElement("img");
//       newImg.src = data.image_url_1;
//       newImg.alt = "#";
//       newImg.className = "product-img";

//       // Yeni bir div öğesi oluştur ve içeriği belirle
//       var newProductName = document.createElement("div");
//       newProductName.className = "product-name";
//       newProductName.textContent = data.name;

//       // Yeni bir div öğesi oluştur ve içeriği belirle
//       var newProductPrice = document.createElement("div");
//       newProductPrice.className = "product-price";
//       newProductPrice.textContent = data.price + " TL";

//       // Yaratılan öğeleri birleştirerek yeni div öğesine ekle
//       newDiv.appendChild(newImg);
//       newDiv.appendChild(newProductName);
//       newDiv.appendChild(newProductPrice);

//       // "recomender" öğesine yeni div öğesini ekle
//       productRecomenders.appendChild(newDiv);
//     }
//   });

// document
//   .getElementById("material-symbols-outlined")
//   .addEventListener("click", function () {
//     window.location.href = "login.html";
//   });

// Modal kapatma işlevi
function closeModal() {
  var modal = document.getElementById("shoppingCartModal");

  modal.classList.add("hidden");
  modal.classList.remove("block");
}
function openModal() {
  var modal = document.getElementById("shoppingCartModal");

  modal.classList.add("block");
  modal.classList.remove("hidden");
}

//Hesap name değiştirme
document.addEventListener("DOMContentLoaded", () => {
  userName = localStorage.getItem("userName");
  if (userName) {
    var account = document.querySelector(".account");
    account.textContent = userName;
  }
});

//sepet
async function basket_list() {
  try {
    const data = { userID: localStorage.getItem("userID") };

    const response = await fetch("http://localhost:5000/products/get_basket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Basket failed.");
    }
    const responseData = await response.json();

    document.getElementById("basket_product_sum").textContent =
      responseData.length;
    let subTotal = 0;

    // Maintain a map of product IDs to quantities
    const productQuantities = {};

    responseData.forEach((x) => {
      subTotal += x.price;  

      const basketContainer = document.getElementById("basket-container");

      // Check if product already exists in the basket
      const existingProductItem = document.getElementById(
        `product-${x.product_id}`
      );
      if (existingProductItem) {
        // If product exists, increase quantity
        productQuantities[x.product_id]++;
        document.getElementById(
          `quantity-${x.product_id}`
        ).textContent = `Qty ${productQuantities[x.product_id]}`;
      } else {
        // If product doesn't exist, add it to the basket
        productQuantities[x.product_id] = 1;

        const listItem = document.createElement("li");
        listItem.classList.add("flex", "py-6", "transition-none");
        listItem.id = `product-${x.product_id}`;

        // Resim öğesi oluştur
        const imageContainer = document.createElement("div");
        imageContainer.classList.add(
          "h-24",
          "w-24",
          "flex-shrink-0",
          "overflow-hidden",
          "rounded-md",
          "border",
          "border-gray-200"
        );
        const image = document.createElement("img");
        image.src = x.image_url;
        image.alt = x.name;
        image.classList.add(
          "h-full",
          "w-full",
          "object-cover",
          "object-center"
        );

        imageContainer.appendChild(image);
        listItem.appendChild(imageContainer);

        // Diğer ürün bilgilerini içeren div
        const productInfoContainer = document.createElement("div");
        productInfoContainer.classList.add(
          "ml-4",
          "flex",
          "flex-1",
          "flex-col"
        );

        // Ürün adı ve fiyat
        const productNamePriceContainer = document.createElement("div");
        productNamePriceContainer.classList.add(
          "flex",
          "justify-between",
          "text-base",
          "font-medium",
          "text-gray-900"
        );

        const productNameLink = document.createElement("h3");
        productNameLink.innerHTML = `<a href="product_detail.html">${x.name}</a>`;

        const productPrice = document.createElement("p");
        productPrice.classList.add("ml-4");
        productPrice.textContent = `$${x.price.toFixed(2)}`;

        productNamePriceContainer.appendChild(productNameLink);
        productNamePriceContainer.appendChild(productPrice);

        // Adet ve Kaldır butonları
        const quantityRemoveContainer = document.createElement("div");
        quantityRemoveContainer.classList.add(
          "flex",
          "flex-1",
          "items-end",
          "justify-between",
          "text-sm"
        );

        const quantity = document.createElement("p");
        quantity.classList.add("text-gray-500");
        quantity.textContent = `Qty ${productQuantities[x.product_id]}`;
        quantity.id = `quantity-${x.product_id}`;

        const removeButtonContainer = document.createElement("div");
        removeButtonContainer.classList.add("flex");

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.classList.add(
          "font-medium",
          "text-indigo-600",
          "hover:text-indigo-500"
        );
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
          basket_del_product(x.product_id);
        };

        removeButtonContainer.appendChild(removeButton);

        quantityRemoveContainer.appendChild(quantity);
        quantityRemoveContainer.appendChild(removeButtonContainer);

        productInfoContainer.appendChild(productNamePriceContainer);
        productInfoContainer.appendChild(quantityRemoveContainer);

        listItem.appendChild(productInfoContainer);

        // Oluşturulan öğeyi sepete ekleyin
        basketContainer.appendChild(listItem);
      }
    });

    document.getElementById("sub_total").textContent = subTotal + "₺";
    document.getElementById("sub_total_2").textContent = subTotal + "₺";
  } catch (error) {
    console.error("Error:", error);
  }
}

async function homepage_prodcuts() {
  const response = await fetch("http://localhost:5000/products/get_product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Basket failed.");
  }
  const responseData = await response.json();

  //kategori listesi
  const categories = Array.from(
    new Set(responseData.map((product) => product.category_name))
  );

  // Ürün kartlarını oluşturan fonksiyon
  function createProductCard(product) {
    // Yeni bir article elementi oluşturun
    const newArticle = document.createElement("article");

    // Article içeriğini düzenle
    newArticle.innerHTML = `
<div class="transition ease-in-out delay-150 shadow-md  rounded-lg hover:-translate-y-1 hover:scale-110 hover: duration-300 border-solid outline outline-2 outline-offset-2 ">
<div class="aspect-square overflow-hidden ">
<img class="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
     src="${product.image_url}"
     alt="" />
</div>
<div class="absolute top-0 m-2 rounded-full bg-white">

</div>
<div class="my-4 mx-auto flex w-10/12 flex-col items-start justify-between  ">
<div class="mb-2 flex">
  <p class="mr-3 text-sm font-semibold">$${product.price.toFixed(2)}</p>
  <del class="text-xs text-gray-400">$${product.price.toFixed(2)}</del>
</div>
<h3 class="mb-2 text-sm text-gray-400">${product.name}</h3>
</div>
<button class="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600" onclick="add_basket(${
      product.product_id
    }), basket_list() ">
<div class="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">
  Add
</div>
<div class="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">
  +
</div>
</button>
</div>
  `;

    // Yeni oluşturulan article'ı 'categories' sınıfına sahip div içine ekleyin
    const categoriesElement = document.querySelector(".categories");
    categoriesElement.appendChild(newArticle);
  }

  // Kategorileri ve her bir kategori için ilk dört ürünü kullanarak ürün kartlarını listeleyin
  categories.forEach((category) => {
    const categoryProducts = responseData
      .filter((product) => product.category_name === category)
      .slice(0, 4);

    // Her bir ürün için createProductCard fonksiyonunu çağırarak kart oluşturun

    categoryProducts.forEach((product) => {
      createProductCard(product, category);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  homepage_prodcuts();
});

async function add_basket(product_id) {
  try {
    const data = {
      userID: localStorage.getItem("userID"),
      product_id: product_id,
    };

    const response = await fetch("http://localhost:5000/products/add_basket/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Basket failed.");
    }
    const responseData = await response.json();
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function basket_del_product(product_id) {
  try {
    const data = {
      userID: localStorage.getItem("userID"),
      product_id: product_id,
    };

    const response = await fetch(
      "http://localhost:5000/products/basket_del_product/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Basket failed.");
    }
    const responseData = await response.json();
    const listItemToRemove = document.getElementById(`product-${product_id}`);
    if (listItemToRemove) {
      listItemToRemove.remove();
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// JavaScript ile modal işlemleri
const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementById("closeModalButton");
const modal = document.getElementById("myModal");

openModalButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
  modal.classList.add("hidden");
});

function openContactModal() {
  document.getElementById("myContactModal").classList.remove("hidden");
}

function closeContactModal() {
  document.getElementById("myContactModal").classList.add("hidden");
}
