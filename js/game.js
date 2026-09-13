(() => {
  "use strict";

  const ADMIN_PASSWORD_DEFAULT = "3108";
  const ADMIN_KEY_STORAGE = "hcm_admin_pwd";
  const ADMIN_AUTH_SESSION = "hcm_admin_unlocked";
  const FINISH = 21;
  const STORAGE_KEY = "hcmRaceV6State";
  const QUESTION_SECONDS = 30;
  const letters = ["A", "B", "C", "D"];
  const teams = [
    { id: "team-1", name: "Nhóm 1", short: "1" },
    { id: "team-3", name: "Nhóm 3", short: "3" },
    { id: "team-4", name: "Nhóm 4", short: "4" },
    { id: "team-5", name: "Nhóm 5", short: "5" },
    { id: "team-6", name: "Nhóm 6", short: "6" }
  ];
  const specialTiles = {
    3: { kind: "lucky", icon: "+", title: "Ô dấu +", text: "Đóng lá thăm để tung xúc xắc. Ra số nào thì đi thêm bấy nhiêu bước.", diceEffect: "forward" },
    5: { kind: "trap", icon: "-", title: "Ô dấu -", text: "Đóng lá thăm để tung xúc xắc. Ra số nào thì lùi bấy nhiêu bước.", diceEffect: "back" },
    7: { kind: "challenge", icon: "?", title: "Bốc thăm bí mật", text: "Chọn 1 trong 4 lá bài để biết điều gì xảy ra.", move: 0 },
    10: { kind: "lucky", icon: "+", title: "Ô dấu +", text: "Đóng lá thăm để tung xúc xắc. Ra số nào thì đi thêm bấy nhiêu bước.", diceEffect: "forward" },
    12: { kind: "trap", icon: "-", title: "Ô dấu -", text: "Đóng lá thăm để tung xúc xắc. Ra số nào thì lùi bấy nhiêu bước.", diceEffect: "back" },
    14: { kind: "challenge", icon: "?", title: "Bốc thăm bí mật", text: "Chọn 1 trong 4 lá bài để biết điều gì xảy ra.", move: 0 },
    17: { kind: "lucky", icon: "+", title: "Ô dấu +", text: "Đóng lá thăm để tung xúc xắc. Ra số nào thì đi thêm bấy nhiêu bước.", diceEffect: "forward" },
    19: { kind: "trap", icon: "-", title: "Ô dấu -", text: "Đóng lá thăm để tung xúc xắc. Ra số nào thì lùi bấy nhiêu bước.", diceEffect: "back" }
  };
  const mysteryCards = [
    { action: "move", move: 4, title: "May mắn lớn", text: "Được đi thêm 4 bước.", tone: "forward" },
    { action: "move", move: -4, title: "Chông gai lớn", text: "Đi lùi 4 bước.", tone: "back" },
    { action: "allOpponentsBack", move: -2, title: "Đẩy lùi đối thủ", text: "Toàn bộ đối thủ bị lùi 2 bước.", tone: "back" },
    { action: "nearestMinus", title: "Tiến tới ô âm", text: "Đi tới ô dấu - phía trước và kích hoạt ô đó.", tone: "back" }
  ];
  const questions = [
    {
      topic: "Quyền dân tộc",
      q: "Theo tư tưởng Hồ Chí Minh, độc lập, tự do là:",
      choices: [
        "Quyền riêng của các dân tộc lớn",
        "Quyền thiêng liêng, bất khả xâm phạm của tất cả các dân tộc",
        "Quyền do các nước phát triển trao cho các nước thuộc địa",
        "Quyền chỉ có được khi xây dựng thành công CNXH"
      ],
      correct: 1
    },
    {
      topic: "Quyền dân tộc",
      q: "Hồ Chí Minh tiếp cận quyền dân tộc từ những quyền nào được nêu trong các bản tuyên ngôn của Mỹ và Pháp?",
      choices: [
        "Quyền sở hữu và quyền kinh doanh",
        "Quyền tự do thương mại và tự do tôn giáo",
        "Quyền tự do, bình đẳng và quyền con người",
        "Quyền bầu cử và quyền ứng cử"
      ],
      correct: 2
    },
    {
      topic: "Tuyên ngôn Độc lập 1945",
      q: "Trong Tuyên ngôn Độc lập năm 1945, Hồ Chí Minh khẳng định điều gì về nền độc lập của Việt Nam?",
      choices: [
        "Việt Nam trở thành một nước xã hội chủ nghĩa",
        "Việt Nam có quyền hưởng tự do và độc lập và sự thật đã thành một nước tự do, độc lập",
        "Việt Nam trở thành quốc gia phát triển",
        "Việt Nam gia nhập hệ thống xã hội chủ nghĩa thế giới"
      ],
      correct: 1
    },
    {
      topic: "Toàn quốc kháng chiến",
      q: "Trước âm mưu tái xâm lược Việt Nam của thực dân Pháp, Chủ tịch Hồ Chí Minh đã ra “Lời kêu gọi toàn quốc kháng chiến” vào ngày nào?",
      choices: [
        "2-9-1945",
        "6-3-1946",
        "19-12-1946",
        "20-12-1946"
      ],
      correct: 2
    },
    {
      topic: "Kháng chiến chống Mỹ",
      q: "Trong bối cảnh đế quốc Mỹ mở rộng chiến tranh ra miền Bắc và cuộc kháng chiến chống Mỹ, cứu nước ngày càng quyết liệt, Hồ Chí Minh đã nêu lên chân lý nào?",
      choices: [
        "“Đoàn kết, đoàn kết, đại đoàn kết”",
        "“Không có gì quý hơn độc lập, tự do”",
        "“Dĩ bất biến, ứng vạn biến”",
        "“Cần, kiệm, liêm, chính”"
      ],
      correct: 1
    },
    {
      topic: "Độc lập gắn với hạnh phúc",
      q: "Theo Hồ Chí Minh, độc lập dân tộc phải gắn liền với:",
      choices: [
        "Sự giàu có của tầng lớp tư sản",
        "Tự do và hạnh phúc của nhân dân",
        "Mở rộng lãnh thổ quốc gia",
        "Phát triển sức mạnh quân sự"
      ],
      correct: 1
    },
    {
      topic: "Giá trị của độc lập",
      q: "Hồ Chí Minh khẳng định nếu nước độc lập mà dân không được hưởng hạnh phúc, tự do thì:",
      choices: [
        "Cần ưu tiên củng cố chính quyền",
        "Độc lập cũng chẳng có nghĩa lý gì",
        "Phải ưu tiên phát triển kinh tế",
        "Cần tạm thời hạn chế dân chủ"
      ],
      correct: 1
    },
    {
      topic: "Tính chất nền độc lập",
      q: "Theo Hồ Chí Minh, nền độc lập dân tộc phải là nền độc lập:",
      choices: [
        "Có điều kiện",
        "Từng phần",
        "Thật sự, hoàn toàn và triệt để",
        "Phụ thuộc vào quan hệ quốc tế"
      ],
      correct: 2
    },
    {
      topic: "Mục tiêu vì nhân dân",
      q: "Sau thắng lợi Cách mạng Tháng Tám năm 1945, Hồ Chí Minh nêu mong muốn:",
      choices: [
        "Việt Nam trở thành cường quốc quân sự",
        "Làm cho dân có ăn, có mặc, có chỗ ở và được học hành",
        "Quốc hữu hóa toàn bộ nền kinh tế",
        "Xóa bỏ ngay mọi thành phần kinh tế tư nhân"
      ],
      correct: 1
    },
    {
      topic: "Thống nhất đất nước",
      q: "Quan điểm nhất quán của Hồ Chí Minh về sự thống nhất đất nước được thể hiện qua khẳng định nào?",
      choices: [
        "Việt Nam có thể được chia thành các khu vực tự trị",
        "“Nước Việt Nam là một, dân tộc Việt Nam là một”",
        "Chỉ cần thống nhất về kinh tế",
        "Thống nhất phụ thuộc vào các cường quốc"
      ],
      correct: 1
    },
    {
      topic: "Con đường cách mạng",
      q: "Theo Hồ Chí Minh, cách mạng giải phóng dân tộc muốn thắng lợi phải đi theo:",
      choices: [
        "Con đường cách mạng tư sản",
        "Con đường cải cách ôn hòa",
        "Con đường cách mạng vô sản",
        "Con đường quân chủ lập hiến"
      ],
      correct: 2
    },
    {
      topic: "Bối cảnh quốc tế",
      q: "Sự kiện quốc tế có ảnh hưởng sâu sắc đến việc Hồ Chí Minh lựa chọn con đường cách mạng vô sản là:",
      choices: [
        "Cách mạng tư sản Pháp",
        "Cách mạng Mỹ",
        "Cách mạng Tháng Mười Nga năm 1917",
        "Chiến tranh thế giới thứ nhất"
      ],
      correct: 2
    },
    {
      topic: "Luận cương Lênin",
      q: "Tác phẩm nào của V.I. Lênin giúp Hồ Chí Minh tìm thấy con đường giải phóng dân tộc?",
      choices: [
        "Nhà nước và cách mạng",
        "Làm gì?",
        "Sơ thảo lần thứ nhất những luận cương về vấn đề dân tộc và vấn đề thuộc địa",
        "Chủ nghĩa duy vật và chủ nghĩa kinh nghiệm phê phán"
      ],
      correct: 2
    },
    {
      topic: "Lực lượng lãnh đạo",
      q: "Theo Hồ Chí Minh, cách mạng giải phóng dân tộc muốn thắng lợi phải do lực lượng nào lãnh đạo?",
      choices: [
        "Giai cấp địa chủ",
        "Giai cấp tư sản",
        "Đảng Cộng sản",
        "Tầng lớp trí thức"
      ],
      correct: 2
    },
    {
      topic: "Đại đoàn kết toàn dân",
      q: "Theo Hồ Chí Minh, cách mạng giải phóng dân tộc phải dựa trên lực lượng nào?",
      choices: [
        "Chỉ giai cấp công nhân",
        "Chỉ giai cấp nông dân",
        "Đại đoàn kết toàn dân tộc, lấy liên minh công – nông làm nền tảng",
        "Chỉ trí thức và tư sản"
      ],
      correct: 2
    },
    {
      topic: "Chủ thể cách mạng",
      q: "Hồ Chí Minh khẳng định cách mạng là sự nghiệp của:",
      choices: [
        "Một số cá nhân kiệt xuất",
        "Quần chúng nhân dân",
        "Giai cấp tư sản",
        "Các tổ chức quốc tế"
      ],
      correct: 1
    },
    {
      topic: "Tính chủ động của cách mạng thuộc địa",
      q: "Điểm sáng tạo nổi bật của Hồ Chí Minh về mối quan hệ giữa cách mạng thuộc địa và cách mạng vô sản ở chính quốc là:",
      choices: [
        "Cách mạng thuộc địa hoàn toàn phụ thuộc vào cách mạng chính quốc",
        "Cách mạng thuộc địa phải chờ cách mạng chính quốc thắng lợi",
        "Cách mạng thuộc địa có khả năng chủ động và giành thắng lợi trước cách mạng vô sản ở chính quốc",
        "Hai cuộc cách mạng hoàn toàn độc lập với nhau"
      ],
      correct: 2
    },
    {
      topic: "Phương pháp cách mạng",
      q: "Theo Hồ Chí Minh, cách mạng giải phóng dân tộc phải được tiến hành bằng phương pháp nào?",
      choices: [
        "Đấu tranh nghị trường",
        "Thương lượng hòa bình là duy nhất",
        "Bạo lực cách mạng",
        "Cải cách hành chính"
      ],
      correct: 2
    },
    {
      topic: "Bạo lực cách mạng",
      q: "Bạo lực cách mạng trong tư tưởng Hồ Chí Minh là sự kết hợp giữa:",
      choices: [
        "Kinh tế và ngoại giao",
        "Lực lượng chính trị của quần chúng với lực lượng vũ trang nhân dân",
        "Quân đội với viện trợ quốc tế",
        "Đấu tranh nghị trường với ngoại giao"
      ],
      correct: 1
    },
    {
      topic: "Đặc trưng chính trị CNXH",
      q: "Đặc trưng về chính trị của xã hội xã hội chủ nghĩa theo Hồ Chí Minh là:",
      choices: [
        "Xã hội do một nhóm tinh hoa quản lý",
        "Xã hội có chế độ dân chủ",
        "Xã hội không cần Nhà nước",
        "Xã hội được quân sự hóa"
      ],
      correct: 1
    },
    {
      topic: "Địa vị nhân dân",
      q: "Trong xã hội xã hội chủ nghĩa theo Hồ Chí Minh, địa vị cao nhất thuộc về:",
      choices: [
        "Nhà nước",
        "Đảng",
        "Nhân dân",
        "Các tổ chức kinh tế"
      ],
      correct: 2
    },
    {
      topic: "Đặc trưng kinh tế CNXH",
      q: "Theo Hồ Chí Minh, đặc trưng quan trọng về kinh tế của chủ nghĩa xã hội là:",
      choices: [
        "Nền kinh tế nông nghiệp thuần túy",
        "Nền kinh tế phát triển cao dựa trên lực lượng sản xuất hiện đại và chế độ công hữu về tư liệu sản xuất chủ yếu",
        "Nền kinh tế hoàn toàn tư nhân",
        "Nền kinh tế không có sản xuất hàng hóa"
      ],
      correct: 1
    },
    {
      topic: "Chủ thể xây dựng CNXH",
      q: "Theo Hồ Chí Minh, chủ thể xây dựng chủ nghĩa xã hội là:",
      choices: [
        "Đảng Cộng sản",
        "Nhà nước",
        "Nhân dân dưới sự lãnh đạo của Đảng Cộng sản",
        "Giai cấp công nhân"
      ],
      correct: 2
    },
    {
      topic: "Quan điểm dân là chủ",
      q: "Trong tư tưởng Hồ Chí Minh, “dân là chủ” nhấn mạnh điều gì?",
      choices: [
        "Nghĩa vụ của nhân dân",
        "Vị thế của nhân dân",
        "Trách nhiệm đóng thuế",
        "Vai trò quản lý kinh tế"
      ],
      correct: 1
    },
    {
      topic: "Động lực xây dựng CNXH",
      q: "Theo Hồ Chí Minh, động lực quan trọng và có tính quyết định nhất trong xây dựng chủ nghĩa xã hội là:",
      choices: [
        "Tài nguyên thiên nhiên",
        "Con người",
        "Vốn đầu tư nước ngoài",
        "Máy móc và công nghệ"
      ],
      correct: 1
    },
    {
      topic: "Quan hệ Độc lập & CNXH",
      q: "Theo Hồ Chí Minh, mối quan hệ giữa độc lập dân tộc và chủ nghĩa xã hội được thể hiện đúng nhất ở nhận định nào?",
      choices: [
        "Độc lập dân tộc và CNXH là hai mục tiêu tách biệt",
        "Độc lập dân tộc là cơ sở, tiền đề để tiến lên CNXH; CNXH là điều kiện bảo đảm nền độc lập dân tộc vững chắc",
        "Chỉ cần độc lập dân tộc, không nhất thiết xây dựng CNXH",
        "Phải xây dựng CNXH trước khi giành độc lập"
      ],
      correct: 1
    },
    {
      topic: "Vai trò của CNXH",
      q: "Nhận định nào phản ánh đầy đủ nhất tư tưởng Hồ Chí Minh về vai trò của chủ nghĩa xã hội đối với độc lập dân tộc?",
      choices: [
        "CNXH chỉ là phương tiện để giành chính quyền",
        "CNXH không có quan hệ trực tiếp với độc lập dân tộc",
        "CNXH tạo cơ sở để củng cố thành quả độc lập, bảo đảm quyền làm chủ và cuộc sống tự do, ấm no, hạnh phúc của nhân dân",
        "CNXH chỉ nhằm thực hiện mục tiêu phát triển kinh tế"
      ],
      correct: 2
    }
  ];

  const SoundFX = (() => {
    let ctx = null;
    let enabled = localStorage.getItem("race_sound_enabled") !== "false";

    function getContext() {
      if (!ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        ctx = new AudioCtx();
      }
      if (ctx && ctx.state === "suspended") {
        ctx.resume();
      }
      return ctx;
    }

    function playTone(freq, type, duration, gainStart = 0.15, gainEnd = 0.001) {
      if (!enabled) return;
      try {
        const ac = getContext();
        if (!ac) return;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ac.currentTime);
        gain.gain.setValueAtTime(gainStart, ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(Math.max(gainEnd, 0.0001), ac.currentTime + duration);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start();
        osc.stop(ac.currentTime + duration);
      } catch {}
    }

    function playSweep(startFreq, endFreq, type, duration, gainVal = 0.15) {
      if (!enabled) return;
      try {
        const ac = getContext();
        if (!ac) return;
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(startFreq, ac.currentTime);
        osc.frequency.exponentialRampToValueAtTime(endFreq, ac.currentTime + duration);
        gain.gain.setValueAtTime(gainVal, ac.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.start();
        osc.stop(ac.currentTime + duration);
      } catch {}
    }

    return {
      isEnabled: () => enabled,
      toggle: () => {
        enabled = !enabled;
        localStorage.setItem("race_sound_enabled", enabled ? "true" : "false");
        updateSoundBtn();
        if (enabled) SoundFX.step();
        return enabled;
      },
      roll: () => {
        playTone(340 + Math.random() * 220, "triangle", 0.04, 0.09);
      },
      step: () => {
        playSweep(260, 520, "sine", 0.1, 0.14);
      },
      correct: () => {
        if (!enabled) return;
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
          setTimeout(() => playTone(freq, "sine", 0.22, 0.18), i * 90);
        });
      },
      wrong: () => {
        if (!enabled) return;
        playSweep(220, 110, "sawtooth", 0.35, 0.2);
      },
      special: () => {
        if (!enabled) return;
        const notes = [440, 554.37, 659.25, 880, 1108.73];
        notes.forEach((freq, i) => {
          setTimeout(() => playTone(freq, "triangle", 0.18, 0.12), i * 70);
        });
      },
      victory: () => {
        if (!enabled) return;
        const fanfare = [
          { f: 523.25, d: 150 },
          { f: 523.25, d: 150 },
          { f: 523.25, d: 150 },
          { f: 659.25, d: 350 },
          { f: 783.99, d: 250 },
          { f: 1046.50, d: 600 }
        ];
        let delay = 0;
        fanfare.forEach(item => {
          setTimeout(() => playTone(item.f, "triangle", item.d / 1000, 0.22), delay);
          delay += item.d + 30;
        });
      }
    };
  })();

  const GameConfetti = (() => {
    let canvas = null;
    let ctx = null;
    let particles = [];
    let animationId = null;
    const colors = ["#ffd438", "#ff3b30", "#34c759", "#3d79f5", "#af52de", "#ff9500", "#5ce68b", "#ffffff"];

    function init() {
      canvas = document.querySelector("#gameConfetti");
      if (!canvas) return;
      ctx = canvas.getContext("2d");
      resize();
      window.addEventListener("resize", resize);
    }

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function burst(originX = window.innerWidth / 2, originY = window.innerHeight / 2, count = 80) {
      if (!canvas || !ctx) init();
      if (!canvas || !ctx) return;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9 + 4;
        particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          size: Math.random() * 8 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
          alpha: 1,
          gravity: 0.22,
          drag: 0.96
        });
      }
      if (!animationId) loop();
    }

    function fireworks() {
      burst(window.innerWidth * 0.3, window.innerHeight * 0.4, 90);
      setTimeout(() => burst(window.innerWidth * 0.7, window.innerHeight * 0.35, 90), 250);
      setTimeout(() => burst(window.innerWidth * 0.5, window.innerHeight * 0.3, 110), 500);
      setTimeout(() => burst(window.innerWidth * 0.2, window.innerHeight * 0.5, 80), 800);
      setTimeout(() => burst(window.innerWidth * 0.8, window.innerHeight * 0.45, 90), 1100);
    }

    function loop() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.012;

        if (p.alpha <= 0 || p.y > canvas.height) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      if (particles.length > 0) {
        animationId = requestAnimationFrame(loop);
      } else {
        animationId = null;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    return { init, burst, fireworks };
  })();

  function updateSoundBtn() {
    const btn = $("#soundToggleBtn");
    const icon = $("#soundIcon");
    const label = $("#soundLabel");
    if (!btn) return;
    const isMuted = !SoundFX.isEnabled();
    btn.classList.toggle("muted", isMuted);
    if (icon) icon.textContent = isMuted ? "🔇" : "🔊";
    if (label) label.textContent = isMuted ? "Tắt" : "Bật";
  }

  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  // --- Quản trò / Game Master Authentication System ---
  function getAdminPassword() {
    return localStorage.getItem(ADMIN_KEY_STORAGE) || ADMIN_PASSWORD_DEFAULT;
  }

  function isAdmin() {
    return sessionStorage.getItem(ADMIN_AUTH_SESSION) === "true";
  }

  function setAdminStatus(unlocked) {
    sessionStorage.setItem(ADMIN_AUTH_SESSION, unlocked ? "true" : "false");
    applyAdminStatusUI();
  }

  function applyAdminStatusUI() {
    const unlocked = isAdmin();
    const statusBtn = $("#adminStatusBtn");
    const statusIcon = $("#adminStatusIcon");
    const statusText = $("#adminStatusText");
    const unlockChip = $("#adminUnlockChip");
    const dropdownMenu = $("#adminDropdownMenu");
    const controlPanel = $("#controlPanel");
    const spectatorLiveBar = $("#spectatorLiveBar");
    const choicesEl = $("#choices");

    if (unlocked) {
      statusBtn?.classList.remove("is-locked");
      statusBtn?.classList.add("is-unlocked");
      if (statusIcon) statusIcon.textContent = "👑";
      if (statusText) statusText.textContent = "Quản trò (Đang mở)";
      if (unlockChip) unlockChip.style.display = "none";
      controlPanel?.classList.add("is-admin");
      controlPanel?.classList.remove("is-spectator");
      spectatorLiveBar?.classList.add("is-admin-active");
      choicesEl?.classList.remove("is-spectator");
    } else {
      statusBtn?.classList.remove("is-unlocked");
      statusBtn?.classList.add("is-locked");
      if (statusIcon) statusIcon.textContent = "🔒";
      if (statusText) statusText.textContent = "Khán giả (Chỉ xem)";
      if (unlockChip) unlockChip.style.display = "";
      controlPanel?.classList.remove("is-admin");
      controlPanel?.classList.add("is-spectator");
      spectatorLiveBar?.classList.remove("is-admin-active");
      choicesEl?.classList.add("is-spectator");
      if (dropdownMenu) dropdownMenu.hidden = true;
    }
    updateGameOverControls();
  }

  function openAdminAuthModal(reason) {
    const modal = $("#adminAuthModal");
    if (!modal) return;
    const desc = $("#adminAuthDesc");
    const input = $("#adminPasswordInput");
    const err = $("#adminAuthError");
    if (desc) {
      desc.textContent = reason || "Mở khóa toàn quyền điều khiển: bốc câu hỏi, chọn đáp án, đổi nhóm và điều hành cuộc đua.";
    }
    if (err) err.hidden = true;
    if (input) {
      input.value = "";
      input.type = "password";
    }
    const toggleBtn = $("#pwdToggleBtn");
    if (toggleBtn) toggleBtn.textContent = "👁️";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    setTimeout(() => input?.focus(), 90);
  }

  function closeAdminAuthModal() {
    const modal = $("#adminAuthModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function handleAdminAuthSubmit() {
    const input = $("#adminPasswordInput");
    const err = $("#adminAuthError");
    const entered = (input?.value || "").trim();
    if (entered === getAdminPassword()) {
      setAdminStatus(true);
      closeAdminAuthModal();
      SoundFX.correct();
      showToast("👑 Xác thực Quản trò thành công! Bảng điều khiển đã sẵn sàng.");
    } else {
      SoundFX.wrong();
      if (err) {
        err.hidden = false;
        err.style.animation = "none";
        void err.offsetWidth;
        err.style.animation = "shake 0.3s ease";
      }
      input?.focus();
    }
  }

  function openChangePwdModal() {
    const modal = $("#changePwdModal");
    if (!modal) return;
    if ($("#oldPwdInput")) $("#oldPwdInput").value = "";
    if ($("#newPwdInput")) $("#newPwdInput").value = "";
    if ($("#confirmPwdInput")) $("#confirmPwdInput").value = "";
    const err = $("#changePwdError");
    if (err) err.hidden = true;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    const menu = $("#adminDropdownMenu");
    if (menu) menu.hidden = true;
    setTimeout(() => $("#oldPwdInput")?.focus(), 90);
  }

  function closeChangePwdModal() {
    const modal = $("#changePwdModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  function handleChangePwdSubmit() {
    const oldVal = ($("#oldPwdInput")?.value || "").trim();
    const newVal = ($("#newPwdInput")?.value || "").trim();
    const confirmVal = ($("#confirmPwdInput")?.value || "").trim();
    const err = $("#changePwdError");

    function showError(msg) {
      if (err) {
        err.textContent = msg;
        err.hidden = false;
      }
      SoundFX.wrong();
    }

    if (oldVal !== getAdminPassword()) {
      showError("❌ Mật khẩu hiện tại không chính xác!");
      $("#oldPwdInput")?.focus();
      return;
    }
    if (newVal.length < 4) {
      showError("❌ Mật khẩu mới phải có tối thiểu 4 ký tự!");
      $("#newPwdInput")?.focus();
      return;
    }
    if (newVal !== confirmVal) {
      showError("❌ Xác nhận mật khẩu mới không trùng khớp!");
      $("#confirmPwdInput")?.focus();
      return;
    }

    localStorage.setItem(ADMIN_KEY_STORAGE, newVal);
    closeChangePwdModal();
    SoundFX.correct();
    showToast("✅ Đã cập nhật mật khẩu Quản trò mới thành công!");
  }

  const state = loadState();
  let currentQuestion = null;
  let answered = false;
  let busy = false;
  let pendingEvent = null;
  let eventQueue = [];
  let timerId = null;
  let remaining = QUESTION_SECONDS;

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
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    return freshState();
  }

  function saveState(extra = {}) {
    const payload = {
      ...state,
      admin: false,
      qIndex: currentQuestion ? questions.indexOf(currentQuestion) : null,
      qAnswered: answered,
      qText: $("#questionText")?.textContent || "",
      qTopic: $("#questionTopic")?.textContent || "",
      diceCaption: $("#diceCaption")?.textContent || "",
      syncStamp: Date.now(),
      ...extra
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
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

    // Track Hub - Emblem at Col 1, Rows 2-3
    const hub = document.createElement("div");
    hub.className = "track-hub";
    hub.innerHTML = `
      <strong class="hub-title">
        <span class="hub-line">ĐƯỜNG ĐUA</span>
        <span class="hub-line highlight-gold">ĐỘC LẬP</span>
      </strong>
    `;
    track.appendChild(hub);

    for (let i = 0; i <= FINISH; i += 1) {
      const special = specialTiles[i];
      const isCurrentTeamTile = state.positions[state.activeTeam] === i;
      const tile = document.createElement("div");
      tile.className = `tile ${i === 0 ? "start" : ""} ${i === FINISH ? "finish" : ""} ${special?.kind || ""} ${landingPosition === i ? "active-landing" : ""} ${isCurrentTeamTile ? "current-turn-tile" : ""}`;

      // Calculate serpentine coordinates for 21 tiles across 8 columns:
      // Row 1 (Cols 1..8): Tiles 0 to 7 (Tile 0 is Start, Tile 7 turns down ↴)
      // Row 2 (Cols 8..2): Tiles 8 to 14 (Tile 14 turns down ↵)
      // Row 3 (Cols 2..8): Tiles 15 to 21 (Tile 21 is FINISH 🏁)
      let row = 1;
      let col = 1;
      let arrowClass = "right";
      let arrowSymbol = "→";

      if (i <= 7) {
        row = 1;
        col = i + 1;
        if (i === 7) {
          arrowClass = "turn";
          arrowSymbol = "↴";
        }
      } else if (i <= 14) {
        row = 2;
        col = 8 - (i - 8);
        arrowClass = (i === 14) ? "turn" : "left";
        arrowSymbol = (i === 14) ? "↵" : "←";
      } else {
        row = 3;
        col = (i - 15) + 2;
        arrowClass = (i === FINISH) ? "finish" : "right";
        arrowSymbol = (i === FINISH) ? "🏁" : "→";
      }

      tile.style.gridRow = `${row}`;
      tile.style.gridColumn = `${col}`;

      let tileIcon = special?.icon || "";
      let tileNumLabel = i === 0 ? "START" : i === FINISH ? "ĐÍCH" : i;
      if (i === 0) tileIcon = "🚩";
      if (i === FINISH) tileIcon = "👑";

      tile.innerHTML = `
        <div class="tile-top-row">
          <span class="tile-num">${tileNumLabel}</span>
          <span class="tile-type">${tileIcon}</span>
        </div>
        <div class="tokens"></div>
        <div class="tile-arrow ${arrowClass}">${arrowSymbol}</div>
      `;

      const tokenWrap = tile.querySelector(".tokens");
      teams.filter(team => state.positions[team.id] === i).forEach(team => {
        const token = document.createElement("span");
        const isActiveTeam = team.id === state.activeTeam;
        token.className = `token ${team.id} ${isActiveTeam ? "active-team-pawn" : ""}`;
        token.textContent = team.short;
        token.title = `${team.name} (vị trí: ${i})`;
        if (isActiveTeam) {
          const arrowIndicator = document.createElement("span");
          arrowIndicator.className = "active-turn-arrow";
          arrowIndicator.textContent = "▼";
          token.appendChild(arrowIndicator);
        }
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
    updateGameOverControls();
  }

  function updateGameOverControls() {
    const isOver = Boolean(state.winner);
    const adminUnlocked = isAdmin();
    $("#drawQuestionBtn").disabled = isOver || !adminUnlocked;
    if ($("#nextTeamBtn")) $("#nextTeamBtn").disabled = isOver || !adminUnlocked;
    $("#teamSelect").disabled = isOver || !adminUnlocked;
    $("#resetGameBtn").disabled = !adminUnlocked;
    if (isOver) $("#diceCaption").textContent = "Game đã kết thúc";
  }

  function resetQuestionView() {
    answered = false;
    resetTimer();
    $(".quiz-dock")?.classList.remove("is-open");
    $(".board-zone")?.classList.remove("question-active");
    const choices = $("#choices");
    if (choices) choices.innerHTML = "";
    const answerLine = $("#answerLine");
    if (answerLine) {
      answerLine.className = "answer-line";
      answerLine.textContent = "Chọn đáp án để biết đúng/sai.";
    }
  }

  function closeQuestionOverlay() {
    resetTimer();
    $(".quiz-dock")?.classList.remove("is-open");
    $(".board-zone")?.classList.remove("question-active");
  }

  function pickQuestion() {
    if (!isAdmin()) {
      openAdminAuthModal("Vui lòng nhập mật khẩu Quản trò để bốc câu hỏi!");
      return;
    }
    if (state.winner) return showToast("Game đã kết thúc, hãy reset để chơi lại");
    if (busy) return showToast("Đang xử lý lượt hiện tại");
    if (pendingEvent) return showToast("Hãy đóng lá thăm trước khi bốc câu hỏi mới");
    if (state.used.length >= questions.length) state.used = [];
    const available = questions.map((_, index) => index).filter(index => !state.used.includes(index));
    const index = available[Math.floor(Math.random() * available.length)];
    currentQuestion = questions[index];
    state.used.push(index);
    resetQuestionView();
    const activeTeam = teamById(state.activeTeam);
    const badge = $("#quizActiveTeamBadge");
    if (badge) {
      badge.textContent = `Lượt: ${activeTeam.name}`;
      badge.className = `quiz-badge ${activeTeam.id}`;
    }
    $("#questionTopic").textContent = currentQuestion.topic;
    $("#questionText").textContent = currentQuestion.q;
    $("#choices").innerHTML = currentQuestion.choices.map((choice, i) => `<button class="choice" data-letter="${letters[i]}" data-index="${i}">${choice}</button>`).join("");
    $("#diceCaption").textContent = `${activeTeam.name} chọn đáp án (30s)`;
    $(".board-zone").classList.add("question-active");
    $(".quiz-dock").classList.add("is-open");
    saveState();
    startQuestionTimer();
  }

  function setChoicesLocked() {
    $$(".choice").forEach(button => button.classList.add("is-disabled"));
  }

  async function chooseAnswer(button) {
    if (!isAdmin()) {
      openAdminAuthModal("Vui lòng nhập mật khẩu Quản trò để chọn đáp án!");
      return;
    }
    if (!currentQuestion || answered || busy || state.winner) return;
    answered = true;
    clearInterval(timerId);
    timerId = null;
    setChoicesLocked();
    const index = Number(button.dataset.index);
    const correctButton = $(`.choice[data-index="${currentQuestion.correct}"]`);
    if (index !== currentQuestion.correct) {
      SoundFX.wrong();
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
    SoundFX.correct();
    GameConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 80);
    button.classList.add("correct-choice");
    $("#answerLine").className = "answer-line correct";
    $("#answerLine").textContent = "Bạn đã trả lời đúng! Bắt đầu tung xúc xắc...";
    await wait(800);
    closeQuestionOverlay();
    await rollDice();
  }

  function setDiceValue(cubeEl, val) {
    if (!cubeEl) return;
    cubeEl.classList.remove("show-1", "show-2", "show-3", "show-4", "show-5", "show-6");
    cubeEl.classList.add(`show-${val}`);
  }

  async function showResultModal(type, text, withDice, duration = 900) {
    const modal = $("#resultModal");
    modal.className = `result-modal is-open ${type} ${withDice ? "with-dice" : ""}`;
    modal.setAttribute("aria-hidden", "false");
    $("#resultText").textContent = text;
    const resultDice = $("#resultDice");
    if (resultDice) {
      resultDice.classList.remove("rolling");
    }
    await wait(duration);
  }

  function hideResultModal() {
    $("#resultModal").className = "result-modal";
    $("#resultModal").setAttribute("aria-hidden", "true");
    $("#resultDice")?.classList.remove("rolling");
  }

  async function rollDice() {
    if (busy || state.winner) return;
    busy = true;
    const dice = $("#diceDisplay");
    const resultDice = $("#resultDice");
    await showResultModal("correct", "Bạn đã trả lời đúng! Bắt đầu tung xúc xắc...", true, 850);
    dice?.classList.add("rolling");
    resultDice?.classList.add("rolling");
    $("#diceCaption").textContent = "Đang tung...";
    for (let i = 0; i < 14; i += 1) {
      SoundFX.roll();
      const flash = Math.floor(Math.random() * 6) + 1;
      setDiceValue(dice, flash);
      setDiceValue(resultDice, flash);
      await wait(58);
    }
    const value = Math.floor(Math.random() * 6) + 1;
    dice?.classList.remove("rolling");
    resultDice?.classList.remove("rolling");
    setDiceValue(dice, value);
    setDiceValue(resultDice, value);
    $("#diceCaption").textContent = `Đi ${value} ô`;
    await wait(650);
    hideResultModal();
    const triggered = await animateMoveTeam(state.activeTeam, value, true);
    busy = false;
    if (!triggered) afterMove(state.activeTeam);
  }

  async function animateMoveTeam(teamId, delta, canDrawEvent) {
    const direction = delta >= 0 ? 1 : -1;
    for (let step = 0; step < Math.abs(delta); step += 1) {
      SoundFX.step();
      state.positions[teamId] = Math.max(0, Math.min(FINISH, state.positions[teamId] + direction));
      renderTrack(state.positions[teamId]);
      await wait(190);
      if (state.positions[teamId] === FINISH) break;
    }
    saveState();
    if (state.positions[teamId] >= FINISH && !state.winner) {
      state.winner = teamId;
      openFinish(teamId);
    }
    let triggered = false;
    if (canDrawEvent && !state.winner) {
      triggered = queueOrOpenSpecial(teamId);
    }
    renderAll(state.positions[teamId]);
    return triggered;
  }

  async function animateMoveTeams(teamIds, delta) {
    const direction = delta >= 0 ? 1 : -1;
    for (let step = 0; step < Math.abs(delta); step += 1) {
      SoundFX.step();
      teamIds.forEach(teamId => {
        state.positions[teamId] = Math.max(0, Math.min(FINISH, state.positions[teamId] + direction));
      });
      renderTrack();
      await wait(190);
    }
    saveState();
    renderAll();
    return teamIds.reduce((triggered, teamId) => queueOrOpenSpecial(teamId) || triggered, false);
  }

  function buildSpecialEvent(teamId) {
    if (state.winner) return null;
    const special = specialTiles[state.positions[teamId]];
    return special ? { ...special, teamId } : null;
  }

  function queueOrOpenSpecial(teamId) {
    const event = buildSpecialEvent(teamId);
    if (!event) return false;
    if (pendingEvent) {
      eventQueue.push(event);
    } else {
      pendingEvent = event;
      openChanceModal(event);
    }
    return true;
  }

  function openNextQueuedEvent() {
    if (pendingEvent || eventQueue.length === 0) return false;
    pendingEvent = eventQueue.shift();
    openChanceModal(pendingEvent);
    return true;
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
    const labels = { lucky: "Ô dấu +", trap: "Ô dấu -", challenge: "Bốc thăm" };
    const modal = $("#chanceModal");
    const closeButton = $("#closeChanceBtn");
    const drawCards = $("#drawCards");
    modal.className = `chance-modal is-open ${event.kind}`;
    modal.setAttribute("aria-hidden", "false");
    $("#eventKind").textContent = `${teamById(event.teamId).name} - ${labels[event.kind] || "Ô đặc biệt"}`;
    $("#eventTitle").textContent = event.title;
    $("#eventText").textContent = event.text;
    drawCards.innerHTML = "";
    closeButton.disabled = false;
    closeButton.textContent = "Đóng và áp dụng";
    SoundFX.special();
    if (event.kind === "lucky") {
      GameConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 60);
    }
    if (event.kind === "challenge") {
      pendingEvent.cardChosen = false;
      closeButton.disabled = true;
      closeButton.textContent = "Chọn 1 lá bài";
      shuffleCards(mysteryCards).forEach((card, index) => {
        const button = document.createElement("button");
        button.className = "mystery-card";
        button.type = "button";
        button.dataset.action = card.action;
        button.dataset.move = card.move;
        button.dataset.title = card.title;
        button.dataset.text = card.text;
        button.dataset.tone = card.tone;
        button.innerHTML = `<span>?</span><strong>Lá ${index + 1}</strong>`;
        drawCards.appendChild(button);
      });
    }
  }

  function shuffleCards(cards) {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  function pickMysteryCard(button) {
    if (!pendingEvent || pendingEvent.kind !== "challenge" || pendingEvent.cardChosen) return;
    const move = Number(button.dataset.move);
    pendingEvent.action = button.dataset.action;
    pendingEvent.move = move;
    pendingEvent.title = button.dataset.title;
    pendingEvent.text = button.dataset.text;
    pendingEvent.cardChosen = true;
    $("#eventTitle").textContent = button.dataset.title;
    $("#eventText").textContent = button.dataset.text;
    $$(".mystery-card").forEach(card => {
      card.disabled = true;
      card.classList.add(card === button ? "is-picked" : "is-muted");
    });
    button.classList.add(button.dataset.tone);
    button.innerHTML = `<span>${Number.isFinite(move) ? `${move > 0 ? "+" : ""}${move}` : "-"}</span><strong>${button.dataset.title}</strong>`;
    if (move > 0) {
      SoundFX.correct();
      GameConfetti.burst(window.innerWidth / 2, window.innerHeight * 0.45, 70);
    } else if (move < 0) {
      SoundFX.wrong();
    } else {
      SoundFX.special();
    }
    $("#closeChanceBtn").disabled = false;
    $("#closeChanceBtn").textContent = "Đóng và áp dụng";
  }

  async function closeChanceAndApply() {
    if (busy || !pendingEvent) return;
    if (pendingEvent.kind === "challenge" && !pendingEvent.cardChosen) return showToast("Hãy chọn 1 lá bài trước");
    const event = pendingEvent;
    pendingEvent = null;
    $("#chanceModal").className = "chance-modal";
    $("#chanceModal").setAttribute("aria-hidden", "true");
    busy = true;
    let triggered = false;
    if (event.diceEffect) {
      triggered = await rollSpecialDice(event.teamId, event.diceEffect === "forward" ? 1 : -1);
    } else if (event.action === "allOpponentsBack") {
      const opponents = teams.map(team => team.id).filter(id => id !== event.teamId);
      $("#diceCaption").textContent = "Đối thủ lùi 3 bước";
      triggered = await animateMoveTeams(opponents, -3);
    } else if (event.action === "nearestMinus") {
      const target = nextMinusTile(state.positions[event.teamId]);
      $("#diceCaption").textContent = `Tới ô - phía trước: ${target}`;
      triggered = await animateMoveTeam(event.teamId, target - state.positions[event.teamId], true);
    } else if (event.move) {
      $("#diceCaption").textContent = `${event.move > 0 ? "+" : ""}${event.move} ô từ lá thăm`;
      triggered = await animateMoveTeam(event.teamId, event.move, true);
    } else if (event.skip) {
      state.skips[event.teamId] = event.skip;
      saveState();
      renderAll();
    }
    busy = false;
    if (!state.winner && !triggered && !openNextQueuedEvent()) nextTeam(false);
  }

  async function rollSpecialDice(teamId, direction) {
    const isForward = direction > 0;
    const title = isForward ? "Ô dấu +: tung xúc xắc để đi thêm!" : "Ô dấu -: tung xúc xắc để đi lùi!";
    const dice = $("#diceDisplay");
    const resultDice = $("#resultDice");
    await showResultModal(isForward ? "correct" : "wrong", title, true, 650);
    dice?.classList.add("rolling");
    resultDice?.classList.add("rolling");
    for (let i = 0; i < 12; i += 1) {
      SoundFX.roll();
      const flash = Math.floor(Math.random() * 6) + 1;
      setDiceValue(dice, flash);
      setDiceValue(resultDice, flash);
      await wait(58);
    }
    const value = Math.floor(Math.random() * 6) + 1;
    dice?.classList.remove("rolling");
    resultDice?.classList.remove("rolling");
    setDiceValue(dice, value);
    setDiceValue(resultDice, value);
    $("#diceCaption").textContent = `${isForward ? "Tiến" : "Lùi"} ${value} bước`;
    await wait(600);
    hideResultModal();
    return animateMoveTeam(teamId, direction * value, true);
  }

  function nextMinusTile(position) {
    const minusTiles = Object.entries(specialTiles)
      .filter(([, tile]) => tile.kind === "trap")
      .map(([tile]) => Number(tile))
      .sort((a, b) => a - b);
    return minusTiles.find(tile => tile > position) || minusTiles[minusTiles.length - 1];
  }

  function nextTeam(show = true) {
    if (state.winner) return;
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
    const sec = $("#timerSec");
    const fill = $("#timerProgressFill");
    if (sec) sec.textContent = remaining;
    if (timer) {
      if (remaining <= 10) {
        timer.classList.add("urgent");
      } else {
        timer.classList.remove("urgent");
      }
    }
    if (fill) {
      const pct = Math.max(0, Math.min(100, (remaining / QUESTION_SECONDS) * 100));
      fill.style.width = `${pct}%`;
      if (remaining <= 10) {
        fill.classList.add("urgent");
      } else {
        fill.classList.remove("urgent");
      }
    }
  }

  function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    remaining = QUESTION_SECONDS;
    updateTimer();
  }

  function startQuestionTimer() {
    resetTimer();
    remaining = QUESTION_SECONDS;
    updateTimer();
    timerId = setInterval(() => {
      remaining -= 1;
      updateTimer();
      if (remaining <= 0) {
        clearInterval(timerId);
        timerId = null;
        handleTimeUp();
      }
    }, 1000);
  }

  async function handleTimeUp() {
    if (!currentQuestion || answered || busy || state.winner) return;
    answered = true;
    resetTimer();
    SoundFX.wrong();
    setChoicesLocked();
    const teamName = teamById(state.activeTeam).name;
    closeQuestionOverlay();
    await showResultModal("wrong", `⏰ Hết 30 giây! ${teamName} đã bị mất lượt.`, false, 2200);
    hideResultModal();
    nextTeam(false);
  }

  function openFinish(teamId) {
    clearInterval(timerId);
    timerId = null;
    currentQuestion = null;
    answered = true;
    pendingEvent = null;
    eventQueue = [];
    busy = false;
    closeQuestionOverlay();
    SoundFX.victory();
    GameConfetti.fireworks();
    $("#chanceModal").className = "chance-modal";
    $("#chanceModal").setAttribute("aria-hidden", "true");
    $("#winnerText").textContent = `Chúc mừng ${teamById(teamId).name} đã về đích!`;
    $("#finishModal").classList.add("is-open");
    $("#finishModal").setAttribute("aria-hidden", "false");
    saveState();
    renderAll();
  }

  function resetGame() {
    if (!isAdmin()) {
      openAdminAuthModal("Vui lòng nhập mật khẩu Quản trò để đặt lại trò chơi!");
      return;
    }

    // Hoàn toàn xóa sạch tiến trình hiện tại và timer
    clearInterval(timerId);
    timerId = null;
    currentQuestion = null;
    answered = false;
    pendingEvent = null;
    eventQueue = [];
    busy = false;

    // Đặt lại dữ liệu các nhóm và vòng đua
    Object.assign(state, freshState());
    state.positions = Object.fromEntries(teams.map(team => [team.id, 0]));
    state.skips = Object.fromEntries(teams.map(team => [team.id, 0]));
    state.used = [];
    state.winner = null;
    state.turn = 1;
    state.activeTeam = teams[0].id;

    // Đóng toàn bộ các popup, modal
    $("#chanceModal")?.classList.remove("is-open");
    $("#chanceModal")?.setAttribute("aria-hidden", "true");
    $("#finishModal")?.classList.remove("is-open");
    $("#finishModal")?.setAttribute("aria-hidden", "true");
    hideResultModal();

    // Đặt lại giao diện câu hỏi và đồng hồ đếm ngược
    resetQuestionView();
    resetTimer();

    // Đặt lại trạng thái xúc xắc 3D
    const dice = $("#diceDisplay");
    const resultDice = $("#resultDice");
    dice?.classList.remove("rolling");
    resultDice?.classList.remove("rolling");
    setDiceValue(dice, 1);
    setDiceValue(resultDice, 1);

    // Cập nhật nhãn thông tin
    $("#diceCaption").textContent = "Đúng để tung xúc xắc";
    $("#questionTopic").textContent = "Câu hỏi trắc nghiệm";
    $("#questionText").textContent = "Chọn nhóm đang chơi và bấm “Bốc câu hỏi”.";

    // Xóa bộ nhớ cũ và lưu trạng thái trắng
    localStorage.removeItem(STORAGE_KEY);
    saveState();

    // Vẽ lại bàn cờ, danh sách nhóm và điều khiển
    renderControls();
    renderAll();
    applyAdminStatusUI();

    // Hiệu ứng âm thanh và thông báo trực quan
    SoundFX.step();
    showToast("Đã đặt lại toàn bộ trò chơi về vạch xuất phát! 🔄");
  }

  $("#teamSelect").addEventListener("change", () => {
    if (!isAdmin()) {
      $("#teamSelect").value = state.activeTeam;
      openAdminAuthModal("Vui lòng nhập mật khẩu Quản trò để đổi nhóm đang chơi!");
      return;
    }
    state.activeTeam = $("#teamSelect").value;
    currentQuestion = null;
    resetQuestionView();
    saveState();
    renderAll();
  });

  $("#drawQuestionBtn").addEventListener("click", pickQuestion);
  $("#nextTeamBtn")?.addEventListener("click", () => {
    if (!isAdmin()) {
      openAdminAuthModal("Vui lòng nhập mật khẩu Quản trò!");
      return;
    }
    nextTeam();
  });
  $("#resetGameBtn").addEventListener("click", resetGame);
  $("#soundToggleBtn")?.addEventListener("click", () => SoundFX.toggle());

  $("#choices").addEventListener("click", event => {
    const button = event.target.closest(".choice");
    if (button) {
      if (!isAdmin()) {
        openAdminAuthModal("Vui lòng nhập mật khẩu Quản trò để chọn đáp án!");
        return;
      }
      chooseAnswer(button);
    }
  });

  $("#drawCards").addEventListener("click", event => {
    const button = event.target.closest(".mystery-card");
    if (button) {
      if (!isAdmin()) {
        openAdminAuthModal("Vui lòng nhập mật khẩu Quản trò để bốc lá thăm bí mật!");
        return;
      }
      pickMysteryCard(button);
    }
  });

  $("#closeChanceBtn").addEventListener("click", () => {
    if (!isAdmin()) {
      openAdminAuthModal("Vui lòng nhập mật khẩu Quản trò để tiếp tục!");
      return;
    }
    closeChanceAndApply();
  });

  $("#resetFinishBtn").addEventListener("click", resetGame);

  // --- Quản trò & Khán giả Event Handlers ---
  $("#adminStatusBtn")?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!isAdmin()) {
      openAdminAuthModal();
    } else {
      const menu = $("#adminDropdownMenu");
      if (menu) menu.hidden = !menu.hidden;
    }
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".admin-nav-wrap")) {
      const menu = $("#adminDropdownMenu");
      if (menu) menu.hidden = true;
    }
  });

  $("#menuLockAdminBtn")?.addEventListener("click", () => {
    setAdminStatus(false);
    showToast("🔒 Đã khóa lại! Chuyển sang Chế độ Khán giả an toàn.");
    const menu = $("#adminDropdownMenu");
    if (menu) menu.hidden = true;
  });

  $("#menuChangePwdBtn")?.addEventListener("click", () => {
    openChangePwdModal();
  });

  $("#unlockAdminBannerBtn")?.addEventListener("click", () => {
    openAdminAuthModal("Nhập mật khẩu Quản trò để mở khóa điều khiển phòng chơi.");
  });

  $("#controlPanel")?.addEventListener("click", (e) => {
    if (!isAdmin() && !e.target.closest("#unlockAdminBannerBtn")) {
      openAdminAuthModal("Bảng điều khiển đang khóa. Vui lòng nhập mật khẩu Quản trò để thao tác!");
    }
  });

  $("#closeAdminAuthBtn")?.addEventListener("click", closeAdminAuthModal);
  $("#cancelAdminAuthBtn")?.addEventListener("click", closeAdminAuthModal);

  $("#adminAuthForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleAdminAuthSubmit();
  });

  $("#submitAdminAuthBtn")?.addEventListener("click", handleAdminAuthSubmit);

  $("#adminPasswordInput")?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdminAuthSubmit();
    }
  });

  $("#pwdToggleBtn")?.addEventListener("click", () => {
    const input = $("#adminPasswordInput");
    const btn = $("#pwdToggleBtn");
    if (input) {
      if (input.type === "password") {
        input.type = "text";
        if (btn) btn.textContent = "🙈";
      } else {
        input.type = "password";
        if (btn) btn.textContent = "👁️";
      }
    }
  });

  $("#closeChangePwdBtn")?.addEventListener("click", closeChangePwdModal);
  $("#cancelChangePwdBtn")?.addEventListener("click", closeChangePwdModal);

  $("#changePwdForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleChangePwdSubmit();
  });

  $("#submitChangePwdBtn")?.addEventListener("click", handleChangePwdSubmit);

  // --- Đồng bộ thời gian thực giữa Quản trò và màn hình Khán giả ---
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        const remote = JSON.parse(e.newValue);
        if (!remote) return;
        state.turn = remote.turn || state.turn;
        state.activeTeam = remote.activeTeam || state.activeTeam;
        state.positions = remote.positions || state.positions;
        state.skips = remote.skips || state.skips;
        state.used = remote.used || state.used;
        state.winner = remote.winner || null;

        if (remote.qIndex !== null && remote.qIndex !== undefined && questions[remote.qIndex]) {
          currentQuestion = questions[remote.qIndex];
          answered = remote.qAnswered;
          $("#questionTopic").textContent = remote.qTopic || currentQuestion.topic;
          $("#questionText").textContent = remote.qText || currentQuestion.q;
          $("#choices").innerHTML = currentQuestion.choices.map((choice, i) =>
            `<button class="choice ${answered && i === currentQuestion.correct ? "correct-choice" : ""}" data-letter="${letters[i]}" data-index="${i}">${choice}</button>`
          ).join("");
          $(".board-zone")?.classList.add("question-active");
          $(".quiz-dock")?.classList.add("is-open");
        } else {
          currentQuestion = null;
          resetQuestionView();
          if (remote.qTopic) $("#questionTopic").textContent = remote.qTopic;
          if (remote.qText) $("#questionText").textContent = remote.qText;
        }

        if (remote.diceCaption) $("#diceCaption").textContent = remote.diceCaption;

        renderAll();
        if (state.winner) openFinish(state.winner);
        else $("#finishModal")?.classList.remove("is-open");
      } catch (err) {
        console.warn("Storage sync error:", err);
      }
    }
  });

  // Khởi tạo trang game
  GameConfetti.init();
  updateSoundBtn();
  renderControls();
  renderAll();
  applyAdminStatusUI();
  updateTimer();
  if (state.winner) openFinish(state.winner);
})();
