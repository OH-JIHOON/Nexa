# 템플릿 레포지토리 설치 및 설정 가이드

이 문서는 `Next.js + Shadcn/UI + Supabase/Drizzle + Google OAuth + Vercel` 스택으로 구성된 템플릿 레포지토리를 사용하여 새로운 프로젝트를 설정하는 과정을 안내합니다.

## 설정 방법 선택

프로젝트 설정은 **GUI 기반 방법**과 **CLI 기반 방법** 중 선택할 수 있습니다. CLI 방법이 더 빠르고 자동화되어 있지만, GUI 방법이 각 단계를 더 명확하게 이해할 수 있습니다.

## 목차

1. [사전 준비](#사전-준비)
2. [초기 프로젝트 설정](#1-초기-프로젝트-설정)
3. [Supabase 설정](#2-supabase-설정)
4. [Google Cloud 및 OAuth 설정](#3-google-cloud-및-oauth-설정)
5. [Vercel 배포 및 최종 설정](#4-vercel-배포-및-최종-설정)
6. [로컬 개발 서버 실행 및 확인](#5-로컬-개발-서버-실행-및-확인)
7. [프로젝트 기획 및 태스크 관리](#6-프로젝트-기획-및-태스크-관리)

---

## 사전 준비

### 필수 계정
- GitHub 계정
- Supabase 계정
- Google Cloud 계정
- Vercel 계정

### CLI 도구 (CLI 방법 선택 시)
CLI 기반 설정을 선택하는 경우, 다음 도구들을 설치하고 로그인해주세요:

- [**GitHub CLI**](https://cli.github.com/): GitHub 레포지토리 관리
- [**Supabase CLI**](https://supabase.com/docs/guides/cli): Supabase 프로젝트 관리
- [**Vercel CLI**](https://vercel.com/docs/cli): Vercel 배포 관리

```bash
# 각 CLI 로그인
gh auth login
supabase login
vercel login
```

---

## 1. 초기 프로젝트 설정

<details>
<summary><strong>GUI 방법</strong></summary>

1. **템플릿으로 새 레포지토리 생성**
   - GitHub 템플릿 레포지토리에서 `Use this template` > `Create a new repository`를 클릭하여 새로운 프로젝트 레포지토리를 생성합니다.

2. **로컬에 클론 및 의존성 설치**
   ```bash
   # 생성된 레포지토리를 로컬에 클론합니다
   git clone https://github.com/your-username/your-new-repository.git
   
   # 프로젝트 디렉토리로 이동합니다
   cd your-new-repository
   
   # 의존성을 설치합니다
   npm install
   ```

3. **환경변수 파일 생성**
   ```bash
   cp .env.example .env
   ```
</details>

<details>
<summary><strong>CLI 방법</strong></summary>

```bash
# GitHub에 새로운 Public 레포지토리를 생성하고 바로 클론합니다
gh repo create your-new-repository --public --clone --template=template-repo-name
cd your-new-repository

# 의존성 설치 및 .env 파일 준비
npm install
cp .env.example .env
```
</details>

---

## 2. Supabase 설정

<details>
<summary><strong>GUI 방법</strong></summary>

1. **Supabase 프로젝트 생성**
   - [Supabase 대시보드](https://supabase.com/dashboard/org/)로 이동하여 `New project`를 클릭합니다.
   - **Project name**을 입력합니다.
   - **Database password**는 `Generate a password`를 클릭하여 생성하고, 생성된 비밀번호를 안전한 곳에 복사해 둡니다.
   - **Region**은 `Asia Pacific (Seoul)`을 선택합니다.
   - `Create new project` 버튼을 클릭하여 프로젝트를 생성합니다.

2. **환경변수 설정 (`.env`)**
   - 생성된 Supabase 프로젝트에서 다음 값들을 찾아 `.env` 파일에 추가합니다:

   | 환경변수 | 찾는 위치 | 설명 |
   | :--- | :--- | :--- |
   | `DATABASE_PASSWORD` | (1단계에서 복사한 값) | 데이터베이스 비밀번호 |
   | `SUPABASE_PROJECT_ID` | `Settings` > `General` | Supabase 프로젝트 ID |
   | `NEXT_PUBLIC_SUPABASE_URL` | `Settings` > `API` > `Project URL` | Supabase 프로젝트 URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `Settings` > `API` > `Project API Keys` > `public` / `anon` 키 | 클라이언트 사이드용 공개 키 |
   | `SUPABASE_SERVICE_ROLE` | `Settings` > `API` > `Project API Keys` > `secret` 키 | 서버 사이드용 시크릿 키 |
   | `DIRECT_URL` | `Connect` > `ORMs` > `Drizzle` | 데이터베이스 직접 연결 URL (Port 6543) |
   | `DATABASE_URL` | `Connect` > `ORMs` > `Drizzle` | 데이터베이스 연결 URL (Port 5432) |

3. **데이터베이스 마이그레이션**
   ```bash
   npm run db:migrate
   ```
</details>

<details>
<summary><strong>CLI 방법</strong></summary>

```bash
# 새로운 Supabase 프로젝트 생성
# 조직 ID는 Supabase 대시보드 URL(https://supabase.com/dashboard/org/YOUR-ORG-ID)에서 확인
supabase projects create "프로젝트 이름" \
  --org-id "Your-Org-ID" \
  --db-password "강력한-비밀번호" \
  --region ap-northeast-2

# 출력된 project-ref, anon key, service role key를 메모해둡니다

# 로컬 프로젝트를 Supabase 프로젝트와 연결
supabase link --project-ref <your-project-id>

# .env 파일을 수동으로 업데이트 (위에서 메모한 값들 사용)
# 또는 아래 스크립트로 자동 설정 (주의: 프로젝트 ID 확인 필요)
echo "SUPABASE_PROJECT_ID=<your-project-id>" >> .env
echo "NEXT_PUBLIC_SUPABASE_URL=https://<your-project-id>.supabase.co" >> .env
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>" >> .env
echo "SUPABASE_SERVICE_ROLE=<your-service-role-key>" >> .env

# 데이터베이스 URL은 Supabase 대시보드에서 확인 후 추가
# Connect > ORMs > Drizzle 섹션 참조

# 데이터베이스 마이그레이션
npm run db:migrate
```
</details>

---

## 3. Google Cloud 및 OAuth 설정

이 단계는 GUI를 통해서만 설정 가능합니다.

1. **Google Cloud 프로젝트 생성**
   - [Google Cloud Console](https://console.cloud.google.com/welcome)으로 이동하여 새 프로젝트를 생성합니다.

2. **OAuth 동의 화면 설정**
   - `API 및 서비스` > `OAuth 동의 화면`으로 이동합니다.
   - **User Type**은 `외부`를 선택합니다.
   - 앱 이름, 사용자 지원 이메일, 개발자 연락처 정보(이메일)를 입력하고 저장 후 계속합니다.
   - **범위** 설정에서 다음 3가지 범위를 추가하고 저장합니다:
     - `.../auth/userinfo.email`
     - `.../auth/userinfo.profile`
     - `openid`

3. **OAuth 클라이언트 ID 생성**
   - `API 및 서비스` > `사용자 인증 정보` > `사용자 인증 정보 만들기` > `OAuth 클라이언트 ID`를 선택합니다.
   - **애플리케이션 유형**: `웹 애플리케이션`
   - **승인된 리디렉션 URI**:
     - Supabase 대시보드의 `Authentication` > `Providers` > `Google` 설정 페이지에 있는 **Callback URL**을 복사하여 추가합니다.
     - `http://localhost:3000`을 추가합니다. (로컬 테스트용)
   - `만들기`를 클릭하면 **클라이언트 ID**와 **클라이언트 보안 비밀**이 생성됩니다.

4. **환경변수 및 Supabase에 Google 정보 추가**
   - **`.env` 파일 업데이트**:
     ```bash
     GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
     GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
     ```
   - **Supabase 설정**:
     - Supabase 대시보드의 `Authentication` > `Providers` > `Google` 설정 페이지로 이동
     - `Google`을 활성화(Enable)하고, 클라이언트 ID와 보안 비밀을 붙여넣은 후 저장합니다.

---

## 4. Vercel 배포 및 최종 설정

<details>
<summary><strong>GUI 방법</strong></summary>

1. **GitHub에 코드 Push**
   ```bash
   git add .
   git commit -m "Initial setup"
   git push origin main
   ```

2. **Vercel 프로젝트 생성 및 배포**
   - [Vercel 대시보드](https://vercel.com/)에서 `New Project`를 클릭합니다.
   - 방금 Push한 GitHub 레포지토리를 `Import`합니다.
   - **Environment Variables** 섹션에서, 로컬 `.env` 파일에 있는 모든 환경변수들을 동일하게 추가합니다.
   - `Deploy` 버튼을 클릭하여 배포를 진행합니다.

3. **Supabase URL 설정 업데이트**
   - 배포가 완료되면 Vercel 대시보드에서 생성된 **도메인(URL)**을 복사합니다.
   - Supabase 대시보드의 `Authentication` > `URL Configuration`으로 이동합니다.
   - **Site URL**: Vercel 배포 도메인을 붙여넣습니다.
   - **Redirect URLs**: 아래 형식의 URL들을 추가합니다:
     - `http://localhost:3000/**`
     - `https://your-project-name.vercel.app/**`

4. **최종 환경변수 추가**
   - **로컬 `.env` 파일**:
     ```bash
     NEXT_PUBLIC_SITE_URL="https://your-project-name.vercel.app"
     ```
   - **Vercel 대시보드**: `Settings` > `Environment Variables`에 `NEXT_PUBLIC_SITE_URL`을 동일하게 추가합니다.
</details>

<details>
<summary><strong>CLI 방법</strong></summary>

```bash
# GitHub에 코드 Push
git add .
git commit -m "Initial setup"
git push origin main

# Vercel 프로젝트 연결
vercel link

# 환경변수를 Vercel에 추가 (프로덕션 환경)
cat .env | grep -v '^#' | grep -v '^$' | while IFS='=' read -r key value; do
  vercel env add "$key" production <<< "$value"
done

# 프로덕션 배포
vercel --prod

# 배포 URL 확인 및 .env 업데이트
DEPLOYMENT_URL=$(vercel ls --json | jq -r '.deployments[0].url')
echo "NEXT_PUBLIC_SITE_URL=https://$DEPLOYMENT_URL" >> .env
vercel env add NEXT_PUBLIC_SITE_URL production <<< "https://$DEPLOYMENT_URL"
```

**중요**: CLI 방법을 사용하더라도 Supabase 대시보드에서 다음 설정은 수동으로 해야 합니다:
- `Authentication` > `URL Configuration`에서 Site URL과 Redirect URLs 업데이트
</details>

---

## 5. 로컬 개발 서버 실행 및 확인

1. **개발 서버 실행**
   ```bash
   npm run dev
   ```

2. **로그인 기능 확인**
   - `http://localhost:3000`에 접속하여 Google 로그인을 시도합니다.
   - **브라우저 확인**: 개발자 도구의 `Application` > `Cookies` 탭에서 로그인 관련 쿠키가 생성되었는지 확인합니다.
   - **Supabase 확인**: `Authentication` > `Users` 탭에서 새로운 사용자가 등록되었는지 확인합니다.

---

## 6. 프로젝트 기획 및 태스크 관리

- **PRD (제품 요구사항 문서) 작성**:
  - `.cursor/rules/prd.prompt.md` 파일 내용을 참고하여 프로젝트 기획 내용을 `.cursor/rules/prd.md` 파일에 작성합니다.

- **태스크 생성**:
  - `.cursor/tasks/task.add.prompt.mdc` 파일을 활용하여 초기 개발 태스크를 생성합니다.

- **태스크 구현**:
  - `.cursor/tasks/task.implement.prompt.md` 파일을 사용하여 각 태스크를 구현합니다.

---

## 문제 해결

### 일반적인 문제들

<details>
<summary>Supabase 연결 오류</summary>

- DATABASE_URL과 DIRECT_URL이 올바르게 설정되었는지 확인
- 데이터베이스 비밀번호에 특수문자가 있는 경우 URL 인코딩 필요
- Supabase 프로젝트가 활성화 상태인지 확인
</details>

<details>
<summary>Google OAuth 로그인 실패</summary>

- Google Cloud Console에서 리디렉션 URI가 정확히 설정되었는지 확인
- Supabase의 Google Provider가 활성화되어 있는지 확인
- 클라이언트 ID와 시크릿이 올바르게 입력되었는지 확인
</details>

<details>
<summary>Vercel 배포 실패</summary>

- 모든 환경변수가 Vercel에 추가되었는지 확인
- Build 로그에서 구체적인 오류 메시지 확인
- Node.js 버전 호환성 확인
</details>