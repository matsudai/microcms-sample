import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';
import { fetchBlog, fetchCategories, fetchCategory, fetchTitlesOfCategory } from '../../lib/fetch';

const CMS_API_KEY = process.env.CMS_API_KEY ?? '';

type Props =
  | {
      mode: 'category';
      contents: { id: string; title: string }[];
      category: { id: string; name: string };
    }
  | {
      mode: 'blog';
      categoryId: string;
      id: string;
      title: string;
      content: string;
    };

const Page: NextPage<Props> = (props) => {
  if (props.mode === 'category') {
    const { category, contents } = props;
    return (
      <div>
        <div>
          <NextLink href={`/blogs`}>blogs</NextLink> &gt; {category.id}/{category.name}
        </div>
        <ul>
          {contents.map(({ id, title }) => (
            <li key={id}>
              <NextLink href={`/blogs/${category.id}/${id}`}>{title}</NextLink>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    const { title, content, categoryId } = props;
    return (
      <div>
        <div>
          <NextLink href={`/blogs`}>blogs</NextLink> &gt; <NextLink href={`/blogs/${categoryId}`}>{categoryId}</NextLink> &gt; {title}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
    );
  }
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const categories = (await fetchCategories({ apiKey: CMS_API_KEY })).contents;

  const blogsTitleEachCategory = await Promise.all(
    categories.map(async (category) => {
      const blogsTitles = (await fetchTitlesOfCategory(category.id, { apiKey: CMS_API_KEY })).contents;
      return blogsTitles.map((blogsTitle) => ({ ...blogsTitle, category }));
    })
  );

  const blogs = blogsTitleEachCategory.flat(1);

  const paths = [...categories.map(({ id }) => `/blogs/${id}`), ...blogs.map(({ category, id }) => `/blogs/${category.id}/${id}`)];
  console.log(paths);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = ctx.params?.slug;
  if (!Array.isArray(slug)) {
    throw Error('Blog url error !!');
  }

  const [categoryId, blogId]: [string, string | undefined] = [slug[0], slug[1]];

  if (blogId == null) {
    const category = await fetchCategory(categoryId, { apiKey: CMS_API_KEY });
    const blogs = await fetchTitlesOfCategory(categoryId, { apiKey: CMS_API_KEY });
    return { props: { mode: 'category', contents: blogs.contents, category } };
  } else {
    const blog = await fetchBlog(blogId, { apiKey: CMS_API_KEY });
    return { props: { mode: 'blog', ...blog, categoryId } };
  }
};

export default Page;
