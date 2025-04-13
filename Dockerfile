FROM node:23-slim

WORKDIR /usr/src/app

COPY . .

RUN cd ./survey-app-frontend && npm ci && npm run build && cp -r dist ../survey-app-backend && cd ../survey-app-backend && npm ci

WORKDIR /usr/src/app/survey-app-backend

CMD ["npm", "start"]
