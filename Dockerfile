#
# ---- Base Node ----
FROM alpine:3.9 as base
# install node
RUN apk add --no-cache nodejs nodejs-npm tini
# set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]

#
# ---- Dependencies ----
FROM base as dependencies
# copy project file
COPY . /src
# set working directory
WORKDIR /src
# install node packages
RUN npm ci
# build project
RUN npm run build

#
# ---- Test ----
# run linters, setup and tests
FROM dependencies AS test
RUN npm run lint && npm run test && npm prune --production

#
# ---- Release
FROM base AS release
# copy production node_modules
WORKDIR /usr/src/service
COPY --from=dependencies /src/node_modules node_modules
COPY --from=dependencies /src/dist dist
CMD ["node", "dist/main.js"]

