# bookmyshow-api-nodejs-sql

POSTMAN DOCS - [here](https://documenter.getpostman.com/view/7984450/2s93m5zgVx)

#### This is an API for booking movie tickets.

1. Get available movies for given - Cinema, Date
2. Check available seats for a show
3. Book tickets for a slot

![er-diagram](./readme-assets/er-diagram.png)

#### Which columns should be indexed?

It's important to note that adding indexes also comes with some overhead, as they consume additional storage space and require maintenance during data modification operations (such as inserts, updates, and deletes).
Hence we should add them only when a bottleneck is observed.

In this example indexing the foreign keys for Shows table would be good as this will speed up our joins.
Also if we want to prioritize them then indexing the HallId in Shows table should be prioritized as it is used more frequently than the rest.

### Checklist

- [x] JWT Auth
- [x] Normalization of database
- [x] Locking the DB while bulk operation with transactions
- [x] Elastic Search for querying movies with filters(language, genre and dimension like 3D, 4D etc..) and fuzzy search
- [x] Adding comments for a movie and retrieving with Mongo (for better write performance)
- [x] Caching of movie details endpoints with Redis
- [x] Load test the API with Artilerry

### Example Query for the UI below

![example-query](./readme-assets/example-query.png)
![bookmyshow-ui](./readme-assets/bookmyshow.jpeg)

### Artillery

Here I have checked for a GET endpoint after performing a login. Ideally, we should have perform the login step once and store the token for all the tests.
Also, we should make a separate DB for load testing and add tests for endpoints which make changes to the DB as well and do the cleanup after that.
Here I have created a test-user in PROD DB just for simplicity.

Make sure to have artillery installed globally -

`sudo npm i -g artillery`

#### Invocation

```bash
artillery run tests/load-tests/tests/get-show-load-test.yml
```

#### Config provided

```
config:
  target: "http://127.0.0.1:8080"
  payload:
    - path: "../user-credentials-example.csv"
      fields:
        - "username"
        - "password"
      order: sequence
      skipHeader: true
  phases:
    - duration: 60
      arrivalRate: 10

scenarios:
  - name: "Login and Get Show Scenario"
    flow:
      - post:
          url: "/api/auth/login/"
          json:
            username: "{{ username }}"
            password: "{{ password }}"
          capture:
            - json: "$.token"
              as: "token"
      - get:
          url: "/api/shows/1/2023-05-24"
          headers:
            Authorization: "Bearer {{ token }}"

```

#### What's in the test?

```
    duration: It represents the total duration of the load test in seconds. In the example you provided, the duration is set to 60 seconds, meaning the load test will run for 1 minute.

    arrivalRate: It indicates the rate at which virtual users (VUs) or requests will be generated during the load test. In your example, the arrivalRate is set to 10, which means that Artillery will aim to send an average of 10 requests per second over the course of the load test.

Combining these properties, Artillery will generate a load with a gradually increasing number of virtual users over time until the desired arrival rate is achieved. In this case, it will ramp up to an average of 10 requests per second during the 60-second duration.
```

#### Output

```
All VUs finished. Total time: 1 minute, 4 seconds

--------------------------------
Summary report @ 22:48:07(+0530)
--------------------------------

http.codes.200: ................................................................ 1200
http.downloaded_bytes: ......................................................... 540000
http.request_rate: ............................................................. 20/sec
http.requests: ................................................................. 1200
http.response_time:
  min: ......................................................................... 4
  max: ......................................................................... 4164
  median: ...................................................................... 87.4
  p95: ......................................................................... 2101.1
  p99: ......................................................................... 3395.5
http.responses: ................................................................ 1200
vusers.completed: .............................................................. 600
vusers.created: ................................................................ 600
vusers.created_by_name.Login and Get Show Scenario: ............................ 600
vusers.failed: ................................................................. 0
vusers.session_length:
  min: ......................................................................... 64.3
  max: ......................................................................... 5887
  median: ...................................................................... 169
  p95: ......................................................................... 4231.1
  p99: ......................................................................... 5711.5
```

#### Analysis

```
- The load test ran for 1 minute and 4 seconds.
- There were 1200 successful responses with a status code of 200 (OK).
- The total amount of data downloaded was 540 KB.
- The average request rate was 20 requests per second.
- A total of 1200 requests were made during the test.
- The response times varied, with the fastest response taking 4 milliseconds and the slowest taking 4.164 seconds.
- The median (50th percentile) response time was 87.4 milliseconds.
- The 95th percentile response time was 2.101 seconds, meaning 95% of responses were faster than this.
- The 99th percentile response time was 3.395 seconds, meaning 99% of responses were faster than this.
- There were no failed requests; all requests were successful.
- A total of 600 virtual users completed their execution.
- A total of 600 virtual users were created.
- The duration of virtual user sessions varied, with the shortest session lasting 64.3 milliseconds and the longest lasting 5.887 seconds.
- The median session length was 169 milliseconds.
- The 95th percentile session length was 4.231 seconds, meaning 95% of sessions were shorter than this.
- The 99th percentile session length was 5.711 seconds, meaning 99% of sessions were shorter than this.

These metrics provide insights into the performance of your application during the load test, including response times, request success rate, and the behavior of virtual users. They help you understand how your system performed under the simulated load and can guide further optimizations if needed.
```
