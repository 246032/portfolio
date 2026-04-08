let num = [];
let itemprice = [];
let count = 0;

fetch("css/data.json") //商品表示
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      const templa = `
        <section>
          <img src=${item.image} />
          <p id="name">${item.name}</p>
          <p id="price">${item.price}円(税込)</p>
          <p id="kosuu">残り${item.avail}個</p>
          <div>
            <button class="minus" value=${item.id}>-</button>
            <p class="number" id=${item.id} >0</p>
            <button class="plus" value=${item.id}>+</button>
          </div>
        </section>`;
      document.getElementById("corner").insertAdjacentHTML("beforeend", templa);
      num.push(0);
      itemprice.push(item.price);
    });

    //カート確認状態
    document.getElementById("buy").addEventListener("click", function () {
      // ── ログインチェック ──────────────────────────────
      const loginUser = localStorage.getItem("loginUser");
      if (!loginUser) {
        // 未ログインの場合：現在のURLを記憶してログインページへ
        sessionStorage.setItem("loginRedirect", window.location.href);
        window.location.href = "login.html";
        return;
      }
      // ─────────────────────────────────────────────────

      if (!boot) {
        // カート情報をlocalStorageに保存してbuy.htmlへ遷移
        const cartItems = [];
        num.forEach((qty, index) => {
          if (qty > 0) {
            cartItems.push({
              name: data[index].name,
              price: data[index].price,
              qty: qty,
            });
          }
        });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("cartTotal", sumprice);
        localStorage.setItem("cartCount", count);
        window.location.href = "buy.html";
        return;
      }
      if (boot) {
        boot = false;
        cart.classList.add("confirm");
        back.classList.add("block");

        // 合計表示のpタグを非表示
        document.querySelector(".sumsuu").classList.add("hidden");
        document.querySelector(".suu").classList.add("hidden");
        document.querySelector(".total").classList.add("hidden");
        document.querySelector(".sum").classList.add("hidden");

        // テーブルを生成してDOMに挿入（brは使わない）
        let tableHTML = `<table border="1" class="display">
            <tr>
             <th>商品名</th>
             <th>商品価格</th>
             <th>購入個数</th>
            </tr>`;
        num.forEach((qty, index) => {
          if (qty > 0) {
            tableHTML += `<tr>
             <td>${data[index].name}</td>
             <td>${data[index].price}円</td>
             <td>${qty}</td>
            </tr>`;
          }
        });
        tableHTML += `</table>`;
        cart.insertAdjacentHTML("afterbegin", tableHTML);
      }
    });
  })
  .catch((error) => console.error("エラー:", error));

const itemname = document.querySelectorAll("#name");
const price = document.querySelectorAll("#price");
const kosuu = document.querySelectorAll("#kosuu");
const cart = document.querySelector(".cart");
const totle = document.querySelector(".suu");
const sum = document.querySelector(".sum");
const back = document.querySelector(".background");
let hidden = 0;
let sumprice = 0;
let boot = true;

document.getElementById("corner").addEventListener("click", function (e) {
  if (e.target.className === "plus") {
    if (num[e.target.value - 1] < 4) {
      num[e.target.value - 1]++;
      count++;
      sumprice += itemprice[e.target.value - 1];
      document.getElementById(e.target.value).textContent =
        num[e.target.value - 1];
      cartdisplay();
    }
  }
  if (e.target.className === "minus") {
    if (num[e.target.value - 1] > 0) {
      num[e.target.value - 1]--;
      count--;
      sumprice -= itemprice[e.target.value - 1];
      document.getElementById(e.target.value).textContent =
        num[e.target.value - 1];
      cartdisplay();
    }
  }
});

function cartdisplay() {
  if (count > 0) {
    cart.classList.remove("hidden");
    totle.textContent = count;
    sum.textContent = sumprice;
  } else {
    cart.classList.add("hidden");
  }
}

document.querySelector(".background").addEventListener("click", function () {
  backmenu();
});

function backmenu() {
  cart.classList.remove("confirm");
  back.classList.remove("block");
  boot = true;

  // テーブルを削除
  const table = document.querySelector(".display");
  if (table) table.remove();

  // 合計表示のpタグを再表示
  document.querySelector(".sumsuu").classList.remove("hidden");
  document.querySelector(".suu").classList.remove("hidden");
  document.querySelector(".total").classList.remove("hidden");
  document.querySelector(".sum").classList.remove("hidden");

  console.log("backmenu");
}