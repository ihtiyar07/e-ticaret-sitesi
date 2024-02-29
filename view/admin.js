async function user_table() {
  async function user_list() {
    try {
      const response = await fetch("http://localhost:5000/users/get_users/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Users failed.");
      }

      const responseData = await response.json();

      responseData.forEach((user) => {
        // Veri
        var userData = {
          id: user.id,
          name: user.name,
          surname: user.surname,
          role: user.role,
          joinDate: user.created_at,
        };

        // Örnek veriyi kullanarak satır ekleyin
        addTableRow(userData);
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }

    // Satır eklemek için fonksiyon
    function addTableRow(data) {
      var tableBody = document.getElementById("tableBody");
      var newRow = document.createElement("tr");

      // ID sütunu
      var idCell = document.createElement("td");
      idCell.className = "border-b border-gray-200 bg-white px-5 py-5 text-sm";
      idCell.innerHTML = '<p class="whitespace-no-wrap">' + data.id + "</p>";
      newRow.appendChild(idCell);

      // Name sütunu
      var nameCell = document.createElement("td");
      nameCell.className =
        "border-b border-gray-200 bg-white px-5 py-5 text-sm";
      nameCell.innerHTML =
        '<div class="flex items-center"><div class="ml-3"><p class="whitespace-no-wrap">' +
        data.name +
        "</p></div></div>";
      newRow.appendChild(nameCell);

      // SurName sütunu
      var nameCell = document.createElement("td");
      nameCell.className =
        "border-b border-gray-200 bg-white px-5 py-5 text-sm";
      nameCell.innerHTML =
        '<div class="flex items-center"><div class="ml-3"><p class="whitespace-no-wrap">' +
        data.surname +
        "</p></div></div>";
      newRow.appendChild(nameCell);

      // Role sütunu
      var roleCell = document.createElement("td");
      roleCell.className =
        "border-b border-gray-200 bg-white px-5 py-5 text-sm";
      roleCell.innerHTML =
        '<p class="whitespace-no-wrap">' + data.role + "</p>";
      newRow.appendChild(roleCell);

      // Join Date sütunu
      var joinDateCell = document.createElement("td");
      joinDateCell.className =
        "border-b border-gray-200 bg-white px-5 py-5 text-sm";
      joinDateCell.innerHTML =
        '<p class="whitespace-no-wrap">' + data.joinDate + "</p>";
      newRow.appendChild(joinDateCell);

      // Satırı tabloya ekle
      tableBody.appendChild(newRow);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    user_list();
  });

  document.addEventListener("DOMContentLoaded", function () {
    // InnerHTML eklemek istediğiniz div'in ID'sini seçin
    var targetDiv = document.getElementById("items-center");

    // InnerHTML içeriğinizi belirtin
    var tableHtml = `
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th class="px-5 py-3">id</th>
                  <th class="px-5 py-3">Name</th>
                  <th class="px-5 py-3">Surname</th>
                  <th class="px-5 py-3">Qualifaction</th>
                  <th class="px-5 py-3">Created at</th>
                </tr>
              </thead>
              <tbody class="text-gray-500" id="tableBody">
                
              </tbody>
            </table>
          </div>
        `;

    // InnerHTML'i ayarlayın
    targetDiv.innerHTML = tableHtml;
  });
}

document.querySelector(".users").addEventListener("click", async function () {
  try {
    await user_table();

    console.log("click");
  } catch (error) {
    console.error("Error in user_table:", error);
  }
});

async function product_table() {
  async function product_list() {
    try {
      const response = await fetch(
        "http://localhost:5000/products/get_product/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Users failed.");
      }

      const responseData = await response.json();

      responseData.forEach((user) => {
        // Veri
        var userData = {
          id: user.id,
          name: user.name,
          kategori: user.category_name,
          price: user.price,
          joinDate: user.created_at,
        };

        // Örnek veriyi kullanarak satır ekleyin
        addTableRow(userData);
      });
    } catch (error) {
      console.error("Error occurred:", error);
    }

    // Satır eklemek için fonksiyon
    function addTableRow(data) {
      var tableBody = document.getElementById("tableBody");
      var newRow = document.createElement("tr");

      // ID sütunu
      var idCell = document.createElement("td");
      idCell.className = "border-b border-gray-200 bg-white px-5 py-5 text-sm";
      idCell.innerHTML = '<p class="whitespace-no-wrap">' + data.id + "</p>";
      newRow.appendChild(idCell);

      // Name sütunu
      var nameCell = document.createElement("td");
      nameCell.className =
        "border-b border-gray-200 bg-white px-5 py-5 text-sm";
      nameCell.innerHTML =
        '<div class="flex items-center"><div class="ml-3"><p class="whitespace-no-wrap">' +
        data.name +
        "</p></div></div>";
      newRow.appendChild(nameCell);

      // Kategori sütunu
      var nameCell = document.createElement("td");
      nameCell.className =
        "border-b border-gray-200 bg-white px-5 py-5 text-sm";
      nameCell.innerHTML =
        '<div class="flex items-center"><div class="ml-3"><p class="whitespace-no-wrap">' +
        data.kategori +
        "</p></div></div>";
      newRow.appendChild(nameCell);

      // Fiyat sütunu
      var roleCell = document.createElement("td");
      roleCell.className =
        "border-b border-gray-200 bg-white px-5 py-5 text-sm";
      roleCell.innerHTML =
        '<p class="whitespace-no-wrap">' + data.price + "</p>";
      newRow.appendChild(roleCell);

      // Join Date sütunu
      var joinDateCell = document.createElement("td");
      joinDateCell.className =
        "border-b border-gray-200 bg-white px-5 py-5 text-sm";
      joinDateCell.innerHTML =
        '<p class="whitespace-no-wrap">' + data.joinDate + "</p>";
      newRow.appendChild(joinDateCell);

      // Satırı tabloya ekle
      tableBody.appendChild(newRow);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    product_list();
  });

  document.addEventListener("DOMContentLoaded", function () {
    // InnerHTML eklemek istediğiniz div'in ID'sini seçin
    var targetDiv = document.getElementById("items-center");

    // InnerHTML içeriğinizi belirtin
    var tableHtml = `
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                    <th class="px-5 py-3">id</th>
                    <th class="px-5 py-3">Name</th>
                    <th class="px-5 py-3">Surname</th>
                    <th class="px-5 py-3">Qualifaction</th>
                    <th class="px-5 py-3">Created at</th>
                  </tr>
                </thead>
                <tbody class="text-gray-500" id="tableBody">
                  
                </tbody>
              </table>
            </div>
          `;

    // InnerHTML'i ayarlayın
    targetDiv.innerHTML = tableHtml;
  });
}

document
  .querySelector(".products")
  .addEventListener("click", async function () {
    try {
      await product_table();

      console.log("click");
    } catch (error) {
      console.error("Error in product_table:", error);
    }
  });

product_table();