import { serveDir } from "https://deno.land/std/http/file_server.ts";
import * as esbuild from "https://deno.land/x/esbuild@v0.19.12/mod.js";

let bytes: Uint8Array;

const watcher = Deno.watchFs(["./index.html", "./src"], { recursive: true });

await esbuild.initialize({});

async function bundleTS() {
  bytes = await Deno.readFile("index.html");
  try {
    const result = await esbuild.build({
      entryPoints: ["src/app.ts"],
      bundle: true,
      outfile: "public/js/bundle.js",
      format: "esm",
      platform: "browser",
      sourcemap: true,
      target: "es2020",
    });

    await esbuild.build({
      entryPoints: ["src/styles.css"],
      bundle: true,
      outfile: "public/css/bundle.css",
    });

    console.log("Bundle successful:", new Date().toLocaleTimeString());
    return result;
  } catch (error) {
    console.error("Bundle failed:", error);
  }
}

await bundleTS();

const sockets = new Set<WebSocket>();

Deno.serve({ port: 8000 }, async (req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    return new Response(bytes);
  }

  if (req.headers.get("upgrade") === "websocket") {
    const { socket, response } = Deno.upgradeWebSocket(req);
    socket.onopen = () => {
      sockets.add(socket);
    };
    socket.onclose = () => {
      sockets.delete(socket);
    };
    return response;
  }

  return await serveDir(req, {
    fsRoot: "public",
    urlRoot: "",
  });
});

console.log(`Dev server running on http://localhost:${8000}/`);

for await (const event of watcher) {
  console.log("Watcher has seen some things...", event);
  await bundleTS();
  sockets.forEach((socket) => {
    socket.send("reload");
  });
}
