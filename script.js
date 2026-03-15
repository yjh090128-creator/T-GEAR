const notices = [
  { id: 1, title: "[중요] 봄 학기 프로젝트 팀 빌딩 안내", date: "2026-03-10", content: "봄 학기 프로젝트 팀 빌딩 공지입니다. 3월 20일까지 팀원을 확정해주세요." },
  { id: 2, title: "[공지] 월요일 스터디 장소 변경", date: "2026-03-07", content: "이번 주 월요일 스터디는 공학관 2층 대회의실로 이동합니다." },
  { id: 3, title: "[참가] 해커톤 신청 마감 임박", date: "2026-03-02", content: "교내 해커톤 팀 신청이 3일 후 마감됩니다. 참가 희망자는 빠르게 신청하세요." },
  { id: 4, title: "[안내] 신규 가입자 OT", date: "2026-02-25", content: "신규 가입자를 위한 OT가 2월 28일 오후 6시 동아리실에서 진행됩니다." }
];

const activityRecords = [
  { id: 1, title: "코딩 스프린트", date: "2026-03-12", content: "첫 스프린트에서 MVP 설계를 완료했습니다.", imageUrl: "" },
  { id: 2, title: "디자인 피드백 세션", date: "2026-03-09", content: "작업물 UI를 서로 피드백하며 수정 방향을 정했습니다.", imageUrl: "" }
];

function renderNotices() {
  const allNotice = document.getElementById("all-notice");
  const recentList = document.getElementById("recent-list");

  allNotice.innerHTML = notices
    .map((notice) => `
      <article class="notice-item">
        <h3>${notice.title}</h3>
        <p>${notice.date} · ${notice.content}</p>
      </article>
    `)
    .join("");

  const recent = notices.slice(0, 3);
  recentList.innerHTML = recent
    .map((notice) => `
      <article class="notice-item">
        <h3>${notice.title}</h3>
        <p>${notice.date} · ${notice.content}</p>
      </article>
    `)
    .join("");
}

function renderActivities() {
  const all = document.getElementById("activity-list");
  if (!all) return;

  all.innerHTML = activityRecords
    .slice()
    .reverse()
    .map((activity) => `
      <article class="notice-item">
        <h3>${activity.title}</h3>
        <p><strong>${activity.date}</strong></p>
        <p>${activity.content}</p>
        ${activity.imageUrl ? `<img class="notice-image" src="${activity.imageUrl}" alt="활동 이미지" />` : ""}
      </article>
    `)
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderNotices();
  renderActivities();

  const goNoticeBtn = document.getElementById("go-notice");
  goNoticeBtn?.addEventListener("click", () => {
    document.getElementById("notice")?.scrollIntoView({ behavior: "smooth" });
  });

  const activityForm = document.getElementById("activity-form");
  activityForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const titleInput = document.getElementById("activity-title");
    const contentInput = document.getElementById("activity-content");
    const imageInput = document.getElementById("activity-image");

    const title = titleInput?.value.trim();
    const content = contentInput?.value.trim();
    if (!title || !content) return;

    let imageUrl = "";
    const file = imageInput?.files?.[0];
    if (file) {
      imageUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    activityRecords.push({ id: Date.now(), title, date: new Date().toISOString().slice(0, 10), content, imageUrl });

    if (titleInput) titleInput.value = "";
    if (contentInput) contentInput.value = "";
    if (imageInput) imageInput.value = "";

    renderActivities();
    document.getElementById("activity")?.scrollIntoView({ behavior: "smooth" });
  });

  const navLinks = document.querySelectorAll(".main-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});
