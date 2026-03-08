# Build stage
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o bin/server ./cmd/server

# Run stage
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/bin/server .
COPY --from=builder /app/data ./data
EXPOSE 8080
CMD ["./server"]
