FROM node:18-alpine 

WORKDIR /app
ENV NODE_ENV production
COPY package.json yarn.lock ./

RUN yarn --prod

COPY . .

EXPOSE 8000
RUN npx prisma generate

CMD [ "yarn", "start" ]
