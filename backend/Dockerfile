FROM node:18

WORKDIR /app
ENV NODE_ENV production
COPY package.json yarn.lock ./

RUN yarn --prod

COPY . .

EXPOSE 8000
RUN npx prisma generate
# RUN chmod +x ./entry_point.sh
# ENTRYPOINT ["bash", "./entry_point.sh"]
CMD [ "yarn", "start" ]