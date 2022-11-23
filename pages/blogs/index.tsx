import { GetStaticProps, NextPage } from 'next';
import NextLink from 'next/link';
import { ChangeEventHandler, useRef, useState } from 'react';
import { fetchCategories, search } from '../../lib/fetch';

const CMS_API_KEY = process.env.CMS_API_KEY ?? '';
const NEXT_PUBLIC_SEARCH_API_KEY = process.env.NEXT_PUBLIC_SEARCH_API_KEY ?? '';

interface Props {
  categories: { id: string; name: string }[];
}

const Page: NextPage<Props> = ({ categories }) => {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setText(value);
  };

  const handleSubmit = () => {
    const btn = ref.current;
    if (btn) {
      btn.disabled = true;
      search(text, { apiKey: NEXT_PUBLIC_SEARCH_API_KEY })
        .then((res) => {
          setResult(JSON.stringify(res, null, 2));
        })
        .finally(() => {
          btn.disabled = false;
        });
    }
  };

  return (
    <div>
      <div>
        <span>Search:</span>
        <input type="text" value={text} onChange={handleTextChange} />
        <button type="button" onClick={handleSubmit} ref={ref}>
          submit
        </button>
      </div>
      <ul>
        {categories.map(({ id, name }) => (
          <li key={id}>
            <NextLink href={`/blogs/${id}`}>{name}</NextLink>
          </li>
        ))}
      </ul>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = (await fetchCategories({ apiKey: CMS_API_KEY })).contents;

  return { props: { categories } };
};

export default Page;
