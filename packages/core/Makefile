.PHONY: help build install test lint format

help: ## Print all commands (default)
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

####### BUILD #######
clean-build: ## Remove the generated build
	rm build/*.js build/*.map

build: ## Build the project
	yarn run build

install: ## Install dependencies
	yarn

####### DEV #######

test: ## Run all tests
	node_modules/.bin/jest

lint: ## Run the linter
	node_modules/.bin/eslint src/

format: ## Format the source code
	node_modules/.bin/eslint --fix src/*
