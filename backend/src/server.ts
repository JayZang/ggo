import errorHandler from "errorhandler"

import app from "./app"
import { system } from "./config/index"

const port = system.port

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler())

/**
 * Start Express server.
 */
const server = app.listen(port, () => {
    console.log(
        "  App is running at http://localhost:%d in %s mode",
        port,
        app.get("env")
    )
    console.log("  Press CTRL-C to stop\n")
})

export default server
