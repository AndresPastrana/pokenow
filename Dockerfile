

# Use the official Node.js LTS image as the base image
FROM node:lts-alpine

# Create a directory for persistent storage
VOLUME /app/data

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN pnpm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js app
CMD ["pnpm", "start"]