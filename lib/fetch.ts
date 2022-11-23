export const CMS_API_ENDPOINT = process.env.CMS_API_ENDPOINT;
export const NEXT_PUBLIC_SEARCH_API_ENDPOINT = process.env.NEXT_PUBLIC_SEARCH_API_ENDPOINT;

interface IOpts {
  apiKey: string;
}

interface ICategories {
  contents: { id: string; name: string }[];
}

interface ICategory {
  id: string;
  name: string;
}

interface IContentTitles {
  contents: { id: string; title: string }[];
}

interface IContent {
  id: string;
  title: string;
  content: string;
}

export const fetchCategories = async ({ apiKey }: IOpts): Promise<ICategories> => {
  const url = `${CMS_API_ENDPOINT}/categories?fields=id%2Cname`;
  if (CMS_API_ENDPOINT) {
    return (await fetch(url, { headers: { 'X-MICROCMS-API-KEY': apiKey } })).json();
  } else {
    console.debug(`[DEBUG] fetch '${url}'`);
    return {
      contents: [
        { id: 'oajizkb822k2', name: 'あ' },
        { id: 'hwj1tfko9', name: 'い' }
      ]
      // totalCount: 2,
      // offset: 0,
      // limit: 10
    };
  }
};

export const fetchCategory = async (id: string, { apiKey }: IOpts): Promise<ICategory> => {
  const url = `${CMS_API_ENDPOINT}/categories/${id}?fields=id%2Cname`;
  if (CMS_API_ENDPOINT) {
    return (await fetch(url, { headers: { 'X-MICROCMS-API-KEY': apiKey } })).json();
  } else {
    console.debug(`[DEBUG] fetch '${url}'`);
    return {
      id: 'oajizkb822k2',
      name: 'あ'
    };
  }
};

export const fetchTitlesOfCategory = async (category: string, { apiKey }: IOpts): Promise<IContentTitles> => {
  const url = `${CMS_API_ENDPOINT}/blogs?fields=id%2Ctitle&filters=category%5Bequals%5D${category}`;
  if (CMS_API_ENDPOINT) {
    return (await fetch(url, { headers: { 'X-MICROCMS-API-KEY': apiKey } })).json();
  } else {
    console.debug(`[DEBUG] fetch '${url}'`);
    return {
      contents: [
        { id: 'woyegeeid9', title: '遺愛集 1' },
        { id: 'scx1lrs6qzz', title: '遺愛集 2' }
      ]
      // totalCount: 2,
      // offset: 0,
      // limit: 10
    };
  }
};

export const fetchBlog = async (id: string, { apiKey }: IOpts): Promise<IContent> => {
  const url = `${CMS_API_ENDPOINT}/blogs/${id}?fields=id%2Ctitle%2Ccontent`;
  if (CMS_API_ENDPOINT) {
    return (await fetch(url, { headers: { 'X-MICROCMS-API-KEY': apiKey } })).json();
  } else {
    console.debug(`[DEBUG] fetch '${url}'`);
    return {
      id: 'woyegeeid9',
      title: '遺愛集 1',
      content:
        '<p>遺愛集<br>島秋人<br><br><br>+目次<br><br>序<br>窪田空穂<br><br>数日前、巣鴨拘置所内に、死刑囚として拘置されている島秋人君から来状があり、...<br>秋人君の来状は、今一つの用件を含んだものであった。それは「遺愛集」に序を添...<br>この依頼は今度が初めてではなく、やや以前にすでになされ、私は承諾していたも...<br>今回の出版は生前のことで、趣がちがっているが、出版してやろうと言われる方は...<br>秋人君の作歌は、拘置所の者となってからのことという。又、作歌のよろこびをと...<br>私はそれらには触れず、秋人君の作歌に対して平常感じていることを略記して序と...<br>「遺愛集」は島秋人自選の歌集で、題簽も自身付けたものである。秋人君の歌歴か...<br>私は郵送されて来た「遺愛集」の稿本を通読して、感を新たにするものがあった。<br>「遺愛集」一巻に収められている三年間、数百首の短歌は、刑死を寸前のことと覚...<br>私は拘置所の内部を目にしたことがなく、秋人君の作をとおして想像するのみであ...<br>生活は何の自由も与えられてはいず、ペンでする筆記も許可を要するようである。...<br>これが島秋人の環境で秋人君のこの何年間ももちえたものは、自身の思念のみであ...<br>これら心境の状態を「遺愛集」の歌はつぶさに示している。歌は外界からの刺激が...<br></p>'
    };
  }
};

export const search = async (q: string, { apiKey }: IOpts): Promise<object> => {
  const url = `${NEXT_PUBLIC_SEARCH_API_ENDPOINT}/blogs?fields=id%2Ccategory.id&q=${q}`;
  if (NEXT_PUBLIC_SEARCH_API_ENDPOINT) {
    return (await fetch(url, { headers: { 'X-MICROCMS-API-KEY': apiKey } })).json();
  } else {
    console.debug(`[DEBUG] fetch '${url}'`);
    return {
      contents: [
        {
          id: '7msfsrr4b',
          category: {
            id: 'hwj1tfko9'
          }
        }
      ],
      totalCount: 1,
      offset: 0,
      limit: 10
    };
  }
};
