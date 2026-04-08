window.addEventListener("DOMContentLoaded", function () {
  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const cartTotal = localStorage.getItem("cartTotal") || 0;
  const cartCount = localStorage.getItem("cartCount") || 0;

  const main = document.getElementById("shop");

  // カートが空の場合
  if (cartItems.length === 0) {
    main.insertAdjacentHTML(
      "beforeend",
      `<p class="empty-msg">カートに商品がありません。<br><a href="SHOP.html">SHOPへ戻る</a></p>`
    );
    // 合計表示を非表示
    document.querySelector(".sumsuu").classList.add("hidden");
    document.querySelector(".suu").classList.add("hidden");
    document.querySelector(".total").classList.add("hidden");
    document.querySelector(".sum").classList.add("hidden");
    document.getElementById("buy").classList.add("hidden");
    return;
  }

  // 合計数量・合計金額を反映
  document.querySelector(".suu").textContent = cartCount + "個";
  document.querySelector(".sum").textContent = "¥" + Number(cartTotal).toLocaleString() + "（税込）";

  // 注文内容テーブルを生成
  let tableHTML = `
    <table class="order-table">
      <thead>
        <tr>
          <th>商品名</th>
          <th>単価</th>
          <th>個数</th>
          <th>小計</th>
        </tr>
      </thead>
      <tbody>`;

  cartItems.forEach((item) => {
    const subtotal = item.price * item.qty;
    tableHTML += `
        <tr>
          <td>${item.name}</td>
          <td>¥${item.price.toLocaleString()}</td>
          <td>${item.qty}個</td>
          <td>¥${subtotal.toLocaleString()}</td>
        </tr>`;
  });

  tableHTML += `
      </tbody>
      <tfoot>
        <tr class="total-row">
          <td colspan="3">合計（税込）</td>
          <td>¥${Number(cartTotal).toLocaleString()}</td>
        </tr>
      </tfoot>
    </table>`;

  main.insertAdjacentHTML("beforeend", tableHTML);

  // 購入確定ボタン処理
  document.getElementById("buy").textContent = "購入を確定する";
  document.getElementById("buy").addEventListener("click", function () {

  const name = prompt("お名前を入力してください");
  const phone = prompt("電話番号を入力してください");

  const orderData = {
    name: name,
    phone: phone,
    items: cartItems,
    total: cartTotal
  };

  fetch("https://script.google.com/macros/s/AKfycbzxQznuL_RTJDz_nYz3Ln0VxmiJIAUUJ2i5UmnDA4JLdyaveUyTwww1_53823bT7WTM/exec", {
    method: "POST",
    body: JSON.stringify(orderData)
  })
  .then(() => {
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotal");
    localStorage.removeItem("cartCount");

    alert("ご注文を受け付けました！");
    window.location.href = "SHOP.html";
  })
  .catch(() => {
    alert("送信に失敗しました");
  });
});
});
