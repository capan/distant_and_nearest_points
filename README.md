# Distant & Nearest Points Problem

This is my implementation for comparing perfomance of same problem in Node.JS and Rust.

## Problem: 

Let's say you have a list of random X,Y coordinates. Find closest and farthest two.

### Run rust implementation
`cd rust`

`cargo run -r`

### Run Node implementation

`cd node`

`npm i`

`npm run start`

### Go implementation

`cd go`

`go run .`

Adjust numbers to be created. 

Latest results on MacBook M1 for 100K points;

| Lang    | Input Generation | Output Calculation Time |
| --------- | ------- | ------- |
|  Node         |   ~9ms      | ~19 s |
|   Rust        |     ~5ms    |  ~13 s |
|      Go     |   ~10ms      | ~10 s|
