default:
	docker build . -t server --platform linux/amd64
	docker tag server gooyi.de:5000/server
	docker push gooyi.de:5000/server
build: 
	docker build . -t server --platform linux/amd64
push:
	docker tag server gooyi.de:5000/server
	docker push gooyi.de:5000/server
	