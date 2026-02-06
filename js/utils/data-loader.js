/**
 * Data Loader Utility (Standalone Version)
 * 웹 서버 없이도 작동 - 내장된 데이터 사용
 */

const DataLoader = {
    cache: {},

    /**
     * JSON 파일 로드 (내장 데이터 사용)
     * @param {string} path - 파일 경로 (호환성을 위해 유지)
     * @returns {Promise<Object>} 로드된 데이터
     */
    async loadJSON(path) {
        // 캐시 확인
        if (this.cache[path]) {
            return this.cache[path];
        }

        // 내장 데이터 사용 (즉시 반환)
        let data = null;

        if (path.includes('narratives.json')) {
            data = window.EMBEDDED_DATA.narratives;
        } else if (path.includes('health-data.json')) {
            data = window.EMBEDDED_DATA.healthData;
        } else if (path.includes('career-advice.json')) {
            data = window.EMBEDDED_DATA.careerAdvice;
        }

        if (data) {
            this.cache[path] = data;
            return Promise.resolve(data);
        }

        // 데이터를 찾을 수 없는 경우
        return Promise.reject(new Error(`Data not found for path: ${path}`));
    },

    /**
     * 모든 데이터 파일 로드
     * @returns {Promise<Object>} 모든 데이터
     */
    async loadAll() {
        return Promise.resolve({
            narratives: window.EMBEDDED_DATA.narratives,
            healthData: window.EMBEDDED_DATA.healthData,
            careerAdvice: window.EMBEDDED_DATA.careerAdvice
        });
    }
};

// Export
window.DataLoader = DataLoader;
