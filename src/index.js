const mongoose = require("mongoose");
const app = require("./app");
const config = require("./config/config");

mongoose.connect(`${config.mongoose.url}/xflix`).then(() => {
    console.log("Connected to MongoDB");

    app.listen(config.port,()=>{
        console.log(`Server is running on port ${config.port}`)
    })
}).catch((error)=> console.log(error.message));


