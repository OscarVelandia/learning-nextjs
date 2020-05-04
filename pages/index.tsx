import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData, Metadata } from "../utils/parsePostData";

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className="headingMd">…</section>
      <section className="headingMd padding1px">
        <h2 className="headingLg">Blog</h2>
        <ul className="list">
          {allPostsData.map(({ id, date, title }) => (
            <li className="listItem" key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
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
