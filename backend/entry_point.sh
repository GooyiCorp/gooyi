#!/bin/bash

echo Migrating ..
npx prisma migrate deploy
yarn start