setup: install db-migrate

install:
	pnpm install

db-migrate:
	pnpm run migrate

build:
	pnpm run build

prepare-env:
	cp -n .env.example .env

start:
	NODE_ENV=production pnpm run start

dev:
	pnpm exec concurrently "make start-frontend" "make start-backend"

start-backend:
	npm start -- --watch --verbose-watch --ignore-watch='node_modules .git .sqlite'

start-frontend:
	pnpm exec webpack --watch --progress

lint:
	pnpm --silent run lint
	pnpm --silent run format:check

lint-fix:
	pnpm --silent run lint:fix

test:
	NODE_ENV=test pnpm --silent test
