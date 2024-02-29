try {
    async function getir(){
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
      
        const responseData =  response.json();
      return responseData;
    }

    getir();

    // Ürünleri sayfaya ekle
    const productContainer = document.getElementById("chechout-list");
  
    responseData.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("flex", "flex-col", "rounded-lg", "bg-white", "sm:flex-row");
  
      const imageElement = document.createElement("img");
      imageElement.classList.add("m-2", "h-24", "w-28", "rounded-md", "border", "object-cover", "object-center");
      imageElement.src = product.image_url;
      imageElement.alt = product.name;
  
      const detailsDiv = document.createElement("div");
      detailsDiv.classList.add("flex", "w-full", "flex-col", "px-4", "py-4");
  
      const nameSpan = document.createElement("span");
      nameSpan.classList.add("font-semibold");
      nameSpan.textContent = product.name;
  
      const sizeSpan = document.createElement("span");
      sizeSpan.classList.add("float-right", "text-gray-400");
      sizeSpan.textContent = "Size: " + product.id;  // Burada size verisini ekleyebilirsiniz.
  
      const priceParagraph = document.createElement("p");
      priceParagraph.classList.add("mt-auto", "text-lg", "font-bold");
      priceParagraph.textContent = "Price: " + product.price;
  
      // Elementleri birbirine bağla
      detailsDiv.appendChild(nameSpan);
      detailsDiv.appendChild(sizeSpan);
      detailsDiv.appendChild(priceParagraph);
  
      productDiv.appendChild(imageElement);
      productDiv.appendChild(detailsDiv);
  
      // Sayfaya ekle
      productContainer.appendChild(productDiv);
    });
  } catch (error) {
    console.error('Error occurred', error);
  }
  // Ürün bilgilerini içeren bir dizi
const products = [
    {
      imageSrc: "https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "Nike Air Max Pro 8888 - Super Light",
      size: "42EU - 8.5US",
      price: "$138.99",
    },
    {
      imageSrc: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
      name: "Nike Air Max Pro 8888 - Super Light",
      size: "42EU - 8.5US",
      price: "$238.99",
    },
  ];
  
  // Ürünleri sayfaya ekle
  const productContainer = document.getElementById("chechout-list");
  
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("flex", "flex-col", "rounded-lg", "bg-white", "sm:flex-row");
  
    const imageElement = document.createElement("img");
    imageElement.classList.add("m-2", "h-24", "w-28", "rounded-md", "border", "object-cover", "object-center");
    imageElement.src = product.imageSrc;
    imageElement.alt = product.name;
  
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("flex", "w-full", "flex-col", "px-4", "py-4");
  
    const nameSpan = document.createElement("span");
    nameSpan.classList.add("font-semibold");
    nameSpan.textContent = product.name;
  
    const sizeSpan = document.createElement("span");
    sizeSpan.classList.add("float-right", "text-gray-400");
    sizeSpan.textContent = product.size;
  
    const priceParagraph = document.createElement("p");
    priceParagraph.classList.add("mt-auto", "text-lg", "font-bold");
    priceParagraph.textContent = product.price;
  
    // Elementleri birbirine bağla
    detailsDiv.appendChild(nameSpan);
    detailsDiv.appendChild(sizeSpan);
    detailsDiv.appendChild(priceParagraph);
  
    productDiv.appendChild(imageElement);
    productDiv.appendChild(detailsDiv);
  
    // Sayfaya ekle
    productContainer.appendChild(productDiv);
  });
  