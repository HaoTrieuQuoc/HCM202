(() => {
  "use strict";

  const ADMIN_PASSWORD = "3108";
  const teams = ["Nhóm 1", "Nhóm 3", "Nhóm 4", "Nhóm 5", "Nhóm 6"];
  const challenges = [
    { type: "Tia chớp", points: 10 },
    { type: "Giải thích nhanh", points: 15 },
    { type: "Nối ý", points: 20 },
    { type: "Tình huống CQ3", points: 25 },
    { type: "Cướp quyền", points: 15 }
  ];
  const questions = [
    {
      topic: "Độc lập dân tộc",
      q: "Theo tư tưởng Hồ Chí Minh, vì sao độc lập dân tộc được xem là quyền thiêng liêng, bất khả xâm phạm?",
      a: "Vì mọi dân tộc đều có quyền sống, quyền tự do, quyền mưu cầu hạnh phúc và quyền tự quyết vận mệnh của mình."
    },
    {
      topic: "Độc lập thực chất",
      q: "Một nước đã có chính quyền riêng nhưng nhân dân còn đói nghèo, không có tự do. Theo bài học, nền độc lập đó thiếu điều gì?",
      a: "Thiếu nội dung thực chất: độc lập phải gắn với tự do, ấm no, hạnh phúc của nhân dân."
    },
    {
      topic: "Chủ quyền",
      q: "Hãy nêu các phương diện thể hiện độc lập hoàn toàn, triệt để.",
      a: "Tự quyết về chính quyền, đối nội, đối ngoại, kinh tế, quân sự và toàn vẹn lãnh thổ."
    },
    {
      topic: "Thống nhất",
      q: "Vì sao độc lập dân tộc phải gắn với thống nhất và toàn vẹn lãnh thổ?",
      a: "Vì độc lập không trọn vẹn nếu đất nước bị chia cắt hoặc chủ quyền lãnh thổ bị xâm phạm."
    },
    {
      topic: "Con đường cách mạng",
      q: "Hồ Chí Minh lựa chọn con đường nào cho cách mạng giải phóng dân tộc Việt Nam?",
      a: "Con đường cách mạng vô sản, gắn giải phóng dân tộc với giải phóng giai cấp và con người."
    },
    {
      topic: "Vai trò của Đảng",
      q: "Trong cách mạng giải phóng dân tộc, vì sao cần có Đảng Cộng sản lãnh đạo?",
      a: "Đảng là lực lượng tiên phong, có đường lối đúng đắn, tổ chức và dẫn dắt sức mạnh quần chúng."
    },
    {
      topic: "Đại đoàn kết",
      q: "Luận điểm đại đoàn kết toàn dân tộc nhấn mạnh điều gì?",
      a: "Cách mạng là sự nghiệp của toàn dân, cần tập hợp mọi lực lượng yêu nước, lấy công nông làm nền tảng."
    },
    {
      topic: "Chủ động sáng tạo",
      q: "Tại sao cách mạng thuộc địa phải chủ động, sáng tạo, tự lực cánh sinh?",
      a: "Vì không thể thụ động chờ cách mạng ở chính quốc; phải dựa vào sức mình và điều kiện cụ thể của dân tộc."
    },
    {
      topic: "Đấu tranh",
      q: "Khi nào cần kết hợp đấu tranh chính trị với đấu tranh vũ trang?",
      a: "Khi yêu cầu lịch sử đặt ra, phải dùng bạo lực cách mạng phù hợp từng giai đoạn để giành và giữ chính quyền."
    },
    {
      topic: "CNXH",
      q: "Theo tư tưởng Hồ Chí Minh, CNXH được nhận diện qua những đặc trưng đời sống nào?",
      a: "Nhân dân làm chủ, kinh tế phát triển, văn hóa đạo đức tiến bộ, con người được giải phóng, đời sống tốt hơn."
    },
    {
      topic: "Xây và chống",
      q: "Trong xây dựng CNXH, vì sao phải 'xây đi đôi với chống'?",
      a: "Vì cần phát huy động lực tích cực đồng thời ngăn suy thoái, tham nhũng, lãng phí và các lực cản phát triển."
    },
    {
      topic: "CQ3",
      q: "CNXH là mục đích hay công cụ? Hãy trả lời trong một câu cân bằng.",
      a: "CNXH là mục tiêu chiến lược sau độc lập, đồng thời là con đường và điều kiện bảo đảm độc lập bền vững."
    },
    {
      topic: "Liên hệ",
      q: "Hãy giải thích mối quan hệ hai chiều giữa độc lập dân tộc và CNXH.",
      a: "Độc lập là tiền đề để đi lên CNXH; CNXH làm cho độc lập có nội dung thực chất và được bảo đảm vững chắc."
    },
    {
      topic: "Tình huống",
      q: "Nếu một nhóm nói 'giành độc lập là xong nhiệm vụ cách mạng', em phản biện thế nào?",
      a: "Giành độc lập là nền tảng, nhưng phải tiếp tục xây dựng xã hội mới để nhân dân thật sự tự do, ấm no, hạnh phúc."
    },
    {
      topic: "Tổng hợp",
      q: "Nêu 3 từ khóa quan trọng nhất của Chương 3 và giải thích thật ngắn.",
      a: "Có thể nêu: độc lập, nhân dân, CNXH. Miễn giải thích đúng logic: nền tảng, chủ thể/thụ hưởng, hướng phát triển."
    }
  ];

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const state = loadState();
  let currentQuestion = null;
  let currentChallenge = challenges[0];
  let timerId = null;
  let remaining = Number($("#timeSelect")?.value || 45);

  function loadState() {
    const fresh = {
      admin: false,
      activeTeam: teams[0],
      round: 1,
      used: [],
      scores: Object.fromEntries(teams.map(name => [name, { score: 0, streak: 0 }]))
    };
    try {
      const saved = JSON.parse(localStorage.getItem("hcmGameState") || "null");
      if (!saved) return fresh;
      teams.forEach(name => saved.scores[name] ||= { score: 0, streak: 0 });
      return { ...fresh, ...saved, admin: false };
    } catch {
      return fresh;
    }
  }

  function saveState() {
    localStorage.setItem("hcmGameState", JSON.stringify({ ...state, admin: false }));
  }

  function showToast(text) {
    const toast = $("#toast");
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
  }

  function renderTeams() {
    const board = $("#scoreboard");
    const maxScore = Math.max(...teams.map(name => state.scores[name].score));
    board.innerHTML = teams.map(name => {
      const data = state.scores[name];
      const isLeader = data.score === maxScore && maxScore > 0;
      return `
        <article class="team-card ${state.activeTeam === name ? "active" : ""} ${isLeader ? "leader" : ""}" data-team="${name}">
          <div class="team-name"><span>${name}</span><span class="team-rank">${isLeader ? "Dẫn đầu" : "Sẵn sàng"}</span></div>
          <div class="team-score">${data.score}</div>
          <div class="team-streak">Chuỗi đúng: ${data.streak}</div>
        </article>
      `;
    }).join("");
    $("#currentTeamLabel").textContent = state.activeTeam;
    $("#roundNum").textContent = state.round;
    $("#roundHint").textContent = state.round <= 2 ? "Khởi động" : state.round <= 5 ? "Tăng tốc" : "Về đích";
  }

  function renderControls() {
    const select = $("#teamSelect");
    select.innerHTML = teams.map(name => `<option value="${name}">${name}</option>`).join("");
    select.value = state.activeTeam;
    select.addEventListener("change", () => {
      state.activeTeam = select.value;
      saveState();
      renderTeams();
    });
  }

  function pickQuestion() {
    if (state.used.length >= questions.length) state.used = [];
    const available = questions.map((_, index) => index).filter(index => !state.used.includes(index));
    const index = available[Math.floor(Math.random() * available.length)];
    state.used.push(index);
    currentQuestion = questions[index];
    $("#questionTopic").textContent = currentQuestion.topic;
    $("#questionText").textContent = currentQuestion.q;
    $("#answerText").textContent = currentQuestion.a;
    $("#answerBox").classList.remove("open");
    $("#questionCount").textContent = `${state.used.length}/${questions.length} câu đã dùng`;
    saveState();
  }

  function spinChallenge() {
    const wheel = $("#wheel");
    currentChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    wheel.style.setProperty("--spin", `${Math.floor(Math.random() * 360)}deg`);
    wheel.classList.add("spinning");
    setTimeout(() => wheel.classList.remove("spinning"), 950);
    $("#wheelType").textContent = currentChallenge.type;
    $("#wheelPoints").textContent = `+${currentChallenge.points}`;
  }

  function drawTurn() {
    spinChallenge();
    pickQuestion();
    state.round += 1;
    saveState();
    renderTeams();
    resetTimer();
    showToast(`${state.activeTeam} nhận thử thách ${currentChallenge.type}`);
  }

  function updateTimer() {
    const timer = $("#timer");
    timer.textContent = remaining;
    timer.classList.toggle("warning", remaining <= 10);
  }

  function resetTimer() {
    clearInterval(timerId);
    remaining = Number($("#timeSelect").value);
    updateTimer();
  }

  function startTimer() {
    resetTimer();
    timerId = setInterval(() => {
      remaining -= 1;
      updateTimer();
      if (remaining <= 0) {
        clearInterval(timerId);
        showToast("Hết giờ!");
      }
    }, 1000);
  }

  function addScore(team, delta, keepStreak = true) {
    const data = state.scores[team];
    data.score += delta;
    data.streak = keepStreak && delta > 0 ? data.streak + 1 : 0;
    saveState();
    renderTeams();
  }

  function nextTeam() {
    const idx = teams.indexOf(state.activeTeam);
    state.activeTeam = teams[(idx + 1) % teams.length];
    $("#teamSelect").value = state.activeTeam;
    renderTeams();
  }

  function requireAdmin(action) {
    if (state.admin) return action();
    openLogin();
    showToast("Cần đăng nhập quản trò");
  }

  function openLogin() {
    $("#loginModal").classList.add("is-open");
    $("#loginModal").setAttribute("aria-hidden", "false");
    setTimeout(() => $("#passwordInput").focus(), 50);
  }

  function closeLogin() {
    $("#loginModal").classList.remove("is-open");
    $("#loginModal").setAttribute("aria-hidden", "true");
    $("#passwordInput").value = "";
    $("#loginError").classList.remove("show");
  }

  function setAdmin(on) {
    state.admin = on;
    $("#controlPanel").classList.toggle("is-admin", on);
    $("#controlPanel").setAttribute("aria-hidden", String(!on));
    $("#adminOpenBtn").textContent = on ? "Đang quản trò" : "Quản trò";
  }

  function resetGame() {
    if (!confirm("Reset toàn bộ điểm và câu đã dùng?")) return;
    state.round = 1;
    state.used = [];
    state.activeTeam = teams[0];
    teams.forEach(name => state.scores[name] = { score: 0, streak: 0 });
    currentQuestion = null;
    $("#questionTopic").textContent = "Câu hỏi";
    $("#questionText").textContent = "Chọn nhóm và bấm “Quay thử thách” để bắt đầu ván mới.";
    $("#answerText").textContent = "Đáp án sẽ hiện ở đây khi quản trò bấm mở.";
    $("#answerBox").classList.remove("open");
    $("#questionCount").textContent = `0/${questions.length} câu đã dùng`;
    $("#wheelType").textContent = "Sẵn sàng";
    $("#wheelPoints").textContent = "+10";
    saveState();
    renderTeams();
    resetTimer();
  }

  $("#adminOpenBtn").addEventListener("click", () => state.admin ? setAdmin(false) : openLogin());
  $("#closeLoginBtn").addEventListener("click", closeLogin);
  $("#loginModal").addEventListener("click", e => { if (e.target.id === "loginModal") closeLogin(); });
  $("#loginForm").addEventListener("submit", e => {
    e.preventDefault();
    if ($("#passwordInput").value === ADMIN_PASSWORD) {
      setAdmin(true);
      closeLogin();
      showToast("Đã mở bảng quản trò");
    } else {
      $("#loginError").classList.add("show");
    }
  });
  $("#publicModeBtn").addEventListener("click", () => {
    document.body.classList.toggle("public");
    $("#publicModeBtn").textContent = document.body.classList.contains("public") ? "Thoát màn hình lớp" : "Màn hình lớp";
  });
  $("#logoutBtn").addEventListener("click", () => setAdmin(false));
  $("#drawBtn").addEventListener("click", () => requireAdmin(drawTurn));
  $("#shuffleBtn").addEventListener("click", () => requireAdmin(drawTurn));
  $("#revealBtn").addEventListener("click", () => requireAdmin(() => $("#answerBox").classList.add("open")));
  $("#startTimerBtn").addEventListener("click", () => requireAdmin(startTimer));
  $("#timeSelect").addEventListener("change", resetTimer);
  $("#correctBtn").addEventListener("click", () => requireAdmin(() => { addScore(state.activeTeam, currentChallenge.points); nextTeam(); }));
  $("#partialBtn").addEventListener("click", () => requireAdmin(() => { addScore(state.activeTeam, Math.ceil(currentChallenge.points / 2)); nextTeam(); }));
  $("#wrongBtn").addEventListener("click", () => requireAdmin(() => { addScore(state.activeTeam, -5, false); nextTeam(); }));
  $("#stealBtn").addEventListener("click", () => requireAdmin(() => addScore(state.activeTeam, 5)));
  $("#resetGameBtn").addEventListener("click", () => requireAdmin(resetGame));

  renderControls();
  renderTeams();
  $("#questionCount").textContent = `${state.used.length}/${questions.length} câu đã dùng`;
  updateTimer();
})();
