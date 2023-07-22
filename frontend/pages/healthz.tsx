import { GetServerSideProps } from "next";

interface Data {
  // Define the structure of your API response data here
  // For example:
  message: string;
}

const Healthz: React.FC<Data> = ({ message }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* The rest of your existing JSX code goes here */}
      {/* You can use the fetched data here, for example: */}
      <p>{message}</p>
    </main>
  );
};

export default Healthz;

// This function runs on the server-side and fetches the data from the API
export const getServerSideProps: GetServerSideProps<Data> = async () => {
  try {
    // Replace 'YOUR_API_ENDPOINT' with the actual URL of your API
    const response = await fetch("http://127.0.0.1:5000/healthz");
    const data: Data = await response.json();
    console.log("Data received:", data);
    // The fetched data will be available as props in the Healthz component
    return {
      props: data,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        message: `Error fetching data ${error}`,
      },
    };
  }
};
