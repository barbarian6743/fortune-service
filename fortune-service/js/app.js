document.getElementById("fortuneBtn").addEventListener("click", showFortune);

function showFortune() {
    const gender = document.getElementById("gender").value;
    const birth = document.getElementById("birth").value;
    const resultBox = document.getElementById("result");

    if (!gender || !birth) {
        resultBox.innerText = "⚠️ 성별과 생년월일을 모두 입력하세요.";
        return;
    }

    // 오늘 날짜 (하루 1번 고정 운세용)
    const today = new Date().toISOString().slice(0, 10);

    // seed 생성
    const seed =
        parseInt(birth.replace(/-/g, "")) +
        (gender === "male" ? 1 : 2) +
        parseInt(today.replace(/-/g, ""));

    const fortunes = [
        "오늘은 차분함이 가장 큰 행운을 부릅니다.",
        "예상치 못한 좋은 소식이 찾아올 수 있습니다.",
        "작은 선택이 큰 변화를 만듭니다.",
        "사람과의 인연에서 힌트를 얻는 날입니다.",
        "지금은 속도보다 방향이 중요합니다.",
        "금전운이 무난하니 계획을 점검해보세요.",
        "휴식이 곧 최고의 생산성입니다."
    ];

    const fortune = fortunes[seed % fortunes.length];

    resultBox.innerText = `✨ 오늘의 운세\n\n${fortune}`;
}
