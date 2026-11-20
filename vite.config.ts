import { fileURLToPath, URL } from "node:url";
import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

type Next = (err?: unknown) => void;

/**
 * Local stand-in for Netlify Forms.
 *
 * Netlify only accepts form posts once the site is deployed, so `npm run dev`
 * and `npm run preview` answer the enquiry form's POST themselves. This plugin
 * never ships: the production build is static files only.
 *
 * Start the server with MOCK_FORM_FAIL=1 to preview the form's error state.
 */
function netlifyFormsLocalMock(): Plugin {
  const handler = (req: IncomingMessage, res: ServerResponse, next: Next) => {
    const path = (req.url ?? "").split("?")[0];
    if (req.method !== "POST" || path !== "/") return next();

    let body = "";
    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const fields = new URLSearchParams(body);
      const formName = fields.get("form-name");
      const shouldFail = process.env.MOCK_FORM_FAIL === "1";

      if (!formName || shouldFail) {
        res.statusCode = shouldFail ? 500 : 404;
        res.end("Mock Netlify Forms: submission rejected");
        return;
      }

      console.log(`\n[netlify-forms mock] "${formName}" submission received:`);
      for (const [key, value] of fields) {
        if (key !== "form-name") console.log(`  ${key}: ${value}`);
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Mock Netlify Forms: submission accepted");
    });
  };

  return {
    name: "netlify-forms-local-mock",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  plugins: [react(), netlifyFormsLocalMock()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
