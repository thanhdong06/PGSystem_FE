import React, { useState } from "react";
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
} from "antd";
import { PlusOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const CreateFetalProfile = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isSelectModalVisible, setIsSelectModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  const [fetalProfiles, setFetalProfiles] = useState([
    {
      id: "FP001",
      fetuses: [{ babyId: "B001", name: "Baby A", createdDate: "2025-01-15" }],
      createdDate: "2025-01-15",
    },
    {
      id: "FP002",
      fetuses: [
        { babyId: "B002", name: "Baby A", createdDate: "2025-02-01" },
        { babyId: "B003", name: "Baby B", createdDate: "2025-02-01" },
      ],
      createdDate: "2025-02-01",
    },
    {
      id: "FP003",
      fetuses: [
        { babyId: "B004", name: "Baby A", createdDate: "2025-03-10" },
        { babyId: "B005", name: "Baby B", createdDate: "2025-03-10" },
        { babyId: "B006", name: "Baby C", createdDate: "2025-03-10" },
      ],
      createdDate: "2025-03-10",
    },
  ]);

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

  const handleCreateOk = () => {
    form.validateFields().then((values) => {
      const profileCount = fetalProfiles.length + 1;
      const newProfileId = `FP${String(profileCount).padStart(3, "0")}`;
      const fetusNames = values.fetuses.split(",").map((name) => name.trim());

      const newProfile = {
        id: newProfileId,
        fetuses: fetusNames.map((name, index) => ({
          babyId: `B${String(profileCount * 10 + index + 1).padStart(3, "0")}`,
          name: name || `Baby ${String.fromCharCode(65 + index)}`,
          createdDate: values.createdDate.format("YYYY-MM-DD"),
        })),
        createdDate: values.createdDate.format("YYYY-MM-DD"),
      };

      setFetalProfiles([...fetalProfiles, newProfile]);
      setIsCreateModalVisible(false);
      form.resetFields();
    });
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
    form.resetFields();
  };

  const handleSelectCancel = () => {
    setIsSelectModalVisible(false);
    setSelectedProfile(null);
  };

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
        columns={columns}
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
