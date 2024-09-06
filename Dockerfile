# 가져올 이미지를 정의
FROM node:20

# 컨테이너 내에서 커맨드를 어디서 실행할 지 경로 설정하기
WORKDIR /app

# package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
COPY package.json .

# package.json 파일 설치. npm install (의존성 설치)
RUN npm install

# 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
COPY . .

# 3000번 포트 노출
EXPOSE 3000

# npm start를 실행
CMD ["npm", "start"]
