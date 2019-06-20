development:
	@docker-compose down && \
		docker-compose build --pull && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.development.yml \
		up --remove-orphans

development--no-cache:
	@docker-compose down && \
		docker-compose build --pull --no-cache && \
		docker-compose \
			-f docker-compose.yml \
			-f docker-compose.development.yml \
		up --remove-orphans

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
