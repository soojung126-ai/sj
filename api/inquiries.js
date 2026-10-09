// 문의 폼 제출을 받아 Supabase 문의 표(inquiries)에 넣습니다.
// Supabase 주소와 키는 Vercel 환경 변수(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)에서 읽습니다.
// 이 두 값은 Supabase–Vercel 연동이 자동으로 넣어 줍니다. 서버 전용 키라 브라우저로 내보내지 않습니다.
// 표는 RLS 로 잠겨 있어 브라우저에서는 아무것도 못 하고, 이 서버 코드만 넣을 수 있습니다.

const SERVICES = ["레시피 제품화", "1회 자문", "월 자문", "잘 모르겠음"];

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "method not allowed" });
  }

  const body = req.body || {};

  // 사람 눈에 안 보이는 칸이 채워져 있으면 스팸으로 보고 조용히 성공 처리
  if (body.website) return res.status(200).json({ ok: true });

  const row = {
    name: clean(body.name, 100),
    contact: clean(body.contact, 200),
    service: clean(body.service, 20),
    description: clean(body.description, 2000),
  };

  if (!row.name || !row.contact || !row.description || !SERVICES.includes(row.service)) {
    return res.status(400).json({ error: "invalid input" });
  }

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return res.status(500).json({ error: "supabase not configured" });
  }

  const response = await fetch(`${url}/rest/v1/inquiries`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    console.error("supabase insert failed", response.status, await response.text());
    return res.status(502).json({ error: "save failed" });
  }

  return res.status(200).json({ ok: true });
}
