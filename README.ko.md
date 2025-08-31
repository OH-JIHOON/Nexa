[Read in English](README.md)

# Next.js + Supabase 프로젝트 템플릿

이것은 현대적이고 강력하며 확장 가능한 기술 스택으로 새로운 애플리케이션을 빠르게 시작할 수 있도록 설계된 포괄적인 프로젝트 템플릿입니다.

## 주요 특징 (Features)

*   **전체 UI 컴포넌트 세트**: [Shadcn/UI](https://ui.shadcn.com/)의 모든 컴포넌트가 미리 설치되어 바로 사용할 수 있습니다.
*   **사전 구성된 데이터베이스 & 인증**:
    *   **Supabase/Drizzle**: 원활한 데이터베이스 연동을 위해 핵심 설정 파일(`drizzle.config.ts`, `middleware.ts`)과 폴더(`db/`, `types/`, `utils/`)가 미리 준비되어 있습니다.
    *   **간편한 인증**: 사전 빌드된 로그인 페이지와 인증 로직이 `app/auth/login` 및 `domains/auth` 디렉토리에 구성되어 있습니다.
*   **AI 기반 워크플로우**: 여러 AI 도구에 대한 가이드라인을 통해 최신 개발 방식에 최적화되어 있습니다.
    *   **Cursor IDE**: 기본 에디터로 사용을 권장합니다.
    *   **Claude**: 코드 생성 및 구현을 위한 가이드가 포함되어 있습니다.
    *   **Gemini CLI**: 프로젝트 분석 및 관리를 위한 사용자 지정 명령어가 통합되어 있습니다.

## 기술 스택 (Tech Stack)

*   **Framework**: [Next.js](https://nextjs.org/) (App Router)
*   **UI**: [Shadcn/UI](https://ui.shadcn.com/)
*   **Database & ORM**: [Supabase](https://supabase.com/) with [Drizzle ORM](https://orm.drizzle.team/)
*   **Authentication**: Supabase Auth with Google OAuth
*   **Deployment**: [Vercel](https://vercel.com/)

## 프로젝트 설정 (Project Setup)

자세한 설정 및 설치 방법은 공식 가이드를 참조하세요.

### **[>> 설치 가이드 바로가기 <<](docs/INSTALLATION.ko.md)**

## 기본 워크플로우 (Basic Workflow)

이 템플릿은 AI 기반 워크플로우와 함께 사용하도록 설계되었습니다. 일반적인 프로세스는 다음과 같습니다.

1.  **요구사항 정의 (PRD)**:
    *   `.cursor/rules/prd.prompt.md` 파일을 수정하여 프로젝트 명세를 추가합니다.
    *   이를 바탕으로 최종 `prd.md`를 생성합니다.

2.  **태스크 생성**:
    *   `.cursor/tasks/task.add.prompt.mdc` 템플릿을 사용하여 PRD 기반의 초기 개발 태스크를 생성합니다.

3.  **태스크 구현**:
    *   `.cursor/tasks/task.implement.prompt.md` 가이드를 참고하여 각 기능을 구현합니다.

## Vercel에 배포하기 (Deploy on Vercel)

Next.js 앱을 배포하는 가장 쉬운 방법은 Next.js 제작사가 만든 [Vercel 플랫폼](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)을 이용하는 것입니다.

더 자세한 내용은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 확인하세요.
