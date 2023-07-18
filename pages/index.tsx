import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Generate pet name</title>
        <meta name='description' content='Generate a pet name' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <h3>Name my Pet</h3>
        <form>
          <input type='text' name='animal' placeholder='Enter an animal' />
          <button type='submit' name='generate'>
            Generate
          </button>
        </form>
      </main>
    </div>
  );
}
