import { config } from 'dotenv';
import { authtoken, connect, disconnect } from '@ngrok/ngrok';
import { spawn } from 'child_process';

// Load environment variables from .env file
config();

async function start() {
    // Use the auth token from environment variables
    const authToken = process.env.NGROK_AUTHTOKEN;

    if (!authToken) {
        console.error("NGROK_AUTHTOKEN is not set");
        process.exit(1);
    }

    await authtoken(authToken);

    // Start the Next.js server using Bun
    const nextApp = spawn('bun', ['run', 'dev'], { stdio: 'inherit' });

    // Wait a moment to ensure the server is up
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Start ngrok
    const url = await connect(3000); // Assuming your Next.js app runs on port 3000
    console.log(`Ngrok is running at: ${url.url()}`);

    // Handle process exit
    const cleanup = async () => {
        await disconnect();
        nextApp.kill();
        process.exit();
    };

    // Handle termination signals
    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('exit', cleanup);
}

start().catch(console.error);
