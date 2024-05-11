import express, { json, urlencoded } from "express";
import type { Request as ExpressRequest, Response as ExpressResponse } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";

export const app = express();

// Use body parser to read sent json payloads
app.use(
	urlencoded({
		extended: true,
	})
);
app.use(json());

// Expose a /docs endpoint for API documentation using Swagger UI
app.use("/docs", swaggerUi.serve, async (_req: ExpressRequest, res: ExpressResponse) => {
	return res.send(swaggerUi.generateHTML(await import("../build/swagger.json")));
});

RegisterRoutes(app);
