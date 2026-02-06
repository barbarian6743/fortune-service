/**
 * Constants and Data Mappings
 * 전역 상수 및 데이터 매핑
 */

// 십신 친화적 표현
const EASY_TEN_GODS = {
    "비견": { title: "비견 (자아)", desc: "주체적이고 독립적인 자아" },
    "겁재": { title: "겁재 (경쟁)", desc: "강한 승부욕과 투쟁심" },
    "식신": { title: "식신 (표현)", desc: "순수한 창작과 탐구 능력" },
    "상관": { title: "상관 (파격)", desc: "기존 질서를 깨는 혁신성" },
    "편재": { title: "편재 (확장)", desc: "넓은 영역을 통제하는 힘" },
    "정재": { title: "정재 (축적)", desc: "꼼꼼하고 현실적인 관리 능력" },
    "편관": { title: "편관 (권위)", desc: "엄격한 규율과 카리스마" },
    "정관": { title: "정관 (규범)", desc: "합리적이고 모범적인 태도" },
    "편인": { title: "편인 (통찰)", desc: "본질을 꿰뚫는 직관력" },
    "정인": { title: "정인 (수용)", desc: "지식과 사랑을 받아들이는 힘" }
};

// 오행 특성
const ELEMENT_TRAITS = {
    "Wood": { name: "목(Wood)", trait: "성장/시작", color: "#4CAF50" },
    "Fire": { name: "화(Fire)", trait: "확산/열정", color: "#F44336" },
    "Earth": { name: "토(Earth)", trait: "중재/기반", color: "#FF9800" },
    "Metal": { name: "금(Metal)", trait: "결실/규칙", color: "#9E9E9E" },
    "Water": { name: "수(Water)", trait: "지혜/휴식", color: "#2196F3" },
    // Index Mapping
    0: { name: "목(Wood)", trait: "성장", color: "#4CAF50" },
    1: { name: "화(Fire)", trait: "열정", color: "#F44336" },
    2: { name: "토(Earth)", trait: "신뢰", color: "#FF9800" },
    3: { name: "금(Metal)", trait: "결단", color: "#9E9E9E" },
    4: { name: "수(Water)", trait: "지혜", color: "#2196F3" }
};

// 오행 내러티브 데이터
const OHAENG_NARRATIVE_DB = {
    "Wood": {
        dominant: "성장 욕구가 강하고, 새로운 일을 시작하는 추진력이 뛰어납니다. 긍정적이고 의욕적이지만, 마무리가 약하거나 충동적일 수 있습니다.",
        lacking: "시작하는 힘이 부족하여 주저하기 쉽습니다. 끈기는 있으나 변화를 두려워하고 안주하려는 경향이 있습니다.",
        advice: "작은 목표를 세워 성취감을 맛보고, 초록색 식물을 가까이 하거나 등산을 하는 것이 도움이 됩니다."
    },
    "Fire": {
        dominant: "열정이 넘치고 감정 표현이 솔직합니다. 활동적이고 화려함을 쫓지만, 감정 기복이 심하고 쉽게 싫증을 낼 수 있습니다.",
        lacking: "매사에 소극적이거나 냉소적일 수 있습니다. 표현력이 부족해 오해를 사기 쉬우며, 몸이 차가울 수 있습니다.",
        advice: "붉은 계열의 옷이나 소품을 활용하고, 햇볕을 자주 쬐며 심장 박동이 빨라지는 운동을 하세요."
    },
    "Earth": {
        dominant: "믿음직스럽고 포용력이 있습니다. 중재자 역할을 잘하지만, 고집이 세고 변화에 둔감하여 독단적으로 보일 수 있습니다.",
        lacking: "정착하지 못하고 마음이 불안정할 수 있습니다. 끈기가 부족해 중도에 포기하거나 사람을 잘 믿지 못합니다.",
        advice: "맨발로 흙을 밟거나 노란색 계열의 음식을 섭취하여 중심을 잡는 것이 좋습니다."
    },
    "Metal": {
        dominant: "결단력이 있고 원칙을 중요시합니다. 맺고 끊음이 확실하지만, 너무 냉정하거나 강박적인 성향을 보일 수 있습니다.",
        lacking: "우유부단하여 결정을 내리기 어려워합니다. 거절을 잘 못해 손해를 보거나, 실행력이 떨어질 수 있습니다.",
        advice: "흰색 옷을 입거나 금속 장신구를 착용하고, 규칙적인 운동으로 폐활량을 키우세요."
    },
    "Water": {
        dominant: "지혜롭고 유연하며 임기응변에 능합니다. 생각이 깊지만, 너무 비밀스럽거나 우울감에 빠지기 쉽습니다.",
        lacking: "융통성이 부족하고 생각이 짧을 수 있습니다. 휴식을 취하지 못해 과로하기 쉬우며, 신장/방광 건강에 유의해야 합니다.",
        advice: "검은색 아이템을 활용하고, 물을 자주 마시거나 수영/반신욕을 하는 것이 기운을 보충해줍니다."
    }
};

// Export
window.EASY_TEN_GODS = EASY_TEN_GODS;
window.ELEMENT_TRAITS = ELEMENT_TRAITS;
window.OHAENG_NARRATIVE_DB = OHAENG_NARRATIVE_DB;
