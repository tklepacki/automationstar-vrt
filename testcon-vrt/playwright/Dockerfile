FROM mcr.microsoft.com/playwright:v1.54.0

WORKDIR /app

COPY package.json /app/package.json

RUN npm install -g npm@latest

RUN npm install

RUN npm install @playwright/test@1.54.0

RUN npx playwright install

COPY playwright/screenshotServer.mjs /app/screenshotServer.mjs

CMD ["node", "./screenshotServer.mjs"]
