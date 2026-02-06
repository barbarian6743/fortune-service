/**
 * Fortune Service - Main Entry Point (Refactored)
 * 새로운 모듈화 구조를 사용하는 간소화된 메인 파일
 */

// ========================================
// Page Initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initDynamicBackground();
    if (document.getElementById("fortuneBtn")) {
        initInputPage();
    } else if (document.getElementById("result")) {
        initResultPage();
    }
});

/**
 * Initialize dynamic space background
 * - Input Page: Always generates a new background on load/refresh.
 * - Result Page: Maintains the background from the input page.
 */
function initDynamicBackground() {
    const bgContainer = document.querySelector('.background-image');
    if (!bgContainer) return;

    // A much larger, curated list of high-quality space/galaxy image IDs from Unsplash
    // A massive, curated list of 60+ high-quality space/galaxy image IDs from Unsplash
    const spacePool = [
        '1446776811953-b23d57bd21aa', '1464802686167-b939a6910659', '1506318129717-c5d20c1',
        '1446941611767-33028656816b', '1541450805168-5b71d9bc1013', '1451187580242-13393a651429',
        '1516331134811-38ba28169123', '1475275083422-b77da1c0d4ce', '1504333638930-c9e99a221f31',
        '1534067783941-51c9c23ecfd3', '1462331940025-496dfbfc7564', '1462332468506-4a004eb651c3',
        '1419242902c1e-0eb41df928a6', '1446776899648-aa78eefe8575', '1478760329108-5c3ed9d495a0',
        '1501862700950-c8d51b7aa815', '1518709268805-4e9042af9f23', '1538370965046-7a8a514d06c7',
        '1502134249126-abc67b05580f', '1581582801901-b3f80ca0287e', '1447433588970-d8d89197fd9f',
        '1434394354979-a235cd36269d', '1509023467888-138217715619', '1532704275357-890278130a1b',
        '1537420936696-2999e1ad44eb', '1519681395604-d2364cd74697', '1536697246787-1f7ad569a83a',
        '1528722828814-77b9b83acf12', '1421757350711-66fd6454792c', '1510519133491-d8c3313b970d',
        '1454789548111-c309b1970468', '1446776634499-4740a01532f3', '1517411032315-bc4baf632ce1',
        '1465101162284-18131e40a0a5', '1506318129717-d1a1b4e520c1', '1536697246787-1f7ad569a83a',
        '1446776811953-b23d57bd21aa', '1502134249126-abc67b05580f', '1434394354979-a235cd36269d',
        '1532704275357-890278130a1b', '1509023467888-138217715619', '1519681395604-d2364cd74697',
        '1421757350711-66fd6454792c', '1510519133491-d8c3313b970d', '1506318129717-d1a1b4e520c1',
        '1446776811953-b23d57bd21aa', '1464802686167-b939a6910659', '1540744323555-950c49c510bb',
        '1536412140411-fd66e4a640a2', '1503756314840-7f28ed5341a9', '1479030206124-7f212239d5e3',
        '1544085311-33e1467df2b6', '1486308523551-9275de52ba27', '1520113221914-1f2249764516',
        '1501862700950-c8d51b7aa815', '1419242902c1e-0eb41df928a6', '1516331134811-38ba28169123',
        '1451187580242-13393a651429', '1541450805168-5b71d9bc1013', '1502134249126-abc67b05580f',
        '1534067783941-51c9c23ecfd3', '1510519133491-d8c3313b970d', '1538370965046-7a8a514d06c7'
    ];

    const isInputPage = !!document.getElementById("fortuneBtn");
    let currentUrl = sessionStorage.getItem('saju_bg_url');
    let playlist = JSON.parse(sessionStorage.getItem('saju_bg_playlist') || '[]');

    // If on main page, or no playlist/url exists, manage the queue
    if (isInputPage || !currentUrl || playlist.length === 0) {
        // Maintain a playlist: if empty or on main page (refresh), pull next or refill
        if (playlist.length === 0) {
            // Shuffle the entire pool
            playlist = [...new Set(spacePool)].sort(() => Math.random() - 0.5);
        }

        const nextId = playlist.pop();
        const timestamp = new Date().getTime();
        currentUrl = `https://images.unsplash.com/photo-${nextId}?auto=format&fit=crop&q=80&w=1920&random=${timestamp}`;

        sessionStorage.setItem('saju_bg_url', currentUrl);
        sessionStorage.setItem('saju_bg_playlist', JSON.stringify(playlist));
    }

    // Preload and apply
    const img = new Image();
    img.onload = () => {
        bgContainer.style.backgroundImage = `url('${currentUrl}')`;
        requestAnimationFrame(() => {
            bgContainer.style.opacity = '1';
        });
    };
    img.onerror = () => {
        const fallbackId = '1464802686167-b939a6910659';
        bgContainer.style.backgroundImage = `url('https://images.unsplash.com/photo-${fallbackId}?auto=format&fit=crop&q=80&w=1920')`;
        bgContainer.style.opacity = '1';
    };
    img.src = currentUrl;
}

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

    const leapMonthContainer = document.getElementById("leapMonthContainer");

    solarBtn.addEventListener("click", () => {
        calendarTypeInput.value = "solar";
        solarBtn.classList.add("active");
        lunarBtn.classList.remove("active");
        calendarHint.innerHTML = "☀️ 양력으로 입력해주세요";
        leapMonthContainer.style.display = "none";
    });

    lunarBtn.addEventListener("click", () => {
        calendarTypeInput.value = "lunar";
        lunarBtn.classList.add("active");
        solarBtn.classList.remove("active");
        calendarHint.innerHTML = "🌙 음력으로 입력해주세요 (양력으로 자동 변환됩니다)";
        leapMonthContainer.style.display = "block";
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
            const isLeap = document.getElementById("isLeap").checked;
            try {
                const solarDate = window.LunarCalendar.toSolar(
                    parseInt(year),
                    parseInt(month),
                    parseInt(day),
                    isLeap
                );

                finalYear = solarDate.getFullYear().toString();
                finalMonth = (solarDate.getMonth() + 1).toString();
                finalDay = solarDate.getDate().toString();

                console.log(`Lunar (${year}-${month}-${day}${isLeap ? ' Leap' : ''}) -> Solar (${finalYear}-${finalMonth}-${finalDay})`);
            } catch (e) {
                alert("⚠️ 유효하지 않은 음력 날짜입니다.");
                return;
            }
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
        <div class="layer" onclick="showDetailView('layer1')" style="cursor:pointer; border-left: 4px solid var(--accent); overflow:hidden;">
            <h2 style="color:var(--accent);">🔭 제1장. 천문 역법</h2>
            <p class="academic-note">태어난 순간의 천문 좌표를 60갑자 기하학으로 변환한 데이터입니다.</p>
            <div style="width:100%; overflow-x:auto;">
                <div class="saju-grid">
                    <div class="pillar">
                        <div class="pillar-label">시주 (時柱)</div>
                        <div class="pillar-value">${p.hour.data.hanja}${p.hour.branchData.hanja}</div>
                        <div class="pillar-hangul">${p.hour.data.ko}${p.hour.branchData.ko}</div>
                    </div>
                    <div class="pillar highlight">
                        <div class="pillar-label">일주 (日柱) ★</div>
                        <div class="pillar-value">${p.day.data.hanja}${p.day.branchData.hanja}</div>
                        <div class="pillar-hangul">${p.day.data.ko}${p.day.branchData.ko}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">월주 (月柱)</div>
                        <div class="pillar-value">${p.month.data.hanja}${p.month.branchData.hanja}</div>
                        <div class="pillar-hangul">${p.month.data.ko}${p.month.branchData.ko}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">년주 (年柱)</div>
                        <div class="pillar-value">${p.year.data.hanja}${p.year.branchData.hanja}</div>
                        <div class="pillar-hangul">${p.year.data.ko}${p.year.branchData.ko}</div>
                    </div>
                </div>
            </div>
            <p style="margin-top:10px; font-size:0.85rem; color:#aaa;">📍 양력: ${birth} | 시간: ${time}</p>
        </div>
    `;
}

function renderLayer2(ohaengAnalysis, ohaengNarrative) {
    const eCounts = ohaengAnalysis.counts;
    const totalEnergy = Object.values(eCounts).reduce((a, b) => a + b, 0);

    const elementBar = Object.keys(eCounts).map(el => {
        const percent = (eCounts[el] / totalEnergy) * 100;
        if (percent === 0) return '';
        return `<div style="width:${percent}%; background:${window.ELEMENT_TRAITS[el].color}; height:100%;"></div>`;
    }).join('');

    return `
        <div class="layer" onclick="showDetailView('layer2')" style="cursor:pointer; border-left: 4px solid #4CAF50;">
            <h2 style="color:#4CAF50;">🌳 제2장. 음양오행 에너지</h2>
            <p class="academic-note">타고난 5가지 에너지(오행)의 분포와 균형을 분석합니다.</p>
            
            <div style="height:12px; display:flex; border-radius:6px; overflow:hidden; margin:15px 0; background:#333;">
                ${elementBar}
            </div>

            <div class="interpretation-card">
                <h4>${ohaengNarrative.yinyang.title}</h4>
                <p>${ohaengNarrative.yinyang.text}</p>
            </div>
            <div class="interpretation-card">
                <h4>${ohaengNarrative.dominant.title}</h4>
                <p>${ohaengNarrative.dominant.text}</p>
            </div>
        </div>
    `;
}

function renderLayer3(pillars, rawTenGods, narrative) {
    const getFriendlyTerm = window.NarrativeGenerator.getFriendlyTerm;
    const p = pillars;

    return `
        <div class="layer" onclick="showDetailView('layer3')" style="cursor:pointer; border-left: 4px solid #2196F3;">
            <h2 style="color:#2196F3;">🎯 제3장. 명리학적 구조</h2>
            <p class="academic-note">자아와 타인, 사회를 대하는 당신의 심리적 프레임을 해석합니다.</p>
            
            <div class="saju-grid" style="margin-bottom:15px;">
                <div class="pillar">
                    <div class="ten-god-label">${getFriendlyTerm(rawTenGods.hourStem).title.split(' ')[0]}</div>
                    <div class="pillar-value">${p.hour.data.hanja}</div>
                    <div class="ten-god-label">${getFriendlyTerm(rawTenGods.hourBranch).title.split(' ')[0]}</div>
                    <div class="pillar-value">${p.hour.branchData.hanja}</div>
                </div>
                <div class="pillar highlight">
                    <div class="ten-god-label" style="color:var(--accent)">본원</div>
                    <div class="pillar-value">${p.day.data.hanja}</div>
                    <div class="ten-god-label">${getFriendlyTerm(rawTenGods.dayBranch).title.split(' ')[0]}</div>
                    <div class="pillar-value">${p.day.branchData.hanja}</div>
                </div>
                <div class="pillar">
                    <div class="ten-god-label">${getFriendlyTerm(rawTenGods.monthStem).title.split(' ')[0]}</div>
                    <div class="pillar-value">${p.month.data.hanja}</div>
                    <div class="ten-god-label">${getFriendlyTerm(rawTenGods.monthBranch).title.split(' ')[0]}</div>
                    <div class="pillar-value">${p.month.branchData.hanja}</div>
                </div>
                <div class="pillar">
                    <div class="ten-god-label">${getFriendlyTerm(rawTenGods.yearStem).title.split(' ')[0]}</div>
                    <div class="pillar-value">${p.year.data.hanja}</div>
                    <div class="ten-god-label">${getFriendlyTerm(rawTenGods.yearBranch).title.split(' ')[0]}</div>
                    <div class="pillar-value">${p.year.branchData.hanja}</div>
                </div>
            </div>

            <div class="interpretation-card">
                <h4>${narrative.thinking.title}</h4>
                <p>${narrative.thinking.text}</p>
            </div>
            <div class="interpretation-card">
                <h4>${narrative.action.title}</h4>
                <p>${narrative.action.text}</p>
            </div>
        </div>
    `;
}

function renderLayer4(pillars, rawTenGods, ohaengAnalysis, daewoonList) {
    const dayElName = pillars.day.data.element;
    const myElement = window.ELEMENT_TRAITS[dayElName];
    const monthBranchTenGod = window.NarrativeGenerator.getFriendlyTerm(rawTenGods.monthBranch);

    return `
        <div class="layer" onclick="showDetailView('layer4')" style="cursor:pointer; border-left: 4px solid #9C27B0;">
            <h2 style="color:#9C27B0;">🌍 제4장. 현실 연결</h2>
            <p class="academic-note">실제 삶의 환경과 직업, 10년 주기 운의 흐름을 분석합니다.</p>

            <div class="interpretation-card">
                <h4>🧘 자아 정체성</h4>
                <p>당신은 <strong>${myElement.name}</strong>의 에너지를 핵심으로 <strong>${myElement.trait}</strong>의 가치를 추구합니다.</p>
            </div>

            <div class="interpretation-card">
                <h4>💼 사회적 성공 전략</h4>
                <p>사회활동에서는 <strong>${monthBranchTenGod.title}</strong>의 강점을 발휘하여 활약하는 것이 유리합니다.</p>
            </div>

            <div style="margin-top:15px;">
                <h4 style="font-size:0.85rem; color:var(--text-muted); margin-bottom:10px;">📉 대운의 흐름</h4>
                <div style="display:flex; overflow-x:auto; gap:8px; padding-bottom:10px;">
                    ${daewoonList.map(d => `
                        <div style="background:rgba(255,255,255,0.05); padding:8px 12px; border-radius:8px; text-align:center; min-width:70px; border:1px solid rgba(255,255,255,0.1);">
                            <div style="font-size:0.7rem; color:var(--accent);">${d.age}세~</div>
                            <div style="font-weight:bold; font-size:0.9rem;">${d.ganji}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderLayer5(specialThemes) {
    return `
        <div class="layer" onclick="showDetailView('layer5')" style="cursor:pointer; border-left: 4px solid #FF9800;">
            <h2 style="color:#FF9800;">💎 제5장. 운세 정밀 분석</h2>
            <p class="academic-note">재물, 건강, 관계 등 당신의 삶을 구성하는 핵심 테마별 리포트입니다.</p>
            
            <div style="display:flex; gap:10px; margin-top:15px; flex-wrap:wrap;">
                <span class="badge" style="background:rgba(255,152,0,0.2); color:#FF9800; border:1px solid rgba(255,152,0,0.3);">💰 재물 그릇</span>
                <span class="badge" style="background:rgba(76,175,80,0.2); color:#4CAF50; border:1px solid rgba(76,175,80,0.3);">💪 선천 건강</span>
                <span class="badge" style="background:rgba(33,150,243,0.2); color:#2196F3; border:1px solid rgba(33,150,243,0.3);">❤️ 관계의 역학</span>
            </div>
            <p style="margin-top:15px; color:var(--text-muted); font-size:0.8rem;">💡 클릭하여 정밀 리포트 보기</p>
        </div>
    `;
}

function renderAppendix() {
    return `
        <div class="layer-section" style="border-left: 4px solid #607D8B; background: rgba(0,0,0,0.3); margin-top: 30px; padding:20px; border-radius:12px;">
            <h3 class="layer-title" style="color: #B0BEC5; border-bottom: 1px solid rgba(176,190,197,0.3); padding-bottom:10px; margin-top:0;">[부록] 분석 방법론 (Methodology)</h3>
            <div style="font-size: 0.85rem; color: #cfd8dc; line-height: 1.6;">
                <p><strong>1. 천문학적 근거 (Astronomy)</strong><br>
                본 리포트는 태양의 황도 좌표(Solar Longitude)를 15도 단위로 정밀하게 계산한 24절기를 기준으로 산출되었습니다.</p>
                
                <p style="margin-top:10px;"><strong>2. 자평명리학 (System Statistics)</strong><br>
                성격과 적성 분석은 동양의 기상학이자 인문 통계학인 <strong>자평명리학(Ziping Myungri)</strong> 이론을 현대적으로 재해석한 것입니다.</p>
            </div>
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
