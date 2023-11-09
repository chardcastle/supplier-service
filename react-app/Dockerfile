# Use an official Node.js runtime as a parent image
FROM node:lts

# Set the working directory in the container
WORKDIR /opt/project

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install project dependencies
RUN npm install

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run your app using the production build
CMD ["npm", "run", "dev"]
