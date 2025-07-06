const AdminGroups = ({ item, toOneGroup }: any) => {
  return (
    <tr
  className="hover:bg-green-100 transition-transform duration-500 cursor-pointer"
  onClick={() => toOneGroup(item.id)}
>
  <td className="px-4 py-2 border">{item.course?.title}</td>
  <td className="px-4 py-2 border">{item.course?.description}</td>
  <td className="px-4 py-2 border">{item.course?.duration}</td>
  <td className="px-4 py-2 border">{item.course?.lesson_duration}</td>
  <td className="px-4 py-2 border">${item.course?.price}</td>
  <td className="px-4 py-2 border">{item.start_date}</td>
  <td className="px-4 py-2 border">{item.end_date}</td>
  <td className="px-4 py-2 border">{item.name}</td>
  <td className="px-4 py-2 border">{item.students?.length || 0}</td>
  <td className="px-4 py-2 border">{item.teachers?.length || 0}</td>

</tr>

  );
};

export default AdminGroups;
