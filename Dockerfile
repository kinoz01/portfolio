FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY public /usr/share/nginx/html

# Non-root
RUN adduser -D -H -u 10001 appuser \
 && chown -R appuser:appuser /var/cache/nginx /var/run /var/log/nginx
USER appuser

EXPOSE 8080
