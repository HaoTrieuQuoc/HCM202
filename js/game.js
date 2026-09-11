(() => {
  "use strict";

  const ADMIN_PASSWORD = "3108";
  const FINISH = 30;
  const STORAGE_KEY = "hcmRaceV3State";
  const letters = ["A", "B", "C", "D"];
  const teams = [
    { id: "team-1", name: "Nhóm 1", short: "1" },
    { id: "team-3", name: "Nhóm 3", short: "3" },
    { id: "team-4", name: "Nhóm 4", short: "4" },
    { id: "team-5", name: "Nhóm 5", short: "5" },
    { id: "team-6", name: "Nhóm 6", short: "6" }
  ];
  const specialTiles = {
    4: { kind: "lucky", icon: "+", title: "Gió thuận", text: "Tiến thêm 2 ô vì nắm chắc ý chính.", move: 2 },
    7: { kind: "trap", icon: "!", title: "Chông gai", text: "Lùi 2 ô vì lập luận còn thiếu dẫn chứng.", move: -2 },
    10: { kind: "challenge", icon: "?", title: "Câu hỏi phụ", text: "Quản trò hỏi thêm một ý ngắn. Đóng lá thăm để chuyển lượt.", move: 0 },
    13: { kind: "lucky", icon: "+", title: "Đại đoàn kết", text: "Cả lớp cổ vũ. Nhóm được tiến thêm 1 ô.", move: 1 },
    16: { kind: "trap", icon: "!", title: "Mất nhịp", text: "Lượt sau nhóm bị bỏ qua một lần.", skip: 1 },
    19: { kind: "lucky", icon: "+", title: "Tự lực cánh sinh", text: "Tiến thêm 3 ô nhờ xử lý câu hỏi tự tin.", move: 3 },
    22: { kind: "challenge", icon: "?", title: "CQ3 bất ngờ", text: "Giải thích nhanh: Chủ nghĩa xã hội là mục đích hay con đường bảo đảm độc lập?", move: 0 },
    25: { kind: "trap", icon: "!", title: "Lạc hướng", text: "Lùi 3 ô vì nhầm giữa độc lập hình thức và độc lập thực chất.", move: -3 },
    28: { kind: "lucky", icon: "+", title: "Bứt phá", text: "Tiến thêm 1 ô trước vạch đích.", move: 1 }
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
    { topic: "CNXH", q: "Một đặc trưng cốt lõi của chủ nghĩa xã hội theo tư tưởng Hồ Chí Minh là gì?", choices: ["Nhân dân làm chủ", "Ít người quyết định tất cả", "Xóa bỏ văn hóa", "Không phát triển kinh tế"], correct: 0 },
    { topic: "Kinh tế", q: "Xây dựng chủ nghĩa xã hội cần phát triển yếu tố nào để đất nước thoát nghèo nàn, lạc hậu?", choices: ["Cơ sở vật chất - kỹ thuật", "Tập quán cũ", "Tâm lý ỷ lại", "Sự chia rẽ"], correct: 0 },
    { topic: "Văn hóa", q: "Chủ nghĩa xã hội theo Hồ Chí Minh cần xây dựng đời sống văn hóa như thế nào?", choices: ["Lành mạnh, tiến bộ, bồi dưỡng đạo đức", "Lạc hậu", "Khép kín", "Xa rời nhân dân"], correct: 0 },
    { topic: "Xây và chống", q: "Trong xây dựng chủ nghĩa xã hội, 'chống' là chống điều gì?", choices: ["Học tập", "Lao động", "Suy thoái, tham nhũng, lãng phí", "Đoàn kết"], correct: 2 },
    { topic: "Quan hệ hai chiều", q: "Độc lập dân tộc có vai trò gì đối với chủ nghĩa xã hội?", choices: ["Là tiền đề để tiến lên chủ nghĩa xã hội", "Không liên quan", "Là vật cản", "Chỉ là khẩu hiệu"], correct: 0 },
    { topic: "Quan hệ hai chiều", q: "Chủ nghĩa xã hội có vai trò gì đối với độc lập dân tộc?", choices: ["Làm độc lập suy yếu", "Bảo đảm độc lập có nội dung thực chất và bền vững", "Thay thế độc lập", "Không cần nhân dân"], correct: 1 },
    { topic: "CQ3", q: "Câu trả lời cân bằng nhất cho câu hỏi 'CNXH là mục đích hay công cụ?' là gì?", choices: ["Chỉ là công cụ", "Chỉ là khẩu hiệu", "Vừa là mục tiêu chiến lược, vừa là con đường và điều kiện bảo đảm độc lập", "Không liên quan đến độc lập"], correct: 2 },
    { topic: "Ứng dụng", q: "Nếu một nhóm nói 'giành độc lập là xong', phản biện đúng là gì?", choices: ["Đúng hoàn toàn", "Sai, vì phải xây dựng xã hội mới để nhân dân thật sự tự do, ấm no, hạnh phúc", "Không cần phát triển", "Chỉ cần tên nước độc lập"], correct: 1 },
    { topic: "Tổng hợp", q: "Bộ ba từ khóa nào phù hợp nhất với Chương 3?", choices: ["Độc lập - Nhân dân - CNXH", "Cô lập - Đóng cửa - Trì trệ", "Cá nhân - May rủi - Tự phát", "Phụ thuộc - Chia cắt - Lạc hậu"], correct: 0 },
    { topic: "Giá trị thực chất", q: "Theo tư tưởng Hồ Chí Minh, người thụ hưởng thành quả độc lập phải là ai?", choices: ["Nhân dân", "Một nhóm đặc quyền", "Chỉ người lãnh đạo", "Người ngoài nước"], correct: 0 }
  ];

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const state = loadState();
  let currentQuestion = null;
  let answered = false;
  let busy = false;
  let pendingEvent = null;
  let timerId = null;
  let remaining = Number($("#timeSelect")?.value || 45);

  function freshState() {
    return {
      admin: false,
      turn: 1,
      activeTeam: teams[0].id,
      used: [],
      positions: Object.fromEntries(teams.map(team => [team.id, 0])),
      skips: Object.fromEntries(teams.map(team => [team.id, 0])),
      winner: null
    };
  }

  function loadState() {
    try {
      return { ...freshState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"), admin: false };
    } catch {
      return freshState();
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, admin: false }));
  }

  function teamById(id) {
    return teams.find(team => team.id === id) || teams[0];
  }

  function showToast(text) {
    const toast = $("#toast");
    toast.textContent = text;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function renderTrack(landingPosition = null) {
    const track = $("#track");
    track.innerHTML = "";
    for (let i = 0; i <= FINISH; i += 1) {
      const special = specialTiles[i];
      const tile = document.createElement("div");
      tile.className = `tile ${i === 0 ? "start" : ""} ${i === FINISH ? "finish" : ""} ${special?.kind || ""} ${landingPosition === i ? "active-landing" : ""}`;
      tile.innerHTML = `
        <div class="tile-num">${i === 0 ? "Start" : i === FINISH ? "Đích" : i}</div>
        <div class="tile-type">${special?.icon || (i === FINISH ? "🏁" : "")}</div>
        <div class="tokens"></div>
      `;
      const tokenWrap = tile.querySelector(".tokens");
      teams.filter(team => state.positions[team.id] === i).forEach(team => {
        const token = document.createElement("span");
        token.className = `token ${team.id}`;
        token.textContent = team.short;
        token.title = team.name;
        tokenWrap.appendChild(token);
      });
      track.appendChild(tile);
    }
  }

  function renderTeams() {
    const sorted = [...teams].sort((a, b) => state.positions[b.id] - state.positions[a.id]);
    $("#teamList").innerHTML = sorted.map(team => {
      const pos = state.positions[team.id];
      const pct = Math.min(100, Math.round(pos / FINISH * 100));
      const status = state.skips[team.id] ? "Đang bị mất lượt" : pct >= 100 ? "Đã về đích" : `Còn ${FINISH - pos} ô`;
      return `
        <article class="team-card ${state.activeTeam === team.id ? "active" : ""} ${state.winner === team.id ? "winner" : ""}">
          <div class="team-line"><span><span class="token ${team.id}">${team.short}</span>${team.name}</span><strong>${pos}/${FINISH}</strong></div>
          <div class="team-pos">${status}</div>
          <div class="progress"><span style="--p:${pct}%"></span></div>
        </article>
      `;
    }).join("");
    $("#turnNum").textContent = state.turn;
    $("#currentTeamLabel").textContent = teamById(state.activeTeam).name;
    $("#teamSelect").value = state.activeTeam;
  }

  function renderControls() {
    $("#teamSelect").innerHTML = teams.map(team => `<option value="${team.id}">${team.name}</option>`).join("");
    $("#teamSelect").value = state.activeTeam;
  }

  function renderAll(landingPosition = null) {
    renderTrack(landingPosition);
    renderTeams();
  }

  function resetQuestionView() {
    answered = false;
    $(".quiz-dock").classList.remove("is-open");
    $("#choices").innerHTML = "";
    $("#answerLine").className = "answer-line";
    $("#answerLine").textContent = "Chọn đáp án để biết đúng/sai.";
  }

  function closeQuestionOverlay() {
    $(".quiz-dock").classList.remove("is-open");
  }

  function pickQuestion() {
    if (busy) return showToast("Đang xử lý lượt hiện tại");
    if (pendingEvent) return showToast("Hãy đóng lá thăm trước khi bốc câu hỏi mới");
    if (state.used.length >= questions.length) state.used = [];
    const available = questions.map((_, index) => index).filter(index => !state.used.includes(index));
    const index = available[Math.floor(Math.random() * available.length)];
    currentQuestion = questions[index];
    state.used.push(index);
    resetQuestionView();
    $("#questionTopic").textContent = currentQuestion.topic;
    $("#questionText").textContent = currentQuestion.q;
    $("#choices").innerHTML = currentQuestion.choices.map((choice, i) => `<button class="choice" data-letter="${letters[i]}" data-index="${i}">${choice}</button>`).join("");
    $("#diceCaption").textContent = `${teamById(state.activeTeam).name} chọn đáp án`;
    $(".quiz-dock").classList.add("is-open");
    saveState();
    resetTimer();
  }

  function setChoicesLocked() {
    $$(".choice").forEach(button => button.classList.add("is-disabled"));
  }

  async function chooseAnswer(button) {
    if (!currentQuestion || answered || busy) return;
    answered = true;
    setChoicesLocked();
    const index = Number(button.dataset.index);
    const correctButton = $(`.choice[data-index="${currentQuestion.correct}"]`);
    if (index !== currentQuestion.correct) {
      button.classList.add("wrong-choice");
      correctButton?.classList.add("correct-choice");
      $("#answerLine").className = "answer-line wrong";
      $("#answerLine").textContent = `Sai rồi. Đáp án đúng là ${letters[currentQuestion.correct]}: ${currentQuestion.choices[currentQuestion.correct]}.`;
      await wait(700);
      closeQuestionOverlay();
      await showResultModal("wrong", "Bạn đã trả lời sai, chúng ta không được đi tiếp.", false, 1900);
      hideResultModal();
      nextTeam(false);
      return;
    }
    button.classList.add("correct-choice");
    $("#answerLine").className = "answer-line correct";
    $("#answerLine").textContent = "Bạn đã trả lời đúng! Bắt đầu tung xúc xắc...";
    await wait(800);
    closeQuestionOverlay();
    await rollDice();
  }

  async function showResultModal(type, text, withDice, duration = 900) {
    const modal = $("#resultModal");
    modal.className = `result-modal is-open ${type} ${withDice ? "with-dice" : ""}`;
    modal.setAttribute("aria-hidden", "false");
    $("#resultText").textContent = text;
    $("#resultDice").textContent = "?";
    $("#resultDice").classList.remove("rolling");
    await wait(duration);
  }

  function hideResultModal() {
    $("#resultModal").className = "result-modal";
    $("#resultModal").setAttribute("aria-hidden", "true");
    $("#resultDice").classList.remove("rolling");
  }

  async function rollDice() {
    if (busy || state.winner) return;
    busy = true;
    const dice = $("#diceDisplay");
    const resultDice = $("#resultDice");
    await showResultModal("correct", "Bạn đã trả lời đúng! Bắt đầu tung xúc xắc...", true, 850);
    dice.classList.add("rolling");
    resultDice.classList.add("rolling");
    $("#diceCaption").textContent = "Đang tung...";
    for (let i = 0; i < 14; i += 1) {
      const flash = Math.floor(Math.random() * 6) + 1;
      dice.textContent = flash;
      resultDice.textContent = flash;
      await wait(58);
    }
    const value = Math.floor(Math.random() * 6) + 1;
    dice.textContent = value;
    resultDice.textContent = value;
    dice.classList.remove("rolling");
    resultDice.classList.remove("rolling");
    $("#diceCaption").textContent = `Đi ${value} ô`;
    await wait(650);
    hideResultModal();
    await animateMoveTeam(state.activeTeam, value, true);
    busy = false;
    afterMove(state.activeTeam);
  }

  async function animateMoveTeam(teamId, delta, canDrawEvent) {
    const direction = delta >= 0 ? 1 : -1;
    for (let step = 0; step < Math.abs(delta); step += 1) {
      state.positions[teamId] = Math.max(0, Math.min(FINISH, state.positions[teamId] + direction));
      renderAll(state.positions[teamId]);
      saveState();
      await wait(250);
      if (state.positions[teamId] === FINISH) break;
    }
    if (state.positions[teamId] >= FINISH && !state.winner) {
      state.winner = teamId;
      openFinish(teamId);
    }
    if (canDrawEvent && !state.winner) {
      const special = specialTiles[state.positions[teamId]];
      pendingEvent = special ? { ...special, teamId } : null;
      if (pendingEvent) openChanceModal(pendingEvent);
    }
    renderAll(state.positions[teamId]);
  }

  function afterMove(teamId) {
    if (state.winner) return;
    if (pendingEvent) {
      showToast(`${teamById(teamId).name} bốc được một lá thăm`);
      return;
    }
    nextTeam(false);
  }

  function openChanceModal(event) {
    const labels = { lucky: "May mắn", trap: "Chông gai", challenge: "Thử thách" };
    const modal = $("#chanceModal");
    modal.className = `chance-modal is-open ${event.kind}`;
    modal.setAttribute("aria-hidden", "false");
    $("#eventKind").textContent = `${teamById(event.teamId).name} - ${labels[event.kind] || "Ô đặc biệt"}`;
    $("#eventTitle").textContent = event.title;
    $("#eventText").textContent = event.text;
  }

  async function closeChanceAndApply() {
    if (busy || !pendingEvent) return;
    const event = pendingEvent;
    pendingEvent = null;
    $("#chanceModal").className = "chance-modal";
    $("#chanceModal").setAttribute("aria-hidden", "true");
    busy = true;
    if (event.move) {
      $("#diceCaption").textContent = `${event.move > 0 ? "+" : ""}${event.move} ô từ lá thăm`;
      await animateMoveTeam(event.teamId, event.move, false);
    } else if (event.skip) {
      state.skips[event.teamId] = event.skip;
      saveState();
      renderAll();
    }
    busy = false;
    if (!state.winner) nextTeam(false);
  }

  function nextTeam(show = true) {
    currentQuestion = null;
    resetQuestionView();
    clearInterval(timerId);
    timerId = null;
    let index = teams.findIndex(team => team.id === state.activeTeam);
    const skipped = [];
    for (let step = 1; step <= teams.length; step += 1) {
      const candidate = teams[(index + step) % teams.length];
      if (state.skips[candidate.id] > 0) {
        state.skips[candidate.id] -= 1;
        skipped.push(candidate.name);
        continue;
      }
      state.activeTeam = candidate.id;
      break;
    }
    state.turn += 1;
    saveState();
    renderAll();
    $("#questionTopic").textContent = "Câu hỏi trắc nghiệm";
    $("#questionText").textContent = `Đến lượt ${teamById(state.activeTeam).name}. Quản trò bấm “Bốc câu hỏi”.`;
    $("#diceCaption").textContent = "Đúng để tung xúc xắc";
    if (skipped.length) showToast(`${skipped.join(", ")} bị mất lượt`);
    else if (show) showToast(`Đến lượt ${teamById(state.activeTeam).name}`);
  }

  function updateTimer() {
    const timer = $("#timer");
    timer.textContent = remaining;
    timer.classList.toggle("warning", remaining <= 10);
  }

  function resetTimer() {
    clearInterval(timerId);
    timerId = null;
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
        timerId = null;
        showToast("Hết giờ!");
      }
    }, 1000);
  }

  function openFinish(teamId) {
    $("#winnerText").textContent = `${teamById(teamId).name} đã về đích!`;
    $("#finishModal").classList.add("is-open");
    $("#finishModal").setAttribute("aria-hidden", "false");
    saveState();
    renderAll();
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

  function requireAdmin(action) {
    if (state.admin) return action();
    openLogin();
    showToast("Cần đăng nhập quản trò");
    return undefined;
  }

  function resetGame() {
    if (!confirm("Reset toàn bộ đường đua và câu hỏi đã dùng?")) return;
    Object.assign(state, freshState(), { admin: true });
    currentQuestion = null;
    answered = false;
    pendingEvent = null;
    busy = false;
    $("#chanceModal").className = "chance-modal";
    $("#chanceModal").setAttribute("aria-hidden", "true");
    hideResultModal();
    $("#diceDisplay").textContent = "?";
    $("#diceCaption").textContent = "Đúng để tung xúc xắc";
    $("#questionTopic").textContent = "Câu hỏi trắc nghiệm";
    $("#questionText").textContent = "Quản trò đăng nhập, chọn nhóm và bấm “Bốc câu hỏi”.";
    resetQuestionView();
    resetTimer();
    saveState();
    renderAll();
  }

  $("#adminOpenBtn").addEventListener("click", () => state.admin ? setAdmin(false) : openLogin());
  $("#closeLoginBtn").addEventListener("click", closeLogin);
  $("#loginModal").addEventListener("click", event => {
    if (event.target.id === "loginModal") closeLogin();
  });
  $("#loginForm").addEventListener("submit", event => {
    event.preventDefault();
    if ($("#passwordInput").value === ADMIN_PASSWORD) {
      setAdmin(true);
      closeLogin();
      showToast("Đã mở bảng quản trò");
    } else {
      $("#loginError").classList.add("show");
    }
  });
  $("#logoutBtn").addEventListener("click", () => setAdmin(false));
  $("#teamSelect").addEventListener("change", () => {
    state.activeTeam = $("#teamSelect").value;
    currentQuestion = null;
    resetQuestionView();
    saveState();
    renderAll();
  });
  $("#drawQuestionBtn").addEventListener("click", () => requireAdmin(pickQuestion));
  $("#startTimerBtn").addEventListener("click", () => requireAdmin(startTimer));
  $("#nextTeamBtn").addEventListener("click", () => requireAdmin(() => nextTeam()));
  $("#resetGameBtn").addEventListener("click", () => requireAdmin(resetGame));
  $("#timeSelect").addEventListener("change", resetTimer);
  $("#choices").addEventListener("click", event => {
    const button = event.target.closest(".choice");
    if (button) chooseAnswer(button);
  });
  $("#closeChanceBtn").addEventListener("click", closeChanceAndApply);
  $("#closeFinishBtn").addEventListener("click", () => {
    $("#finishModal").classList.remove("is-open");
    $("#finishModal").setAttribute("aria-hidden", "true");
  });

  renderControls();
  renderAll();
  updateTimer();
})();
