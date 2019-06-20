preview:
	@docker-compose down && \
		docker-compose build --pull --no-cache && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.preview.yml \
		up -d --remove-orphans

production:
	@docker-compose down && \
		docker-compose build --pull --no-cache && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.production.yml \
		up -d --remove-orphans
