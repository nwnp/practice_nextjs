import Head from "next/head";
import Layout, { siteTitle } from "../components/Layout";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";

/** SSG */
// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }

/** SSR */
export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/posts");
  const json = await response.json();
  return {
    props: {
      allPostsData: json.allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  // const [allPostsData, setAllPostsData] = useState([]);

  // useEffect(() => {
  //   fetch("/api/posts")
  //     .then((res) => console.log(res))
  //     .then((data) => setAllPostsData(data.allPostsData));
  // }, []);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      <div>
        <Link href="/posts/first-post">First Post</Link>
      </div>
      <div>
        <Link href="/posts/second-post">Second Post</Link>
      </div>
    </Layout>
  );
}
