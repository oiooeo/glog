## [Glog\*](https://www.glog.world/)

> `Globe` + `Log` = `Glog`

![Slide 16_9 - 1](https://github.com/oiooeo/glog/assets/133937368/a50c6d6f-a58b-49e3-8adb-c89ffc0cd5d7)

<!-- ![Sep-01-2023 20-39-36](https://github.com/oiooeo/glog/assets/133937368/0f497dc5-b1d3-4c57-b586-d7aafcc09ac1)
![Sep-01-2023 20-38-43](https://github.com/oiooeo/glog/assets/133937368/6b849379-c089-4000-b0f2-f9641d7dfa1b) -->

---

## 팀구성

|                                 [최윤서](https://github.com/oiooeo)                                 |                                 [전수정](https://github.com/suzzjeon)                                 |                              [김승범](https://github.com/seungbeom1999)                               |                                 [백예나](https://github.com/whybwhyd)                                 |                               [서하영](https://onlehaaru.notion.site/6645d19e202f456d91bdf617e42df221)                               |
| :-------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/72060405?v=4" alt="프로필 이미지" width="200px"/> | <img src="https://avatars.githubusercontent.com/u/133937368?v=4" alt="프로필 이미지" width="200px" /> | <img src="https://avatars.githubusercontent.com/u/121495648?v=4" alt="프로필 이미지" width="200px" /> | <img src="https://avatars.githubusercontent.com/u/131356619?v=4" alt="프로필 이미지" width="200px" /> | <img src="https://github.com/oiooeo/glog/assets/133937368/d91b563f-eb9f-4479-837e-01a89a23b7c3" alt="프로필 이미지" width="200px" /> |
|                                             `Front-end`                                             |                                              `Front-end`                                              |                                              `Front-end`                                              |                                              `Front-end`                                              |                                                              `Designer`                                                              |

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

## 서비스 아키텍쳐

![image](https://github.com/oiooeo/glog/assets/133937368/cd21e5c3-257f-434f-aaf1-fa61c43e8aa7)

---

## 기술 스택

💻 Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

💾 Database

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

📚 Development

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white) ![Yarn](https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white) ![mapbox](https://img.shields.io/badge/mapbox-000000.svg?style=for-the-badge&logo=mapbox&logoColor=white) ![React](https://img.shields.io/badge/zustand-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)

💬 Communication

![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white)

---

## ERD

![image](https://github.com/oiooeo/glog/assets/133937368/8c60c900-018e-4264-a85c-27c55b720623)

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
 ┃ ┣ 📂loader
 ┃ ┃ ┣ 📜loaderBg.svg
 ┃ ┃ ┣ 📜loaderLeft.svg
 ┃ ┃ ┗ 📜loaderRight.svg
 ┃ ┣ 📂pin
 ┃ ┃ ┣ 📜clusterFive.png
 ┃ ┃ ┣ 📜clusterTen.png
 ┃ ┃ ┣ 📜clusterTwenty.png
 ┃ ┃ ┣ 📜pinFocus.svg
 ┃ ┃ ┣ 📜pinLarge.svg
 ┃ ┃ ┣ 📜pinSmall.svg
 ┃ ┃ ┗ 📜unclusterPin.png
 ┃ ┗ 📜logo.svg
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂button
 ┃ ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂header
 ┃ ┃ ┃ ┣ 📜Header.hooks.tsx
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜HeaderLogin.tsx
 ┃ ┃ ┃ ┣ 📜HeaderSearch.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂loader
 ┃ ┃ ┃ ┣ 📜Loader.tsx
 ┃ ┃ ┃ ┗ 📜style.ts
 ┃ ┃ ┣ 📂overlay
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
 ┃ ┃ ┣ 📜Globe.content.ts
 ┃ ┃ ┣ 📜Globe.marker.tsx
 ┃ ┃ ┣ 📜Globe.tsx
 ┃ ┃ ┣ 📜globe.util.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂globeCluster
 ┃ ┃ ┣ 📜GlobeCluster.tsx
 ┃ ┃ ┗ 📜GlobeCluster.util.ts
 ┃ ┣ 📂globeSearch
 ┃ ┃ ┣ 📜GlobeSearch.SearchBox.tsx
 ┃ ┃ ┣ 📜GlobeSearch.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂landing
 ┃ ┃ ┣ 📜Landing.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂like
 ┃ ┃ ┣ 📜Like.hooks.ts
 ┃ ┃ ┣ 📜Like.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂likesList
 ┃ ┃ ┣ 📜LikesList.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜Post.ContentsSection.tsx
 ┃ ┃ ┣ 📜Post.UploadBox.tsx
 ┃ ┃ ┣ 📜Post.hooks.ts
 ┃ ┃ ┣ 📜Post.tsx
 ┃ ┃ ┣ 📜Post.util.tsx
 ┃ ┃ ┗ 📜style.ts
 ┃ ┗ 📂searchList
 ┃ ┃ ┣ 📜SearchList.SessionDependentView.tsx
 ┃ ┃ ┣ 📜SearchList.tsx
 ┃ ┃ ┣ 📜SearchList.util.tsx
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
 ┃ ┣ 📜useLocationStore.ts
 ┃ ┣ 📜useMapLocationStore.ts
 ┃ ┣ 📜useMarkerInvisible.ts
 ┃ ┣ 📜usePostStore.ts
 ┃ ┣ 📜useSessionStore.ts
 ┃ ┗ 📜useTabStore.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┣ 📜index.tsx
 ┣ 📜react-app-env.d.ts
 ┣ 📜reset.css
 ┗ 📜setupTests.ts
```
