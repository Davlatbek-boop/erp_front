import { groupService } from "@service";
import { useEffect, useState } from "react";
import AdminGroups from "../../components/admin-groups";
import type { GetGroups, Group } from "@types";
import AddGroupModal from "./modal";
import { courseService } from "../../service/course.service";
import { Outlet, useNavigate } from "react-router-dom";

const Groups = () => {
  const [group, setGroup] =useState<Group[]>([])
  const [courses, setCourses] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await groupService.getGroups();
        setGroup(res?.data.data || []); 
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchData();
  }, []);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await courseService.getCourses();
        setCourses(res?.data.courses || []); 
      } catch (error) {
      }
    };

    fetchData();
  }, []);


  const toOneGroup = (id:number) =>{
    navigate(`${id}`)
  }

 return (
  <div className="p-6 max-w-7xl mx-auto">
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Group List</h1>

    <div className="overflow-x-auto bg-white rounded-xl shadow-md">
      <table className="min-w-full table-auto border-collapse">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="px-4 py-3 border">Title</th>
            <th className="px-4 py-3 border">Description</th>
            <th className="px-4 py-3 border">Duration</th>
            <th className="px-4 py-3 border">Lesson Duration</th>
            <th className="px-4 py-3 border">Price</th>
            <th className="px-4 py-3 border">Start Date</th>
            <th className="px-4 py-3 border">End Date</th>
            <th className="px-4 py-3 border">Group Name</th>
            <th className="px-4 py-3 border">Students</th>
            <th className="px-4 py-3 border">Teachers</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-800">
          {group.map((item: GetGroups) => (
            <AdminGroups key={item.id} item={item} toOneGroup={toOneGroup} />
          ))}
        </tbody>
      </table>

      
    </div>
          <AddGroupModal courses={courses} setGroup={setGroup}/>
          <Outlet/>
  </div>
);

};

export default Groups;
