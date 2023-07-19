install:
	npm install

lint:
	npx stylelint ./app/scss/*.scss
	npx htmlhint ./app/pug/*.pug
	npx stylelint ./build/**/*.scss
	npx htmlhint ./build/**/*.html

gulp:
	npx gulp
