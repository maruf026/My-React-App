export default function Profile({ data }) {
  return (
    <div>
       <div className="border border-gray-200 w-70 h-70 flex flex-col justify-center items-center">
          <img
            className="w-32 aspect-square rounded-full"
            src={data.image}
            alt=""
          />
          <h3 className="text-2xl">{data.name}</h3>
          <p>{data.des}</p>
        </div>
    </div>
  );
}
