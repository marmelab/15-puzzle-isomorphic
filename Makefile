PORT ?= 3000

.PHONY: help install run start test lint format

help: ## Print all commands (default)
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

####### BUILD #######

install: ## Install dependencies
	npm i

build: ## Build the project
	npm run build

####### RUN #######

run: build ## Run the 15-puzzle isomorphic app
	PORT=$(PORT) npm run start

start: ## Run the 15-puzzle isomorphic app (alias for `run`)
	$(MAKE) run

####### DEV #######

test: ## Run all tests
	node_modules/.bin/jest

lint: ## Run the linter
	node_modules/.bin/eslint src/

format: ## Format the source code
	node_modules/.bin/eslint --fix src/*
