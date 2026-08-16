# Step 1: Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./
# Install all dependencies (needed for compiling TypeScript)
RUN npm ci 
# Copy the rest of your application code
COPY . .
# FIX: Executes your specific build command ("tsc -p")
RUN npm run build
# Strip away devDependencies to keep the image lightweight
RUN npm prune --production

# Step 2: Production execution stage
FROM node:20-alpine
WORKDIR /app

# Copy the light node_modules and compiled output from builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist 

# Expose the designated port
EXPOSE 3000

CMD ["npm","run","start"]