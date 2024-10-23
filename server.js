import mongoose from "mongoose";
import { app } from "./app.js";

app.listen(process.env.PORT, () => {
    console.log('app is listening on port:', process.env.PORT)

    // connect with db
    mongoose.connect(process.env.MONGO_URI, { dbName: 'TODO' }).then(() => console.log('db connected'))
        .catch((err) => console.log('error connecting with db:', err))
})
