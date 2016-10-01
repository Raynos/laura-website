
build:
	node scripts/build.js

clean:
	rm -r ./static/*

static:
	./node_modules/.bin/static-server ./static

upload:
	git checkout gh-pages
	git fetch --all
	git rebase origin/hyperdev
	make clean
	make build
	cp -r ./static .
	git add --all
	git commit --all -m 'build static stuff'
	git push origin gh-pages -f

.PHONY: build static
