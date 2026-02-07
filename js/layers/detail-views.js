/**
 * Layer Detail Views
 * 각 레이어의 상세 뷰 렌더링 함수
 */

const LayerDetailViews = {
    /**
     * 레이어 1: 천문 역법 상세 뷰
     */
    renderLayer1Detail(birth, time, pillars) {
        const state = window.FortuneState;
        const p = state.getPillars();
        const traits = window.ELEMENT_TRAITS;
        const i18n = window.i18n;

        const renderChar = (charData, isDayMaster = false) => {
            if (!charData || !charData.element) {
                return `<div style="background:rgba(255,255,255,0.03); border-radius:12px; padding:15px; text-align:center; color:var(--text-muted);">?</div>`;
            }
            const color = traits[charData.element] ? traits[charData.element].color : '#ccc';
            const polarityStr = charData.polarity === '+' ? '陽' : '陰';
            const rawElementName = traits[charData.element] ? traits[charData.element].name.split('(')[0] : '미정';
            const elementName = i18n ? i18n.t(charData.element) : rawElementName;

            return `
                <div style="
                    background: rgba(255,255,255,0.03); 
                    border: 1px solid ${isDayMaster ? 'gold' : 'rgba(255,255,255,0.1)'}; 
                    border-radius: 12px; 
                    padding: 15px 5px; 
                    text-align: center;
                    position: relative;
                    ${isDayMaster ? 'box-shadow: 0 0 15px rgba(255,215,0,0.2);' : ''}
                ">
                    <div style="color:${color}; font-size: 1.8rem; font-weight: bold; margin-bottom: 5px;">${charData.hanja || '?'}</div>
                    <div style="font-size: 0.85rem; color: #ccc;">${charData.ko || ''}</div>
                    <div style="font-size: 0.7rem; color: ${color}; margin-top: 5px; opacity: 0.8;">
                        ${elementName} (${polarityStr})
                    </div>
                    ${isDayMaster ? '<div style="position:absolute; top:-10px; right:-5px; background:gold; color:black; font-size:0.6rem; padding:2px 5px; border-radius:4px; font-weight:bold;">ME</div>' : ''}
                </div>
            `;
        };

        return `
            <div class="detail-view">
                <h2 style="color:var(--accent); margin-bottom:20px;">${i18n ? i18n.t('layer1_detail_title') : '📅 제1장. 천문 역법 (상세)'}</h2>
                
                <div class="interpretation-card">
                    <h3>${i18n ? i18n.t('layer1_info_title') : '🌍 입력 정보 및 계산 기준'}</h3>
                    <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:10px;">
                        <p style="margin:0;"><strong>${i18n ? i18n.t('layer1_info_label') : '기준 생년월일:'}</strong> ${birth} (${time})</p>
                        <span class="badge" style="background:rgba(255,255,255,0.1); font-size:0.8rem;">${i18n ? i18n.t('layer1_info_badge') : '태양 황도 좌표 기준'}</span>
                    </div>
                    <p style="color:var(--text-muted); font-size:0.85rem; margin-top:12px; line-height:1.6;">
                        ${i18n ? i18n.t('layer1_info_desc') : '사주(四柱)는 태어난 연, 월, 일, 시의 4가지 기둥을 의미합니다. 특히 월(月)은 단순히 달력이 아닌 24절기(지구와 태양의 각도)를 기준으로 산출되는 가장 정밀한 천문 시계입니다.'}
                    </p>
                </div>

                <div class="interpretation-card">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                        <h3 style="margin:0;">${i18n ? i18n.t('layer1_chart_title') : '🔢 사주팔자 (四柱八字) 좌표계'}</h3>
                        <span style="font-size:0.8rem; color:var(--text-muted);">${i18n ? i18n.t('layer1_chart_order') : '* 오른쪽에서 왼쪽 순 (년→월→일→시)'}</span>
                    </div>
                    
                    <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px;">
                        <!-- Labels -->
                        <div style="text-align:center; color:var(--text-muted); font-size:0.75rem;">${i18n ? i18n.t('layer1_pillar_hour') : '시주 (Time)'}</div>
                        <div style="text-align:center; color:var(--accent); font-size:0.75rem; font-weight:bold;">${i18n ? i18n.t('layer1_pillar_day') : '일주 (Day)'}</div>
                        <div style="text-align:center; color:var(--text-muted); font-size:0.75rem;">${i18n ? i18n.t('layer1_pillar_month') : '월주 (Month)'}</div>
                        <div style="text-align:center; color:var(--text-muted); font-size:0.75rem;">${i18n ? i18n.t('layer1_pillar_year') : '년주 (Year)'}</div>

                        <!-- Heavenly Stems (Top row) -->
                        ${renderChar(p.hour.data)}
                        ${renderChar(p.day.data, true)}
                        ${renderChar(p.month.data)}
                        ${renderChar(p.year.data)}

                        <!-- Earthly Branches (Bottom row) -->
                        ${renderChar(p.hour.branchData)}
                        ${renderChar(p.day.branchData)}
                        ${renderChar(p.month.branchData)}
                        ${renderChar(p.year.branchData)}

                        <!-- Stem/Branch Labels side -->
                        <div style="grid-column: 1 / 5; display: flex; justify-content: space-between; margin-top: 5px; padding: 0 5px;">
                            <span style="font-size:0.7rem; color:var(--text-muted);">${i18n ? i18n.t('layer1_stem_label') : '▲ 천간 (정신/생각)'}</span>
                            <span style="font-size:0.7rem; color:var(--text-muted);">${i18n ? i18n.t('layer1_branch_label') : '▼ 지지 (현실/환경)'}</span>
                        </div>
                    </div>

                    <div style="margin-top:20px; padding:15px; background:rgba(0,0,0,0.2); border-radius:10px; font-size:0.9rem; line-height:1.7;">
                        <p style="margin-top:0;"><strong>${i18n ? i18n.t('layer1_how_to_read') : '💡 좌표 읽는 법:'}</strong></p>
                        <ul style="padding-left:18px; margin-bottom:0; color:#ccc;">
                            <li>${i18n ? i18n.t('layer1_how_to_read_1') : '위쪽의 4글자(천간)는 당신의 <strong>드러나는 성격과 생각</strong>을 나타냅니다.'}</li>
                            <li>${i18n ? i18n.t('layer1_how_to_read_2') : '아래쪽의 4글자(지지)는 당신을 둘러싼 <strong>실제 환경과 신체적 기운</strong>입니다.'}</li>
                            <li>${i18n ? i18n.t('layer1_how_to_read_3').replace('<span style=\"color:gold; font-weight:bold;\">ME</span>', '<span style=\"color:gold; font-weight:bold;\">ME</span>') : '황색 박스(<span style=\"color:gold; font-weight:bold;\">ME</span>)로 표시된 <strong>일간</strong>이 바로 \'사주의 주인공\'인 당신 자신입니다.'}</li>
                        </ul>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>${i18n ? i18n.t('layer1_pillar_meaning_title') : '📖 각 기둥(柱)의 생애 주기와 의미'}</h3>
                    <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px;">
                        <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:8px;">
                            <h4 style="margin:0 0 5px 0; font-size:0.9rem; color:var(--accent);">${i18n ? i18n.t('layer1_pillar_year_name') : '년주 (年柱): 뿌리'}</h4>
                            <p style="margin:0; font-size:0.8rem; color:#aaa;">${i18n ? i18n.t('layer1_pillar_year_desc') : '조상, 부모님의 배경, 유년기(0~15세)의 기운을 담고 있습니다.'}</p>
                        </div>
                        <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:8px;">
                            <h4 style="margin:0 0 5px 0; font-size:0.9rem; color:var(--accent);">${i18n ? i18n.t('layer1_pillar_month_name') : '월주 (月柱): 기둥'}</h4>
                            <p style="margin:0; font-size:0.8rem; color:#aaa;">${i18n ? i18n.t('layer1_pillar_month_desc') : '사회적 성공, 직업운, 청년기(16~30세)의 가장 활동적인 환경입니다.'}</p>
                        </div>
                        <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:8px; border-left:2px solid gold;">
                            <h4 style="margin:0 0 5px 0; font-size:0.9rem; color:gold;">${i18n ? i18n.t('layer1_pillar_day_name') : '일주 (日柱): 나'}</h4>
                            <p style="margin:0; font-size:0.8rem; color:#aaa;">${i18n ? i18n.t('layer1_pillar_day_desc') : '자아 정체성, 배우자와의 관계, 중년기(31~45세)의 핵심입니다.'}</p>
                        </div>
                        <div style="background:rgba(255,255,255,0.03); padding:12px; border-radius:8px;">
                            <h4 style="margin:0 0 5px 0; font-size:0.9rem; color:var(--accent);">${i18n ? i18n.t('layer1_pillar_hour_name') : '시주 (時柱): 열매'}</h4>
                            <p style="margin:0; font-size:0.8rem; color:#aaa;">${i18n ? i18n.t('layer1_pillar_hour_desc') : '말년운, 자녀복, 결과물, 노년기(46세 이후)의 가치를 의미합니다.'}</p>
                        </div>
                    </div>
                </div>

                ${this.getBackButton()}
            </div>
        `;
    },

    /**
     * 레이어 2: 음양오행 상세 뷰
     */
    renderLayer2Detail(ohaengAnalysis, ohaengNarrative) {
        const counts = ohaengAnalysis.counts;
        const totalEnergy = Object.values(counts).reduce((a, b) => a + b, 0);
        const i18n = window.i18n;

        return `
            <div class="detail-view">
                <h2 style="color:#4CAF50; margin-bottom:20px;">🌳 ${i18n ? i18n.t('layer2_detail_title') : '제2장. 음양오행 (상세)'}</h2>
                
                <div class="interpretation-card">
                    <h3>⚖️ ${ohaengNarrative.yinyang.title}</h3>
                    <p>${ohaengNarrative.yinyang.text}</p>
                    <div style="margin-top:15px; padding:10px; background:rgba(255,255,255,0.05); border-radius:6px;">
                        <strong>${i18n ? i18n.t('layer2_ratio_label').replace('{yang}', ohaengAnalysis.polarities.Yang).replace('{yin}', ohaengAnalysis.polarities.Yin) : `음양 비율: 양(Yang) ${ohaengAnalysis.polarities.Yang} : 음(Yin) ${ohaengAnalysis.polarities.Yin}`}</strong>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>🎨 ${i18n ? i18n.t('layer2_dist_title') : '오행 분포 상세'}</h3>
                    ${Object.keys(counts).map(el => {
            const percent = ((counts[el] / totalEnergy) * 100).toFixed(1);
            const trait = window.ELEMENT_TRAITS[el];
            const translatedName = i18n ? i18n.t(el) : trait.name;
            const translatedTrait = i18n ? i18n.t('el_trait_' + el.toLowerCase()) : trait.trait;
            const unit = i18n && i18n.currentLang === 'en' ? 'pts' : '개';
            return `
                            <div style="margin-bottom:15px;">
                                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                    <span><strong>${translatedName}</strong> (${translatedTrait})</span>
                                    <span>${counts[el]}${unit} (${percent}%)</span>
                                </div>
                                <div style="height:20px; background:#333; border-radius:10px; overflow:hidden;">
                                    <div style="width:${percent}%; height:100%; background:${trait.color}; transition:width 0.5s;"></div>
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>

                <div class="interpretation-card">
                    <h3>🚀 ${ohaengNarrative.dominant.title}</h3>
                    <p>${ohaengNarrative.dominant.text}</p>
                </div>

                <div class="interpretation-card">
                    <h3>💊 ${ohaengNarrative.advice.title}</h3>
                    <p>${ohaengNarrative.advice.text}</p>
                </div>

                ${this.getBackButton()}
            </div>
        `;
    },

    /**
     * 레이어 3: 명리 구조 상세 뷰
     */
    renderLayer3Detail(pillars, rawTenGods, narrative) {
        const getFriendlyTerm = window.NarrativeGenerator.getFriendlyTerm;
        const i18n = window.i18n;

        return `
            <div class="detail-view">
                <h2 style="color:#2196F3; margin-bottom:20px;">🎯 ${i18n ? i18n.t('layer3_detail_title') : '제3장. 명리학적 구조 (상세)'}</h2>
                
                <div class="interpretation-card">
                    <h3>🧠 ${narrative.thinking.title}</h3>
                    <p>${narrative.thinking.text}</p>
                    <div style="margin-top:10px; padding:10px; background:rgba(33,150,243,0.1); border-left:3px solid #2196F3;">
                        <strong>${i18n ? i18n.t('month_stem') : '월간(月干)'}:</strong> ${getFriendlyTerm(rawTenGods.monthStem).title}<br>
                        <small style="color:var(--text-muted);">${getFriendlyTerm(rawTenGods.monthStem).desc}</small>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>🏃 ${narrative.action.title}</h3>
                    <p>${narrative.action.text}</p>
                    <div style="margin-top:10px; padding:10px; background:rgba(33,150,243,0.1); border-left:3px solid #2196F3;">
                        <strong>${i18n ? i18n.t('month_branch') : '월지(月支)'}:</strong> ${getFriendlyTerm(rawTenGods.monthBranch).title}<br>
                        <small style="color:var(--text-muted);">${getFriendlyTerm(rawTenGods.monthBranch).desc}</small>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>🤝 ${narrative.social.title}</h3>
                    <p>${narrative.social.text}</p>
                    <div style="margin-top:10px; padding:10px; background:rgba(33,150,243,0.1); border-left:3px solid #2196F3;">
                        <strong>${i18n ? i18n.t('day_branch') : '일지(日支)'}:</strong> ${getFriendlyTerm(rawTenGods.dayBranch).title}<br>
                        <small style="color:var(--text-muted);">${getFriendlyTerm(rawTenGods.dayBranch).desc}</small>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>📊 ${i18n ? i18n.t('layer3_era_analysis') : '전체 십신 구조 및 인생 시기별 해석'}</h3>
                    
                    <div class="detail-section">
                        <h4 style="color:var(--accent);">${i18n ? i18n.t('layer3_era_1') : '1. 초년운 (뿌리/가문) - 년주'}</h4>
                        <p><strong>${pillars.year.data.hanja}${pillars.year.branchData.hanja} (${getFriendlyTerm(rawTenGods.yearStem).title})</strong></p>
                        <p>${i18n ? i18n.t('layer3_era_1_desc').replace('{desc}', getFriendlyTerm(rawTenGods.yearStem).desc) : `당신의 어린 시절 환경과 가문의 분위기를 의미합니다. 초년에 형성된 가치관이나 유산이 현재의 당신에게 <strong>${getFriendlyTerm(rawTenGods.yearStem).desc}</strong>(으)로 영향을 미치고 있습니다.`}</p>
                    </div>

                    <div class="detail-section">
                        <h4 style="color:var(--accent);">${i18n ? i18n.t('layer3_era_2') : '2. 청년/사회운 (직업/환경) - 월주'}</h4>
                        <p><strong>${pillars.month.data.hanja}${pillars.month.branchData.hanja} (${getFriendlyTerm(rawTenGods.monthBranch).title})</strong></p>
                        <p>${i18n ? i18n.t('layer3_era_2_desc').replace('{desc}', window.NarrativeGenerator.getSocialNarrative(rawTenGods.monthBranch)) : '가장 활발하게 활동하는 시기의 사회적 환경입니다. 당신은 사회에서 <strong>${window.NarrativeGenerator.getSocialNarrative(rawTenGods.monthBranch)}</strong> 스타일로 성공을 추구해야 합니다.'}</p>
                    </div>

                    <div class="detail-section">
                        <h3 style="color:var(--accent);">${i18n ? i18n.t('layer3_social_strategy') : '🎯 성취 및 사회 활동 스타일'}</h3>
                        <p>${narrative.social.text}</p>
                        <div style="margin-top:10px; padding:12px; background:rgba(33,150,243,0.05); border-radius:8px;">
                            <strong>${i18n ? i18n.t('layer3_social_strategy_label') : '사회궁 전략'}:</strong> ${getFriendlyTerm(rawTenGods.monthBranch).desc}
                        </div>
                    </div>
                    <div class="detail-section">
                        <h4 style="color:var(--accent);">${i18n ? i18n.t('layer3_era_3') : '3. 중년/본원 (자아/배우자) - 일주'}</h4>
                        <p><strong>${pillars.day.data.hanja}${pillars.day.branchData.hanja} (${getFriendlyTerm(rawTenGods.dayBranch).title})</strong></p>
                        <p>${i18n ? i18n.t('layer3_era_3_desc').replace('{desc}', getFriendlyTerm(rawTenGods.dayBranch).desc) : `당신의 핵심 자아와 배우자 자리를 의미합니다. 개인적인 공간에서는 <strong>${getFriendlyTerm(rawTenGods.dayBranch).desc}</strong> 성향을 추구하며 마음의 안정을 찾습니다.`}</p>
                    </div>

                    <div class="detail-section">
                        <h4 style="color:var(--accent);">${i18n ? i18n.t('layer3_era_4') : '4. 말년/미래운 (자녀/결실) - 시주'}</h4>
                        <p><strong>${pillars.hour.data.hanja}${pillars.hour.branchData.hanja} (${getFriendlyTerm(rawTenGods.hourStem).title})</strong></p>
                        <p>${i18n ? i18n.t('layer3_era_4_desc').replace('{desc}', getFriendlyTerm(rawTenGods.hourStem).desc) : `인생의 최종 지향점입니다. 나이가 들수록 <strong>${getFriendlyTerm(rawTenGods.hourStem).desc}</strong>의 가치를 실현하고자 하며, 자녀와의 관계에서도 이러한 특성이 나타납니다.`}</p>
                    </div>

                    <table style="width:100%; border-collapse:collapse; margin-top:20px;">
                        <thead>
                            <tr style="background:rgba(255,255,255,0.1);">
                                <th style="padding:10px; text-align:left;">${i18n ? i18n.t('layer3_table_location') : '위치'}</th>
                                <th style="padding:10px; text-align:left;">${i18n ? i18n.t('layer3_table_stem') : '천간'}</th>
                                <th style="padding:10px; text-align:left;">${i18n ? i18n.t('layer3_table_branch') : '지지'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${i18n ? i18n.t('layer1_pillar_hour').split(' ')[0] : '시주'}</td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${getFriendlyTerm(rawTenGods.hourStem).title}</td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${getFriendlyTerm(rawTenGods.hourBranch).title}</td>
                            </tr>
                            <tr style="background:rgba(255,215,0,0.1);">
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);"><strong>${i18n ? i18n.t('layer1_pillar_day').split(' ')[0] : '일주'} ★</strong></td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);"><strong>${i18n ? i18n.t('layer4_identity_title').split(' ')[0] : '본원 (나)'}</strong></td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);"><strong>${getFriendlyTerm(rawTenGods.dayBranch).title}</strong></td>
                            </tr>
                            <tr>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${i18n ? i18n.t('layer1_pillar_month').split(' ')[0] : '월주'}</td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${getFriendlyTerm(rawTenGods.monthStem).title}</td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${getFriendlyTerm(rawTenGods.monthBranch).title}</td>
                            </tr>
                            <tr>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${i18n ? i18n.t('layer1_pillar_year').split(' ')[0] : '년주'}</td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${getFriendlyTerm(rawTenGods.yearStem).title}</td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${getFriendlyTerm(rawTenGods.yearBranch).title}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                ${this.getBackButton()}
            </div>
        `;
    },

    /**
     * 레이어 4: 현실 연결 상세 뷰
     */
    renderLayer4Detail(pillars, rawTenGods, ohaengAnalysis, daewoonList) {
        const dayElName = pillars.day.data.element;
        const myElement = window.ELEMENT_TRAITS[dayElName];
        const i18n = window.i18n;

        // Helper function to get element description
        const getElementDescription = (element) => {
            const elKey = element.toLowerCase();
            return {
                energy: i18n ? i18n.t(`desc_${elKey}_energy`) : '에너지',
                trait: i18n ? i18n.t(`desc_${elKey}_trait`) : '특성',
                advice: i18n ? i18n.t(`desc_${elKey}_advice`) : '조언'
            };
        };

        // Helper function to get life phase name
        const getLifePhase = (age) => {
            if (!i18n) {
                if (age < 10) return '유년기 (幼年期)';
                if (age < 20) return '청소년기 (靑少年期)';
                if (age < 30) return '청년기 (靑年期)';
                if (age < 40) return '장년기 (壯年期)';
                if (age < 50) return '중년기 (中年期)';
                if (age < 60) return '중후년기 (中後年期)';
                if (age < 70) return '노년기 (老年期)';
                return '고령기 (高齡期)';
            }
            if (age < 10) return i18n.t('age_child');
            if (age < 20) return i18n.t('age_teen');
            if (age < 30) return i18n.t('age_youth');
            if (age < 40) return i18n.t('age_adult');
            if (age < 50) return i18n.t('age_middle');
            if (age < 60) return i18n.t('age_mature');
            if (age < 70) return i18n.t('age_elder');
            return i18n.t('age_senior');
        };

        // Helper function to analyze compatibility with birth chart
        const analyzeDaewoonCompatibility = (dwElement, birthOhaeng) => {
            if (!birthOhaeng || !birthOhaeng.counts) return { level: i18n ? i18n.t('luck_normal') : '보통', color: '#FFC107', description: i18n ? i18n.t('luck_normal_desc') : '평범한 시기입니다.' };
            const count = birthOhaeng.counts[dwElement];
            if (count === 0) {
                return {
                    level: i18n ? i18n.t('luck_great') : '매우 유리',
                    color: '#4CAF50',
                    description: i18n ? i18n.t('luck_great_desc') : '부족한 오행이 들어와 균형을 맞춰주는 <strong>최상의 시기</strong>입니다.'
                };
            } else if (count >= 3) {
                return {
                    level: i18n ? i18n.t('luck_warn') : '주의 필요',
                    color: '#FF5722',
                    description: i18n ? i18n.t('luck_warn_desc') : '이미 과한 오행이 더 들어오므로 <strong>조심해야 할 시기</strong>입니다.'
                };
            }
            return { level: i18n ? i18n.t('luck_normal') : '보통', color: '#FFC107', description: i18n ? i18n.t('luck_normal_desc') : '적당한 오행이 들어오는 시기입니다.' };
        };

        return `
            <div class="detail-view">
                <h2 style="color:#9C27B0; margin-bottom:20px;">🌐 ${i18n ? i18n.t('layer4_detail_title') : '제4장. 현실 연결 (상세)'}</h2>
                
                <div class="interpretation-card">
                    <h3>🧘 ${i18n ? i18n.t('layer4_identity_title') : '자아 정체성 (Identity)'}</h3>
                    <p>
                        ${i18n ? i18n.t('layer4_identity_desc').replace('{trait}', `<strong style="color:${myElement.color};">${pillars.day.data.hanja} (${i18n.t(dayElName)})</strong>`) : `당신의 일간(日干)은 <strong style="color:${myElement.color};">${pillars.day.data.hanja} (${myElement.name})</strong>입니다.`}
                    </p>
                    <p>
                        ${i18n ? '' : `이는 ${myElement.trait}의 가치를 가장 중요하게 여기는 성향으로 나타납니다.`}
                    </p>
                    <div style="margin-top:15px; padding:15px; background:rgba(156,39,176,0.1); border-left:3px solid #9C27B0; border-radius:4px;">
                        <strong>${i18n ? i18n.t('layer4_core_trait') : '💡 핵심 특성:'}</strong> ${i18n ? i18n.t('layer4_core_trait_desc').replace('{trait}', i18n.t('el_trait_' + dayElName.toLowerCase())) : `${myElement.trait}을 추구하며 창의적이고 발전적인 삶을 지향합니다.`}
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>📊 ${i18n ? i18n.t('layer4_big5_title') : '성격 5요인 (Big 5) 추정'}</h3>
                    <ul style="list-style:none; padding:0;">
                        <li style="margin-bottom:8px;">🧠 <strong>${i18n ? i18n.t('layer4_big5_1') : '개방성'}:</strong> ${ohaengAnalysis.counts.Fire + ohaengAnalysis.counts.Wood > 2 ? (i18n ? i18n.t('layer4_big5_high') : '매우 높음') : (i18n ? i18n.t('layer4_big5_med') : '보통')}</li>
                        <li style="margin-bottom:8px;">📋 <strong>${i18n ? i18n.t('layer4_big5_2') : '성실성'}:</strong> ${ohaengAnalysis.counts.Metal + ohaengAnalysis.counts.Earth > 2 ? (i18n ? i18n.t('layer4_big5_high') : '매우 높음') : (i18n ? i18n.t('layer4_big5_low') : '유동적')}</li>
                        <li style="margin-bottom:8px;">🗣️ <strong>${i18n ? i18n.t('layer4_big5_3') : '외향성'}:</strong> ${ohaengAnalysis.polarities.Yang > ohaengAnalysis.polarities.Yin ? (i18n ? i18n.t('layer4_big5_high') : '높음') : (i18n ? i18n.t('layer4_big5_med') : '신중함')}</li>
                        <li style="margin-bottom:8px;">🤝 <strong>${i18n ? i18n.t('layer4_big5_4') : '친화성'}:</strong> ${ohaengAnalysis.counts.Earth + ohaengAnalysis.counts.Water > 2 ? (i18n ? i18n.t('layer4_big5_high') : '높음') : (i18n ? i18n.t('layer4_big5_low') : '독립적')}</li>
                    </ul>
                </div>

                <div class="interpretation-card">
                    <h3>💼 ${i18n ? i18n.t('layer4_career_title') : '직업 적성 가이드'}</h3>
                    <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
                        ${window.NarrativeGenerator.getCareerAdvice(pillars.day.data.element, rawTenGods.monthBranch)}
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>📈 ${i18n ? i18n.t('layer4_daewoon_title') : '대운의 흐름 - 인생의 10년 주기'}</h3>
                    <p style="line-height:1.8; margin-bottom:20px;">
                        ${i18n ? i18n.t('layer4_daewoon_desc') : `
                        대운(大運)은 10년마다 바뀌는 <strong>'인생의 큰 흐름'</strong>입니다. 
                        마치 계절이 바뀌듯이, 각 대운마다 다른 오행 에너지가 들어와 당신의 인생에 영향을 미칩니다.
                        <br><br>
                        같은 노력을 해도 대운에 따라 결과가 크게 달라질 수 있으므로, 
                        <strong>유리한 대운에는 적극적으로 도전</strong>하고, 
                        <strong>불리한 대운에는 신중하게 대비</strong>하는 것이 지혜로운 삶의 방식입니다.`}
                    </p>
                    
                    ${daewoonList.slice(0, 8).map((dw, idx) => {
            const stemDesc = getElementDescription(dw.stemElement);
            const branchDesc = getElementDescription(dw.branchElement);
            const phase = getLifePhase(dw.age);
            const compatibility = analyzeDaewoonCompatibility(dw.stemElement, ohaengAnalysis);

            return `
                            <div style="margin-bottom:30px; padding:20px; background:rgba(156,39,176,0.05); border-radius:12px; border-left:4px solid ${compatibility.color};">
                                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                                    <div>
                                        <h4 style="margin:0; font-size:1.2rem; color:${compatibility.color};">
                                            ${i18n ? i18n.t('layer4_daewoon_item_title').replace('{age}', dw.age).replace('{age_end}', dw.age + 9) : `${dw.age}세 ~ ${dw.age + 9}세 대운`}
                                        </h4>
                                        <div style="color:var(--text-muted); font-size:0.9rem; margin-top:5px;">
                                            ${phase} | ${i18n ? i18n.t('layer4_daewoon_item_level') : '운세 수준:'} <strong style="color:${compatibility.color};">${compatibility.level}</strong>
                                        </div>
                                    </div>
                                    <div style="text-align:right;">
                                        <div style="font-size:2rem; font-weight:bold; color:#9C27B0;">
                                            ${dw.stem}${dw.branch}
                                        </div>
                                        <div style="color:var(--text-muted); font-size:0.9rem;">
                                            ${dw.stemHangul}${dw.branchHangul}
                                        </div>
                                    </div>
                                </div>

                                <div style="background:rgba(0,0,0,0.2); padding:15px; border-radius:8px; margin-bottom:15px;">
                                    <p style="margin:0; line-height:1.7;">
                                        ${compatibility.description}
                                    </p>
                                </div>

                                <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:15px;">
                                    <div style="background:rgba(156,39,176,0.1); padding:12px; border-radius:8px;">
                                        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:5px;">${i18n ? i18n.t('layer3_table_stem') : '천간 (天干)'}</div>
                                        <div style="font-weight:bold; margin-bottom:5px;">
                                            ${dw.stem} (${i18n ? i18n.t(dw.stemElement) : window.ELEMENT_TRAITS[dw.stemElement].name})
                                        </div>
                                        <div style="font-size:0.9rem; color:#ddd;">
                                            ${stemDesc.energy}
                                        </div>
                                    </div>
                                    <div style="background:rgba(156,39,176,0.1); padding:12px; border-radius:8px;">
                                        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:5px;">${i18n ? i18n.t('layer3_table_branch') : '지지 (地支)'}</div>
                                        <div style="font-weight:bold; margin-bottom:5px;">
                                            ${dw.branch} (${i18n ? i18n.t(dw.branchElement) : window.ELEMENT_TRAITS[dw.branchElement].name})
                                        </div>
                                        <div style="font-size:0.9rem; color:#ddd;">
                                            ${branchDesc.energy}
                                        </div>
                                    </div>
                                </div>

                                <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
                                    <div style="font-size:0.9rem; font-weight:bold; margin-bottom:8px; color:#9C27B0;">
                                        ${i18n ? i18n.t('layer4_daewoon_strategy') : '💡 이 시기의 핵심 전략'}
                                    </div>
                                    <ul style="margin:0; padding-left:20px; line-height:1.8;">
                                        <li><strong>${i18n ? i18n.t('layer4_daewoon_strategy_1') : '천간 활용:'}</strong> ${stemDesc.advice}</li>
                                        <li><strong>${i18n ? i18n.t('layer4_daewoon_strategy_2') : '지지 활용:'}</strong> ${branchDesc.advice}</li>
                                        <li><strong>${i18n ? i18n.t('layer4_daewoon_strategy_3') : '주요 키워드:'}</strong> ${stemDesc.trait}, ${branchDesc.trait}</li>
                                    </ul>
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>

                <div class="interpretation-card">
                    <h3>${i18n ? i18n.t('layer4_daewoon_guide_title') : '📚 대운 활용 가이드'}</h3>
                    <div style="background:rgba(156,39,176,0.1); padding:20px; border-radius:12px;">
                        <h4 style="margin-top:0; color:#9C27B0;">${i18n ? i18n.t('layer4_daewoon_guide_1') : '🎯 대운을 읽는 방법'}</h4>
                        <ul style="line-height:2; margin-bottom:20px;">
                            <li>${i18n ? i18n.t('layer4_daewoon_guide_1_item1') : '<strong>유리한 대운 (부족한 오행이 들어올 때):</strong><br>→ 적극적으로 도전하고 새로운 일을 시작하세요. 성공 확률이 높습니다.'}</li>
                            <li>${i18n ? i18n.t('layer4_daewoon_guide_1_item2') : '<strong>불리한 대운 (과한 오행이 더 들어올 때):</strong><br>→ 무리한 확장보다는 현상 유지와 내실을 다지는 데 집중하세요.'}</li>
                            <li>${i18n ? i18n.t('layer4_daewoon_guide_1_item3') : '<strong>보통 대운:</strong><br>→ 운보다는 자신의 노력과 실력이 더 중요한 시기입니다.'}</li>
                        </ul>

                        <h4 style="color:#9C27B0;">${i18n ? i18n.t('layer4_daewoon_guide_2') : '⚡ 대운 전환기 주의사항'}</h4>
                        <p style="line-height:1.8; margin:0;">
                            ${i18n ? i18n.t('layer4_daewoon_guide_2_desc') : `
                            대운이 바뀌는 해(예: 20세→21세, 30세→31세)는 <strong>인생의 전환점</strong>이 됩니다.
                            이 시기에는 환경 변화, 이사, 이직, 결혼 등 중요한 변화가 일어나기 쉬우므로,
                            미리 준비하고 신중하게 결정하는 것이 좋습니다.`}
                        </p>
                    </div>
                </div>

                ${this.getBackButton()}
            </div>
        `;
    },

    /**
     * 레이어 5: 운세 분석 상세 뷰
     */
    renderLayer5Detail(specialThemes) {
        const wealth = specialThemes.wealth;
        const health = specialThemes.health;
        const relation = specialThemes.relation;
        const i18n = window.i18n;

        return `
            <div class="detail-view">
                <h2 style="color:#FF5722; margin-bottom:20px;">🔮 ${i18n ? i18n.t('layer5_detail_title') : '제5장. 운세 정밀 분석 (상세)'}</h2>
                
                <div class="interpretation-card">
                    <h3>${i18n ? i18n.t('layer5_wealth_title') : '재물운 상세 분석'}</h3>
                    <p><strong>${i18n ? i18n.t('layer5_wealth_size') : '재물 그릇 크기:'}</strong> ${wealth.strength}</p>
                    <p style="margin-top:10px;">${wealth.method}</p>
                    
                    <div style="margin-top:15px; padding:15px; background:rgba(255,87,34,0.1); border-radius:8px;">
                        <h4 style="margin:0 0 10px 0; font-size:1rem;">${i18n ? i18n.t('layer5_wealth_recom') : '💼 추천 재물 활동'}</h4>
                        <p style="margin:0;">${wealth.activity}</p>
                    </div>
                    
                    <div style="margin-top:10px; padding:15px; background:rgba(255,87,34,0.1); border-radius:8px;">
                        <h4 style="margin:0 0 10px 0; font-size:1rem;">${i18n ? i18n.t('layer5_wealth_timing') : '⏰ 재물운 상승 시기'}</h4>
                        <p style="margin:0;">${wealth.timing}</p>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>${i18n ? i18n.t('layer5_health_title') : '건강운 상세 분석'}</h3>
                    <p><strong>${i18n ? i18n.t('layer5_health_weak') : '취약한 오행:'}</strong> ${health.weakest}</p>
                    <p style="margin-top:10px;"><strong>${i18n ? i18n.t('layer5_health_organs') : '주의해야 할 장기:'}</strong> ${health.organs}</p>
                    
                    <div style="margin-top:15px; padding:15px; background:rgba(255,87,34,0.1); border-radius:8px;">
                        <h4 style="margin:0 0 10px 0; font-size:1rem;">${i18n ? i18n.t('layer5_health_recom') : '💊 건강 관리 조언'}</h4>
                        <p style="margin:0;">${health.advice}</p>
                    </div>
                    
                    <div style="margin-top:10px; padding:15px; background:rgba(255,87,34,0.1); border-radius:8px;">
                        <h4 style="margin:0 0 10px 0; font-size:1rem;">${i18n ? i18n.t('layer5_health_timing') : '⚠️ 주의해야 할 시기'}</h4>
                        <p style="margin:0;">${health.timing}</p>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>${i18n ? i18n.t('layer5_relation_title') : '관계운 상세 분석'}</h3>
                    
                    <div style="margin-bottom:20px;">
                        <h4 style="margin:0 0 10px 0; font-size:1rem; color:#FF5722;">${i18n ? i18n.t('layer5_relation_spouse') : '💑 배우자 운'}</h4>
                        <p>${relation.spouse}</p>
                    </div>
                    
                    <div>
                        <h4 style="margin:0 0 10px 0; font-size:1rem; color:#FF5722;">${i18n ? i18n.t('layer5_relation_child') : '👶 자녀 운'}</h4>
                        <p>${relation.children}</p>
                    </div>
                </div>

                ${this.getBackButton()}
            </div>
        `;
    },

    /**
     * 뒤로가기 버튼 HTML
     */
    getBackButton() {
        const i18n = window.i18n;
        return `
            <div style="margin-top:40px; text-align:center; border-top:1px solid rgba(255,255,255,0.1); padding-top:20px;">
                <button class="back-btn" onclick="restoreSummaryView()" style="
                    background:linear-gradient(135deg, var(--accent), #9C27B0);
                    color:white;
                    border:none;
                    padding:12px 30px;
                    border-radius:25px;
                    font-size:1rem;
                    cursor:pointer;
                    transition:all 0.3s;
                    box-shadow:0 4px 15px rgba(138,43,226,0.3);
                ">
                    ${i18n ? i18n.t('back_to_summary') : '🔙 요약 보기로 돌아가기'}
                </button>
            </div>
        `;
    }
};

// Export
window.LayerDetailViews = LayerDetailViews;
