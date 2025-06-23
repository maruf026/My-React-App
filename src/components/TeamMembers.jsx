import Profile from "./ProfileData";

export default function Team() {
    let profileInfo=[
        {name: "Ahmad Shaker", image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSQkW7xziIfcOLYDBvl6QGpd5lDSb-4QGyXg&s", des:"Graphic Designer" },
        {name: "Abdullah Gittu", image:"https://images.unsplash.com/photo-1463453091185-61582044d556?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJhbmRvbSUyMHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D", des:"Tutor" },
        {name: "Alamin", image:"https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww", des:"Survey Corp" }
    ]
  return (
    <div>
      <h1 className="text-2xl text-orange-600 font-bold text-center my-5">
        Team Members
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
       {
        profileInfo.map((info, index)=>(
             <Profile key={index} data={info} />
        ))
       }
      </div>
      
    </div>
  );
}
