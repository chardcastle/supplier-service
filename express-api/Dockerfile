# Use an official Node.js runtime as a parent image
FROM node:lts

# Create and set the working directory in the container
WORKDIR /opt/project

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY index.js ./
COPY src ./

# Install the application dependencies
RUN npm install -g nodemon
RUN npm install --include=dev

# Expose a port (you can choose the port your Express index listens on)
EXPOSE 3001

# Start the application
CMD [ "nodemon", "index.js" ]
