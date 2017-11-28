PORT ?= 3000
CACHE ?= true

.PHONY: help copy-config install build run start dev test lint format

help: ## Print all commands (default)
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

####### BUILD #######

copy-config: ## Create the config file based on the config example
	cp -n ./src/config.dist.js ./src/config.js

install: copy-config ## Install dependencies
	npm i

build: ## Build the project
	npm run build

####### RUN #######

run: build ## Run the 15-puzzle isomorphic app
	PORT=$(PORT) npm run start

start: ## Run the 15-puzzle isomorphic app (alias for `run`)
	$(MAKE) run

####### DEV #######

dev: ## Run with livereload
	npm run dev

test: ## Run all tests
ifeq ($(UPDATE), true)
	node_modules/.bin/jest --updateSnapshot
else
	node_modules/.bin/jest
endif

lint: ## Run the linter
	node_modules/.bin/eslint src/

format: ## Format the source code
	node_modules/.bin/eslint --fix src/*
