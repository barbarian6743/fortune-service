
/* =========================================
   Saju Engine (Calendar, Ganji, TenGod, Luck, Ohaeng)
   Consolidated for local file execution - Advanced Version
   ========================================= */

// --- 1. Calendar Logic ---
const Calendar = {
    // Approximate Start Dates of the 12 Zodiac Months (Jeolgi)
    jeolgiDates: [
        { month: 1, name: "IpChun", day: 4 },   // Feb
        { month: 2, name: "GyeongChip", day: 6 }, // Mar
        { month: 3, name: "CheongMyeong", day: 5 }, // Apr
        { month: 4, name: "IpHa", day: 6 },     // May
        { month: 5, name: "MangJong", day: 6 }, // Jun
        { month: 6, name: "SoSeo", day: 7 },    // Jul
        { month: 7, name: "IpChu", day: 8 },    // Aug
        { month: 8, name: "BaengNo", day: 8 },  // Sep
        { month: 9, name: "HalLo", day: 8 },    // Oct
        { month: 10, name: "IpDong", day: 7 },  // Nov
        { month: 11, name: "DaeSeol", day: 7 }, // Dec
        { month: 12, name: "SoHan", day: 6 }    // Jan
    ],

    getSajuMonthParams: (date) => {
        const month = date.getMonth() + 1; // 1-12
        const day = date.getDate();

        let sajuYearOffset = 0;
        let sajuMonthIndex = 0;

        if (month === 2) { // Feb
            if (day >= 4) { sajuMonthIndex = 1; sajuYearOffset = 0; }
            else { sajuMonthIndex = 12; sajuYearOffset = -1; }
        } else if (month === 1) { // Jan
            if (day >= 6) { sajuMonthIndex = 12; sajuYearOffset = -1; }
            else { sajuMonthIndex = 11; sajuYearOffset = -1; }
        } else {
            const jeolgiDef = Calendar.jeolgiDates[month - 2];
            if (day >= jeolgiDef.day) {
                sajuMonthIndex = month - 1;
            } else {
                sajuMonthIndex = month - 2;
            }
            sajuYearOffset = 0;
        }

        return { sajuMonth: sajuMonthIndex, yearOffset: sajuYearOffset };
    }
};

// --- 2. Ganji Logic ---
const STEMS = [
    { key: "Gap", ko: "갑", element: "Wood", polarity: "+", hanja: "甲" },
    { key: "Eul", ko: "을", element: "Wood", polarity: "-", hanja: "乙" },
    { key: "Byung", ko: "병", element: "Fire", polarity: "+", hanja: "丙" },
    { key: "Jung", ko: "정", element: "Fire", polarity: "-", hanja: "丁" },
    { key: "Mu", ko: "무", element: "Earth", polarity: "+", hanja: "戊" },
    { key: "Gi", ko: "기", element: "Earth", polarity: "-", hanja: "己" },
    { key: "Gyeong", ko: "경", element: "Metal", polarity: "+", hanja: "庚" },
    { key: "Shin", ko: "신", element: "Metal", polarity: "-", hanja: "辛" },
    { key: "Im", ko: "임", element: "Water", polarity: "+", hanja: "壬" },
    { key: "Gye", ko: "계", element: "Water", polarity: "-", hanja: "癸" }
];
const BRANCHES = [
    { key: "Ja", ko: "자", element: "Water", polarity: "+", hanja: "子" },
    { key: "Chuk", ko: "축", element: "Earth", polarity: "-", hanja: "丑" },
    { key: "In", ko: "인", element: "Wood", polarity: "+", hanja: "寅" },
    { key: "Myo", ko: "묘", element: "Wood", polarity: "-", hanja: "卯" },
    { key: "Jin", ko: "진", element: "Earth", polarity: "+", hanja: "辰" },
    { key: "Sa", ko: "사", element: "Fire", polarity: "-", hanja: "巳" },
    { key: "O", ko: "오", element: "Fire", polarity: "+", hanja: "午" },
    { key: "Mi", ko: "미", element: "Earth", polarity: "-", hanja: "未" },
    { key: "Shin", ko: "신", element: "Metal", polarity: "+", hanja: "申" },
    { key: "Yu", ko: "유", element: "Metal", polarity: "-", hanja: "酉" },
    { key: "Sul", ko: "술", element: "Earth", polarity: "+", hanja: "戌" },
    { key: "Hae", ko: "해", element: "Water", polarity: "-", hanja: "亥" }
];

