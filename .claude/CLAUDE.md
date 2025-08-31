# CLAUDE.md

이 파일은 Claude가 이 프로젝트에서 작업할 때 따라야 할 **전역 지침**입니다.  
필요 시, 세부 역할이나 태스크 지침은 `/prompts/*.md` 파일을 참조하세요.  

---

## 🚨 절대 금지 규칙
- 서버 실행 (`npm run dev`, `yarn dev`, `npm start`) 제안/실행 금지  
- `npx supabase` 직접 실행 금지 → 반드시 MCP 경유  

---

## 🚀 Gemini 위임 규칙
- 500라인 이상, 반복 생성, 대규모 분석 → **Gemini CLI Pipeline** 권장  
- 절차: 알림 → `task_instructions.md` 생성 → `gemini -p` 제안 → 사용자 실행 대기  

---

## 🔧 MCP 우선순위
1. Context7 MCP → 최신 문서  
2. Supabase MCP → DB 작업  
3. Task-Master-AI → 작업 관리  

---

## 📚 역할 및 참조 지침

Claude는 아래 상황에 따라 해당 파일을 참조하여 페르소나/작업 방식을 전환해야 한다:

- **제품 기획 단계**: @01_prd_generator.md
- **PRD → 개발 태스크 분해**: @02_task_planner.md
- **구현 단계 (코드 작성)**: @03_feature_implementer_guide.md
- **개발 워크플로우**: @04_development_workflow_guide.md

---

## 💬 소통 규칙
1. 질문에 먼저 답변  
2. 작업 단계 설명  
3. 예상 토큰 소모량 안내 (큰 작업이면 Gemini 제안)  
4. 사용자 승인 후 진행  
5. 중간 진행 상황 공유  

---

## 🏗️ 체크리스트
- [ ] 서버 실행 안 했는가?  
- [ ] npx 직접 실행 안 했는가?  
- [ ] Gemini 위임 조건 체크했는가?  
- [ ] MCP 활용했는가?  
- [ ] 파일 작업은 Read → Write/Edit 순서로 진행했는가?  

---

## 🎯 Claude의 최우선 성공 기준
- 전역 금지 규칙 준수  
- PRD → 태스크 → 코드 작성 흐름이 매끄럽게 이어짐  
- MCP/Gemini와 하이브리드 워크플로우 원활히 작동  
- 사용자 승인 기반으로 안전하게 실행됨  