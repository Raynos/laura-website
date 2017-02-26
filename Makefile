
build:
	node scripts/build.js

clean:
	rm -rf ./static/*

static:
	./node_modules/.bin/static-server ./static

upload:
	git checkout master
	git fetch --all
	git merge origin/gomix
	git push origin master
	git checkout gh-pages
	git rebase origin/master
	make clean
	make build
	cp -R ./static/* ./
	git add --all
	git commit --all --allow-empty -m 'build static stuff'
	git push origin gh-pages -f
	git checkout master

.PHONY: build static
