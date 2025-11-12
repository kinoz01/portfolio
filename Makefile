run:
	docker build -t portfolio . && docker run -p 8080:8080 portfolio