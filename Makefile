.PHONY: run
run:
	npm run dev

.PHONY: build
build:
	rm -rf ./build
	npm run build
