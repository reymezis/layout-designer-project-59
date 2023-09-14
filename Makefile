install:
	npm install

lint:
	npx stylelint ./app/scss/*.scss
	npx htmlhint ./app/pug/*.pug

build:
	npx gulp build

dev:
	npx gulp