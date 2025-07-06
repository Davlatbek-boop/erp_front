import { useEffect, useState } from "react";
import { groupService } from "@service";
import type { GetGroups } from "@types";
import { useNavigate, useParams } from "react-router-dom";


const OneGroup = () => {
  const [group, setGroup] = useState<GetGroups>({} as GetGroups);
    const {id} = useParams()
    const navigate = useNavigate()
    // console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await groupService.getOneGroup(id!);
        // console.log(res?.data.group);
        setGroup(res?.data.group);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const deleteGroup = async (id:string) =>{
    try {
        await groupService.deleteOneGroup(id)
        navigate(-1)
        console.log('deleted');
    } catch (error) {
        console.log(error);
    }
  }
  return (
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800">
        {group.course?.title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Description:</span>
          <p>{group.course?.description || "N/A"}</p>
        </div>

        <div>
          <span className="font-medium">Course Duration:</span>
          <p>{group.course?.duration} weeks</p>
        </div>

        <div>
          <span className="font-medium">Lesson Duration:</span>
          <p>{group.course?.lesson_duration} minutes</p>
        </div>

        <div>
          <span className="font-medium">Price:</span>
          <p>${group.course?.price}</p>
        </div>

        <div>
          <span className="font-medium">Start Date:</span>
          <p>{group.start_date}</p>
        </div>

        <div>
          <span className="font-medium">End Date:</span>
          <p>{group.end_date}</p>
        </div>

        <div>
          <span className="font-medium">Group Name:</span>
          <p>{group.name}</p>
        </div>

        <div>
          <span className="font-medium">Total Students:</span>
          <p>{group.students?.length || 0}</p>
        </div>

        <div>
          <span className="font-medium">Total Teachers:</span>
          <p>{group.teachers?.length || 0}</p>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
      <button onClick={()=> deleteGroup(id!)} className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition">
        Delete
      </button>
      <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
        Update
      </button>
    </div>
    </div>
  );
};

export default OneGroup;
