FRONTEND  - MIDDLE-END - BACKEND

-Services--> fight_search_service,auth_service,booking_ervice,remainder_service
- We need an intermediate layer between the client side and the different microservices
- Using this middle end path, when client sends request we will be able to make decision that which microservice
should actually respond to this request
- We can do message validation, response transformation, rate limiting
- We try to prepare an API Gateway that acts as this middle end and responds to client req from corresponding microservices by making http calls.