FROM node:18.17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 7677

CMD ["npm", "run", "dev"]
