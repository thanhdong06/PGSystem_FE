import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Spin,
} from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateFetalProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [fetalProfiles, setFetalProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://676a399b863eaa5ac0ddb3ec.mockapi.io/api/fetalProfiles');
        setFetalProfiles(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
        setFetalProfiles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin size="large" tip="Loading..." />
    </div>;
  }

  const columns = [
    {
      title: "Profile ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: "Number of Fetuses",
      key: "fetusCount",
      render: (_, record) => record.fetuses.length,
      sorter: (a, b) => a.fetuses.length - b.fetuses.length,
    },
    {
      title: "Fetus Names",
      key: "fetusNames",
      render: (_, record) => record.fetuses.map((f) => f.name).join(", "),
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
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
        state: { babyId: profile.fetuses[0].babyId },
      });
    }
  };

  const handleSelectBaby = (babyId) => {
    navigate("/member/fetalgrowthtracker", { state: { babyId } });
    setIsSelectModalVisible(false);
    setSelectedProfile(null);
  };

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
  };

  const handleCreateOk = async () => {
    try {
      const values = await form.validateFields();
      const profileCount = fetalProfiles.length + 1;
      const newProfileId = `FP${String(profileCount).padStart(3, "0")}`;
      const fetusNames = values.fetuses.split(",").map((name) => name.trim());
      
      const newProfile = {
        id: newProfileId,
        fetuses: fetusNames.map((name, index) => ({
          babyId:  `B${String(profileCount * 10 + index + 1).padStart(3, "0")}`,
          name: name || `Baby ${String.fromCharCode(65 + index)}`,
          startingWeek: parseInt(values.startingWeek),
          createdDate: values.createdDate.format("YYYY-MM-DD"),
        })),
        createdDate: values.createdDate.format("YYYY-MM-DD"),
      };
  
      await axios.post('https://676a399b863eaa5ac0ddb3ec.mockapi.io/api/fetalProfiles', newProfile);
      
      for (const fetus of newProfile.fetuses) {
        await axios.post('https://676a399b863eaa5ac0ddb3ec.mockapi.io/api/fetalGrowthData', {
          babyId: fetus.babyId,
          measurements: []
        });
      }
  
      setFetalProfiles([...fetalProfiles, newProfile]);
      setIsCreateModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile');
    }
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  const handleSelectCancel = () => {
    setIsSelectModalVisible(false);
    setSelectedProfile(null);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
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
                      title: 'Are you sure you want to delete this profile?',
                      content: 'This action cannot be undone.',
                      okText: 'Yes',
                      okType: 'danger',
                      cancelText: 'No',
                      onOk: async () => {
                        try {
                          await axios.delete(`https://676a399b863eaa5ac0ddb3ec.mockapi.io/api/fetalProfiles/${record.id}`);
                          setFetalProfiles(fetalProfiles.filter(profile => profile.id !== record.id));
                        } catch (error) {
                          console.error('Error deleting profile:', error);
                          Modal.error({
                            title: 'Error',
                            content: 'Failed to delete profile'
                          });
                        }
                      }
                    });
                  }}
                >
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
        dataSource={fetalProfiles}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title="Create New Fetal Profile"
        visible={isCreateModalVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        okText="Create"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="create_fetal_profile">
          <Form.Item
            name="fetuses"
            label="Fetus Names (separate by comma if multiple)"
            rules={[
              {
                required: true,
                message: "Please enter at least one fetus name",
              },
            ]}
          >
            <Input placeholder="e.g., Baby A, Baby B" />
          </Form.Item>
          <Form.Item
            name="createdDate"
            label="Created Date"
            rules={[{ required: true, message: "Please select created date" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              disabledDate={(current) =>
                current && current.valueOf() < Date.now() - 24 * 60 * 60 * 1000
              }
            />
          </Form.Item>
          <Form.Item
        name="startingWeek"
        label="Current Week of Pregnancy"
        rules={[
          { 
          required: true, 
          message: "Current week of pregnancy is required." 
          },
          {
          type: 'number',
          transform: value => Number(value),
          min: 8,
          message: "Pregnancy week must be at least 8 weeks."
          },
          {
          type: 'number',
          transform: value => Number(value),
          max: 42,
          message: "Pregnancy week cannot exceed 42 weeks."
          }
        ]}
        >
        <Input
          type="number"
          placeholder="Enter week between 8-42"
        />
        </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Select Baby to View Chart"
        visible={isSelectModalVisible}
        onCancel={handleSelectCancel}
        footer={null}
      >
        {selectedProfile && (
          <Space direction="vertical" style={{ width: "100%" }}>
            {selectedProfile.fetuses.map((fetus) => (
              <Button
                key={fetus.babyId}
                type="primary"
                block
                onClick={() => handleSelectBaby(fetus.babyId)}
              >
                View {fetus.name} (ID: {fetus.babyId})
              </Button>
            ))}
          </Space>
        )}
      </Modal>
    </div>
  );
};

export default CreateFetalProfile;