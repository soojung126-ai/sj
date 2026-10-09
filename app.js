(function () {
  var S = window.SITE;

  // 글자 채우기
  document.querySelectorAll("[data-text]").forEach(function (el) {
    el.textContent = S[el.dataset.text] || "";
  });

  // 사례 카드 — 링크가 있는 카드만 링크 버튼을 보여줍니다
  var caseList = document.getElementById("case-list");
  S.cases.forEach(function (c) {
    var card = document.createElement("article");
    card.className = "card";
    if (c.image) {
      var img = document.createElement("img");
      img.src = c.image;
      img.alt = c.title;
      img.loading = "lazy";
      img.className = "card-img";
      card.append(img);
    }
    var h = document.createElement("h3");
    h.textContent = c.title;
    var p = document.createElement("p");
    p.textContent = c.desc;
    card.append(h, p);
    if (c.link) {
      var a = document.createElement("a");
      a.href = c.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "card-link";
      a.textContent = "결과물 보기 →";
      card.append(a);
    }
    caseList.append(card);
  });

  // 할 수 있는 일
  var serviceList = document.getElementById("service-list");
  S.services.forEach(function (s, i) {
    var item = document.createElement("div");
    item.className = "service";
    var num = document.createElement("span");
    num.className = "service-num";
    num.textContent = String(i + 1).padStart(2, "0");
    var h = document.createElement("h3");
    h.textContent = s.name;
    var p = document.createElement("p");
    p.textContent = s.desc;
    item.append(num, h, p);
    serviceList.append(item);
  });

  // 연락 버튼 — 주소가 비어 있으면 숨깁니다
  var kakao = document.getElementById("btn-kakao");
  if (S.contact.kakao) kakao.href = S.contact.kakao;
  else kakao.hidden = true;
  var email = document.getElementById("btn-email");
  if (S.contact.email) email.href = "mailto:" + S.contact.email;
  else email.hidden = true;

  // 문의 폼
  var form = document.getElementById("inquiry-form");
  if (!S.inquiryForm) {
    form.hidden = true;
    return;
  }
  var select = form.elements.service;
  S.services.map(function (s) { return s.name; }).concat("잘 모르겠음").forEach(function (name) {
    var opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    select.append(opt);
  });

  var msg = document.getElementById("form-msg");
  var button = form.querySelector("button[type=submit]");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    msg.className = "form-msg";
    var data = {
      name: form.elements.name.value.trim(),
      contact: form.elements.contact.value.trim(),
      service: form.elements.service.value,
      description: form.elements.description.value.trim(),
      website: form.elements.website.value,
    };
    if (!data.name || !data.contact || !data.service || !data.description) {
      msg.textContent = "네 칸을 모두 채워주세요.";
      msg.classList.add("error");
      return;
    }
    button.disabled = true;
    button.textContent = "보내는 중…";
    fetch("/api/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        if (!res.ok) throw new Error("failed");
        form.reset();
        msg.textContent = "접수됐어요. 곧 연락드릴게요!";
        msg.classList.add("ok");
      })
      .catch(function () {
        msg.textContent = "전송이 안 됐어요. 카카오톡이나 이메일로 연락 주세요.";
        msg.classList.add("error");
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = "문의 보내기";
      });
  });
})();
