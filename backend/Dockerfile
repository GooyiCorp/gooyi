FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8000
RUN npx prisma generate
# RUN chmod +x ./entry_point.sh
# ENTRYPOINT ["bash", "./entry_point.sh"]
CMD [ "yarn", "start" ]