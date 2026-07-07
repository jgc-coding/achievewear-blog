// RSS-Feed aller veröffentlichten Artikel (Entwürfe ausgenommen).
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { getSiteSettings } from '../lib/settings';
import { withBase } from '../lib/url';

export async function GET(context: APIContext) {
  const site = await getSiteSettings();
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: site.title,
    description: site.description,
    site: context.site ?? 'http://localhost:4321',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: withBase(`/blog/${post.id}`),
    })),
    customData: '<language>de-DE</language>',
  });
}
