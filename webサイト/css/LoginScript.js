// ── ログイン済みなら名前を表示 ──────────────────────────
window.addEventListener("DOMContentLoaded", function () {
  const user = localStorage.getItem("loginUser");
  if (user) {
    const msg = document.getElementById("login-msg");
    msg.textContent = user + " さんはすでにログイン済みです。";
    msg.classList.remove("hidden");
    msg.classList.add("login-ok");
  }
});

// ── ログインボタン処理 ──────────────────────────────────
document.getElementById("login-btn").addEventListener("click", function () {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("login-msg");

  if (!username || !password) {
    msg.textContent = "名前とパスワードを入力してください。";
    msg.classList.remove("hidden", "login-ok");
    msg.classList.add("login-err");
    return;
  }

  // ※本来はサーバー認証が必要。ここでは入力があればログイン成功とする
  localStorage.setItem("loginUser", username);

  msg.textContent = "ログインしました。ようこそ、" + username + " さん！";
  msg.classList.remove("hidden", "login-err");
  msg.classList.add("login-ok");

  // SHOP購入フローで飛ばされてきた場合は元のページへ戻る
  const redirect = sessionStorage.getItem("loginRedirect");
  if (redirect) {
    sessionStorage.removeItem("loginRedirect");
    setTimeout(function() { window.location.href = redirect; }, 800);
  } else {
    setTimeout(function() { window.location.href = "index.html"; }, 800);
  }
});