const Ganji = {
    STEMS,
    BRANCHES,

    calculate: (yearStr, monthStr, dayStr, timeStr) => {
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);
        const day = parseInt(dayStr);

        const date = new Date(year, month - 1, day);

        const { sajuMonth, yearOffset } = Calendar.getSajuMonthParams(date);
        const sajuYear = year + yearOffset;

        let yearGanjiIndex = (sajuYear - 4) % 60;
        if (yearGanjiIndex < 0) yearGanjiIndex += 60;

        const yearStemIdx = yearGanjiIndex % 10;
        const yearBranchIdx = yearGanjiIndex % 12;

        let monthBranchIdx;
        if (sajuMonth === 11) monthBranchIdx = 0;
        else if (sajuMonth === 12) monthBranchIdx = 1;
        else monthBranchIdx = sajuMonth + 1;

        const startMonthStemIdx = ((yearStemIdx % 5) + 1) * 2;
        const monthStemIdx = (startMonthStemIdx + (sajuMonth - 1)) % 10;

        const refDate = new Date(1900, 0, 1);
        date.setHours(0, 0, 0, 0);
        refDate.setHours(0, 0, 0, 0);

        const diffTime = date.getTime() - refDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        let dayGanjiIndex = (10 + diffDays) % 60;
        if (dayGanjiIndex < 0) dayGanjiIndex += 60;

        const dayStemIdx = dayGanjiIndex % 10;
        const dayBranchIdx = dayGanjiIndex % 12;

        let [hh, mm] = timeStr.split(':').map(Number);
        if (!timeStr) hh = 0;

        const hourBranchIdx = Math.floor((hh + 1) / 2) % 12;
        const startHourStemIdx = (dayStemIdx % 5) * 2;
        const hourStemIdx = (startHourStemIdx + hourBranchIdx) % 10;

        return {
            year: { data: STEMS[yearStemIdx], branchData: BRANCHES[yearBranchIdx], stem: STEMS[yearStemIdx].ko + "(" + STEMS[yearStemIdx].hanja + ")", branch: BRANCHES[yearBranchIdx].ko + "(" + BRANCHES[yearBranchIdx].hanja + ")", stemIdx: yearStemIdx, branchIdx: yearBranchIdx },
            month: { data: STEMS[monthStemIdx], branchData: BRANCHES[monthBranchIdx], stem: STEMS[monthStemIdx].ko + "(" + STEMS[monthStemIdx].hanja + ")", branch: BRANCHES[monthBranchIdx].ko + "(" + BRANCHES[monthBranchIdx].hanja + ")", stemIdx: monthStemIdx, branchIdx: monthBranchIdx },
            day: { data: STEMS[dayStemIdx], branchData: BRANCHES[dayBranchIdx], stem: STEMS[dayStemIdx].ko + "(" + STEMS[dayStemIdx].hanja + ")", branch: BRANCHES[dayBranchIdx].ko + "(" + BRANCHES[dayBranchIdx].hanja + ")", stemIdx: dayStemIdx, branchIdx: dayBranchIdx },
            hour: { data: STEMS[hourStemIdx], branchData: BRANCHES[hourBranchIdx], stem: STEMS[hourStemIdx].ko + "(" + STEMS[hourStemIdx].hanja + ")", branch: BRANCHES[hourBranchIdx].ko + "(" + BRANCHES[hourBranchIdx].hanja + ")", stemIdx: hourStemIdx, branchIdx: hourBranchIdx }
        };
    }
};

// --- 3. TenGod Logic ---
const TEN_GODS = {
    "Same": ["비견", "겁재"],
    "Output": ["식신", "상관"],
    "Wealth": ["편재", "정재"],
    "Power": ["편관", "정관"],
    "Resource": ["편인", "정인"]
};

