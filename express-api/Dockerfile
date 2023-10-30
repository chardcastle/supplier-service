# Use the official Ubuntu 20.04 (Focal Fossa) base image
FROM node:lts

# Update the package repository and install essential packages
RUN apt-get update && apt-get install -y wget

# Provide libcrypto.so.1.1
# Resolves error
# > Instance failed to start because a library is missing or cannot be opened: "libcrypto.so.1.1"
RUN wget http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb
RUN dpkg -i libssl1.1_1.1.1f-1ubuntu2_amd64.deb

# Create and set the working directory in the container
# this dir allows exposure of node_modules in webstorm
WORKDIR /opt/project

COPY package*.json ./
COPY index.js ./
COPY src ./

RUN npm install -g nodemon
RUN npm install --include=dev

EXPOSE 3001

CMD [ "nodemon", "index.js" ]
