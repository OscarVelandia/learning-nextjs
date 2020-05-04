import { getAllPostIds, getPostData } from "../../utils/parsePostData";
import Layout from "../../components/layout";

interface PostsId {
  params: {
    id: string;
  };
}

export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
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
