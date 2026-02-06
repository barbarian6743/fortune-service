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

        return `
            <div class="detail-view">
                <h2 style="color:var(--accent); margin-bottom:20px;">📅 제1장. 천문 역법 (상세)</h2>
                
                <div class="interpretation-card">
                    <h3>🌍 입력 정보</h3>
                    <p><strong>양력 생년월일:</strong> ${birth}</p>
                    <p><strong>태어난 시간:</strong> ${time}</p>
                    <p style="color:var(--text-muted); font-size:0.9rem; margin-top:10px;">
                        ※ 사주는 양력을 기준으로 계산되며, 월(月)은 절기(節氣)를 기준으로 바뀝니다.
                    </p>
                </div>

                <div class="interpretation-card">
                    <h3>🔢 60갑자 좌표</h3>
                    <p>사주팔자는 태어난 시간을 60갑자(甲子)라는 천문 좌표계로 변환한 것입니다.</p>
                    
                    <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:15px; margin-top:20px;">
                        <div style="text-align:center; background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
                            <div style="color:var(--text-muted); font-size:0.8rem; margin-bottom:5px;">시주 (時柱)</div>
                            <div style="font-size:1.5rem; font-weight:bold; color:${window.ELEMENT_TRAITS[p.hour.data.element].color};">
                                ${p.hour.data.hanja}${p.hour.branchData.hanja}
                            </div>
                            <div style="color:var(--text-muted); font-size:0.8rem; margin-top:5px;">
                                ${p.hour.data.hangul}${p.hour.branchData.hangul}
                            </div>
                        </div>
                        
                        <div style="text-align:center; background:rgba(255,215,0,0.1); padding:15px; border-radius:8px; border:2px solid gold;">
                            <div style="color:var(--accent); font-size:0.8rem; margin-bottom:5px;">일주 (日柱) ★</div>
                            <div style="font-size:1.5rem; font-weight:bold; color:${window.ELEMENT_TRAITS[p.day.data.element].color};">
                                ${p.day.data.hanja}${p.day.branchData.hanja}
                            </div>
                            <div style="color:var(--accent); font-size:0.8rem; margin-top:5px;">
                                ${p.day.data.hangul}${p.day.branchData.hangul}
                            </div>
                        </div>
                        
                        <div style="text-align:center; background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
                            <div style="color:var(--text-muted); font-size:0.8rem; margin-bottom:5px;">월주 (月柱)</div>
                            <div style="font-size:1.5rem; font-weight:bold; color:${window.ELEMENT_TRAITS[p.month.data.element].color};">
                                ${p.month.data.hanja}${p.month.branchData.hanja}
                            </div>
                            <div style="color:var(--text-muted); font-size:0.8rem; margin-top:5px;">
                                ${p.month.data.hangul}${p.month.branchData.hangul}
                            </div>
                        </div>
                        
                        <div style="text-align:center; background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
                            <div style="color:var(--text-muted); font-size:0.8rem; margin-bottom:5px;">년주 (年柱)</div>
                            <div style="font-size:1.5rem; font-weight:bold; color:${window.ELEMENT_TRAITS[p.year.data.element].color};">
                                ${p.year.data.hanja}${p.year.branchData.hanja}
                            </div>
                            <div style="color:var(--text-muted); font-size:0.8rem; margin-top:5px;">
                                ${p.year.data.hangul}${p.year.branchData.hangul}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>📖 사주 구조 설명</h3>
                    <ul style="line-height:1.8; color:#ddd;">
                        <li><strong>년주(年柱):</strong> 조상과 가문의 기운, 유년기(0~15세)</li>
                        <li><strong>월주(月柱):</strong> 부모와 사회 활동, 청년기(16~30세)</li>
                        <li><strong>일주(日柱):</strong> 자기 자신과 배우자, 중년기(31~45세) - 가장 중요!</li>
                        <li><strong>시주(時柱):</strong> 자녀와 말년, 노년기(46세~)</li>
                    </ul>
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

        return `
            <div class="detail-view">
                <h2 style="color:#4CAF50; margin-bottom:20px;">🌳 제2장. 음양오행 (상세)</h2>
                
                <div class="interpretation-card">
                    <h3>⚖️ ${ohaengNarrative.yinyang.title}</h3>
                    <p>${ohaengNarrative.yinyang.text}</p>
                    <div style="margin-top:15px; padding:10px; background:rgba(255,255,255,0.05); border-radius:6px;">
                        <strong>음양 비율:</strong> 양(Yang) ${ohaengAnalysis.polarities.Yang} : 음(Yin) ${ohaengAnalysis.polarities.Yin}
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>🎨 오행 분포 상세</h3>
                    ${Object.keys(counts).map(el => {
            const percent = ((counts[el] / totalEnergy) * 100).toFixed(1);
            const trait = window.ELEMENT_TRAITS[el];
            return `
                            <div style="margin-bottom:15px;">
                                <div style="display:flex; justify-content:space-between; margin-bottom:5px;">
                                    <span><strong>${trait.name}</strong> (${trait.trait})</span>
                                    <span>${counts[el]}개 (${percent}%)</span>
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

        return `
            <div class="detail-view">
                <h2 style="color:#2196F3; margin-bottom:20px;">🎯 제3장. 명리학적 구조 (상세)</h2>
                
                <div class="interpretation-card">
                    <h3>🧠 ${narrative.thinking.title}</h3>
                    <p>${narrative.thinking.text}</p>
                    <div style="margin-top:10px; padding:10px; background:rgba(33,150,243,0.1); border-left:3px solid #2196F3;">
                        <strong>월간(月干):</strong> ${getFriendlyTerm(rawTenGods.monthStem).title}<br>
                        <small style="color:var(--text-muted);">${getFriendlyTerm(rawTenGods.monthStem).desc}</small>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>🏃 ${narrative.action.title}</h3>
                    <p>${narrative.action.text}</p>
                    <div style="margin-top:10px; padding:10px; background:rgba(33,150,243,0.1); border-left:3px solid #2196F3;">
                        <strong>월지(月支):</strong> ${getFriendlyTerm(rawTenGods.monthBranch).title}<br>
                        <small style="color:var(--text-muted);">${getFriendlyTerm(rawTenGods.monthBranch).desc}</small>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>🤝 ${narrative.social.title}</h3>
                    <p>${narrative.social.text}</p>
                    <div style="margin-top:10px; padding:10px; background:rgba(33,150,243,0.1); border-left:3px solid #2196F3;">
                        <strong>일지(日支):</strong> ${getFriendlyTerm(rawTenGods.dayBranch).title}<br>
                        <small style="color:var(--text-muted);">${getFriendlyTerm(rawTenGods.dayBranch).desc}</small>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>📊 전체 십신 구조 및 인생 시기별 해석</h3>
                    
                    <div class="detail-section">
                        <h4 style="color:var(--accent);">1. 초년운 (뿌리/가문) - 년주</h4>
                        <p><strong>${pillars.year.data.hanja}${pillars.year.branchData.hanja} (${getFriendlyTerm(rawTenGods.yearStem).title})</strong></p>
                        <p>당신의 어린 시절 환경과 가문의 분위기를 의미합니다. 초년에 형성된 가치관이나 유산이 현재의 당신에게 <strong>${getFriendlyTerm(rawTenGods.yearStem).desc}</strong>(으)로 영향을 미치고 있습니다.</p>
                    </div>

                    <div class="detail-section">
                        <h4 style="color:var(--accent);">2. 청년/사회운 (직업/환경) - 월주</h4>
                        <p><strong>${pillars.month.data.hanja}${pillars.month.branchData.hanja} (${getFriendlyTerm(rawTenGods.monthBranch).title})</strong></p>
                        <p>가장 활발하게 활동하는 시기의 사회적 환경입니다. 당신은 사회에서 <strong>${window.NarrativeGenerator.getSocialNarrative(rawTenGods.monthBranch, window.EMBEDDED_DATA.narratives)}</strong> 스타일로 성공을 추구해야 합니다.</p>
                    </div>

                    <div class="detail-view">
                <h2 class="detail-title">🌍 제4장. 현실 연결 심층 통계</h2>
                <div class="detail-content">
                    <div class="detail-section">
                        <h3>1. 성격 5요인 (Big 5) 추정</h3>
                        <p>사주 구조로 본 현대 심리학적 특성입니다.</p>
                        <ul style="list-style:none; padding:0;">
                            <li style="margin-bottom:8px;">🧠 <strong>개방성:</strong> ${ohaengAnalysis.counts.Fire + ohaengAnalysis.counts.Wood > 2 ? '매우 높음 (창의적, 모험적)' : '보통 (실용적)'}</li>
                            <li style="margin-bottom:8px;">📋 <strong>성실성:</strong> ${ohaengAnalysis.counts.Metal + ohaengAnalysis.counts.Earth > 2 ? '매우 높음 (계획적, 꼼꼼함)' : '유동적 (즉흥적)'}</li>
                            <li style="margin-bottom:8px;">🗣️ <strong>외향성:</strong> ${ohaengAnalysis.polarities.Yang > ohaengAnalysis.polarities.Yin ? '높음 (사교적)' : '낮음 (신중함)'}</li>
                            <li style="margin-bottom:8px;">🤝 <strong>친화성:</strong> ${ohaengAnalysis.counts.Earth + ohaengAnalysis.counts.Water > 2 ? '높음 (이타적, 협력적)' : '독립적 (자기중심적)'}</li>
                        </ul>
                    </div>

                    <div class="detail-section">
                        <h3>2. 직업 적성 가이드</h3>
                        <p>당신의 타고난 강점과 사회적 환경을 결합한 추천입니다.</p>
                        <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:12px; margin-top:10px;">
                            ${window.NarrativeGenerator.getCareerAdvice(pillars.day.data.element, rawTenGods.monthBranch)}
                        </div>
                    </div>
                </div>
            </div>
                    <div class="detail-section">
                        <h4 style="color:var(--accent);">3. 중년/본원 (자아/배우자) - 일주</h4>
                        <p><strong>${pillars.day.data.hanja}${pillars.day.branchData.hanja} (${getFriendlyTerm(rawTenGods.dayBranch).title})</strong></p>
                        <p>당신의 핵심 자아와 배우자 자리를 의미합니다. 개인적인 공간에서는 <strong>${getFriendlyTerm(rawTenGods.dayBranch).desc}</strong> 성향을 추구하며 마음의 안정을 찾습니다.</p>
                    </div>

                    <div class="detail-section">
                        <h4 style="color:var(--accent);">4. 말년/미래운 (자녀/결실) - 시주</h4>
                        <p><strong>${pillars.hour.data.hanja}${pillars.hour.branchData.hanja} (${getFriendlyTerm(rawTenGods.hourStem).title})</strong></p>
                        <p>인생의 최종 지향점입니다. 나이가 들수록 <strong>${getFriendlyTerm(rawTenGods.hourStem).desc}</strong>의 가치를 실현하고자 하며, 자녀와의 관계에서도 이러한 특성이 나타납니다.</p>
                    </div>

                    <table style="width:100%; border-collapse:collapse; margin-top:20px;">
                        <thead>
                            <tr style="background:rgba(255,255,255,0.1);">
                                <th style="padding:10px; text-align:left;">위치</th>
                                <th style="padding:10px; text-align:left;">천간</th>
                                <th style="padding:10px; text-align:left;">지지</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">시주</td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${getFriendlyTerm(rawTenGods.hourStem).title}</td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${getFriendlyTerm(rawTenGods.hourBranch).title}</td>
                            </tr>
                            <tr style="background:rgba(255,215,0,0.1);">
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);"><strong>일주 ★</strong></td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);"><strong>본원 (나)</strong></td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);"><strong>${getFriendlyTerm(rawTenGods.dayBranch).title}</strong></td>
                            </tr>
                            <tr>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">월주</td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${getFriendlyTerm(rawTenGods.monthStem).title}</td>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">${getFriendlyTerm(rawTenGods.monthBranch).title}</td>
                            </tr>
                            <tr>
                                <td style="padding:10px; border-top:1px solid rgba(255,255,255,0.1);">년주</td>
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

        // Helper function to get element description
        const getElementDescription = (element) => {
            const descriptions = {
                'Wood': {
                    energy: '성장과 확장의 에너지',
                    trait: '새로운 시작, 창의성, 발전',
                    advice: '새로운 프로젝트를 시작하거나 학습에 집중하기 좋은 시기입니다.'
                },
                'Fire': {
                    energy: '열정과 활동의 에너지',
                    trait: '사회활동, 명예, 인기',
                    advice: '대외 활동을 활발히 하고 인맥을 넓히기 좋은 시기입니다.'
                },
                'Earth': {
                    energy: '안정과 축적의 에너지',
                    trait: '신뢰, 저축, 부동산',
                    advice: '재산을 모으고 기반을 다지기 좋은 시기입니다.'
                },
                'Metal': {
                    energy: '결단과 정리의 에너지',
                    trait: '결실, 정리, 원칙',
                    advice: '불필요한 것을 정리하고 핵심에 집중하기 좋은 시기입니다.'
                },
                'Water': {
                    energy: '지혜와 휴식의 에너지',
                    trait: '학문, 연구, 내면 성찰',
                    advice: '공부하거나 전문성을 키우기 좋은 시기입니다.'
                }
            };
            return descriptions[element] || descriptions['Wood'];
        };

        // Helper function to get life phase name
        const getLifePhase = (age) => {
            if (age < 10) return '유년기 (幼年期)';
            if (age < 20) return '청소년기 (靑少年期)';
            if (age < 30) return '청년기 (靑年期)';
            if (age < 40) return '장년기 (壯年期)';
            if (age < 50) return '중년기 (中年期)';
            if (age < 60) return '중후년기 (中後年期)';
            if (age < 70) return '노년기 (老年期)';
            return '고령기 (高齡期)';
        };

        // Helper function to analyze compatibility with birth chart
        const analyzeDaewoonCompatibility = (dwElement, birthOhaeng) => {
            const count = birthOhaeng.counts[dwElement];
            if (count === 0) {
                return {
                    level: '매우 유리',
                    color: '#4CAF50',
                    description: '부족한 오행이 들어와 균형을 맞춰주는 <strong>최상의 시기</strong>입니다.'
                };
            } else if (count >= 3) {
                return {
                    level: '주의 필요',
                    color: '#FF5722',
                    description: '이미 과한 오행이 더 들어오므로 <strong>조심해야 할 시기</strong>입니다.'
                };
            } else if (count === 1 || count === 2) {
                return {
                    level: '보통',
                    color: '#FFC107',
                    description: '적당한 오행이 들어오는 <strong>평범한 시기</strong>입니다. 자신의 노력이 중요합니다.'
                };
            }
            return { level: '보통', color: '#FFC107', description: '평범한 시기입니다.' };
        };

        return `
            <div class="detail-view">
                <h2 style="color:#9C27B0; margin-bottom:20px;">🌐 제4장. 현실 연결 (상세)</h2>
                
                <div class="interpretation-card">
                    <h3>🧘 자아 정체성 (Identity)</h3>
                    <p>
                        당신의 일간(日干)은 <strong style="color:${myElement.color};">${pillars.day.data.hanja} (${myElement.name})</strong>입니다.
                    </p>
                    <p>
                        이는 ${myElement.trait}의 가치를 가장 중요하게 여기는 성향으로 나타납니다.
                        본질적으로 ${myElement.trait.split('/')[1]}하는 삶을 지향하며, 이것이 당신의 핵심 에너지입니다.
                    </p>
                    <div style="margin-top:15px; padding:15px; background:rgba(156,39,176,0.1); border-left:3px solid #9C27B0; border-radius:4px;">
                        <strong>💡 핵심 특성:</strong> ${myElement.trait}을 추구하는 성향이 강하며, 
                        이러한 가치관이 인생의 중요한 선택에 영향을 미칩니다.
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>📈 대운의 흐름 - 인생의 10년 주기</h3>
                    <p style="line-height:1.8; margin-bottom:20px;">
                        대운(大運)은 10년마다 바뀌는 <strong>'인생의 큰 흐름'</strong>입니다. 
                        마치 계절이 바뀌듯이, 각 대운마다 다른 오행 에너지가 들어와 당신의 인생에 영향을 미칩니다.
                        <br><br>
                        같은 노력을 해도 대운에 따라 결과가 크게 달라질 수 있으므로, 
                        <strong>유리한 대운에는 적극적으로 도전</strong>하고, 
                        <strong>불리한 대운에는 신중하게 대비</strong>하는 것이 지혜로운 삶의 방식입니다.
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
                                            ${dw.age}세 ~ ${dw.age + 9}세 대운
                                        </h4>
                                        <div style="color:var(--text-muted); font-size:0.9rem; margin-top:5px;">
                                            ${phase} | 운세 수준: <strong style="color:${compatibility.color};">${compatibility.level}</strong>
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
                                        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:5px;">천간 (天干)</div>
                                        <div style="font-weight:bold; margin-bottom:5px;">
                                            ${dw.stem} (${window.ELEMENT_TRAITS[dw.stemElement].name})
                                        </div>
                                        <div style="font-size:0.9rem; color:#ddd;">
                                            ${stemDesc.energy}
                                        </div>
                                    </div>
                                    <div style="background:rgba(156,39,176,0.1); padding:12px; border-radius:8px;">
                                        <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:5px;">지지 (地支)</div>
                                        <div style="font-weight:bold; margin-bottom:5px;">
                                            ${dw.branch} (${window.ELEMENT_TRAITS[dw.branchElement].name})
                                        </div>
                                        <div style="font-size:0.9rem; color:#ddd;">
                                            ${branchDesc.energy}
                                        </div>
                                    </div>
                                </div>

                                <div style="background:rgba(255,255,255,0.05); padding:15px; border-radius:8px;">
                                    <div style="font-size:0.9rem; font-weight:bold; margin-bottom:8px; color:#9C27B0;">
                                        💡 이 시기의 핵심 전략
                                    </div>
                                    <ul style="margin:0; padding-left:20px; line-height:1.8;">
                                        <li><strong>천간 활용:</strong> ${stemDesc.advice}</li>
                                        <li><strong>지지 활용:</strong> ${branchDesc.advice}</li>
                                        <li><strong>주요 키워드:</strong> ${stemDesc.trait}, ${branchDesc.trait}</li>
                                    </ul>
                                </div>
                            </div>
                        `;
        }).join('')}
                </div>

                <div class="interpretation-card">
                    <h3>📚 대운 활용 가이드</h3>
                    <div style="background:rgba(156,39,176,0.1); padding:20px; border-radius:12px;">
                        <h4 style="margin-top:0; color:#9C27B0;">🎯 대운을 읽는 방법</h4>
                        <ul style="line-height:2; margin-bottom:20px;">
                            <li><strong>유리한 대운 (부족한 오행이 들어올 때):</strong><br>
                                → 적극적으로 도전하고 새로운 일을 시작하세요. 성공 확률이 높습니다.</li>
                            <li><strong>불리한 대운 (과한 오행이 더 들어올 때):</strong><br>
                                → 무리한 확장보다는 현상 유지와 내실을 다지는 데 집중하세요.</li>
                            <li><strong>보통 대운:</strong><br>
                                → 운보다는 자신의 노력과 실력이 더 중요한 시기입니다.</li>
                        </ul>

                        <h4 style="color:#9C27B0;">⚡ 대운 전환기 주의사항</h4>
                        <p style="line-height:1.8; margin:0;">
                            대운이 바뀌는 해(예: 20세→21세, 30세→31세)는 <strong>인생의 전환점</strong>이 됩니다.
                            이 시기에는 환경 변화, 이사, 이직, 결혼 등 중요한 변화가 일어나기 쉬우므로,
                            미리 준비하고 신중하게 결정하는 것이 좋습니다.
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

        return `
            <div class="detail-view">
                <h2 style="color:#FF5722; margin-bottom:20px;">🔮 제5장. 운세 정밀 분석 (상세)</h2>
                
                <div class="interpretation-card">
                    <h3>💰 재물운 상세 분석</h3>
                    <p><strong>재물 그릇 크기:</strong> ${wealth.strength}</p>
                    <p style="margin-top:10px;">${wealth.method}</p>
                    
                    <div style="margin-top:15px; padding:15px; background:rgba(255,87,34,0.1); border-radius:8px;">
                        <h4 style="margin:0 0 10px 0; font-size:1rem;">💼 추천 재물 활동</h4>
                        <p style="margin:0;">${wealth.activity}</p>
                    </div>
                    
                    <div style="margin-top:10px; padding:15px; background:rgba(255,87,34,0.1); border-radius:8px;">
                        <h4 style="margin:0 0 10px 0; font-size:1rem;">⏰ 재물운 상승 시기</h4>
                        <p style="margin:0;">${wealth.timing}</p>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>💪 건강운 상세 분석</h3>
                    <p><strong>취약한 오행:</strong> ${health.weakest}</p>
                    <p style="margin-top:10px;"><strong>주의해야 할 장기:</strong> ${health.organs}</p>
                    
                    <div style="margin-top:15px; padding:15px; background:rgba(255,87,34,0.1); border-radius:8px;">
                        <h4 style="margin:0 0 10px 0; font-size:1rem;">💊 건강 관리 조언</h4>
                        <p style="margin:0;">${health.advice}</p>
                    </div>
                    
                    <div style="margin-top:10px; padding:15px; background:rgba(255,87,34,0.1); border-radius:8px;">
                        <h4 style="margin:0 0 10px 0; font-size:1rem;">⚠️ 주의해야 할 시기</h4>
                        <p style="margin:0;">${health.timing}</p>
                    </div>
                </div>

                <div class="interpretation-card">
                    <h3>❤️ 관계운 상세 분석</h3>
                    
                    <div style="margin-bottom:20px;">
                        <h4 style="margin:0 0 10px 0; font-size:1rem; color:#FF5722;">💑 배우자 운</h4>
                        <p>${relation.spouse}</p>
                    </div>
                    
                    <div>
                        <h4 style="margin:0 0 10px 0; font-size:1rem; color:#FF5722;">👶 자녀 운</h4>
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
                    🔙 요약 보기로 돌아가기
                </button>
            </div>
        `;
    }
};

// Export
window.LayerDetailViews = LayerDetailViews;
