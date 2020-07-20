sam build --use-container --skip-pull-image
sam local start-api -p 3001 --skip-pull-image --env-vars local_env.json --docker-network sam-ishortenthings 
