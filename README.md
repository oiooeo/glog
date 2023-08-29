## [Glog\*](https://www.naver.com/)

> `Globe` + `Log` = `Glog`

![Aug-29-2023 17-52-03](https://github.com/oiooeo/glog/assets/133937368/7b26b409-5b86-4269-b0b4-91c501077379)

---

## 팀구성

|                                               최윤서                                                |                                                전수정                                                 |                                                김승범                                                 |                                                백예나                                                 |
| :-------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/72060405?v=4" alt="프로필 이미지" width="200px"/> | <img src="https://avatars.githubusercontent.com/u/133937368?v=4" alt="프로필 이미지" width="200px" /> | <img src="https://avatars.githubusercontent.com/u/121495648?v=4" alt="프로필 이미지" width="200px" /> | <img src="https://avatars.githubusercontent.com/u/131356619?v=4" alt="프로필 이미지" width="200px" /> |
|                                             `Front-end`                                             |                                              `Front-end`                                              |                                              `Front-end`                                              |                                              `Front-end`                                              |

---

## 서비스 아키텍쳐

![image](https://github.com/oiooeo/glog/assets/131356619/96360d54-c51a-43d1-996b-639c91bf6386)

---

## 기술 스택

### 💻 Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

### 💾 Database

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### 📚 Development

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white) ![mapbox](https://img.shields.io/badge/mapbox-000000.svg?style=for-the-badge&logo=mapbox&logoColor=white) ![React](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

### 💬 Communication

![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)

---

## How To Use

```
# clone this repository
$ git clone git@github.com:oiooeo/glog.git

# into the repository
$ cd glog

# install dependencies
$ yarn

# run
$ yarn start
```

---

## 커밋 컨벤션

```
- feat. 새로운 기능 추가
- fix. 버그 수정
- docs. 문서 변경
- style. 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
- refactor. 코드 리팩토링 (변수명 변경 등)
- chore. 설정 변경 등 기타 변경사항
- design. HTML, CSS 등 사용자 UI 디자인 변경
- resolve. 병합 충돌 해결
```

---

## 파일 구조

```
📦src
 ┣ 📂api
 ┃ ┣ 📜mapbox.ts
 ┃ ┣ 📜supabaseAuth.ts
 ┃ ┣ 📜supabaseClient.ts
 ┃ ┗ 📜supabaseDatabase.ts
 ┣ 📂assets
 ┃ ┣ 📂pin
 ┃ ┃ ┣ 📜LargePin.png
 ┃ ┃ ┣ 📜mideumPin.png
 ┃ ┃ ┣ 📜pinFocus.svg
 ┃ ┃ ┣ 📜pinLarge.svg
 ┃ ┃ ┣ 📜pinSmall.svg
 ┃ ┃ ┗ 📜smallPin.png
 ┃ ┗ 📜logo.svg
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂button
 ┃ ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┃ ┣ 📜buttonExample.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂overlay
 ┃ ┃ ┃ ┣ 📂dialog
 ┃ ┃ ┃ ┃ ┣ 📜Dialog.hooks.tsx
 ┃ ┃ ┃ ┃ ┗ 📜Dialog.tsx
 ┃ ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┃ ┣ 📜Modal.hooks.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┃ ┗ 📜Overlay.context.tsx
 ┃ ┃ ┣ 📂postItem
 ┃ ┃ ┃ ┣ 📜PostItem.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┗ 📂switch
 ┃ ┃ ┃ ┣ 📜Switch.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂detail
 ┃ ┃ ┣ 📜Detail.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂globe
 ┃ ┃ ┣ 📜Globe.marker.tsx
 ┃ ┃ ┣ 📜Globe.tsx
 ┃ ┃ ┣ 📜GlobeCluster.tsx
 ┃ ┃ ┣ 📜globe.util.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂globeSearch
 ┃ ┃ ┣ 📜GlobeSearch.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂like
 ┃ ┃ ┣ 📜Like.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂likesList
 ┃ ┃ ┣ 📜LikesList.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜Post.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┗ 📂searchList
 ┃ ┃ ┣ 📜SearchList.tsx
 ┃ ┃ ┗ 📜style.ts
 ┣ 📂hooks
 ┃ ┣ 📜useInput.tsx
 ┃ ┣ 📜useLockBodyScroll.ts
 ┃ ┗ 📜useOnClickOutSide.ts
 ┣ 📂pages
 ┃ ┗ 📜Home.tsx
 ┣ 📂shared
 ┃ ┗ 📜Router.tsx
 ┣ 📂types
 ┃ ┗ 📜supabase.ts
 ┣ 📂zustand
 ┃ ┗ 📜store.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜reset.css
 ┗ 📜setupTests.ts
```
