FROM node:lts-iron AS nestjs-lion-backend
WORKDIR /usr/src/app
RUN npm install -g @nestjs/cli
COPY ["package.json", "package-lock.json*", "/usr/src/app/"]
RUN npm install --silent
COPY [".", "."]
RUN npm run build --prod

FROM node:alpine AS nestjs-backend
LABEL author="Paulo Inácio"
WORKDIR /app
ENV NODE_ENV=production
COPY --from=nestjs-lion-backend /usr/src/app/dist /app/
COPY ["package.json", "package-lock.json*", "/app/"]
COPY [".env", "/app/"]
RUN npm install --silent
CMD [ "node", "/app/main.js" ]

EXPOSE 5000