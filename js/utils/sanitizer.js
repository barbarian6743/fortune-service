/**
 * HTML Sanitizer
 * XSS 공격 방지를 위한 입력 정제 함수
 */

const Sanitizer = {
    /**
     * HTML 특수문자를 이스케이프
     * @param {string} str - 정제할 문자열
     * @returns {string} 정제된 문자열
     */
    escapeHtml(str) {
        if (typeof str !== 'string') return '';

        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    /**
     * 안전한 HTML 속성값 생성
     * @param {string} value - 속성값
     * @returns {string} 정제된 속성값
     */
    sanitizeAttribute(value) {
        if (typeof value !== 'string') return '';

        return value
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    },

    /**
     * URL 검증 및 정제
     * @param {string} url - 검증할 URL
     * @returns {string|null} 안전한 URL 또는 null
     */
    sanitizeUrl(url) {
        if (typeof url !== 'string') return null;

        // javascript:, data: 등 위험한 프로토콜 차단
        const dangerousProtocols = /^(javascript|data|vbscript):/i;
        if (dangerousProtocols.test(url)) {
            return null;
        }

        return url;
    },

    /**
     * 안전한 innerHTML 설정
     * @param {HTMLElement} element - 대상 엘리먼트
     * @param {string} html - 설정할 HTML (이미 검증된 것으로 가정)
     */
    setInnerHTML(element, html) {
        if (!element || typeof html !== 'string') return;

        // 기본적인 스크립트 태그 제거
        const sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        element.innerHTML = sanitized;
    }
};

// Export
window.Sanitizer = Sanitizer;
