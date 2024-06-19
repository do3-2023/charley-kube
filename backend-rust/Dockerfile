
FROM rust:latest as builder
RUN rustup target add wasm32-wasi
WORKDIR /app
COPY . ./
RUN cargo build --target=wasm32-wasi --release

FROM scratch
COPY spin.toml /spin.toml
COPY --from=builder /app/target/wasm32-wasi/release/backend_rust.wasm /backend_rust.wasm
ENTRYPOINT ["/spin.toml"]