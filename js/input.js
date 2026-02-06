document.getElementById("fortuneBtn").addEventListener("click", () => {
    const gender = document.getElementById("gender").value;
    const birth = document.getElementById("birth").value;
    const birthTime = document.getElementById("birthTime").value;

    if (!gender || !birth || !birthTime) {
        alert("⚠️ 성별, 생년월일, 태어난 시간을 모두 입력해주세요.");
        return;
    }

    // Redirect to result page with query parameters
    const queryParams = new URLSearchParams({
        gender,
        birth,
        time: birthTime
    });

    window.location.href = `result.html?${queryParams.toString()}`;
});
