import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const DATABASE_ID = process.env.NOTION_BLOG_DATABASE_ID!;

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  pillar: string;
  metaDescription: string;
  author: string;
  publishDate: string;
  keyword: string;
  status: string;
}

export interface BlogPostWithContent extends BlogPost {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  blocks: any[];
}

function mapPageToPost(page: any): BlogPost {
  const props = page.properties;
  return {
    id: page.id,
    title: props.Title?.title?.[0]?.plain_text ?? "",
    slug: props.Slug?.rich_text?.[0]?.plain_text ?? "",
    pillar: props.Pillar?.select?.name ?? "",
    metaDescription: props["Meta Description"]?.rich_text?.[0]?.plain_text ?? "",
    author: props.Author?.rich_text?.[0]?.plain_text ?? "Sensible Living Foundation",
    publishDate: props["Publish Date"]?.date?.start ?? "",
    keyword: props["Target Keyword"]?.rich_text?.[0]?.plain_text ?? "",
    status: props.Status?.select?.name ?? "",
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      property: "Status",
      select: { equals: "Published" },
    },
    sorts: [{ property: "Publish Date", direction: "descending" }],
  });

  return response.results
    .filter((page: any) => page.object === "page")
    .map(mapPageToPost)
    .filter((post) => post.slug && post.title);
}

export async function getPostBySlug(slug: string): Promise<BlogPostWithContent | null> {
  const response = await notion.databases.query({
    database_id: DATABASE_ID,
    filter: {
      and: [
        { property: "Slug", rich_text: { equals: slug } },
        { property: "Status", select: { equals: "Published" } },
      ],
    },
  });

  if (!response.results.length) return null;

  const page = response.results[0] as any;
  const post = mapPageToPost(page);

  const blocksResponse = await notion.blocks.children.list({
    block_id: page.id,
    page_size: 100,
  });

  return {
    ...post,
    blocks: blocksResponse.results,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  const posts = await getPublishedPosts();
  return posts.map((p) => p.slug).filter(Boolean);
}
