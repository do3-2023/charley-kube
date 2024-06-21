import { GetServerSideProps } from "next";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

interface Data {
  message: string;
  personList: any;
  status: string;
}

const addRandomPerson = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/person`, {
      method: "POST",
    });
    const finalResponse = await response.json();
    console.log(finalResponse);
  } catch (error) {
    console.log(
      `Error fetching data to ${serverRuntimeConfig.baseAPI}: ${error}`
    );
  }
};

const deleteRandomPerson = async () => {
  try {
    console.log("deleteRandomPerson");
    const response = await fetch(`http://127.0.0.1:5000/random-person`, {
      method: "DELETE",
    });
    const finalResponse = await response.json();
    console.log(finalResponse);
  } catch (error) {
    console.log(
      `Error fetching data to ${serverRuntimeConfig.baseAPI}: ${error}`
    );
  }
};

const Index: React.FC<Data> = ({ message, personList, status }) => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <h1>{message}</h1>
          <div className="text-center"> DATABASE status : {status}</div>

          <h2>Person List</h2>

          {personList.personList.map((person: any) => (
            <div key={`art_${person.id}`}>
              <p>-------------------------------</p>
              <p>name : {person.last_name}</p>
              <p>location : {person.location}</p>
              <p>phone : {person.phone_number}</p>
            </div>
          ))}

          <h2>Add Random Person</h2>

          <button
            onClick={() => {
              addRandomPerson();
            }}
          >
            Add Random Person
          </button>

          <h2>Delete Random Person</h2>

          <button
            onClick={() => {
              deleteRandomPerson();
            }}
          >
            Delete Random Person
          </button>
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const databaseAlive = await fetch(`http://127.0.0.1:5000/healthz`);
    const finalResponse: Data = await databaseAlive.json();

    const person = await fetch(`http://127.0.0.1:5000/person`);
    const personResponse: any[] = await person.json();

    finalResponse.personList = personResponse;

    console.log(finalResponse);
    return {
      props: finalResponse,
    };
  } catch (error) {
    return {
      props: {
        message: `Error fetching data to ${serverRuntimeConfig.baseAPI}: ${error}`,
      },
    };
  }
};

export default Index;
