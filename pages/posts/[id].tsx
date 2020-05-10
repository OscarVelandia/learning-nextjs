import { getAllPostIds, getPostData } from "../../utils/parsePostData";
import Date from "../../components/Date";
import Layout from "../../components/Layout";
import Head from "next/head";

interface Props {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}

interface PostsId {
  params: {
    id: string;
  };
}

export default function Post({ postData }: Props) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="headingXl">{postData.title}</h1>
        <div className="lightText">
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths: PostsId[] = getAllPostIds();

  return {
    paths,
    fallback: false,
  };
}

/**
 * On development mode only the visited page data will going to pass through this method, but since
 * getStaticProps() is used in Static Generation, the data of every page in this
 * dynamic route ([id].tsx) will pass.
 */
export async function getStaticProps({ params }: PostsId) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}
