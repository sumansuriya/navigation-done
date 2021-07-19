import logo from "../logo15.png";
import background from "../image56.jpg";

function EmployeeAboutUs() {
    
    return (
       <div> 
         
      <div
      className="bg-transparent justify-content-center" 
      style={{ height: "110vh",
      backgroundImage: `url(${background})`, 
      backgroundSize:"100%",
      backgroundRepeat:"no-repeat" }} >
        <div className=" text-light "> 
        <div className="ml-4 p-3 font-size:10px">
        <a href="/emp/home"><h3>Back</h3></a></div>
        <div className="row  justify-content-center mb-0 ">
        <h1>About Us </h1></div>
        <div className="row  justify-content-center ">
        <img align="center" src={logo} height="20%" width="20%" /> </div>
        <div><h3 className="ml-4 mb-0 p-2">Task management helps teams with a lot of moving parts—projects, 
            campaigns, regular content, news updates, you name it. When you create and assign 
            tasks for each piece of content, everyone can focus confidently on their individual tasks.</h3></div><br></br>
       <div> <h3 className="ml-4 p-2">Fewer things slip through the cracks with a well-organized task management system. 
           All the key parts of the publishing process can be outlined in a checklist 
           and assigned based on proximity to deadline.</h3></div>
           <div><h3 className="ml-4 p-2"> This approach works for teams large and small, but will likely work best 
           for those teams whose content passes 
           through a lot of different hands or 
           checks before being completed.</h3></div>
        </div>
        </div>
       
  </div>
    ) 
};

export {EmployeeAboutUs}