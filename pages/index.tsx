import Head from "next/head";
import { useState, useEffect } from "react";
import callGPT_API from "./api/generateAPI";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [generatedNames, setGeneratedNames] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleAnimalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimalInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFetching(true);
    await callGPT_API(animalInput);
    const nameChoices = await callGPT_API(animalInput);
    setGeneratedNames(nameChoices);
    setIsFetching(false);
    setAnimalInput("");
  };

  return (
    <>
      <div>
        <Head>
          <title>Generate pet name</title>
          <meta name='description' content='Generate a pet name' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <main className={styles.main}>
          <h3>Name my Pet</h3>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='animal'
              placeholder='Enter an animal'
              value={animalInput}
              onChange={handleAnimalInputChange}
            />
            <button type='submit' name='generate'>
              Generate
            </button>
            <div className={styles.result}>
              {isFetching && <h3>Generating...</h3>}
              {!isFetching && generatedNames && <h3>Generated Names:</h3>}
              <p>{generatedNames}</p>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
