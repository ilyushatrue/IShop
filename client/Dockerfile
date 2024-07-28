FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build
FROM node:alpine
WORKDIR /app
COPY --from=build /app ./
RUN npm install --only=production --legacy-peer-deps
CMD ["npm", "start"]
