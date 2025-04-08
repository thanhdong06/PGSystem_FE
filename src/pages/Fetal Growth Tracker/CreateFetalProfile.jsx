import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Form, Input, Spin, Tag } from "antd";
import {
  PlusOutlined,
  EyeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";

const CreateFetalProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isAddFetusModalVisible, setIsAddFetusModalVisible] = useState(false);
  const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [fetalProfiles, setFetalProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("Pregnancy-record/Records", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setFetalProfiles(response.data.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
      setFetalProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const columns = [
    {
      title: "Profile ID",
      dataIndex: "pid",
      key: "pid",
      sorter: (a, b) => a.pid - b.pid,
    },
    {
      title: "Fetus Nickname",
      key: "fetusNickname",
      render: (_, record) =>
        record.fetuses?.map((fetus) => fetus.nickname).join(", ") || "N/A",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (status) => {
        let color;
        switch (status) {
          case "Tracking":
            color = "green";
            break;
          case "Closed":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            View
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#00CED1", borderColor: "#00CED1" }}
            icon={<PlusOutlined />}
            onClick={() => showAddFetusModal(record)}
          >
            Add Baby
          </Button>
        </Space>
      ),
    },
  ];

  const handleView = (profile) => {
    if (profile.fetuses.length > 1) {
      setSelectedProfile(profile);
      setIsSelectModalVisible(true);
    } else {
      navigate("/member/fetalgrowthtracker", {
        state: {
          babyId: profile.fetuses[0].fetusId,
          profileId: profile.pid,
        },
      });
    }
  };

  const handleSelectBaby = (fetusId) => {
    navigate("/member/fetalgrowthtracker", {
      state: {
        babyId: fetusId,
        profileId: selectedProfile.pid,
      },
    });
    setIsSelectModalVisible(false);
    setSelectedProfile(null);
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const showAddFetusModal = (profile) => {
    setSelectedProfile(profile);
    setIsAddFetusModalVisible(true);
  };

  const handleClose = async (pregnancyRecordId) => {
    try {
      await axiosInstance.put(
        `Pregnancy-record/ClosePregnancyRecord?pregnancyRecordId=${pregnancyRecordId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      toast.success("Record closed successfully");
      await fetchProfiles();
    } catch (error) {
      console.error("Error closing record:", error);
      toast.error(error.response?.data?.error);
    }
  };

  const handleCreateOk = async () => {
    try {
      const values = await form.validateFields();

      const newProfile = {
        fetuses: [
          {
            nickname: values.nickname,
          },
        ],
      };

      await axiosInstance.post("Pregnancy-record/Create", newProfile, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      await fetchProfiles();
      setIsCreateModalVisible(false);
      toast.success("Profile created successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error creating profile:", error);
      toast.error(error.response?.data?.message || "Failed to create profile");
    }
  };

  const handleAddFetusOk = async () => {
    try {
      const values = await form.validateFields();

      const newFetus = {
        nickname: values.nickname,
        pregnancyRecordId: selectedProfile.pid,
      };

      await axiosInstance.post("Fetus/fetuses", newFetus, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      await fetchProfiles();
      setIsAddFetusModalVisible(false);
      toast.success("Baby added successfully");
      form.resetFields();
    } catch (error) {
      console.error("Error adding fetus:", error);
      toast.error(error.response?.data?.error || "Failed to add baby");
    }
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  const handleAddFetusCancel = () => {
    setIsAddFetusModalVisible(false);
    form.resetFields();
  };

  const handleSelectCancel = () => {
    setIsSelectModalVisible(false);
    setSelectedProfile(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center flex-1">
          Fetal Profiles Management
        </h1>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Create New Profile
        </Button>
      </div>

      <Table
        className="w-fit mx-auto"
        bordered
        columns={[
          ...columns.slice(0, -1),
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => handleView(record)}
                >
                  View
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => {
                    Modal.confirm({
                      title: "Are you sure you want to delete this profile?",
                      content: "This action cannot be undone.",
                      okText: "Yes",
                      okType: "danger",
                      cancelText: "No",
                      onOk: async () => {
                        try {
                          await axiosInstance.delete(
                            `https://pgsystem-g2ehcecxdkd5bjex.southeastasia-01.azurewebsites.net/api/Pregnancy-record/DeletePregnancyRecord?pregnancyRecordId=${record.pid}`,
                            {
                              headers: {
                                Authorization:
                                  "Bearer " + localStorage.getItem("token"),
                              },
                            }
                          );
                          setFetalProfiles(
                            fetalProfiles.filter(
                              (profile) => profile.pid !== record.pid
                            )
                          );
                          toast.success("Profile deleted successfully");
                        } catch (error) {
                          console.error("Error deleting profile:", error);
                          Modal.error({
                            title: "Error",
                            content: "Failed to delete profile",
                          });
                        }
                      },
                    });
                  }}
                >
                  Delete
                </Button>
                <Button
                  color="cyan"
                  variant="solid"
                  icon={<PlusOutlined />}
                  onClick={() => showAddFetusModal(record)}
                >
                  Add Baby
                </Button>
                <Button
                disabled={record.status === "Closed"}
                  color="yellow"
                  variant="solid"
                  icon={<CloseCircleOutlined />}
                  onClick={() => handleClose(record.pid)}
                >
                  Close Record
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={fetalProfiles}
        rowKey="pid"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Create New Fetal Profile"
        open={isCreateModalVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="create_fetal_profile">
          <Form.Item
            name="nickname"
            label="Fetus Nickname"
            rules={[
              {
                required: true,
                message: "Please enter the fetus nickname",
              },
            ]}
          >
            <Input placeholder="e.g., Phú Thanh" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`Add Baby to Profile ${selectedProfile?.pid || ""}`}
        open={isAddFetusModalVisible}
        onOk={handleAddFetusOk}
        onCancel={handleAddFetusCancel}
        okText="Add"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="add_fetus">
          <Form.Item
            name="nickname"
            label="Fetus Nickname"
            rules={[
              {
                required: true,
                message: "Please enter the fetus nickname",
              },
            ]}
          >
            <Input placeholder="e.g., Phú Thanh" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Select Baby to View Chart"
        open={isSelectModalVisible}
        onCancel={handleSelectCancel}
        footer={null}
      >
        {selectedProfile && (
          <Space direction="vertical" className="w-full">
            {selectedProfile.fetuses.map((fetus) => (
              <Button
                key={fetus.fetusId}
                type="primary"
                block
                onClick={() => handleSelectBaby(fetus.fetusId)}
              >
                View {fetus.nickname} (ID: {fetus.fetusId})
              </Button>
            ))}
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default CreateFetalProfile;