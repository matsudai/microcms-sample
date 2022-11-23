# MicroCMS + Next.js sample

## Requirements

### Environments

* VSCode + DevContainer

### Micro CMS

```txt
# Micro CMS#

+ API
  + blogs (A blog has one category)
  + categories
```

↓

```txt
# Published URL #

+ /blogs/
    + <Category ID>/
        + <Blog ID>
```

e.g.

```txt
+ API
  + blogs
    + blog-001 (cate-001)
    + blog-002 (cate-001)
    + blog-003 (cate-002)
  + categories
    + cate-001
    + cate-002

↓

- localhost:3000/blogs
- localhost:3000/blogs/cate-001
- localhost:3000/blogs/cate-002
- localhost:3000/blogs/cate-001/blog-001
- localhost:3000/blogs/cate-001/blog-002
- localhost:3000/blogs/cate-002/blog-003
```

## Development Mode

```sh
# localhost:3000
yarn dev
```

## Production Mode (SSG)

```sh
export NEXT_PUBLIC_SEARCH_API_KEY=<API Key !!! THIS KEY is SHOW BY CLIENT !!!>
export NEXT_PUBLIC_SEARCH_API_ENDPOINT=https://<Your project>.microcms.io/api/v1

export CMS_API_KEY=<API Key (private)>
export CMS_API_ENDPOINT=https://<Your project>.microcms.io/api/v1

yarn export

# localhost:3000
yarn serve
```
