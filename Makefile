setup: install build

install:
	pnpm install

build:
	pnpm run build

prepare-env:
	cp -n .env.example .env

start:
	NODE_ENV=production pnpm run start

dev:
	pnpm exec concurrently "make start-frontend" "make start-backend"

start-backend:
	pnpm run start --watch --verbose-watch --ignore-watch='node_modules .git dist database'

start-frontend:
	pnpm exec vite build --watch

lint:
	pnpm --silent run lint
	pnpm --silent run format:check

lint-fix:
	pnpm --silent run lint:fix

test:
	NODE_ENV=test pnpm --silent test
