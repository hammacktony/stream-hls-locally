FROM node:10

WORKDIR /usr/src/app
COPY . .

# Install packages
RUN yarn install

# Build ui
RUN yarn run build


# Run Server
ENV NODE_ENV=production
ENV PORT=8080
ENV DATA_DIRECTORY=/data


EXPOSE ${PORT}
CMD [ "node", "server.js"] 