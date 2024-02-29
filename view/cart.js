async function product_table() {
  async function product_list() {
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
      {
        "category_id": 1,
        "category_name": "Kadın",
        "product_id": 9,
        "name": "Evolve Baskılı SiyahTişört\n",
        "price": 400,
        "description": "Mavi nin kadın koleksiyonundan Evolve Baskılı Siyah Tişört\nÜrün Kodu: 1611693-70087\n\nKumaş Bilgileri\n%100 Pamuk\nManken Ölçüleri\nJean: Bel: 26 / Boy: 32, Üst: S\n\nBoy: 176 cm / Bel: 61 cm / Göğüs: 80 cm / Kalça: 88 cm\n\n",
        "created_at": "2024-01-21T21:00:00.000Z",
        "stock": 3,
        "id": 9,
        "image_url": "https://sky-static.mavi.com/sys-master/maviTrImages/hd7/h94/10154056679454"
    }

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

document.querySelector(".users").addEventListener("click", async function () {
  try {
    await product_table();

    console.log("click");
  } catch (error) {
    console.error("Error in product_table:", error);
  }
});


product_table();
