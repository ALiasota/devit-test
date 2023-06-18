### DEV

build:
	cd client && $(MAKE) build
	cd server && $(MAKE) build

up:
	docker-compose up

down:
	docker-compose down