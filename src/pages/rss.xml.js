import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
	const posts = await getCollection("article");
	return rss({
		title: "eitaar.dev",
		description: "eitaar's portfolio and blog",
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/article/${post.id}/`,
		})),
	});
}
