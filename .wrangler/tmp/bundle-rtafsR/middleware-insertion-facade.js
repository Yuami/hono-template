				import worker, * as OTHER_EXPORTS from "/Users/yuami/code/health/hono-template/src/app.ts";
				import * as __MIDDLEWARE_0__ from "/Users/yuami/code/health/hono-template/node_modules/.pnpm/wrangler@4.6.0_@cloudflare+workers-types@4.20241230.0/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts";
import * as __MIDDLEWARE_1__ from "/Users/yuami/code/health/hono-template/node_modules/.pnpm/wrangler@4.6.0_@cloudflare+workers-types@4.20241230.0/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts";

				export * from "/Users/yuami/code/health/hono-template/src/app.ts";
				const MIDDLEWARE_TEST_INJECT = "__INJECT_FOR_TESTING_WRANGLER_MIDDLEWARE__";
				export const __INTERNAL_WRANGLER_MIDDLEWARE__ = [
					
					__MIDDLEWARE_0__.default,__MIDDLEWARE_1__.default
				]
				export default worker;