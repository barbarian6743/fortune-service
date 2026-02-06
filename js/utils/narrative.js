/**
 * Narrative Generator Utilities
 * 내러티브 생성 함수들
 */

const NarrativeGenerator = {
    /**
     * 십신 친화적 용어 가져오기
     * @param {string} rawTenGod - 원시 십신 문자열
     * @returns {Object} { title, desc }
     */
    getFriendlyTerm(rawTenGod) {
        const key = rawTenGod.split(' ')[0]; // Extract Korean Term
        return window.EASY_TEN_GODS[key] || { title: key, desc: "" };
    },

    /**
     * 오행 내러티브 생성
     * @param {Object} ohaengAnalysis - 오행 분석 결과
     * @returns {Object} { yinyang, dominant, advice }
     */
    generateOhaengNarrative(ohaengAnalysis) {
        // 1. Yin-Yang Analysis
        const yang = ohaengAnalysis.polarities.Yang;
        const yin = ohaengAnalysis.polarities.Yin;

        let yinyangText = "";
        if (yang > yin + 2) {
            yinyangText = "양(Yang)의 기운이 강해 **매우 활동적이고 외향적**입니다. 생각보다 행동이 앞서며, 자신의 감정을 솔직하게 드러냅니다. 에너지가 밖으로 발산되는 타입입니다.";
        } else if (yin > yang + 2) {
            yinyangText = "음(Yin)의 기운이 강해 **차분하고 내향적**입니다. 신중하게 생각한 후 행동하며, 감정을 안으로 삭히는 경향이 있습니다. 에너지를 내면으로 수렴하는 타입입니다.";
        } else {
            yinyangText = "음과 양의 비율이 조화로워 **안정적이고 균형 잡힌** 성향입니다. 상황에 따라 적극성과 신중함을 적절히 발휘할 수 있는 유연함을 가졌습니다.";
        }

        // 2. Element Analysis (Dominant & Lacking)
        const counts = ohaengAnalysis.counts;
        let maxEl = "Wood";
        let maxVal = -1;
        for (const [el, val] of Object.entries(counts)) {
            if (val > maxVal) {
                maxVal = val;
                maxEl = el;
            }
        }

        const lackingEls = ohaengAnalysis.lacking;
        const dominantData = window.OHAENG_NARRATIVE_DB[maxEl];

        let lackingText = "";
        if (lackingEls.length > 0) {
            const lackEl = lackingEls[0];
            const lackData = window.OHAENG_NARRATIVE_DB[lackEl];
            lackingText = `<strong>${window.ELEMENT_TRAITS[lackEl].name}</strong> 기운이 부족합니다. <br>${lackData.lacking}<br>💡 <strong>조언:</strong> ${lackData.advice}`;
        } else {
            lackingText = "오행이 골고루 분포되어 있어 <strong>원만한 기운</strong>을 가졌습니다. 특정 기운에 치우치지 않고 상황에 맞춰 능력을 발휘할 수 있습니다.";
        }

        return {
            yinyang: {
                title: "⚖️ 에너지의 방향 (Yin-Yang)",
                text: yinyangText
            },
            dominant: {
                title: `🚀 핵심 동력 (${window.ELEMENT_TRAITS[maxEl].name})`,
                text: `당신을 움직이는 힘은 <strong>${window.ELEMENT_TRAITS[maxEl].name}</strong> 입니다. <br>${dominantData.dominant}`
            },
            advice: {
                title: "💊 에너지 처방 (Solution)",
                text: lackingText
            }
        };
    },

    /**
     * 명리 내러티브 생성
     * @param {Object} rawTenGods - 십신 데이터
     * @param {Object} narrativeDB - 내러티브 데이터베이스
     * @returns {Object} { thinking, action, social }
     */
    async generateMyungriNarrative(rawTenGods, narrativeDB = null) {
        // Load narrative data if not provided
        if (!narrativeDB) {
            narrativeDB = await window.DataLoader.loadJSON('data/narratives.json');
        }

        const monthStemKey = rawTenGods.monthStem.split(' ')[0];
        const monthStemData = narrativeDB[monthStemKey] || narrativeDB["비견"];

        const monthBranchKey = rawTenGods.monthBranch.split(' ')[0];
        const monthBranchData = narrativeDB[monthBranchKey] || narrativeDB["비견"];

        const dayBranchKey = rawTenGods.dayBranch.split(' ')[0];
        const dayBranchData = narrativeDB[dayBranchKey] || narrativeDB["비견"];

        return {
            thinking: {
                title: "🧠 사고 방식 (Thinking Style)",
                text: `사회 문제를 해결할 때 <strong>${monthStemKey}</strong>의 성향을 보입니다. ${monthStemData.thinking}`
            },
            action: {
                title: "🏃 행동 양식 (Behavior Pattern)",
                text: `실제 현실에서는 <strong>${monthBranchKey}</strong>의 스타일로 움직입니다. ${monthBranchData.action}`
            },
            social: {
                title: "🤝 인간 관계 (Social Strategy)",
                text: `가까운 사람이나 배우자에게는 <strong>${dayBranchKey}</strong>의 모습을 보입니다. ${dayBranchData.social}`
            }
        };
    },

    /**
     * 특별 테마 분석 생성 (재물/건강/관계)
     * @param {Object} pillars - 사주 기둥
     * @param {Object} rawTenGods - 십신 데이터
     * @param {Object} ohaengAnalysis - 오행 분석
     * @param {Object} healthData - 건강 데이터 (선택)
     * @returns {Promise<Object>} { wealth, health, relation }
     */
    async generateSpecialThemeAnalysis(pillars, rawTenGods, ohaengAnalysis, healthData = null) {
        // Load health data if not provided
        if (!healthData) {
            healthData = await window.DataLoader.loadJSON('data/health-data.json');
        }

        // 1. Wealth Luck Analysis
        const dmElement = pillars.day.data.element;
        const elements = ["Wood", "Fire", "Earth", "Metal", "Water"];
        const dmIdx = elements.indexOf(dmElement);
        const wealthIdx = (dmIdx + 2) % 5;
        const wealthElement = elements[wealthIdx];
        const wealthCount = ohaengAnalysis.counts[wealthElement];

        const outputIdx = (dmIdx + 1) % 5;
        const outputElement = elements[outputIdx];
        const outputCount = ohaengAnalysis.counts[outputElement];

        let wealthStrength = "";
        let wealthMethod = "";

        if (wealthCount >= 3) {
            wealthStrength = "매우 강함 (재물이 모이는 힘이 큼)";
            wealthMethod = "사업, 투자 등 규모가 큰 재정 활동에 유리합니다. 현금 흐름을 만드는 능력이 탁월합니다.";
        } else if (wealthCount >= 1) {
            wealthStrength = "보통 (안정적인 재물운)";
            wealthMethod = "꾸준한 근로 소득과 저축을 통해 자산을 불려가는 것이 가장 안전하고 빠릅니다.";
        } else {
            wealthStrength = "약함 (재물 관리가 중요)";
            wealthMethod = "큰 돈을 벌기보다는, 새어나가는 돈을 막는 '수성(守城)'의 자세가 필요합니다. 전문 기술로 승부하세요.";
        }

        if (outputCount >= 2) {
            wealthStrength += " + 식상생재(재주로 돈을 범)";
            wealthMethod += " 본인의 창의적인 재능이나 기술이 곧 수익으로 연결되는 구조입니다.";
        }

        // 2. Health Luck Analysis
        let minVal = 99;
        let weakestEl = "";
        for (const [el, val] of Object.entries(ohaengAnalysis.counts)) {
            if (val < minVal) {
                minVal = val;
                weakestEl = el;
            }
        }

        // 3. Relationship Luck Analysis
        const spouseTenGod = this.getFriendlyTerm(rawTenGods.dayBranch);
        let spouseDesc = `배우자 자리에 <strong>${spouseTenGod.title}</strong>이(가) 있습니다. <br>${spouseTenGod.desc} 성향의 배우자와 인연이 깊거나, 결혼 후 본인이 그런 모습을 보이게 됩니다.`;

        const childTenGod = this.getFriendlyTerm(rawTenGods.hourStem);
        let childDesc = `자녀 궁에 <strong>${childTenGod.title}</strong>이(가) 있습니다. <br>자녀가 ${childTenGod.desc} 성향을 보이거나, 말년에 자녀와의 관계가 이러한 양상을 띱니다.`;

        return {
            wealth: {
                strength: wealthStrength,
                method: wealthMethod,
                activity: `<strong>${window.ELEMENT_TRAITS[wealthElement].name}</strong> 관련 분야 (유통, 금융, 제조 등)`,
                timing: `대운이나 세운에서 <strong>${window.ELEMENT_TRAITS[wealthElement].name}</strong> 기운이 들어올 때`
            },
            health: {
                weakest: `${window.ELEMENT_TRAITS[weakestEl].name} (개수: ${minVal})`,
                organs: healthData[weakestEl].organs,
                advice: healthData[weakestEl].advice,
                timing: `세운에서 <strong>${window.ELEMENT_TRAITS[weakestEl].name}</strong>을 극(Attack)하는 기운이 올 때`
            },
            relation: {
                spouse: spouseDesc,
                children: childDesc
            }
        };
    },

    /**
     * 사회적 내러티브 가져오기
     * @param {string} tenGod - 십신
     * @param {Object} narrativeDB - 내러티브 데이터베이스
     * @returns {string} 사회적 설명
     */
    getSocialNarrative(tenGod, narrativeDB) {
        const key = tenGod.split(' ')[0];
        return narrativeDB[key] ? narrativeDB[key].social : "원만한 관계";
    },

    /**
     * 직업 조언 생성
     * @param {string} element - 오행 원소
     * @param {string} tenGod - 십신
     * @param {Object} careerData - 직업 데이터
     * @param {Object} narrativeDB - 내러티브 데이터베이스
     * @returns {string} HTML 문자열
     */
    getCareerAdvice(element, tenGod, careerData, narrativeDB) {
        const jobs = careerData[element] || "자유 전문직";
        const key = tenGod.split(' ')[0];
        const action = narrativeDB[key] ? narrativeDB[key].action : "자유롭게 활동";

        return `<strong>추천 분야:</strong> ${jobs} 관련 업종.<br>
                <strong>직무 스타일:</strong> ${action}`;
    }
};

// Export
window.NarrativeGenerator = NarrativeGenerator;
