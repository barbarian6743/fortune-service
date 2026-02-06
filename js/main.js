/**
 * Fortune Service - Main Entry Point (Refactored)
 * 새로운 모듈화 구조를 사용하는 간소화된 메인 파일
 */

// ========================================
// Page Initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("fortuneBtn")) {
        initInputPage();
    } else if (document.getElementById("result")) {
        initResultPage();
    }
});

// ========================================
// Input Page Logic
// ========================================

function initInputPage() {
    // Populate year dropdown (1920-2030)
    const yearSelect = document.getElementById("birthYear");
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1920; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = `${year}년`;
        yearSelect.appendChild(option);
    }

    // Calendar type toggle
    const solarBtn = document.getElementById("solarBtn");
    const lunarBtn = document.getElementById("lunarBtn");
    const calendarTypeInput = document.getElementById("calendarType");
    const calendarHint = document.getElementById("calendarHint");

    solarBtn.addEventListener("click", () => {
        calendarTypeInput.value = "solar";
        solarBtn.classList.add("active");
        lunarBtn.classList.remove("active");
        calendarHint.innerHTML = "☀️ 양력으로 입력해주세요";
    });

    lunarBtn.addEventListener("click", () => {
        calendarTypeInput.value = "lunar";
        lunarBtn.classList.add("active");
        solarBtn.classList.remove("active");
        calendarHint.innerHTML = "🌙 음력으로 입력해주세요 (양력으로 자동 변환됩니다)";
    });

    // Dynamic day population based on month/year
    const monthSelect = document.getElementById("birthMonth");
    const daySelect = document.getElementById("birthDay");

    function updateDays() {
        const year = parseInt(yearSelect.value) || 2000;
        const month = parseInt(monthSelect.value);

        if (!month) return;

        // Clear existing options
        daySelect.innerHTML = '<option value="" disabled selected>일</option>';

        // Get days in month
        const daysInMonth = new Date(year, month, 0).getDate();

        // Populate days
        for (let i = 1; i <= daysInMonth; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `${i}일`;
            daySelect.appendChild(option);
        }
    }

    yearSelect.addEventListener('change', updateDays);
    monthSelect.addEventListener('change', updateDays);

    // Form submission
    document.getElementById("fortuneBtn").addEventListener("click", () => {
        const year = yearSelect.value;
        const month = monthSelect.value;
        const day = daySelect.value;
        const hour = document.getElementById("birthHour").value;
        const calendarType = calendarTypeInput.value;

        // Lunar to Solar conversion (simplified - in real app, use proper library)
        let finalYear = year;
        let finalMonth = month;
        let finalDay = day;

        if (calendarType === "lunar") {
            // TODO: Implement proper lunar-to-solar conversion
            // For now, just show a message
            alert("⚠️ 음력 변환 기능은 곧 추가될 예정입니다.\n현재는 양력으로만 입력 가능합니다.");
            return;
        }

        // Construct date and time strings
        const birth = finalYear && finalMonth && finalDay ?
            `${finalYear}-${finalMonth.padStart(2, '0')}-${finalDay.padStart(2, '0')}` : '';
        const time = hour !== null && hour !== '' ?
            `${hour.padStart(2, '0')}:00` : '';

        const inputs = {
            gender: document.getElementById("gender").value,
            birth: birth,
            time: time
        };

        // Validation
        const validation = window.Validator.validateAll(inputs);

        if (!validation.valid) {
            alert("⚠️ " + validation.errors.join('\n'));
            return;
        }

        // Redirect to result page
        const queryParams = new URLSearchParams(inputs);
        window.location.href = `result.html?${queryParams.toString()}`;
    });
}

// ========================================
// Result Page Logic
// ========================================

function initResultPage() {
    const params = new URLSearchParams(window.location.search);
    const gender = params.get('gender');
    const birth = params.get('birth');
    const time = params.get('time');

    if (!gender || !birth || !time) {
        alert("⚠️ 필수 정보가 누락되었습니다. 다시 입력해주세요.");
        window.location.href = "index.html";
        return;
    }

    const resultBox = document.getElementById("result");
    const loadingBox = document.getElementById("loading");
    calculateAndRender(gender, birth, time, resultBox, loadingBox);
}

// ========================================
// Core Calculation & Rendering
// ========================================

