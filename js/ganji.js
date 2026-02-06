import { Calendar } from './calendar.js';

// Lookup Arrays using indices 0-9 and 0-11
const STEMS = ["갑(Gap)", "을(Eul)", "병(Byung)", "정(Jung)", "무(Mu)", "기(Gi)", "경(Gyeong)", "신(Shin)", "임(Im)", "계(Gye)"];
const BRANCHES = ["자(Ja)", "축(Chuk)", "인(In)", "묘(Myo)", "진(Jin)", "사(Sa)", "오(O)", "미(Mi)", "신(Shin)", "유(Yu)", "술(Sul)", "해(Hae)"];
const BRANCH_HOURS = [23, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21]; // Starts for Ja, Chuk, In...

export const Ganji = {
    STEMS,
    BRANCHES,

    calculate: (yearStr, monthStr, dayStr, timeStr) => {
        const year = parseInt(yearStr);
        const month = parseInt(monthStr);
        const day = parseInt(dayStr);

        const date = new Date(year, month - 1, day);

        // 1. Calculate Saju Year and Month based on Solar Terms
        const { sajuMonth, yearOffset } = Calendar.getSajuMonthParams(date);

        const sajuYear = year + yearOffset;

        // --- Year Pillar ---
        // 1984 = GapJa (Start of cycle).
        // (Year - 4) % 60 = Index (if positive).
        // 1984 - 4 = 1980. 1980 % 60 = 0. Correct.
        let yearGanjiIndex = (sajuYear - 4) % 60;
        if (yearGanjiIndex < 0) yearGanjiIndex += 60;

        const yearStemIdx = yearGanjiIndex % 10;
        const yearBranchIdx = yearGanjiIndex % 12;

        // --- Month Pillar ---
        // Saju Month 1 = Tiger (Branch Index 2 'In')
        // ... Saju Month 11 = Rat (Branch Index 0 'Ja'), Month 12 = Ox (Branch Index 1 'Chuk')
        // WAIT. Distinct mapping: 
        //   Month 1 (Tiger, In) is Branch[2]
        //   Month 2 (Rabbit, Myo) is Branch[3]
        //   ...
        //   Month 11 (Rat, Ja) is Branch[0]
        //   Month 12 (Ox, Chuk) is Branch[1]

        let monthBranchIdx;
        if (sajuMonth === 11) monthBranchIdx = 0; // Ja
        else if (sajuMonth === 12) monthBranchIdx = 1; // Chuk
        else monthBranchIdx = sajuMonth + 1; // 1->2(In), 2->3(Myo)...

        // Month Stem Formula:
        // Derived from Year Stem.
        // Rule: Gap/Gi Years -> Start Month 1 with Byung (2)
        //       Eul/Gyeong -> Start Month 1 with Mu (4)
        //       Byung/Shin -> Start Month 1 with Gyeong (6)
        //       Jung/Im -> Start Month 1 with Im (8)
        //       Mu/Gye -> Start Month 1 with Gap (0)
        // Formula: StartStem = (YearStemIdx % 5 + 1) * 2; result % 10

        const startMonthStemIdx = ((yearStemIdx % 5) + 1) * 2;
        // Offsets: Month 1 adds 0, Month 2 adds 1...
        // But indices wrap 10.
        // Wait, calculate offset from Month 1 (Tiger).
        // Tiger is Month 1.
        // monthBranchIdx is not purely linear 0-11 for month 1-12. (Tiger=2).
        // Let's use `sajuMonth` (1-12) to calculate offset.
        // Offset = sajuMonth - 1.

        const monthStemIdx = (startMonthStemIdx + (sajuMonth - 1)) % 10;

        // --- Day Pillar ---
        // Reference: 1900-01-01 is Gap-Sul (Stem 0, Branch 10, Index 10).
        // Calculate days passed since 1900-01-01.
        const refDate = new Date(1900, 0, 1);
        // Reset hours for accurate diff
        date.setHours(0, 0, 0, 0);
        refDate.setHours(0, 0, 0, 0);

        const diffTime = date.getTime() - refDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        // 1900-01-01 was Ganji Index 10 (GapSul = 0, 10 -> idx 10)
        // Wait, Gap(0) Sul(10). 
        // Sequence: GapJa(0).. GapSul is NOT 10.
        // GapJa(0), EulChuk(1)...
        // Gap(0) matches Branch(10) at index? 
        // 0,10 pair. (0,0)->0, (1,1)->1.. (0,10)?
        // 10 % 10 = 0 (Gap). 10 % 12 = 10 (Sul). Yes, Index 10 is GapSul.

        let dayGanjiIndex = (10 + diffDays) % 60;
        if (dayGanjiIndex < 0) dayGanjiIndex += 60;

        const dayStemIdx = dayGanjiIndex % 10;
        const dayBranchIdx = dayGanjiIndex % 12;

        // --- Hour Pillar ---
        // Determine Branch by Hour input.
        // Ja: 23:00 - 00:59 (Branch 0)
        // Chuk: 01:00 - 02:59 (Branch 1)
        // Formula: HourBranch = floor((hour + 1) / 2) % 12

        let [hh, mm] = timeStr.split(':').map(Number);
        if (!timeStr) hh = 0; // default?

        const hourBranchIdx = Math.floor((hh + 1) / 2) % 12;

        // Hour Stem Formula:
        // Derived from Day Stem.
        // Gap/Gi Day -> Start Ja Hour with Gap (0)
        // Eul/Gyeong Day -> Start Ja Hour with Byung (2)
        // Byung/Shin Day -> Start Ja Hour with Mu (4)
        // Jung/Im Day -> Start Ja Hour with Gyeong (6)
        // Mu/Gye Day -> Start Ja Hour with Im (8)
        // Formula: StartHourStem = (DayStemIdx % 5) * 2;

        const startHourStemIdx = (dayStemIdx % 5) * 2;
        const hourStemIdx = (startHourStemIdx + hourBranchIdx) % 10;

        return {
            year: { stem: STEMS[yearStemIdx], branch: BRANCHES[yearBranchIdx], stemIdx: yearStemIdx, branchIdx: yearBranchIdx },
            month: { stem: STEMS[monthStemIdx], branch: BRANCHES[monthBranchIdx], stemIdx: monthStemIdx, branchIdx: monthBranchIdx },
            day: { stem: STEMS[dayStemIdx], branch: BRANCHES[dayBranchIdx], stemIdx: dayStemIdx, branchIdx: dayBranchIdx },
            hour: { stem: STEMS[hourStemIdx], branch: BRANCHES[hourBranchIdx], stemIdx: hourStemIdx, branchIdx: hourBranchIdx }
        };
    }
};
