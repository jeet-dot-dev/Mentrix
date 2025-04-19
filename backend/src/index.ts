import app from "./app";
import { PORT } from "./config";


const startServer = async () => {
    try{
        const server = app.listen(PORT, ()=> console.log(`Server is running at port: ${PORT}`));
        const signals = ['SIGINT', 'SIGTERM'];
        signals.forEach((signal)=> {
            process.on(signal, ()=> {
                console.log(`${signal} received, shutting down gracefully`);
                server.close(async ()=> {
                    console.log('HTTP server closed');
                    process.exit(0);
                })
            })
        })
    }catch(error) {
        console.error('Failed to start server:', error);
        process.exit(1)
    }
    
}

startServer();