async function calculateAndRender(gender, birth, time, resultBox, loadingBox) {
    try {
        // Show loading
        resultBox.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>운세를 계산하고 있습니다...</p>
            </div>
        `;

        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Load external data
        const data = await window.DataLoader.loadAll();

        // 1. Calculate Ganji
        const [year, month, day] = birth.split('-').map(Number);
        const pillars = window.Ganji.calculate(year, month, day, time);

        // 2. Calculate Ten Gods
        const dayMasterIdx = pillars.day.stemIdx;
        const getTenGod = (targetIdx, isBranch) => window.TenGod.calculate(dayMasterIdx, targetIdx, isBranch);

        const rawTenGods = {
            yearStem: getTenGod(pillars.year.stemIdx, false),
            yearBranch: getTenGod(pillars.year.branchIdx, true),
            monthStem: getTenGod(pillars.month.stemIdx, false),
            monthBranch: getTenGod(pillars.month.branchIdx, true),
            dayBranch: getTenGod(pillars.day.branchIdx, true),
            hourStem: getTenGod(pillars.hour.stemIdx, false),
            hourBranch: getTenGod(pillars.hour.branchIdx, true)
        };

        // 3. Calculate Advanced Data
        const narrative = await window.NarrativeGenerator.generateMyungriNarrative(rawTenGods, data.narratives);
        const ohaengAnalysis = window.Ohaeng.analyze(pillars);
        const ohaengNarrative = window.NarrativeGenerator.generateOhaengNarrative(ohaengAnalysis);
        const daewoonList = window.Luck.calculateDaewoon(gender, pillars);

        // 4. Calculate Special Themes
        const specialThemes = await window.NarrativeGenerator.generateSpecialThemeAnalysis(
            pillars, rawTenGods, ohaengAnalysis, data.healthData
        );

        // Store in state
        const state = window.FortuneState;
        state.setPillars(pillars);
        state.setOhaeng(ohaengAnalysis);
        state.setTenGods(rawTenGods);
        state.setDaewoon(daewoonList);
        state.setNarrative({ rawTenGods, narrative, ohaengNarrative });
        state.setThemes(specialThemes);

        // 5. Render Summary View
        renderSummaryView(resultBox, {
            birth,
            time,
            pillars,
            ohaengAnalysis,
            ohaengNarrative,
            rawTenGods,
            narrative,
            daewoonList,
            specialThemes,
            data
        });

        // Finalize: Show result and hide loading
        resultBox.classList.remove("hidden");
        if (loadingBox) loadingBox.classList.add("hidden");

        // Cache the summary HTML
        state.setCachedSummary(resultBox.innerHTML);

    } catch (error) {
        console.error("Fortune calculation error:", error);
        resultBox.innerHTML = `
            <div class="error">
                <h3>⚠️ 오류 발생</h3>
                <p>${error.message}</p>
                <button onclick="location.href='index.html'" class="back-btn" style="margin-top:15px;">돌아가기</button>
            </div>
        `;
        resultBox.classList.remove("hidden");
        if (loadingBox) loadingBox.classList.add("hidden");
    }
}

// ========================================
// Summary View Rendering
// ========================================

function renderSummaryView(container, data) {
    const {
        birth,
        time,
        pillars,
        ohaengAnalysis,
        ohaengNarrative,
        rawTenGods,
        narrative,
        daewoonList,
        specialThemes
    } = data;

    container.innerHTML = `
        <div class="result-container">
            ${renderLayer1(birth, time, pillars)}
            ${renderLayer2(ohaengAnalysis, ohaengNarrative)}
            ${renderLayer3(pillars, rawTenGods, narrative)}
            ${renderLayer4(pillars, rawTenGods, ohaengAnalysis, daewoonList)}
            ${renderLayer5(specialThemes)}
        </div>
    `;
}

// ========================================
// Layer Rendering Functions
// ========================================

function renderLayer1(birth, time, pillars) {
    const p = pillars;
    return `
        <div class="layer" onclick="showDetailView('layer1')" style="cursor:pointer;">
            <h2 style="color:var(--accent);">📅 제1장. 천문 역법</h2>
            <p><strong>양력 생년월일:</strong> ${birth}</p>
            <p><strong>태어난 시간:</strong> ${time}</p>
            <div class="saju-grid">
                <div class="pillar">
                    <div class="pillar-label">시주 (時柱)</div>
                    <div class="pillar-value">${p.hour.data.hanja}${p.hour.branchData.hanja}</div>
                    <div class="pillar-hangul">${p.hour.data.hangul}${p.hour.branchData.hangul}</div>
                </div>
                <div class="pillar highlight">
                    <div class="pillar-label">일주 (日柱) ★</div>
                    <div class="pillar-value">${p.day.data.hanja}${p.day.branchData.hanja}</div>
                    <div class="pillar-hangul">${p.day.data.hangul}${p.day.branchData.hangul}</div>
                </div>
                <div class="pillar">
                    <div class="pillar-label">월주 (月柱)</div>
                    <div class="pillar-value">${p.month.data.hanja}${p.month.branchData.hanja}</div>
                    <div class="pillar-hangul">${p.month.data.hangul}${p.month.branchData.hangul}</div>
                </div>
                <div class="pillar">
                    <div class="pillar-label">년주 (年柱)</div>
                    <div class="pillar-value">${p.year.data.hanja}${p.year.branchData.hanja}</div>
                    <div class="pillar-hangul">${p.year.data.hangul}${p.year.branchData.hangul}</div>
                </div>
            </div>
            <p style="margin-top:15px; color:var(--text-muted); font-size:0.9rem;">💡 클릭하여 상세 보기</p>
        </div>
    `;
}

function renderLayer2(ohaengAnalysis, ohaengNarrative) {
    return `
        <div class="layer" onclick="showDetailView('layer2')" style="cursor:pointer;">
            <h2 style="color:#4CAF50;">🌳 제2장. 음양오행</h2>
            <div class="interpretation-card">
                <h4>${ohaengNarrative.yinyang.title}</h4>
                <p>${ohaengNarrative.yinyang.text}</p>
            </div>
            <div class="interpretation-card">
                <h4>${ohaengNarrative.dominant.title}</h4>
                <p>${ohaengNarrative.dominant.text}</p>
            </div>
            <p style="margin-top:15px; color:var(--text-muted); font-size:0.9rem;">💡 클릭하여 상세 보기</p>
        </div>
    `;
}

function renderLayer3(pillars, rawTenGods, narrative) {
    return `
        <div class="layer" onclick="showDetailView('layer3')" style="cursor:pointer;">
            <h2 style="color:#2196F3;">🎯 제3장. 명리학적 구조</h2>
            <div class="interpretation-card">
                <h4>${narrative.thinking.title}</h4>
                <p>${narrative.thinking.text}</p>
            </div>
            <div class="interpretation-card">
                <h4>${narrative.action.title}</h4>
                <p>${narrative.action.text}</p>
            </div>
            <div class="interpretation-card">
                <h4>${narrative.social.title}</h4>
                <p>${narrative.social.text}</p>
            </div>
            <p style="margin-top:15px; color:var(--text-muted); font-size:0.9rem;">💡 클릭하여 상세 보기</p>
        </div>
    `;
}

function renderLayer4(pillars, rawTenGods, ohaengAnalysis, daewoonList) {
    return `
        <div class="layer" onclick="showDetailView('layer4')" style="cursor:pointer;">
            <h2 style="color:#9C27B0;">🌐 제4장. 현실 연결</h2>
            <div class="interpretation-card">
                <h4>🧘 자아 정체성</h4>
                <p>당신의 일간(日干)은 <strong>${pillars.day.data.hanja}</strong>입니다.</p>
            </div>
            <div class="interpretation-card">
                <h4>📈 대운의 흐름</h4>
                <p>10년 단위로 변화하는 인생의 큰 흐름을 확인하세요.</p>
            </div>
            <p style="margin-top:15px; color:var(--text-muted); font-size:0.9rem;">💡 클릭하여 상세 보기</p>
        </div>
    `;
}

function renderLayer5(specialThemes) {
    const wealth = specialThemes.wealth;
    const health = specialThemes.health;
    const relation = specialThemes.relation;

    return `
        <div class="layer" onclick="showDetailView('layer5')" style="cursor:pointer;">
            <h2 style="color:#FF5722;">🔮 제5장. 운세 정밀 분석</h2>
            <div class="interpretation-card">
                <h4>💰 재물운 요약</h4>
                <p>${wealth.strength}</p>
            </div>
            <div class="interpretation-card">
                <h4>💪 건강운 요약</h4>
                <p>${health.weakest}</p>
            </div>
            <div class="interpretation-card">
                <h4>❤️ 관계운 요약</h4>
                <p>${relation.spouse}</p>
            </div>
            <p style="margin-top:15px; color:var(--text-muted); font-size:0.9rem;">💡 클릭하여 상세 보기</p>
        </div>
    `;
}

// ========================================
// Detail View Functions
// ========================================

function showDetailView(layerId) {
    const resultBox = document.getElementById("result");
    const state = window.FortuneState;

    // Get stored data
    const pillars = state.getPillars();
    const ohaeng = state.getOhaeng();
    const tenGods = state.getTenGods();
    const daewoon = state.getDaewoon();
    const narrativeData = state.getNarrative();
    const themes = state.getThemes();

    // Get URL params for birth info
    const params = new URLSearchParams(window.location.search);
    const birth = params.get('birth');
    const time = params.get('time');

    let detailHtml = '';

    switch (layerId) {
        case 'layer1':
            detailHtml = window.LayerDetailViews.renderLayer1Detail(birth, time, pillars);
            break;
        case 'layer2':
            detailHtml = window.LayerDetailViews.renderLayer2Detail(ohaeng, narrativeData.ohaengNarrative);
            break;
        case 'layer3':
            detailHtml = window.LayerDetailViews.renderLayer3Detail(pillars, tenGods, narrativeData.narrative);
            break;
        case 'layer4':
            detailHtml = window.LayerDetailViews.renderLayer4Detail(pillars, tenGods, ohaeng, daewoon);
            break;
        case 'layer5':
            detailHtml = window.LayerDetailViews.renderLayer5Detail(themes);
            break;
        default:
            detailHtml = '<p>알 수 없는 레이어입니다.</p>';
    }

    resultBox.innerHTML = detailHtml;
    window.scrollTo(0, 0);
}

function restoreSummaryView() {
    const resultBox = document.getElementById("result");
    const cachedHtml = window.FortuneState.getCachedSummary();

    if (cachedHtml) {
        resultBox.innerHTML = cachedHtml;
    } else {
        // Re-calculate if cache is empty
        const params = new URLSearchParams(window.location.search);
        calculateAndRender(params.get('gender'), params.get('birth'), params.get('time'), resultBox);
    }

    window.scrollTo(0, 0);
}
