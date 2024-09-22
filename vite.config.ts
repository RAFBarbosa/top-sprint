import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
});

// import { viteStaticCopy } from 'vite-plugin-static-copy'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     viteStaticCopy({
//       targets: [
//         { src: 'src/assets/images', dest: 'assets' }
//       ]
//     })
//   ]
// })
