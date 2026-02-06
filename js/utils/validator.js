/**
 * Input Validator
 * 사용자 입력 검증 유틸리티
 */

const Validator = {
    /**
     * 날짜 유효성 검증
     * @param {string} dateStr - YYYY-MM-DD 형식의 날짜 문자열
     * @returns {Object} { valid: boolean, error: string|null }
     */
    validateDate(dateStr) {
        if (!dateStr) {
            return { valid: false, error: '날짜를 입력해주세요.' };
        }

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(dateStr)) {
            return { valid: false, error: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' };
        }

        const [year, month, day] = dateStr.split('-').map(Number);

        // 연도 범위 검증 (1900-2100)
        if (year < 1900 || year > 2100) {
            return { valid: false, error: '연도는 1900년부터 2100년 사이여야 합니다.' };
        }

        // 월 범위 검증
        if (month < 1 || month > 12) {
            return { valid: false, error: '월은 1부터 12 사이여야 합니다.' };
        }

        // 일 범위 검증
        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
            return { valid: false, error: `${month}월은 ${daysInMonth}일까지 있습니다.` };
        }

        // 실제 Date 객체 생성 가능 여부 확인
        const date = new Date(year, month - 1, day);
        if (isNaN(date.getTime())) {
            return { valid: false, error: '유효하지 않은 날짜입니다.' };
        }

        return { valid: true, error: null };
    },

    /**
     * 시간 유효성 검증
     * @param {string} timeStr - HH:MM 형식의 시간 문자열
     * @returns {Object} { valid: boolean, error: string|null }
     */
    validateTime(timeStr) {
        if (!timeStr) {
            return { valid: false, error: '시간을 입력해주세요.' };
        }

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!timeRegex.test(timeStr)) {
            return { valid: false, error: '올바른 시간 형식이 아닙니다. (HH:MM)' };
        }

        return { valid: true, error: null };
    },

    /**
     * 성별 유효성 검증
     * @param {string} gender - 'male' 또는 'female'
     * @returns {Object} { valid: boolean, error: string|null }
     */
    validateGender(gender) {
        if (!gender) {
            return { valid: false, error: '성별을 선택해주세요.' };
        }

        if (gender !== 'male' && gender !== 'female') {
            return { valid: false, error: '올바른 성별을 선택해주세요.' };
        }

        return { valid: true, error: null };
    },

    /**
     * 모든 입력 검증
     * @param {Object} inputs - { gender, birth, time }
     * @returns {Object} { valid: boolean, errors: Array }
     */
    validateAll(inputs) {
        const errors = [];

        const genderCheck = this.validateGender(inputs.gender);
        if (!genderCheck.valid) errors.push(genderCheck.error);

        const dateCheck = this.validateDate(inputs.birth);
        if (!dateCheck.valid) errors.push(dateCheck.error);

        const timeCheck = this.validateTime(inputs.time);
        if (!timeCheck.valid) errors.push(timeCheck.error);

        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
};

// Export
window.Validator = Validator;
