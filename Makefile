.PHONY: build deploy

build:
	rm -rf dist
	yarn build

deploy: build
	cd dist && \
	git init && \
	git add -A && \
	git commit -m 'deploy' && \
	git push -f https://github.com/tranmanhhungdn1201/vncoc-songs.git master:gh-pages && \
	cd -