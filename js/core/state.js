/**
 * Fortune State Manager
 * 전역 상태를 관리하는 클래스
 */
class FortuneState {
    constructor() {
        this.pillars = null;
        this.ohaeng = null;
        this.tenGods = null;
        this.daewoon = null;
        this.narrative = null;
        this.themes = null;
        this.rawData = null;
        this.cachedSummaryHtml = null;
    }

    // Setters
    setPillars(pillars) { this.pillars = pillars; }
    setOhaeng(ohaeng) { this.ohaeng = ohaeng; }
    setTenGods(tenGods) { this.tenGods = tenGods; }
    setDaewoon(daewoon) { this.daewoon = daewoon; }
    setNarrative(narrative) { this.narrative = narrative; }
    setThemes(themes) { this.themes = themes; }
    setRawData(data) { this.rawData = data; }
    setCachedSummary(html) { this.cachedSummaryHtml = html; }

    // Getters
    getPillars() { return this.pillars; }
    getOhaeng() { return this.ohaeng; }
    getTenGods() { return this.tenGods; }
    getDaewoon() { return this.daewoon; }
    getNarrative() { return this.narrative; }
    getThemes() { return this.themes; }
    getRawData() { return this.rawData; }
    getCachedSummary() { return this.cachedSummaryHtml; }

    // Reset
    reset() {
        this.pillars = null;
        this.ohaeng = null;
        this.tenGods = null;
        this.daewoon = null;
        this.narrative = null;
        this.themes = null;
        this.rawData = null;
        this.cachedSummaryHtml = null;
    }

    // Check if all required data is loaded
    isReady() {
        return this.pillars !== null &&
            this.ohaeng !== null &&
            this.tenGods !== null;
    }
}

// Export singleton instance
window.FortuneState = new FortuneState();
