import { Calendar } from './calendar.js';
import { Ganji } from './ganji.js';
import { TenGod } from './tenGod.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const gender = params.get('gender');
    const birth = params.get('birth');
    const time = params.get('time');

    if (!gender || !birth || !time) {
        alert("잘못된 접근입니다.");
        window.location.href = 'index.html';
        return;
    }

    const loadingBox = document.getElementById("loading");
    const resultBox = document.getElementById("result");

    setTimeout(() => {
        loadingBox.classList.add("hidden");
        resultBox.classList.remove("hidden");
        calculateAndRender(gender, birth, time, resultBox);
    }, 1500);
});

function calculateAndRender(gender, birth, time, resultBox) {
    // 1. Calculate Ganji (Four Pillars)
    const [year, month, day] = birth.split('-').map(Number);
    const pillars = Ganji.calculate(year, month, day, time);

    // 2. Calculate Ten Gods
    const dayMasterIdx = pillars.day.stemIdx;
    const tenGods = {
        yearStem: TenGod.calculate(dayMasterIdx, pillars.year.stemIdx),
        yearBranch: TenGod.calculate(dayMasterIdx, pillars.year.branchIdx, true),
        monthStem: TenGod.calculate(dayMasterIdx, pillars.month.stemIdx),
        monthBranch: TenGod.calculate(dayMasterIdx, pillars.month.branchIdx, true),
        dayBranch: TenGod.calculate(dayMasterIdx, pillars.day.branchIdx, true),
        hourStem: TenGod.calculate(dayMasterIdx, pillars.hour.stemIdx),
        hourBranch: TenGod.calculate(dayMasterIdx, pillars.hour.branchIdx, true)
    };

    // 3. Simple Interpretation
    const dayElement = ["목(Wood)", "화(Fire)", "토(Earth)", "금(Metal)", "수(Water)"][Math.floor(dayMasterIdx / 2)];
    let analysisText = `당신의 일간(본원)은 <strong>${dayElement}</strong>입니다.<br>`;
    analysisText += `월지(계절)가 <strong>${pillars.month.branch}</strong>이므로, `;
    // Simple logic based on Month Branch Element
    const monthEl = TenGod.getBranchElement(pillars.month.branchIdx);
    const monthElName = ["봄", "여름", "환절기", "가을", "겨울"][monthEl];
    analysisText += `<strong>${monthElName}</strong>의 기운을 타고 났습니다.<br>`;

    // Check Ten God strength (Month Branch relation)
    analysisText += `사회적 환경은 <strong>${tenGods.monthBranch}</strong>의 성향을 띱니다.`;

    // 4. Generate Lotto (Legacy Support)
    // Use pillars as deterministic seed
    // sum indices
    const seed = pillars.year.stemIdx + pillars.year.branchIdx +
        pillars.month.stemIdx + pillars.month.branchIdx +
        pillars.day.stemIdx + pillars.day.branchIdx +
        pillars.hour.stemIdx + pillars.hour.branchIdx;

    const lottoNumbers = new Set();
    let tempSeed = seed * 12345;
    const seededRandom = () => {
        const x = Math.sin(tempSeed++) * 10000;
        return x - Math.floor(x);
    };

    while (lottoNumbers.size < 6) {
        const num = Math.floor(seededRandom() * 45) + 1;
        lottoNumbers.add(num);
    }
    const sortedLotto = Array.from(lottoNumbers).sort((a, b) => a - b);

    const lottoHtml = sortedLotto.map((num, index) => {
        let colorClass = 'ball-yellow';
        if (num >= 11 && num <= 20) colorClass = 'ball-blue';
        else if (num >= 21 && num <= 30) colorClass = 'ball-red';
        else if (num >= 31 && num <= 40) colorClass = 'ball-grey';
        else if (num >= 41 && num <= 45) colorClass = 'ball-green';
        return `<div class="lotto-ball ${colorClass}" style="animation-delay: ${index * 0.1}s">${num}</div>`;
    }).join('');

    // HTML Rendering
    resultBox.innerHTML = `
        <span class="result-title">✨ 사주팔자 분석표 (만세력)</span>
        
        <div class="saju-grid" style="display:grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 20px 0; text-align: center; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px;">
            <div style="color:var(--text-muted)">시주</div>
            <div style="color:var(--text-muted)">일주(나)</div>
            <div style="color:var(--text-muted)">월주</div>
            <div style="color:var(--text-muted)">년주</div>
            
            <!-- Stems -->
            <div class="ganji-cell">
                <div class="ten-god-label">${tenGods.hourStem.split(' ')[0]}</div>
                <div class="ganji-char" style="font-size:1.5rem; font-weight:bold;">${pillars.hour.stem.split('(')[0]}</div>
            </div>
            <div class="ganji-cell">
                <div class="ten-god-label" style="color:var(--accent)">일간</div>
                <div class="ganji-char" style="font-size:1.6rem; font-weight:bold; color:var(--accent); text-shadow:0 0 10px var(--accent);">${pillars.day.stem.split('(')[0]}</div>
            </div>
            <div class="ganji-cell">
                <div class="ten-god-label">${tenGods.monthStem.split(' ')[0]}</div>
                <div class="ganji-char" style="font-size:1.5rem; font-weight:bold;">${pillars.month.stem.split('(')[0]}</div>
            </div>
            <div class="ganji-cell">
                <div class="ten-god-label">${tenGods.yearStem.split(' ')[0]}</div>
                <div class="ganji-char" style="font-size:1.5rem; font-weight:bold;">${pillars.year.stem.split('(')[0]}</div>
            </div>

            <!-- Branches -->
            <div class="ganji-cell">
                <div class="ganji-char" style="font-size:1.5rem; font-weight:bold;">${pillars.hour.branch.split('(')[0]}</div>
                <div class="ten-god-label">${tenGods.hourBranch.split(' ')[0]}</div>
            </div>
            <div class="ganji-cell">
                <div class="ganji-char" style="font-size:1.5rem; font-weight:bold; color:var(--accent);">${pillars.day.branch.split('(')[0]}</div>
                <div class="ten-god-label">${tenGods.dayBranch.split(' ')[0]}</div>
            </div>
            <div class="ganji-cell">
                <div class="ganji-char" style="font-size:1.5rem; font-weight:bold;">${pillars.month.branch.split('(')[0]}</div>
                <div class="ten-god-label">${tenGods.monthBranch.split(' ')[0]}</div>
            </div>
            <div class="ganji-cell">
                <div class="ganji-char" style="font-size:1.5rem; font-weight:bold;">${pillars.year.branch.split('(')[0]}</div>
                <div class="ten-god-label">${tenGods.yearBranch.split(' ')[0]}</div>
            </div>
        </div>

        <div class="fortune-text" style="text-align:left; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
            ${analysisText}
        </div>

        <div class="lotto-section">
            <span class="lotto-title">🎰 행운의 로또 번호</span>
            <div class="lotto-balls">
                ${lottoHtml}
            </div>
        </div>
        
        <div style="margin-top: 20px;">
            <a href="index.html" class="magic-btn" style="text-decoration: none; display: inline-block; width: auto; padding: 10px 20px; font-size: 0.9rem;">
                다시 하기
            </a>
        </div>
    `;
}
