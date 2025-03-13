import dotenv from "dotenv"
dotenv.config()

const JWT_USER_PASSWORD=process.env.JWT_USER_PASSWORD
const JWT_ADMIN_PASSWORD=process.env.JWT_ADMIN_PASSWORD
const STRIPE_SECRET_KEY="sk_test_51QJE2ELtJ7HtT1oVYsi7l2flvXfeAUh57oOtRUIw6jrjsVNpEmyCPPf0UZEBcq6V9upN6oEEB8P1i9UX6oCHBXVD00MsWh6b6q"

export default {
    JWT_USER_PASSWORD,
    JWT_ADMIN_PASSWORD,
    STRIPE_SECRET_KEY
}