const TenGod = {
    getBranchElement: (branchIdx) => {
        if ([2, 3].includes(branchIdx)) return 0; // Wood
        if ([5, 6].includes(branchIdx)) return 1; // Fire
        if ([1, 4, 7, 10].includes(branchIdx)) return 2; // Earth
        if ([8, 9].includes(branchIdx)) return 3; // Metal
        if ([11, 0].includes(branchIdx)) return 4; // Water
        return 2;
    },

    calculate: (masterStemIdx, targetStemIdx, isBranch = false) => {
        const masterEl = Math.floor(masterStemIdx / 2);
        const masterPol = masterStemIdx % 2;

        let targetEl, targetPol;

        if (isBranch) {
            targetEl = TenGod.getBranchElement(targetStemIdx);
            targetPol = targetStemIdx % 2;
        } else {
            targetEl = Math.floor(targetStemIdx / 2);
            targetPol = targetStemIdx % 2;
        }

        const samePol = (masterPol === targetPol);

        if (masterEl === targetEl) return samePol ? TEN_GODS.Same[0] : TEN_GODS.Same[1];
        if ((masterEl + 1) % 5 === targetEl) return samePol ? TEN_GODS.Output[0] : TEN_GODS.Output[1];
        if ((targetEl + 1) % 5 === masterEl) return samePol ? TEN_GODS.Resource[0] : TEN_GODS.Resource[1];
        if ((masterEl + 2) % 5 === targetEl) return samePol ? TEN_GODS.Wealth[0] : TEN_GODS.Wealth[1];
        if ((targetEl + 2) % 5 === masterEl) return samePol ? TEN_GODS.Power[0] : TEN_GODS.Power[1];

        return "Unknown";
    }
};

// --- 4. Luck (Daewoon) Logic ---
const Luck = {
    calculateDaewoon: (gender, pillars) => {
        const yearStemPol = pillars.year.data.polarity; // "+" or "-"
        const isMale = (gender === 'male');

        let direction = 1; // Forward
        if (yearStemPol === '+') {
            direction = isMale ? 1 : -1;
        } else {
            direction = isMale ? -1 : 1;
        }

        let currentStemIdx = pillars.month.stemIdx;
        let currentBranchIdx = pillars.month.branchIdx;

        const daewoons = [];
        let startAge = Math.floor(Math.random() * 9) + 1; // Simulating start age (usually complex calc)

        for (let i = 0; i < 8; i++) {
            currentStemIdx = (currentStemIdx + direction + 10) % 10;
            currentBranchIdx = (currentBranchIdx + direction + 12) % 12;

            const stem = STEMS[currentStemIdx];
            const branch = BRANCHES[currentBranchIdx];

            daewoons.push({
                age: startAge + (i * 10),
                stem: stem.hanja,
                branch: branch.hanja,
                stemHangul: stem.ko,
                branchHangul: branch.ko,
                ganji: stem.ko + branch.ko,
                ganjiHanja: stem.hanja + branch.hanja,
                stemElement: stem.element,
                branchElement: branch.element
            });
        }

        return daewoons;
    }
};

// --- 5. Ohaeng (Five Elements) Analysis ---
const Ohaeng = {
    analyze: (pillars) => {
        const counts = { Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 };
        const polarities = { Yang: 0, Yin: 0 };

        const add = (stemOrBranch, isBranch = false) => {
            const el = isBranch ?
                ["Water", "Earth", "Wood", "Wood", "Earth", "Fire", "Fire", "Earth", "Metal", "Metal", "Earth", "Water"][stemOrBranch.branchIdx]
                : stemOrBranch.data.element;

            counts[el]++;

            const idx = isBranch ? stemOrBranch.branchIdx : stemOrBranch.stemIdx;
            if (idx % 2 === 0) polarities.Yang++;
            else polarities.Yin++;
        };

        add(pillars.year);
        add(pillars.year, true);
        add(pillars.month);
        add(pillars.month, true);
        add(pillars.day);
        add(pillars.day, true);
        add(pillars.hour);
        add(pillars.hour, true);

        const lacking = Object.keys(counts).filter(k => counts[k] === 0);
        const excessive = Object.keys(counts).filter(k => counts[k] >= 3);

        return { counts, polarities, lacking, excessive };
    }
};

// Make Globally Available
window.Calendar = Calendar;
window.Ganji = Ganji;
window.TenGod = TenGod;
window.Luck = Luck;
window.Ohaeng = Ohaeng;
