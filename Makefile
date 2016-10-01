
build:
	node scripts/build.js

clean:
	rm -r ./static/*

static:
	./node_modules/.bin/static-server ./static

upload:
	git fetch --all
	git merge origin/hyperdev
	git checkout gh-pages
	git rebase origin/master
	make clean
	make build
	cp -R ./static/* ./
	git add --all
	git commit --all -m 'build static stuff'
	git push origin gh-pages -f
	git checkout master

.PHONY: build static
