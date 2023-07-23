import { GetServerSideProps } from "next";

interface Data {
  message: string;
  status: string;
}

const Healthz: React.FC<Data> = ({ message }) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>{message}</h1>
        <img
          src="https://media.tenor.com/PxwZ29xknDIAAAAd/wait-hold.gif"
          alt="down"
        />
      </div>
    </main>
  );
};

export default Healthz;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch(
      "http://backend-service.backend.svc.cluster.local:5000/healthz"
    );
    const data: Data = await response.json();
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
