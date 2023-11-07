const formatDate = (dateObject) => {
  const date = new Date(dateObject);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().substr(2);
  return (
    <>
      <span className="text-gray-400">{month}</span>
      <span className="text-gray-600">/</span>
      <b>{year.slice(-2)}</b>
    </>
  );
};

export default function Expertise({ experience }) {
  const start = formatDate(experience.start);
  const end = formatDate(experience.end);

  return (
    <div className="my-3 max-w-3xl text-white font-ibm">
      <div className="justify-between flex">
        <h3 className="text-base">
          {experience.company} <b className="ml-0.5"> {experience.title}</b>
        </h3>
        <div className="text-sm text-gray-400">
          {start} <span className="text-gray-600">-</span> {end}
        </div>
      </div>
      <ul className="list-disc text-gray-400 ml-4 font-light">
        {experience.description.split("---").map((achivement) => (
          <li key={achivement}>{achivement}</li>
        ))}
      </ul>
    </div>
  );
}
