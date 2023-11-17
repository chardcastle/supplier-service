# Use an official Node.js runtime as a parent image
FROM cypress/included:latest

# Set the working directory in the container
WORKDIR /opt/project

# Copy package.json and package-lock.json to the working directory
COPY . .

# Install project dependencies
RUN npm install

# Define the command to run your app using the production build
#CMD ["npm", "run", "dev"]
ENTRYPOINT ["cypress", "run"]

