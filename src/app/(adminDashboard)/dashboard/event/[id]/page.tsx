/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Dashboard/All-Product/EditEventForm.tsx

'use client';

import { Form, Input, Upload, message, UploadFile, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useUpdateEventMutation } from '@/redux/service/admin/eventApi';
import { useParams } from 'next/navigation';

const { TextArea } = Input;

export default function EditEventForm() {
  const params = useParams();
  const eventId = params.id as string;

  const [form] = Form.useForm();
  const [updateEvent, { isLoading: isUpdating }] = useUpdateEventMutation();
  const [eventImages, setEventImages] = useState<UploadFile[]>([]);

  const handleImageChange = ({ fileList }: { fileList: UploadFile[] }) => {
    const validFiles = fileList
      .filter(file => file.originFileObj)
      .map(file => {
        if (file.size && file.size > 10 * 1024 * 1024) {
          message.error(`Image ${file.name} must be smaller than 10MB`);
          return null;
        }
        return file;
      })
      .filter(Boolean) as UploadFile[];

    setEventImages(validFiles);
  };

  const onFinish = async (values: any) => {
    const formData = new FormData();

    const eventData = {
      name: values.eventName,
      des: values.description,
      startDate: values.startDate,
      endDate: values.endDate,
      audienceSize: values.audienceSize,
      price: values.price,
      status: 'UP_COMMING',
    };

    formData.append('data', JSON.stringify(eventData));

    // Only append images if selected
    if (eventImages.length > 0) {
      eventImages.forEach(file => {
        formData.append('images', file.originFileObj as File);
      });
    }

    // Debug log
    console.log('Updating event with:');
    for (const [key, value] of formData.entries()) {
      console.log(key, value instanceof File ? `[File: ${value.name}]` : value);
    }

    try {
      // ✅ Use updateEvent with { id, formData }
      const result = await updateEvent({ id: eventId, formData }).unwrap();

      if (result.status === true) {
        Swal.fire({
          icon: 'success',
          title: 'Event Updated',
          text: result.message || 'Event updated successfully!',
          confirmButtonColor: '#AF6900',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: result.message || 'Something went wrong',
          confirmButtonColor: '#d33',
        });
      }
    } catch (error: any) {
      console.error('Update error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error?.data?.message || 'Failed to update event. Please try again.',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div className="bg-[#F4F7FD] rounded-2xl shadow-md p-8 mx-auto">
      <h1 className="text-2xl font-bold text-[#A7997D] mb-8 text-center">
        Edit Event
      </h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-6"
      >
        {/* Event Name */}
        <Form.Item
          label={<span className="text-[#A7997D] font-medium">Event Name/Title *</span>}
          name="eventName"
          rules={[{ required: true, message: 'Please enter event name' }]}
        >
          <Input 
            placeholder="Wine Garden Tour" 
            className="rounded-lg border border-[#D9D9D9] h-12" 
          />
        </Form.Item>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Start Date *</span>}
            name="startDate"
            rules={[{ required: true, message: 'Please select start date' }]}
          >
            <Input 
              type="date"
              className="rounded-lg border border-[#D9D9D9] h-12" 
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#A7997D] font-medium">End Date *</span>}
            name="endDate"
            rules={[{ required: true, message: 'Please select end date' }]}
          >
            <Input 
              type="date"
              className="rounded-lg border border-[#D9D9D9] h-12" 
            />
          </Form.Item>
        </div>

        {/* Audience + Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Audience Size *</span>}
            name="audienceSize"
            rules={[{ required: true, message: 'Please enter audience size' }]}
          >
            <Input 
              placeholder="500" 
              className="rounded-lg border border-[#D9D9D9] h-12" 
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Price $ *</span>}
            name="price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input 
              placeholder="199" 
              type="number"
              className="rounded-lg border border-[#D9D9D9] h-12" 
            />
          </Form.Item>
        </div>

        {/* Description */}
        <Form.Item
          label={<span className="text-[#A7997D] font-medium">Description *</span>}
          name="description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <TextArea
            rows={4}
            placeholder="Describe your event..."
            className="rounded-lg border border-[#D9D9D9] p-3"
          />
        </Form.Item>

        {/* Images – Optional */}
        <Form.Item
          label={<span className="text-[#A7997D] font-medium">Event Images</span>}
          name="eventImages"
        >
          <Upload
            accept=".png,.jpg,.jpeg"
            beforeUpload={() => false}
            onChange={handleImageChange}
            fileList={eventImages}
            listType="picture-card"
            multiple
          >
            <div className="flex flex-col items-center justify-center">
              <UploadOutlined className="text-3xl text-[#A7997D]" />
              <p className="mt-2 text-sm text-gray-600 font-medium">
                {eventImages.length > 0 ? 'Add more' : 'Click to upload'}
              </p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
            </div>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="primary"
            htmlType="submit"
            loading={isUpdating}
            className="bg-[#AF6900] hover:bg-[#92826f] text-white px-12 py-4 rounded-xl text-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            {isUpdating ? 'Updating...' : 'Update Event'}
          </Button>
        </div>
      </Form>
    </div>
  );
}