FROM node:20.9-alpine AS base

WORKDIR /app

FROM base AS deps

RUN apk add --no-cache libc6-compat
COPY package*.json .
RUN npm i

COPY prisma .

RUN npx prisma generate
RUN dotenv -e .env.development.local npx prisma db push

FROM base AS dev

COPY --from=deps /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD [ "npm", "run", "dev" ]