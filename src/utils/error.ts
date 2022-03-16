export class CustomError extends Error {
    public status: number

    constructor(public message: string, public errors?: string[]) {
        super(message)
        this.status = 400

        if (!this.errors) this.errors = [message]
    }
}
