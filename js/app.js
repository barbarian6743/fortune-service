document.getElementById("fortuneBtn").addEventListener("click", showFortune);

function showFortune() {
    const gender = document.getElementById("gender").value;
    const birth = document.getElementById("birth").value;
    const resultBox = document.getElementById("result");
    const loadingBox = document.getElementById("loading");
    const btn = document.getElementById("fortuneBtn");

    if (!gender || !birth) {
        alert("⚠️ 성별과 생년월일을 모두 입력해주세요.");
        return;
    }

    // UI Reset
    resultBox.classList.add("hidden");
    loadingBox.classList.remove("hidden");
    btn.disabled = true;
    btn.style.opacity = "0.7";

    // Simulate "reading stars" delay
    setTimeout(() => {
        calculateFortune(gender, birth);
        loadingBox.classList.add("hidden");
        resultBox.classList.remove("hidden");
        btn.disabled = false;
        btn.style.opacity = "1";
    }, 1500);
}

function calculateFortune(gender, birth) {
    const resultBox = document.getElementById("result");
    const today = new Date().toISOString().slice(0, 10);

    // Simple deterministic seed
    const seed =
        parseInt(birth.replace(/-/g, "")) +
        (gender === "male" ? 1 : 2) +
        parseInt(today.replace(/-/g, ""));

    // Expanded Fortune Database
    const fortunes = [
        "오늘은 차분한 마음이 가장 큰 행운을 불러옵니다. 서두르지 마세요.",
        "예상치 못한 기쁜 소식이 별빛처럼 당신에게 찾아올 것입니다.",
        "작은 선택이 당신의 운명을 긍정적인 방향으로 이끌 것입니다.",
        "주변 사람과의 인연에서 중요한 힌트를 얻게 될 하루입니다.",
        "지금은 속도보다 방향이 중요합니다. 잠시 멈춰서 밤하늘을 보세요.",
        "금전운이 상승하고 있습니다. 계획했던 일을 실행에 옮겨보세요.",
        "진정한 휴식이 내일의 큰 에너지가 됩니다. 자신을 돌보세요.",
        "오래된 친구에게 연락이 올 수 있습니다. 반갑게 맞이해주세요.",
        "당신의 직관이 어느 때보다 빛나는 날입니다. 느낌을 믿으세요.",
        "새로운 배움이 당신에게 큰 기회를 가져다 줄 것입니다."
    ];

    const colors = ["황금색 (Gold)", "심연의 보라 (Deep Purple)", "은색 (Silver)", "밤하늘의 남색 (Midnight Blue)", "루비 레드 (Ruby Red)", "에메랄드 그린 (Emerald)"];

    // Pseudo-random selection based on seed
    const fortuneIndex = seed % fortunes.length;
    const luckyNum = (seed % 99) + 1; // 1 ~ 99
    const colorIndex = (seed * 7) % colors.length;

    const fortune = fortunes[fortuneIndex];
    const luckyColor = colors[colorIndex];

    // Lotto Number Generation
    const lottoNumbers = new Set();
    // Use some randomness mixed with seed, but mostly random for "Lotto" fun
    // Actually, users prefer "Lucky Numbers" to be somewhat constant for the day?
    // Let's make it random but seeded by today + birth so it's consistent for the user today.
    // Simple seeded random function
    let tempSeed = seed;
    const seededRandom = () => {
        const x = Math.sin(tempSeed++) * 10000;
        return x - Math.floor(x);
    };

    while (lottoNumbers.size < 6) {
        // Generate number 1-45
        const num = Math.floor(seededRandom() * 45) + 1;
        lottoNumbers.add(num);
    }

    // Sort numbers
    const sortedLotto = Array.from(lottoNumbers).sort((a, b) => a - b);

    // Generate HTML for balls
    const lottoHtml = sortedLotto.map((num, index) => {
        let colorClass = 'ball-yellow'; // Default 1-10
        if (num >= 11 && num <= 20) colorClass = 'ball-blue';
        else if (num >= 21 && num <= 30) colorClass = 'ball-red';
        else if (num >= 31 && num <= 40) colorClass = 'ball-grey';
        else if (num >= 41 && num <= 45) colorClass = 'ball-green';

        // Add staggering delay to animation
        return `<div class="lotto-ball ${colorClass}" style="animation-delay: ${index * 0.1}s">${num}</div>`;
    }).join('');

    resultBox.innerHTML = `
        <span class="result-title">✨ 오늘의 별자리 운세</span>
        <div class="fortune-text">${fortune}</div>
        
        <div class="lucky-items">
            <div class="lucky-item">
                <span>행운의 숫자</span>
                <span class="lucky-value">${luckyNum}</span>
            </div>
            <div class="lucky-item">
                <span>행운의 색</span>
                <span class="lucky-value">${luckyColor}</span>
            </div>
        </div>

        <div class="lotto-section">
            <span class="lotto-title">🎰 행운의 로또 번호</span>
            <div class="lotto-balls">
                ${lottoHtml}
            </div>
        </div>
    `;
}
