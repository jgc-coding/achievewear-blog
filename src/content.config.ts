import { defineCollection, z, type SchemaContext } from 'astro:content';
import { glob } from 'astro/loaders';

// Feste Kategorie-Slugs — gespiegelt in einstellungen/kategorien.yml und public/admin/config.yml.
// Nur gemeinsam an allen drei Stellen ändern!
export const KATEGORIE_SLUGS = ['naehen', 'lauf-welt-verstehen', 'geschichten'] as const;

// Sveltia speichert Bildpfade entry-relativ ohne "./"-Präfix (z. B. "bilder/foto.jpg").
// Astros image()-Helper braucht aber einen relativen Pfad mit "./" — dieser Wrapper normalisiert das.
const relImage = (image: SchemaContext['image']) =>
  z.preprocess(
    (value) =>
      typeof value === 'string' && !/^(\.{1,2}\/|\/|https?:)/.test(value) ? `./${value}` : value,
    image()
  );

// Sveltia schreibt ein leeres optionales Datumsfeld als '' — das darf den Build
// nicht brechen (im Roundtrip-Test verifiziert), sondern zählt als "nicht gesetzt".
const optionalesDatum = () =>
  z.preprocess(
    (value) => (value === '' || value === null ? undefined : value),
    z.coerce.date().optional()
  );

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: optionalesDatum(),
      category: z.enum(KATEGORIE_SLUGS),
      tags: z.array(z.string()).default([]),
      cover: relImage(image),
      coverAlt: z.string(),
      draft: z.boolean().default(false),
      signature: z.boolean().default(true),
    }),
});

const seiten = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/seiten' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});

const site = defineCollection({
  loader: glob({ pattern: 'site.yml', base: './src/content/einstellungen' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    logoSerif: z.string(),
    logoScript: z.string(),
    description: z.string(),
    noindex: z.boolean().default(true),
    footerText: z.string(),
    pinterestUrl: z.string().default(''),
    newsletterUrl: z.string().default(''),
    signatureText: z.string(),
    navLeft: z.array(z.object({ label: z.string(), url: z.string() })),
    navRight: z.array(z.object({ label: z.string(), url: z.string() })),
  }),
});

const startseite = defineCollection({
  loader: glob({ pattern: 'startseite.yml', base: './src/content/einstellungen' }),
  schema: ({ image }) =>
    z.object({
      welcome: z.object({
        headline: z.string(),
        scriptLine: z.string(),
        text: z.string(),
        buttonText: z.string(),
        buttonUrl: z.string(),
        image: relImage(image),
        imageAlt: z.string(),
      }),
      about: z.object({
        headline: z.string(),
        scriptLine: z.string(),
        text: z.string(),
        buttonText: z.string(),
        buttonUrl: z.string(),
        image: relImage(image),
        imageAlt: z.string(),
      }),
      blogSection: z.object({
        headline: z.string(),
        scriptLine: z.string(),
      }),
      quote: z.object({
        text: z.string(),
        attribution: z.string(),
      }),
      newsletter: z.object({
        show: z.boolean().default(true),
        headline: z.string(),
        text: z.string(),
        buttonText: z.string(),
      }),
    }),
});

const design = defineCollection({
  loader: glob({ pattern: 'design.yml', base: './src/content/einstellungen' }),
  schema: z.object({
    creme: z.string(),
    rosaZart: z.string(),
    mint: z.string(),
    salbei: z.string(),
    anthrazit: z.string(),
    salbeiTief: z.string(),
    altrose: z.string(),
    altroseDunkel: z.string(),
    weiss: z.string(),
  }),
});

const kategorien = defineCollection({
  loader: glob({ pattern: 'kategorien.yml', base: './src/content/einstellungen' }),
  schema: ({ image }) =>
    z.object({
      kategorien: z
        .array(
          z.object({
            name: z.string(),
            slug: z.enum(KATEGORIE_SLUGS),
            description: z.string(),
            color: z.string(),
            image: relImage(image),
            imageAlt: z.string(),
          })
        )
        .length(3),
    }),
});

export const collections = { blog, seiten, site, startseite, design, kategorien };
