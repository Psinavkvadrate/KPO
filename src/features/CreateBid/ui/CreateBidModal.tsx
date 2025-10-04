import React from 'react';
import { Modal, Form, Input, Select, Upload, Button, Space, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { createBid } from '../api';
import { getTransactionStatusOptions } from '../const/types';

const { Option } = Select;

const currencyOptions = ["RUB", "USD", "EUR", "GBP", "CNY", "OTHER"];
const statusOptions = ["new", "accepted", "agent_suggestion", "importer_suggestion"];

interface CreateBidModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateBidModal: React.FC<CreateBidModalProps> = ({ open, onClose }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const currency = Form.useWatch('currency', form); 

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === 'documents') return;
        if (value !== undefined && value !== null) {
          const isObject = typeof value === 'object' && !Array.isArray(value);
          formData.append(key, isObject ? JSON.stringify(value) : String(value));
        }
      });

      if (values.documents?.fileList) {
        values.documents.fileList.forEach((file: any) => {
          formData.append('documents', file.originFileObj);
        });
      }

      await createBid(formData);
      message.success(t('features.createBid.success'));
      form.resetFields();
      onClose();
    } catch (error) {
      message.error(t('features.createBid.error') || 'Error while creating bid');
    }
  };

  return (
    <Modal
      open={open}
      title={t('features.createBid.title')}
      onCancel={onClose}
      onOk={() => form.submit()}
      width={800}
      okText={t('features.createBid.create')}
      cancelText={t('features.createBid.cancel')}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Space size="middle" wrap>
          <Form.Item name="user" label={t('features.createBid.field.user')}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="sum" label={t('features.createBid.field.sum')} rules={[{ required: true, message: t('features.createBid.validation.sum') }]} >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="currency" label={t('features.createBid.field.currency')}>
            <Select placeholder={t('features.createBid.placeholder.currency')} style={{ width: 120 }}>
              {currencyOptions.map(curr => (
                <Option key={curr} value={curr}>{curr}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="purpose" label={t('features.createBid.field.purpose')} rules={[{ required: true, message: t('features.createBid.validation.purpose') }]}>
            <Input />
          </Form.Item>

          {currency === 'RUB' && (
            <>
              <Form.Item name="tin" label={t('features.createBid.field.tin')}>
                <Input />
              </Form.Item>
              <Form.Item name="rcr" label={t('features.createBid.field.rcr')}>
                <Input />
              </Form.Item>
            </>
          )}

          <Form.Item name="senderName" label={t('features.createBid.field.senderName')}>
            <Input />
          </Form.Item>
          <Form.Item name="senderAccount" label={t('features.createBid.field.senderAccount')}>
            <Input />
          </Form.Item>
          <Form.Item name="recipientName" label={t('features.createBid.field.recipientName')} rules={[{ required: true, message: t('features.createBid.validation.recipientName') }]}>
            <Input />
          </Form.Item>
          <Form.Item name="recipientDetails" label={t('features.createBid.field.recipientDetails')} rules={[{ required: true, message: t('features.createBid.validation.recipientDetails') }]}>
            <Input />
          </Form.Item>
          <Form.Item name="recipientCountry" label={t('features.createBid.field.recipientCountry')} rules={[{ required: true, message: t('features.createBid.validation.recipientCountry') }]}>
            <Input />
          </Form.Item>
          <Form.Item name="recipientAddress" label={t('features.createBid.field.recipientAddress')}>
            <Input />
          </Form.Item>
          <Form.Item name="recipientAccount" label={t('features.createBid.field.recipientAccount')}>
            <Input />
          </Form.Item>
          <Form.Item name="recipientNationality" label={t('features.createBid.field.recipientNationality')}>
            <Input />
          </Form.Item>
          <Form.Item name="recipientResidenceCountry" label={t('features.createBid.field.recipientResidenceCountry')}>
            <Input />
          </Form.Item>
          <Form.Item name="bankCountry" label={t('features.createBid.field.bankCountry')}>
            <Input />
          </Form.Item>
          <Form.Item name="directorName" label={t('features.createBid.field.directorName')}>
            <Input />
          </Form.Item>
          <Form.Item name="directorNationality" label={t('features.createBid.field.directorNationality')}>
            <Input />
          </Form.Item>
          <Form.Item name="bank" label={t('features.createBid.field.bank')}>
            <Input />
          </Form.Item>
          <Form.Item name="bankAddress" label={t('features.createBid.field.bankAddress')}>
            <Input />
          </Form.Item>
          <Form.Item name="bic" label={t('features.createBid.field.bic')}>
            <Input />
          </Form.Item>
          <Form.Item name="vat" label={t('features.createBid.field.vat')}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label={t('features.createBid.field.description')}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label={t('features.createBid.field.status')}>
            <Select placeholder={t('features.createBid.placeholder.status')} style={{ width: 160 }}>
              {getTransactionStatusOptions(t).map(({ value, label }) => (
                <Option key={value} value={value}>{label}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="date" label={t('features.createBid.field.date')}>
            <Input />
          </Form.Item>
          <Form.Item name="time" label={t('features.createBid.field.time')}>
            <Input />
          </Form.Item>
          <Form.Item name="creator_id" label={t('features.createBid.field.creator_id')}>
            <Input />
          </Form.Item>
          <Form.Item name="assigned_id" label={t('features.createBid.field.assigned_id')}>
            <Input />
          </Form.Item>
          <Form.Item name="documents" label={t('features.createBid.field.documents')}>
            <Upload multiple beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>{t('features.createBid.upload')}</Button>
            </Upload>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};
