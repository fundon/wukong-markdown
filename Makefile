
node_modules: package.json
	@npm install

test: node_modules
	@DEBUG=wukong ./node_modules/.bin/mocha \
		--require should \
		--timeout 10s \
		--slow 3s \
		--bail \
		--harmony \
		--reporter spec \
		$(SCRIPTS)

.PHONY: test
