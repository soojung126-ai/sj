(function () {
  var S = window.SITE;

  // 태그 하나를 만들고 글자를 넣는 도우미
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // 목록이 있고, 그 목록을 넣을 자리가 이 페이지에 있을 때만 그립니다
  function render(id, items, draw) {
    var box = document.getElementById(id);
    if (!box || !items) return null;
    items.forEach(function (item, i) {
      box.append(draw(item, i));
    });
    return box;
  }

  // 글자 채우기
  document.querySelectorAll("[data-text]").forEach(function (node) {
    node.textContent = S[node.dataset.text] || "";
  });

  // 첫 화면 카드
  render("hero-cards", S.heroCards, function (c) {
    var li = el("li", "hero-card");
    li.append(el("span", "hero-card-label", c.label), el("strong", "", c.text));
    return li;
  });

  // 자문 분야
  render("area-list", S.areas, function (a, i) {
    var item = el("article", "area");
    item.append(el("span", "area-num", String(i + 1).padStart(2, "0")), el("h3", "", a.name), el("p", "", a.desc));
    return item;
  });

  // 대표 성과 — 숫자 카드. 비어 있으면 섹션과 메뉴를 숨깁니다
  if (!S.achievements || !S.achievements.length) {
    ["results", "nav-results"].forEach(function (id) {
      var node = document.getElementById(id);
      if (node) node.hidden = true;
    });
  }
  render("result-list", S.achievements, function (r) {
    var card = el("article", "result");
    card.append(el("span", "result-tag", r.tag), el("strong", "result-metric", r.metric), el("p", "", r.title));
    return card;
  });

  // 함께하는 방법 — 식품회사 / 외식·창업 사장님으로 나눠서
  var groupBox = document.getElementById("service-groups");
  if (groupBox && S.serviceGroups) {
    Object.keys(S.serviceGroups).forEach(function (key) {
      var group = el("div", "service-group");
      group.append(el("h3", "service-group-title", S.serviceGroups[key]));
      S.services.filter(function (s) { return s.group === key; }).forEach(function (s) {
        var item = el("div", "service");
        item.append(el("h4", "", s.name), el("p", "", s.desc));
        group.append(item);
      });
      groupBox.append(group);
    });
  }

  // 대상 품목
  render("category-list", S.categories, function (c) {
    var item = el("div", "category");
    item.append(el("h3", "", c.name), el("p", "", c.examples));
    return item;
  });

  // 경력 — 그곳에서 한 일(did)을 중심으로. 비어 있는 칸은 안 보입니다
  render("career-list", S.career, function (c) {
    var li = el("li", "timeline-item" + (c.now ? " is-now" : ""));
    if (c.now) li.append(el("span", "timeline-kind", "지금"));
    li.append(el("strong", "", c.org), el("span", "timeline-role", c.role));
    if (c.did) li.append(el("span", "timeline-did", c.did));
    if (c.period) li.append(el("span", "timeline-period", c.period));
    return li;
  });

  // 일하는 방식 (가치)
  render("value-list", S.values, function (v) {
    var item = el("div", "value");
    item.append(el("h3", "", v.name), el("p", "", v.desc));
    return item;
  });

  // 식품 노트 (뉴스카드) — 카드가 있을 때만 섹션과 메뉴를 보여줍니다
  var notes = S.notes || [];
  var navNotes = document.getElementById("nav-notes");
  if (notes.length) {
    var noteSection = document.getElementById("notes");
    if (noteSection) noteSection.hidden = false;
    render("note-list", notes, function (n) {
      var card = el("article", "note");
      card.append(el("time", "note-date", n.date), el("h3", "", n.title), el("p", "note-summary", n.summary));
      if (n.comment) {
        var comment = el("p", "note-comment");
        comment.append(el("strong", "", "R&D 한마디 "), document.createTextNode(n.comment));
        card.append(comment);
      }
      if (n.url) {
        var a = el("a", "note-source", (n.source || "원문") + " 보기 →");
        a.href = n.url;
        a.target = "_blank";
        a.rel = "noopener";
        card.append(a);
      }
      return card;
    });
  } else if (navNotes) {
    navNotes.hidden = true;
  }

  // 예전 디자인(classic.html, green.html)에서 쓰던 목록
  render("case-list", S.cases, function (c) {
    var card = el("article", "card");
    card.append(el("h3", "", c.title), el("p", "", c.desc));
    return card;
  });
  render("service-list", S.services, function (s, i) {
    var item = el("div", "service");
    item.append(el("span", "service-num", String(i + 1).padStart(2, "0")), el("h3", "", s.name), el("p", "", s.desc));
    return item;
  });

  // 이럴 때 연락하세요 — 고민 말풍선
  render("concern-list", S.concerns, function (text) {
    return el("li", "", text);
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
