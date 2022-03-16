import express from 'express'
import morgan from 'morgan'
import { applyRoutes } from './router'
import cors from 'cors'
import { sequelizeConnection } from 'libs'

class Server {
  private _app: express.Application

  constructor() {
    this._app = express()
    this._config()
  }

  private _config() {
    this._app.use(cors())
    this._app.use(morgan('dev'))
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: false }))
    this._app.use(
      (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
          'Access-Control-Allow-Headers',
          'Authorization, Content-Type'
        )
        next()
      }
    )

    applyRoutes(this._app)
  }

  private async _sequelize(): Promise<void> {
    try {
      await sequelizeConnection.authenticate()
      console.log('Database connection established')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      console.error(e.message)
      process.exit(1)
    }
  }

  public start(): void {
    this._app.listen(process.env.PORT, () => {
      console.log(`Server running at port ${process.env.PORT}`)
    })

    try {
      this._sequelize()
    } catch (e) {
      console.error(e)
    }
  }
}

const server = new Server()

export { server as Server }
