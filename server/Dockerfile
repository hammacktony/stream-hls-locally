FROM node:10

WORKDIR /usr/src/app
COPY . .

# Install packages
RUN yarn install

# Build ui
RUN yarn run build


# Run Server
ENV PORT=8080
ENV DATA_DIRECTORY=/data


EXPOSE ${PORT}
CMD [ "sh", "run_server.sh"] 