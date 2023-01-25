import { useState, useContext, createContext } from "react";
import { HOST } from "./config";

function filenameToNumber(filename: string) {
  return Number(filename.split(".")[0]);
}

const START_DATE = +new Date(2023, 0, 1);

function filenameToDate(filename: string) {
  const number = filenameToNumber(filename);
  const date = new Date(START_DATE + number * 24 * 60 * 60 * 1000);
  return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
}

function MyModal(props: { filename: string }) {
  return (
    <div>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label className="modal cursor-pointer" htmlFor="my-modal">
        <label className="modal-box relative !w-auto" htmlFor="">
          <img
            src={`${HOST}${props.filename}`}
            className="w-full max-h-[calc(100vh-8em)] object-contain"
          />
        </label>
      </label>
    </div>
  );
}

function Card(props: { filename: string; onClick: () => void }) {
  return (
    <label
      className="card bg-base-100 shadow-xl cursor-pointer hover:scale-105 transition"
      htmlFor="my-modal"
      onClick={props.onClick}
    >
      <figure className="h-64">
        <img
          src={`${HOST}${props.filename}`}
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{filenameToDate(props.filename)}</h2>
        <p>No. {filenameToNumber(props.filename) + 1}</p>
      </div>
    </label>
  );
}

function App() {
  const [list, setList] = useState<string[]>([]);
  const [filename, setFilename] = useState<string>("7.jpg");
  fetch(`${HOST}list.json`)
    .then((r) => r.json())
    .then((j: string[]) =>
      setList(j.sort((a, b) => filenameToNumber(b) - filenameToNumber(a)))
    );
  return (
    <div className="p-12">
      <h1 className="text-3xl font-bold mb-8">Daily Contortion</h1>
      <div className="grid gap-8 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {list.map((name) => (
          <Card
            key={name}
            filename={name}
            onClick={() => setFilename(name)}
          ></Card>
        ))}
      </div>
      {filename && <MyModal filename={filename} />}
    </div>
  );
}

export default App;
