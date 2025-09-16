FROM alpine:latest
WORKDIR /app
COPY build.sh ./
RUN chmod +x build.sh
VOLUME ["/shared_data"]
CMD ["/app/build.sh"]
