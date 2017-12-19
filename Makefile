.PHONY: help install build run start test lint

LERNA = node_modules/.bin/lerna

help: ## Print all commands (default)
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

####### BUILD #######

install: ## Install dependencies of each package
	$(LERNA) bootstrap

build: install ## Build each package
	$(LERNA) exec -- make build

####### RUN #######

run: build ## Run all
	$(LERNA) exec -- make run

start: ## Run all (alias for `run`)
	$(MAKE) run

####### DEV #######

test: ## Run all tests
	$(LERNA) exec -- make test

lint: ## Run the linter on each package
	$(LERNA) exec -- make lint
