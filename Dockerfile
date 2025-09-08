#-- BUILD
FROM oven/bun:canary-alpine AS build

USER bun
WORKDIR /home/bun

##-- Copy everything into the container
ADD --chown=bun:bun ./public ./public
ADD --chown=bun:bun ./src ./src
ADD --chown=bun:bun ./package.json .
ADD --chown=bun:bun ./tsconfig.json .

##-- Build the app
RUN bun install
RUN bun run build





#-- DEPLOYMENT
FROM nginx:alpine

##-- Copy app build into nginx
COPY --from=build /home/bun/build /usr/share/nginx/html
