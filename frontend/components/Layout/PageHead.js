import Head from "next/head";
function PageHead({ headTitle }) {
  return (
    <>
      <Head>
        <title>{headTitle ? headTitle : "Jobbox"}</title>
        <link rel="icon" href="/images/favicon.png" />
      </Head>
    </>
  );
}
export default PageHead;
