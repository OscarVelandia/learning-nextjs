import Head from "next/head";
import Link from "next/link";
import Date from "../components/Date";
import Layout, { siteTitle } from "../components/Layout";
import { getSortedPostsData, Metadata } from "../utils/parsePostData";

interface Props {
  allPostsData: {
    date: string;
    title: string;
    id: string;
  }[];
}

export default function Home({ allPostsData }: Props) {
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="headingMd">…</section>
      <section className="headingMd padding1px">
        <h2 className="headingLg">Blog</h2>
        <ul className="list">
          {allPostsData.map(({ id, date, title }) => (
            <li className="listItem" key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className="lightText">
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
export async function getStaticProps() {
  const allPostsData: Metadata[] = getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}
