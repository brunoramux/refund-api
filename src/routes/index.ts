import { Router } from "express";
import { userRoutes } from "./user-routes";
import { sessionRoutes } from "./session-routes";
import { refundsRoutes } from "./refunds-routes";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const routes = Router()

// ROTAS PUBLICAS
routes.use("/users", userRoutes)
routes.use("/session", sessionRoutes)

// ROTAS PRIVADAS - ROTAS ABAIXO PASSARÃO PELO MIDDLEWARE
routes.use(ensureAuthenticated)
routes.use("/refunds", refundsRoutes)

export { routes };