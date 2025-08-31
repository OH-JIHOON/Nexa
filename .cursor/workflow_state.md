# workflow_state.md

_Last updated: [YYYY-MM-DD]_

## Phase

INIT

## Status

PENDING

## Plan

<!-- 
AI will populate this section during the BLUEPRINT phase.
This section should contain a detailed, step-by-step execution strategy for the current task.
Example:
#### Item 1: Implement Backend Logic
- **Analyze**: ...
- **Construct**: ...
- **Validate**: ...
-->
*AI가 태스크에 기반하여 계획을 생성할 것입니다.*

## Items

<!-- AI will populate this section during the BLUEPRINT phase as a checklist of high-level tasks. -->
- [ ] *상위 레벨 태스크 1*
- [ ] *상위 레벨 태스크 2*

## Log

<!-- This log will be populated by the AI during the CONSTRUCT phase. -->

## ArchiveLog

<!-- This log will be populated automatically when the main log is rotated. -->

## Rules

> **모든 주요 섹션을 명시적인 H2 (`##`) 헤딩 아래에 두어 에이전트가 명확하게 찾을 수 있도록 하십시오.**

### [PHASE: ANALYZE]

1.  사용자의 요청과 전체 목표를 읽습니다.
2.  요구되는 아키텍처와 컨벤션을 이해하기 위해 관련된 프로젝트별 규칙 파일을 읽습니다.
    - 태스크가 데이터베이스 스키마와 관련이 있다면, `.cursor/rules/db-schema.rules.mdc`를 읽습니다.
    - 태스크가 서버 액션 정의와 관련이 있다면, `.cursor/rules/server-action.rules.mdc`를 읽습니다.
    - 태스크가 UI 구축과 관련이 있다면, `.cursor/rules/ui.rules.mdc`를 읽습니다.
    - (필요에 따라 다른 프로젝트별 규칙 추가)
3.  요구사항을 요약합니다. *이 단계에서는 코드나 구현 계획을 작성하지 마십시오.*

### [PHASE: BLUEPRINT]

1.  태스크를 `## Items` 섹션 아래에 순서가 있는 상위 레벨 체크리스트로 분해합니다. 각 아이템은 논리적이고 커밋 가능한 작업 단위여야 합니다.
2.  `## Plan` 섹션 아래에 상세한 단계별 구현 계획을 작성합니다. ANALYZE 단계에서 식별된 규칙을 따르는 의사 코드나 파일 레벨의 개요를 포함할 수 있습니다.
3.  구현을 시작하기 위해 `Phase = CONSTRUCT` 및 `Status = RUNNING`으로 설정합니다.

### [PHASE: CONSTRUCT]

1.  `## Items`의 현재 아이템에 대해 승인된 `## Plan`을 정확히 따릅니다.
2.  각각의 원자적 변경(예: 파일 수정, 명령어 실행) 후에 관련된 테스트와 린터를 실행합니다.
3.  모든 도구 출력과 관찰 결과를 `## Log` 섹션에 기록합니다.
4.  현재 아이템의 모든 단계가 성공적으로 완료되면, `## Items`에서 완료로 표시합니다.
5.  다음 아이템으로 진행하기 위해 `RULE_ITERATE_01`을 트리거하거나, 모든 아이템이 완료되면 `Phase = VALIDATE`로 설정합니다.
6.  명확하고 간결한 메시지와 함께 변경사항을 커밋합니다.

### [PHASE: VALIDATE]

1.  전체 테스트 스위트와 모든 엔드투엔드 검사를 다시 실행하여 아무것도 손상되지 않았는지 확인합니다.
2.  모든 검사를 통과하면, `Status = COMPLETED`로 설정합니다.
3.  최종 변경사항을 커밋합니다.
4.  프로젝트 변경 로그를 업데이트하기 위해 `RULE_SUMMARY_01`을 트리거합니다.

---

### RULE_INIT_01

Trigger ▶ `Phase == INIT`
Action ▶ 사용자에게 상위 레벨 태스크 설명을 요청합니다 → `Phase = ANALYZE`, `Status = RUNNING`으로 설정합니다.

### RULE_ITERATE_01

Trigger ▶ `Status == COMPLETED && Items contains unprocessed rows`
Action ▶
1.  `CurrentItem`을 `## Items`의 다음 미처리 행으로 설정합니다.
2.  `## Log`를 비웁니다.
3.  새 아이템에 대해 `Phase = ANALYZE`, `Status = RUNNING`으로 재설정합니다.

### RULE_LOG_ROTATE_01

Trigger ▶ `length(## Log) > 5000 chars`
Action ▶ `## Log`의 상위 5개 결과를 요약하여 `## ArchiveLog`에 기록한 다음, `## Log`를 비웁니다.

### RULE_SUMMARY_01

Trigger ▶ `Phase == VALIDATE && Status == COMPLETED`
Action ▶
1.  프로젝트 설정 파일(예: `.cursor/rules/project-config.md`)을 읽습니다.
2.  새 변경 로그 항목을 구성합니다: `- <완료된 작업에 대한 한 문장 요약>`.
3.  설정 파일에서 `## Changelog` 섹션을 찾습니다.
4.  목록의 맨 위에 새 변경 로그 항목을 삽입합니다.