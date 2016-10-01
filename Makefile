
build:
	node scripts/build.js

clean:
	rm -r ./static/*

static:
	./node_modules/.bin/static-server ./static

.PHONY: build static
