(() => {
  "use strict";

  const ADMIN_PASSWORD = "3108";
  const FINISH = 30;
  const teams = [
    { id: "team-1", name: "Nhóm 1", short: "1" },
    { id: "team-3", name: "Nhóm 3", short: "3" },
    { id: "team-4", name: "Nhóm 4", short: "4" },
    { id: "team-5", name: "Nhóm 5", short: "5" },
    { id: "team-6", name: "Nhóm 6", short: "6" }
  ];
  const specialTiles = {
    4: { kind: "lucky", icon: "★", title: "Gió thuận!", text: "Tiến thêm 2 ô.", move: 2 },
    7: { kind: "trap", icon: "!", title: "Chông gai", text: "Lùi 2 ô vì mất cảnh giác.", move: -2 },
    10: { kind: "challenge", icon: "?", title: "Câu hỏi phụ", text: "Trả lời đúng câu phụ để tiến thêm 1 ô, sai đứng yên.", move: 0 },
    13: { kind: "lucky", icon: "★", title: "Đại đoàn kết", text: "Chọn một nhóm phía sau cùng tiến 1 ô.", move: 0 },
    16: { kind: "trap", icon: "!", title: "Mất lượt", text: "Lượt sau phải trả lời đúng mới được tung xúc xắc.", move: 0 },
    19: { kind: "lucky", icon: "★", title: "Tự lực cánh sinh", text: "Tiến thêm 3 ô.", move: 3 },
    22: { kind: "challenge", icon: "?", title: "CQ3 bất ngờ", text: "Quản trò hỏi thêm: CNXH là mục đích hay công cụ?", move: 0 },
    25: { kind: "trap", icon: "!", title: "Lạc hướng", text: "Lùi 3 ô.", move: -3 },
    28: { kind: "lucky", icon: "★", title: "Về đích thần tốc", text: "Tiến thêm 1 ô.", move: 1 }
  };
  const questions = [
    { topic: "Độc lập dân tộc", q: "Theo Hồ Chí Minh, độc lập dân tộc trước hết là gì?", choices: ["Một khẩu hiệu chính trị", "Quyền thiêng liêng, bất khả xâm phạm của dân tộc", "Một mục tiêu kinh tế ngắn hạn", "Một hình thức ngoại giao"], correct: 1 },
    { topic: "Độc lập thực chất", q: "Nền độc lập chỉ trọn nghĩa khi gắn với điều gì?", choices: ["Tự do, ấm no, hạnh phúc của nhân dân", "Quân đội thật đông", "Đóng cửa với thế giới", "Chỉ có chính quyền trung ương"], correct: 0 },
    { topic: "Chủ quyền", q: "Độc lập hoàn toàn, triệt để bao gồm quyền tự quyết về lĩnh vực nào?", choices: ["Chỉ văn hóa", "Chỉ giáo dục", "Chính quyền, đối nội, đối ngoại, kinh tế, quân sự", "Chỉ thương mại"], correct: 2 },
    { topic: "Thống nhất", q: "Độc lập dân tộc phải gắn với yếu tố nào sau đây?", choices: ["Chia cắt lãnh thổ", "Thống nhất và toàn vẹn lãnh thổ", "Phụ thuộc viện trợ", "Tách rời nhân dân"], correct: 1 },
    { topic: "Con đường cách mạng", q: "Hồ Chí Minh lựa chọn con đường nào cho cách mạng giải phóng dân tộc Việt Nam?", choices: ["Cách mạng vô sản", "Cải lương ôn hòa tuyệt đối", "Quân chủ lập hiến", "Chỉ dựa vào nước ngoài"], correct: 0 },
    { topic: "Vai trò của Đảng", q: "Lực lượng lãnh đạo cách mạng giải phóng dân tộc theo tư tưởng Hồ Chí Minh là ai?", choices: ["Một cá nhân bất kỳ", "Đảng Cộng sản", "Một tổ chức kinh tế", "Các thế lực bên ngoài"], correct: 1 },
    { topic: "Đại đoàn kết", q: "Cách mạng giải phóng dân tộc là sự nghiệp của ai?", choices: ["Một nhóm nhỏ", "Toàn dân tộc", "Riêng trí thức", "Riêng công chức"], correct: 1 },
    { topic: "Nền tảng lực lượng", q: "Trong khối đại đoàn kết, nền tảng quan trọng được nhấn mạnh là gì?", choices: ["Công nhân và nông dân", "Thương nhân nước ngoài", "Địa chủ", "Quân đội nước khác"], correct: 0 },
    { topic: "Chủ động sáng tạo", q: "Cách mạng thuộc địa cần có thái độ nào?", choices: ["Chờ cách mạng chính quốc", "Chủ động, sáng tạo, tự lực cánh sinh", "Phụ thuộc hoàn toàn", "Không cần tổ chức"], correct: 1 },
    { topic: "Đấu tranh", q: "Hồ Chí Minh nhấn mạnh cần kết hợp những hình thức đấu tranh nào?", choices: ["Chỉ kinh tế", "Chỉ văn hóa", "Chính trị và vũ trang khi cần thiết", "Chỉ ngoại giao"], correct: 2 },
    { topic: "CNXH", q: "Một đặc trưng cốt lõi của CNXH theo tư tưởng Hồ Chí Minh là gì?", choices: ["Nhân dân làm chủ", "Ít người quyết định tất cả", "Xóa bỏ văn hóa", "Không phát triển kinh tế"], correct: 0 },
    { topic: "Kinh tế", q: "Xây dựng CNXH cần phát triển yếu tố nào để đất nước thoát nghèo nàn, lạc hậu?", choices: ["Cơ sở vật chất - kỹ thuật", "Tập quán cũ", "Tâm lý ỷ lại", "Sự chia rẽ"], correct: 0 },
    { topic: "Văn hóa", q: "CNXH theo Hồ Chí Minh cần xây dựng đời sống văn hóa như thế nào?", choices: ["Lành mạnh, tiến bộ, bồi dưỡng đạo đức", "Lạc hậu", "Khép kín", "Xa rời nhân dân"], correct: 0 },
    { topic: "Xây và chống", q: "Trong xây dựng CNXH, 'chống' là chống điều gì?", choices: ["Học tập", "Lao động", "Suy thoái, tham nhũng, lãng phí", "Đoàn kết"], correct: 2 },
    { topic: "Quan hệ hai chiều", q: "Độc lập dân tộc có vai trò gì đối với CNXH?", choices: ["Là tiền đề để tiến lên CNXH", "Không liên quan", "Là vật cản", "Chỉ là khẩu hiệu"], correct: 0 },
    { topic: "Quan hệ hai chiều", q: "CNXH có vai trò gì đối với độc lập dân tộc?", choices: ["Làm độc lập suy yếu", "Bảo đảm độc lập có nội dung thực chất và bền vững", "Thay thế độc lập", "Không cần nhân dân"], correct: 1 },
    { topic: "CQ3", q: "Câu trả lời cân bằng nhất cho câu hỏi 'CNXH là mục đích hay công cụ?' là gì?", choices: ["Chỉ là công cụ", "Chỉ là khẩu hiệu", "Vừa là mục tiêu chiến lược, vừa là con đường và điều kiện bảo đảm độc lập", "Không liên quan đến độc lập"], correct: 2 },
    { topic: "Ứng dụng", q: "Nếu một nhóm nói 'giành độc lập là xong', phản biện đúng là gì?", choices: ["Đúng hoàn toàn", "Sai, vì phải xây dựng xã hội mới để nhân dân thật sự tự do, ấm no, hạnh phúc", "Không cần phát triển", "Chỉ cần tên nước độc lập"], correct: 1 },
    { topic: "Tổng hợp", q: "Bộ ba từ khóa nào phù hợp nhất với Chương 3?", choices: ["Độc lập - Nhân dân - CNXH", "Cô lập - Đóng cửa - Trì trệ", "Cá nhân - May rủi - Tự phát", "Phụ thuộc - Chia cắt - Lạc hậu"], correct: 0 },
    { topic: "Giá trị thực chất", q: "Theo tư tưởng Hồ Chí Minh, người thụ hưởng thành quả độc lập phải là ai?", choices: ["Nhân dân", "Một nhóm đặc quyền", "Chỉ người lãnh đạo", "Người ngoài nước"], correct: 0 }
  ];

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const letters = ["A", "B", "C", "D"];
  const state = loadState();
  let currentQuestion = null;
  let timerId = null;
  let remaining = Number($("#timeSelect")?.value || 45);
  let pendingEvent = null;

  function freshState() {
    return {
      admin: false,
      turn: 1,
      activeTeam: teams[0].id,
      used: [],
      positions: Object.fromEntries(teams.map(t => [t.id, 0])),
      skips: Object.fromEntries(teams.map(t => [t.id, 0])),
      winner: null
    };
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem("hcmRaceState") || "null");
      return { ...freshState(), ...saved, admin: false };
    } catch {
      return freshState();
    }
  }

  function saveState() {
    localStorage.setItem("hcmRaceState", JSON.stringify({ ...state, admin: false }));
  }

  function teamById(id) {
    return teams.find(t => t.id === id) || teams[0];
  }

  function showToast(text) {
    const toast = $("#toast");
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2000);
  }

  function renderTrack() {
    const track = $("#track");
    track.innerHTML = "";
    for (let i = 0; i <= FINISH; i++) {
      const special = specialTiles[i];
      const tile = document.createElement("div");
      tile.className = `tile ${i === 0 ? "start" : ""} ${i === FINISH ? "finish" : ""} ${special?.kind || ""}`;
      tile.innerHTML = `
        <div class="tile-num">${i === 0 ? "Start" : i === FINISH ? "Đích" : i}</div>
        <div class="tile-type">${special?.icon || (i === FINISH ? "🏁" : "")}</div>
        <div class="tokens"></div>
      `;
      const tokens = tile.querySelector(".tokens");
      teams.filter(t => state.positions[t.id] === i).forEach(t => {
        const token = document.createElement("span");
        token.className = `token ${t.id}`;
        token.textContent = t.short;
        token.title = t.name;
        tokens.appendChild(token);
      });
      track.appendChild(tile);
    }
  }

  function renderTeams() {
    const sorted = [...teams].sort((a, b) => state.positions[b.id] - state.positions[a.id]);
    $("#teamList").innerHTML = sorted.map(t => {
      const pos = state.positions[t.id];
      const pct = Math.min(100, Math.round(pos / FINISH * 100));
      return `
        <article class="team-card ${state.activeTeam === t.id ? "active" : ""} ${state.winner === t.id ? "winner" : ""}">
          <div class="team-line"><span><span class="token ${t.id}">${t.short}</span> ${t.name}</span><strong>${pos}/${FINISH}</strong></div>
          <div class="team-pos">${state.skips[t.id] ? "Đang bị mất lượt" : pct >= 100 ? "Đã về đích" : `Còn ${FINISH - pos} ô`}</div>
          <div class="progress"><span style="--p:${pct}%"></span></div>
        </article>
      `;
    }).join("");
    $("#turnNum").textContent = state.turn;
    $("#currentTeamLabel").textContent = teamById(state.activeTeam).name;
    $("#teamSelect").value = state.activeTeam;
  }

  function renderControls() {
    $("#teamSelect").innerHTML = teams.map(t => `<option value="${t.id}">${t.name}</option>`).join("");
    $("#teamSelect").value = state.activeTeam;
  }

  function renderAll() {
    renderTrack();
    renderTeams();
  }

  function pickQuestion() {
    if (state.used.length >= questions.length) state.used = [];
    const available = questions.map((_, i) => i).filter(i => !state.used.includes(i));
    const idx = available[Math.floor(Math.random() * available.length)];
    state.used.push(idx);
    currentQuestion = questions[idx];
    $("#questionTopic").textContent = currentQuestion.topic;
    $("#questionText").textContent = currentQuestion.q;
    $("#choices").innerHTML = currentQuestion.choices.map((choice, i) => `<button class="choice" data-letter="${letters[i]}" data-index="${i}">${choice}</button>`).join("");
    $("#answerLine").classList.remove("show");
    $("#answerLine").textContent = "Đáp án đúng sẽ hiện khi quản trò mở đáp án.";
    saveState();
    resetTimer();
  }

  function revealAnswer() {
    if (!currentQuestion) return showToast("Chưa có câu hỏi");
    $$(".choice").forEach(btn => btn.classList.toggle("correct-choice", Number(btn.dataset.index) === currentQuestion.correct));
    $("#answerLine").textContent = `Đáp án đúng: ${letters[currentQuestion.correct]}. ${currentQuestion.choices[currentQuestion.correct]}`;
    $("#answerLine").classList.add("show");
  }

  function rollDice() {
    const dice = $("#diceDisplay");
    dice.classList.add("rolling");
    let flashes = 0;
    const flashing = setInterval(() => {
      dice.textContent = Math.floor(Math.random() * 6) + 1;
      flashes += 1;
      if (flashes >= 10) {
        clearInterval(flashing);
        const value = Math.floor(Math.random() * 6) + 1;
        dice.textContent = value;
        dice.classList.remove("rolling");
        moveActive(value);
      }
    }, 70);
  }

  function moveTeam(id, delta) {
    state.positions[id] = Math.max(0, Math.min(FINISH, state.positions[id] + delta));
    if (state.positions[id] >= FINISH && !state.winner) {
      state.winner = id;
      showToast(`${teamById(id).name} đã về đích!`);
    }
    const special = specialTiles[state.positions[id]];
    pendingEvent = special ? { ...special, teamId: id } : null;
    renderEvent();
    saveState();
    renderAll();
  }

  function moveActive(delta) {
    moveTeam(state.activeTeam, delta);
    if (!state.winner) nextTeam(false);
  }

  function nextTeam(show = true) {
    let idx = teams.findIndex(t => t.id === state.activeTeam);
    for (let step = 1; step <= teams.length; step++) {
      const next = teams[(idx + step) % teams.length];
      if (state.skips[next.id] > 0) {
        state.skips[next.id] -= 1;
        continue;
      }
      state.activeTeam = next.id;
      break;
    }
    state.turn += 1;
    saveState();
    renderAll();
    if (show) showToast(`Đến lượt ${teamById(state.activeTeam).name}`);
  }

  function renderEvent() {
    const panel = $("#eventPanel");
    panel.className = "event-panel";
    if (!pendingEvent) {
      $("#eventTitle").textContent = "Chưa có biến cố";
      $("#eventText").textContent = "Khi một nhóm dừng ở ô may mắn hoặc chông gai, hiệu ứng sẽ xuất hiện ở đây để quản trò áp dụng.";
      return;
    }
    panel.classList.add("show", pendingEvent.kind);
    $("#eventTitle").textContent = `${teamById(pendingEvent.teamId).name}: ${pendingEvent.title}`;
    $("#eventText").textContent = pendingEvent.text;
  }

  function applyEvent() {
    if (!pendingEvent) return showToast("Không có ô đặc biệt cần áp dụng");
    if (pendingEvent.move) {
      const { teamId, move } = pendingEvent;
      pendingEvent = null;
      moveTeam(teamId, move);
      showToast(`Đã áp dụng: ${move > 0 ? "+" : ""}${move} ô`);
      return;
    }
    if (pendingEvent.title === "Mất lượt") {
      state.skips[pendingEvent.teamId] = 1;
      showToast(`${teamById(pendingEvent.teamId).name} mất lượt sau`);
    } else {
      showToast("Quản trò xử lý thử thách theo tình huống");
    }
    pendingEvent = null;
    renderEvent();
    saveState();
    renderAll();
  }

  function answerWrong() {
    showToast(`${teamById(state.activeTeam).name} đứng yên`);
    nextTeam(false);
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
    if (!confirm("Reset toàn bộ đường đua và câu hỏi đã dùng?")) return;
    Object.assign(state, freshState(), { admin: true });
    currentQuestion = null;
    pendingEvent = null;
    $("#diceDisplay").textContent = "?";
    $("#questionTopic").textContent = "Câu hỏi trắc nghiệm";
    $("#questionText").textContent = "Quản trò chọn nhóm và bấm “Bốc câu hỏi”.";
    $("#choices").innerHTML = "";
    $("#answerLine").textContent = "Đáp án đúng sẽ hiện khi quản trò mở đáp án.";
    $("#answerLine").classList.remove("show");
    renderEvent();
    renderAll();
    saveState();
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
  $("#teamSelect").addEventListener("change", () => { state.activeTeam = $("#teamSelect").value; saveState(); renderAll(); });
  $("#drawQuestionBtn").addEventListener("click", () => requireAdmin(pickQuestion));
  $("#startTimerBtn").addEventListener("click", () => requireAdmin(startTimer));
  $("#revealAnswerBtn").addEventListener("click", () => requireAdmin(revealAnswer));
  $("#correctBtn").addEventListener("click", () => requireAdmin(rollDice));
  $("#wrongBtn").addEventListener("click", () => requireAdmin(answerWrong));
  $("#applyEventBtn").addEventListener("click", () => requireAdmin(applyEvent));
  $("#manualForwardBtn").addEventListener("click", () => requireAdmin(() => moveTeam(state.activeTeam, 1)));
  $("#manualBackBtn").addEventListener("click", () => requireAdmin(() => moveTeam(state.activeTeam, -1)));
  $("#resetGameBtn").addEventListener("click", () => requireAdmin(resetGame));
  $("#nextTeamBtn").addEventListener("click", () => requireAdmin(nextTeam));
  $("#timeSelect").addEventListener("change", resetTimer);

  renderControls();
  renderEvent();
  renderAll();
  updateTimer();
})();
