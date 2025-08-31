``` shell
자, 이제 @0001-database-schema-setup.md  테스크를 구현해보자. 각 테스크를 워크플로우 state 메모장에 정리해서 구현을 들어갈거야.

- @/rules 의 rules에는 코드 규칙이 있기 때문에 이 규칙에 따라서 관련된 코드 규칙을 ANALZE 단계에서 조회하고 진행해줘.

- @workflow_state.md 에 위의 테스크를 쪼개서 정의하고, ANALYZE 단계부터 시작하기. state은 초기화하고 시작하자. 새로운 @workflow_state.md 를 생성하지 말고 수정해줘
- 알아서 state을 업데이트하고 state 트리거가 실행되면, 다음 phase로 자동으로 이동하기. 모든 서브테스크를 완수할 때까지 멈추지 않기.
- 각 메인테스크가 끝날때마다 깃 커밋 짧게 추가하기.
- VALIDATE 단계까지 끝날때까지 멈추지 말기.
```