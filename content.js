// 사이트에 보이는 글자는 전부 여기 모아둡니다.
// 글자를 바꾸고 싶으면 이 파일만 고치면 됩니다. (나중에 어드민이 이 내용을 대신하게 됩니다)

window.SITE = {
  name: "현푸드랩",
  nameEn: "HYUN FOOD LAB",
  role: "식품 R&D 자문",
  headline: "기획에서 출시까지",
  intro: "소스, HMR, 냉동제품\n고령친화식, 저당·건강지향 제품",

  // 첫 화면 카드 세 장 (label: 위 작은 글씨, text: 큰 글씨)
  heroCards: [
    { label: "R&D 20년+", text: "기획에서 출시까지" },
    { label: "주력 제품", text: "소스 · HMR · 냉동제품" },
    { label: "건강 제품", text: "고령친화식 · 저당 · 건강지향" },
  ],

  contact: {
    // 카카오톡 오픈채팅 주소 (비워두면 버튼이 숨겨집니다)
    kakao: "https://open.kakao.com/o/sNfMfxRi",
    // 이메일 주소 (비워두면 버튼이 숨겨집니다)
    email: "soojung126@gmail.com",
  },

  // 자문 분야
  areas: [
    {
      name: "신규 라인 셋업 · 양산 안정화",
      desc: "실험실에서 만든 맛이 공장 설비에서도 그대로 나오도록, 배합과 공정을 양산에 맞게 잡아요.",
    },
    {
      name: "품질 문제 원인 규명 · 클레임 저감",
      desc: "반복되는 클레임의 원인을 찾아내고, 다시 생기지 않도록 공정과 배합을 바로잡아요.",
    },
    {
      name: "소스 · HMR · 저당/건강지향 상품화",
      desc: "국내 유통부터 해외 수출까지, 제품 기획에서 출시까지 함께해요.",
    },
  ],

  // 대표 성과 — 숫자 카드. 공개해도 되는지 다시 고민 중이라 비워둠. 비어 있으면 성과 섹션과 메뉴가 숨겨집니다.
  // 형식: { metric: "…", title: "…", tag: "…" }
  achievements: [],

  // 함께하는 방법. group: "company" = 식품회사, "owner" = 외식·창업 사장님
  serviceGroups: {
    company: "식품회사라면",
    owner: "외식·창업 사장님이라면",
  },
  services: [
    { group: "company", name: "1회 자문", desc: "공정, 품질, 배합처럼 지금 막힌 문제 하나를 짚어드려요." },
    { group: "company", name: "월 자문", desc: "신제품 개발과 양산 과정을 매달 함께 점검해요." },
    { group: "owner", name: "레시피 제품화", desc: "매장 레시피를 표준화해서 생산·판매할 수 있는 제품으로 만들어요." },
    { group: "owner", name: "교육", desc: "배합, 위생, 표시사항처럼 제품화에 꼭 필요한 기초를 알기 쉽게 알려드려요." },
  ],

  // 이런 제품을 만들어요 (대상 품목)
  categories: [
    { name: "소스", examples: "양념장 · 드레싱 · 볶음소스" },
    { name: "국물요리", examples: "탕 · 찌개 · 육수" },
    { name: "일품요리", examples: "덮밥 · 볶음 · 간편식" },
    { name: "반찬", examples: "장아찌 · 무침 · 조림" },
    { name: "냉동식품", examples: "만두 · 튀김 · 간편 조리" },
    { name: "저당 · 건강지향", examples: "저당 소스 · 고령친화식" },
  ],

  // 경력 — 오래된 순서대로. did: 그곳에서 한 일 (한 줄). period: 기간. 비어 있으면 안 보입니다.
  careerLead: "소스 · HMR · 냉동식품, 기획부터 양산까지 20년",
  career: [
    { org: "오뚜기", role: "연구소", did: "", period: "" },
    { org: "CJ제일제당", role: "연구소", did: "", period: "" },
    { org: "아워홈", role: "연구소", did: "", period: "" },
    { org: "하림", role: "연구소", did: "", period: "" },
    { org: "삼양식품", role: "연구소", did: "", period: "" },
    { org: "중소기업", role: "R&D 상무", did: "", period: "" },
    { org: "현푸드랩", role: "식품 R&D 자문 · 교육", did: "", period: "", now: true },
  ],

  // 현푸드랩이 일하는 방식 (가치)
  valuesTitle: "좋은 제품은 지구와 사람에게도 좋아야 하니까",
  values: [
    {
      name: "덜 버려지는 제품",
      desc: "클레임과 폐기를 줄이는 것도 환경을 지키는 일이에요. 처음부터 오래 팔리고 덜 버려지는 제품을 설계해요.",
    },
    {
      name: "자원을 아끼는 공정",
      desc: "원료와 에너지를 아낄 수 있는 배합과 공정을 함께 고민해요.",
    },
    {
      name: "배움을 나누는 교육",
      desc: "20년 동안 쌓은 노하우를 교육으로 나눠, 더 많은 사람이 좋은 제품을 만들 수 있게 해요.",
    },
  ],

  // 식품 노트 (뉴스카드). 매주 한 번, 2~3개씩. 비어 있으면 섹션이 숨겨집니다.
  // 예: { date: "2026-10-13", title: "…", summary: "…", comment: "R&D 관점 한마디", source: "언론사", url: "https://…" }
  notes: [],

  // 연락하기 섹션
  contactTitle: "이럴 때, 현푸드랩을 찾아주세요",
  contactLead: "하나라도 내 얘기 같다면, 지금 상황만 들려주세요.",
  concerns: [
    "신규 라인을 세팅해야 해요",
    "클레임이 줄지 않아요",
    "양산하면 맛이 달라져요",
    "해외 수출용 제품을 만들고 싶어요",
    "프랜차이즈를 내고 싶어요",
    "만드는 사람마다 맛이 달라요",
    "왜 이런 일이 생기는지 모르겠어요",
  ],

  // 문의 폼을 켜고 끕니다. Supabase 연결을 v2로 미루면 false 로 바꾸세요.
  inquiryForm: false,
};
