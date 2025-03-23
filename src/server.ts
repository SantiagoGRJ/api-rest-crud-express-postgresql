import app from "./app"
import { EnvConfig } from "./env";

const PORT = EnvConfig.PORT || 3000


app.listen(3000,()=>{
console.log(`SERVER LISTENING TO PORT ${PORT}`);
    
})

