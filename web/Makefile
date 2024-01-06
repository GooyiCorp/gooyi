default:
	docker build . -t web --platform linux/amd64
	docker tag web gooyi.de:5000/web
	docker push gooyi.de:5000/web
build: 
	docker build . -t web --platform linux/amd64
push:
	docker tag web gooyi.de:5000/web
	docker push gooyi.de:5000/web
	