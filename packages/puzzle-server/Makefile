.PHONY: help install builddev lint format

help: ## Print all commands (default)
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

####### BUILD #######

install: ## Install dependencies
	yarn

build: ## Build the project
	yarn build

####### DEV #######

dev: ## Run the offline serverless
	SLS_DEBUG=* yarn run dev

lint: ## Run the linter
	node_modules/.bin/eslint src/

format: ## Format the source code
	node_modules/.bin/eslint --fix src/*
