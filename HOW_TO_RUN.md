# 🚀 Fortune Service 실행 가이드

## ⚠️ 중요: 웹 서버 필수

이 애플리케이션은 **반드시 웹 서버를 통해 실행**해야 합니다.  
`index.html`을 직접 더블클릭하면 작동하지 않습니다.

### 왜 웹 서버가 필요한가요?

이 프로젝트는 다음 기능을 사용합니다:
- **JSON 데이터 로딩** (`fetch()` API)
- **모듈화된 JavaScript** 구조

브라우저는 보안상의 이유로 `file://` 프로토콜에서 이러한 기능을 차단합니다.

---

## ✅ 실행 방법

### 방법 1: Python 사용 (권장)

```bash
# 1. 명령 프롬프트(CMD) 열기
# 2. 프로젝트 폴더로 이동
cd "c:\Users\PC\Desktop\Github Repository\fortune-service"

# 3. 웹 서버 실행
python -m http.server 8000

# 4. 브라우저에서 접속
# http://localhost:8000
```

### 방법 2: VS Code Live Server

1. VS Code에서 프로젝트 열기
2. `index.html` 파일 우클릭
3. **"Open with Live Server"** 선택
4. 자동으로 브라우저가 열립니다

### 방법 3: Node.js 사용

```bash
# npx 사용 (Node.js 설치 필요)
npx http-server

# 또는 전역 설치
npm install -g http-server
http-server
```

---

## 🔍 문제 해결

### "파일 시스템에서 직접 실행할 수 없습니다" 오류

**원인**: `index.html`을 직접 열었습니다.

**해결**:
1. 위의 실행 방법 중 하나를 사용하세요
2. 웹 서버를 통해 `http://localhost:8000`으로 접속하세요

### 포트가 이미 사용 중입니다

**해결**:
```bash
# 다른 포트 사용
python -m http.server 8001
```

### Python이 설치되어 있지 않습니다

**해결**:
1. [Python 공식 사이트](https://www.python.org/downloads/)에서 다운로드
2. 설치 시 "Add Python to PATH" 체크
3. 설치 후 CMD 재시작

---

## 📱 사용 방법

1. **입력 페이지** (`http://localhost:8000/index.html`)
   - 성별 선택
   - 생년월일 입력 (예: 1990-01-01)
   - 태어난 시간 입력 (예: 12:30)
   - "운세 확인하기" 클릭

2. **결과 페이지**
   - 로딩 애니메이션 (3.2초)
   - 5단계 분석 결과 확인

---

## 🛠️ 개발자용

### 프로젝트 구조
```
fortune-service/
├── index.html              # 입력 페이지
├── result.html             # 결과 페이지
├── css/
│   └── style.css
├── js/
│   ├── core/
│   │   └── state.js
│   ├── utils/
│   │   ├── validator.js
│   │   ├── sanitizer.js
│   │   ├── data-loader.js
│   │   ├── constants.js
│   │   └── narrative.js
│   ├── saju-engine.js
│   └── main.js
└── data/
    ├── narratives.json
    ├── health-data.json
    └── career-advice.json
```

### 기술 스택
- Vanilla JavaScript (ES6+)
- CSS3
- JSON 데이터 파일

### 브라우저 요구사항
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

---

## 📞 도움이 필요하신가요?

문제가 계속되면:
1. 브라우저 콘솔(F12)에서 에러 확인
2. 웹 서버가 실행 중인지 확인
3. `http://localhost:8000`으로 접속했는지 확인

---

**마지막 업데이트**: 2026-02-06
