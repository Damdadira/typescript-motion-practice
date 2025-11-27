# Motion

![Motion App](assets/screenshot.png)

TypeScript로 구현한 미디어 및 메모 관리 애플리케이션입니다.

## 주요 기능

- **Image**: 이미지 URL을 입력하여 이미지 카드 추가
- **Video**: YouTube 영상 URL을 입력하여 비디오 카드 추가
- **Note**: 제목과 내용을 입력하여 메모 카드 추가
- **Todo**: 할 일 목록 카드 추가
- **Drag & Drop**: 카드 순서를 드래그 앤 드롭으로 변경 가능
- **Delete**: 각 카드의 X 버튼으로 삭제 가능

## 화면 구성

### 메인 화면
- 상단 헤더에 Image, Video, Note, Todo 버튼 배치
- 메인 영역에 추가된 카드들이 리스트로 표시
- 카드 드래그 앤 드롭으로 순서 변경 지원

### Dialog 입력
- Media Input: Title과 URL 입력 (Image, Video용)
- Text Input: Title과 Body 입력 (Note, Todo용)

## 기술 스택

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

## 실행 방법

1. TypeScript 컴파일
```bash
tsc
```

## 학습 포인트

- TypeScript의 타입 시스템 활용
- 컴포넌트 기반 설계 패턴
- Decorator 패턴을 활용한 기능 확장
- Drag & Drop API 활용
- 제네릭과 인터페이스를 활용한 유연한 설계
