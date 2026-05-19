run:
	sudo docker compose up

run-detached:
	sudo docker compose up -d

stop:
	sudo docker compose down

stop-delete-all:
	sudo docker compose down -v --rmi all

