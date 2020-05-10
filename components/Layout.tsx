import Head from "next/head";
import Link from "next/link";
import styles from "./layout.module.scss";

const name = "Oscar Velandia";
const description = "Frontend developer";
export const siteTitle = "Oscar Velandia";

interface Props {
  children: React.ReactNode;
  home?: boolean;
}
export default function Layout({ children, home }: Props) {
  return (
    <div className={`${styles.container}`}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />

        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={`${styles.header}`}>
        {home ? (
          <>
            <h1 className="heading2Xl">{name}</h1>
            <h2 className="headingLg">{description}</h2>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/profile.jpg"
                  className={`${styles.headerImage} borderCircle`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className="headingLg">
              <Link href="/">
                <a className="colorInherit">{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={`${styles.backToHome}`}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
