import Head from "next/head";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import callGPT_API from "./api/generateAPI";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState<string>("");
  const [generatedNames, setGeneratedNames] = useState<string[] | null>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAnimalInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAnimalInput(e.target.value);
  };

  const removeReturns = (inputString: string): string => {
    // Use regular expression to remove carriage returns
    const result = inputString.replace(/\r\n/g, " ").replace(/[\r\n]/g, " ");
    return result;
  };

  const extractArrayFromWordsBetweenDigitsAndDots = (inputString: string): string[] | null => {
    const regex = /\b\d+\.\s+(.*?)\s*(?=\b\d+\.\s*|$)/g;
    const matches = inputString.match(regex);
    if (!matches) {
      return [];
    }
    return matches.map((match) => match.replace(/\d+\.\s+/, "").trim());
  };

  // parse generated names string to an array, removing the prefixed numbers (1. ,2. , ...,5.)
  const parseGeneratedNamesToArray = (strNames: string): string[] => {
    // remove carriage returns from strNames
    const strWithoutReturns = removeReturns(strNames);
    let arrayOfNames = extractArrayFromWordsBetweenDigitsAndDots(strWithoutReturns);
    if (!arrayOfNames) {
      arrayOfNames = [];
    }
    return arrayOfNames;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    setErrorMessage("");
    setGeneratedNames([]);
    if (animalInput.trim() === "") {
      setErrorMessage("Please provide a pet description");
      setAnimalInput("");
      return;
    }
    setIsFetching(true);
    // get 5 single word names
    let prompt = "Give me five possible pet names consisting of one word for " + animalInput;
    const stringOfOneWordNames = await callGPT_API(prompt);
    const arrayOfOneWordNames = parseGeneratedNamesToArray(stringOfOneWordNames);
    // get 5 multi-word names
    prompt =
      "Give me five possible pet names consisting of a combination of multiple words for " +
      animalInput;
    const stringOfMultiWordNames = await callGPT_API(prompt);
    // const stringOfMultiWordNames = "1. Mischievous Mittens in da house with funky paws 2. Prankster Patches 3. Frisky Fluffy 4. Plucky Paws 5. Playful Purrball";
    const arrayOfMultiWordNames = parseGeneratedNamesToArray(stringOfMultiWordNames);
    let arrayOfNames: string[];
    // combine one word and multi word names
    arrayOfNames = arrayOfOneWordNames.concat(arrayOfMultiWordNames);
    setGeneratedNames(arrayOfNames);
    setIsFetching(false);
    setAnimalInput("");
  };

  return (
    <div className={styles.body}>
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
            placeholder='Describe your pet here'
            value={animalInput}
            onChange={handleAnimalInputChange}
          />
          <button type='submit' name='generate'>
            Generate
          </button>
        </form>
        <div className={styles.result}>
          {errorMessage && <h4 className={styles.error}>{errorMessage}</h4>}
          {isFetching && !errorMessage && (
            <h4>
              <CircularProgress />
            </h4>
          )}
          {!isFetching && generatedNames && generatedNames.length > 0 && !errorMessage && (
            <h4>Generated Names:</h4>
          )}
          <ul>{generatedNames && generatedNames.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </main>
    </div>
  );
}
