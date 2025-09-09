# ---------------------------------------
# Dockerfile (Next.js + API with Yarn)
# ---------------------------------------

# 1) deps: install node_modules with good caching
FROM node:20-bullseye-slim AS deps
WORKDIR /app

# Copy only the dependency manifests first for caching
COPY package.json yarn.lock* .npmrc* .yarnrc* ./
# Copy source.config.ts as it's needed by fumadocs-mdx during install
COPY source.config.ts ./
RUN yarn install --frozen-lockfile

# 2) build: compile Next.js (standalone output)
FROM node:20-bullseye-slim AS build
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Ensure next.config.js has:  module.exports = { output: 'standalone' }
RUN yarn build

# 3) run: minimal runtime with only the built server
FROM node:20-bullseye-slim AS run
ENV NODE_ENV=production
WORKDIR /app

# Copy the standalone server bundle + static assets
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Drop privileges (optional, but good practice)
RUN useradd -m nextjs && chown -R nextjs:nextjs /app
USER nextjs

EXPOSE 3000
ENV PORT=3000

# Healthcheck (simple home page request)
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD node -e "require('http').get('http://localhost:'+process.env.PORT, r=>{if(r.statusCode<500) process.exit(0); else process.exit(1)}).on('error',()=>process.exit(1))"

# Start the Next.js server
CMD ["node", "server.js"]
