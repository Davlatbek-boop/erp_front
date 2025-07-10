import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { groupService } from "@service";
import type { GetGroups } from "@types";
import {
  Card,
  Descriptions,
  Button,
  Popconfirm,
  message,
  Row,
  Col,
} from "antd";

const OneGroup = () => {
  const [group, setGroup] = useState<GetGroups>({} as GetGroups);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await groupService.getOneGroup(id!);
        setGroup(res?.data.group);
      } catch (error) {
        console.log(error);
        message.error("Ma'lumotni yuklab bo‘lmadi");
      }
    };

    fetchData();
  }, [id]);

  const deleteGroup = async (id: string) => {
    try {
      await groupService.deleteOneGroup(+id);
      message.success("Guruh muvaffaqiyatli o‘chirildi");
      navigate(-1); // or navigate('/groups')
    } catch (error) {
      console.log(error);
      message.error("O‘chirishda xatolik yuz berdi");
    }
  };

  return (
    <Row justify="center" className="mt-8">
      <Col xs={22} sm={20} md={16} lg={14}>
        <Card
          title={group.course?.title || "Guruh Tafsilotlari"}
          bordered={false}
          extra={
            <Popconfirm
              title="Rostdan ham o‘chirmoqchimisiz?"
              onConfirm={() => deleteGroup(String(group.id))}
              okText="Ha"
              cancelText="Yo‘q"
            >
              <Button danger>O‘chirish</Button>
            </Popconfirm>
          }
        >
          <Descriptions
            bordered
            column={1}
            size="middle"
            labelStyle={{ fontWeight: "bold", width: "200px" }}
          >
            <Descriptions.Item label="Tavsif">
              {group.course?.description || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Kurs davomiyligi">
              {group.course?.duration || 0} hafta
            </Descriptions.Item>
            <Descriptions.Item label="Dars davomiyligi">
              {group.course?.lesson_duration || "N/A"} daqiqa
            </Descriptions.Item>
            <Descriptions.Item label="Narxi">
              ${group.course?.price || 0}
            </Descriptions.Item>
            <Descriptions.Item label="Boshlanish sanasi">
              {group.start_date || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Tugash sanasi">
              {group.end_date || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Guruh nomi">
              {group.name}
            </Descriptions.Item>
            <Descriptions.Item label="O‘quvchilar soni">
              {group.students?.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label="O‘qituvchilar soni">
              {group.teachers?.length || 0}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
};

export default OneGroup;
