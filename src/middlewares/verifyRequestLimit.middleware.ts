import rateLimit from "express-rate-limit";



 const verifyRequestLimit = rateLimit({
    windowMs:15 * 60 * 100,
    limit:40,
    message:"Too many requests, please try again after 15 minutes",
})


export default verifyRequestLimit