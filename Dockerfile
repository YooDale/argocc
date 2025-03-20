FROM node:18-alpine

WORKDIR /app

# package.json (및 package-lock.json이 있다면 함께) 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 코드 복사
COPY . .

# 애플리케이션 실행
CMD ["node", "app.js"]

