# 프로젝트 소개 🙂

바닐라 타입스크립트로 구현한 웹툰 검색기 입니다.
<br>
**보러가기 -> https://yeeed711.github.io/webtoon-search/**
<br>

## 기술 스택 🛠

- TypeScript
- SCSS
- Webpack
- Bable
- ES Lint
- Prettier
  <br>

## 클래스 다이어그램 📊

<img width="800" alt="클래스다이어그램" src="https://user-images.githubusercontent.com/97894417/207247121-4d4cc632-aa98-458c-9901-65288d6fbe77.png">

<br>

## UI 디자인 ✨

|                                                                     메인 화면                                                                      |                                                                  검색 했을 때 화면                                                                   |
| :------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img width="600" alt="검색 메인 화면" src="https://user-images.githubusercontent.com/97894417/206394586-e0687543-e556-4e38-b70c-79e201571514.png"> | <img width="600" alt="검색 했을때 화면" src="https://user-images.githubusercontent.com/97894417/206394582-0f707bed-3e7d-4977-a621-b8b3a7de2ee4.png"> |

<br>

## 구현기능 🦾

|                                                             검색                                                              |                                                                   검색 키워드 강조                                                                   |
| :---------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![검색기능시연](https://user-images.githubusercontent.com/97894417/206393584-e4122069-ecec-46c4-b791-b5cbc331df6b.gif) | <img width="600" alt="검색 키워드 강조" src="https://user-images.githubusercontent.com/97894417/206393836-9966f661-2eba-4a35-ac4d-57b8c5074b47.png"> |

- **검색** : 제목, 작가명으로 검색가능
- **캐싱** : 새로고침시 현재 검색한 키워드, 검색 리스트, 리스트 스크롤 위치 유지
- **검색 키워드 강조** : 검색한 키워드중 매칭되는 텍스트를 강조
- **키보드 이벤트**(검색 결과 리스트를 키보드로도 조작 가능)
  - `상향 방향키` : 리스트 목록 상향이동
  - `하향 방향키` : 리스트 목록 하향이동
  - `Enter` : 리스트 상세보기
  - `Escape` : 모달 팝업 닫기
- 초기 화면 진입시 input focusing
- 검색 키워드 없을 시 API요청 방지
- 검색창에 debounce를 구현해 무분별한 API요청 방지

<br>

## 디렉토리 구조 📁

<details markdown="1">
<summary>자세히 보기</summary>

```
├── 📁 public
│   ├── favicon.ico
│   └── index.html
├── 📁 src
│   ├── App.ts
│   ├── main.ts
│   ├── custom.d.ts
│   ├── 📁 api
│   │   └── index.ts
│   ├── 📁 components
│   │   ├── 📁 core
│   │   │   ├── Component.ts
│   │   │   └── index.ts
│   │   ├── index.ts
│   │   ├── 📁 message
│   │   │   ├── 📁 ErrorMeg
│   │   │   └── index.ts
│   │   └── 📁 domain
│   │       ├── 📁 search
│   │       │   ├── 📁 SearchInput
│   │       │   ├── 📁 SearchItemInfo
│   │       │   └── 📁 SearchResult
│   │       └── index.ts
│   ├── 📁 constants
│   ├── 📁 models
│   ├── 📁 scss
│   └── 📁 utils
│       ├── 📁 dom
│       ├── 📁 helpers
│       ├── 📁 storage
│       └── index.ts
└── README.md
```

</details>

- `/api` : api 요청 관련
- `/components` : 컴포넌트들의 집합
  - `/core` : 코어 컴포넌트
  - `/domain` : 도메인 컴포넌트의 집합
- `/constants` : 전역으로 사용되는 상수들의 집합
- `/models` : 전역으로 사용되는 타입 정의(main data models)
- `/scss` : scss 스타일
- `/utils` : 전역으로 사용되는 함수들의 집합
  - `/dom` : dom조작 관련 함수
  - `/helpers` : 기능로직 관련 함수
  - `/storage` : 스토리지 관련 함수

<br>

## Challenges 🫠

기능 개발을 하며 겪은 이슈들

[개발일지 보러가기](https://www.notion.so/yeeed/294cc6369a5e45c296305059c279393f)
