/* eslint-disable @typescript-eslint/no-explicit-any */
// app/add-product/page.tsx

'use client';

import { Form, Input, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { TextArea } = Input;

export default function AddProductPage() {
  const [form] = Form.useForm();
  const [brandImageFile, setBrandImageFile] = useState<File | null>(null);
  const [productImageFile, setProductImageFile] = useState<File | null>(null);

  const handleBrandImageChange = ({ file }: any) => {
    if (file.size > 10 * 1024 * 1024) {
      message.error('Image must be smaller than 10MB');
      return;
    }
    setBrandImageFile(file);
  };

  const handleProductImageChange = ({ file }: any) => {
    if (file.size > 10 * 1024 * 1024) {
      message.error('Image must be smaller than 10MB');
      return;
    }
    setProductImageFile(file);
  };

  const onFinish = (values: any) => {
    console.log('Submitted Values:', values);
    console.log('Brand Image:', brandImageFile);
    console.log('Product Image:', productImageFile);
    message.success('Product added successfully!');
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="p-6  mx-auto bg-[#F4F7FD] rounded-xl">
      <h1 className="text-2xl font-semibold text-[#A7997D] mb-6">Add New Product</h1>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="space-y-6"
      >
        {/* Row 1: Product Name */}
<Form.Item
  label={<span className="text-[#A7997D] font-medium">Product Name/Title *</span>}
  name="productName"
  rules={[{ required: true, message: 'Please enter product name' }]}
>
  <Input 
    placeholder="Red Wine" 
    className="rounded-[8px] border border-[#D9D9D9] bg-white" 
  />
</Form.Item>


        {/* Row 2: Brand Name + Category */}
        <div className="grid grid-cols-2 gap-6">
          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Brand Name *</span>}
            name="brandName"
            rules={[{ required: true, message: 'Please enter brand name' }]}
          >
            <Input placeholder="Winery" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Category *</span>}
            name="category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Input placeholder="Red Wine" />
          </Form.Item>
        </div>

        {/* Row 3: Bottle Size + Tag + Offer + Price + Total Product */}
        <div className="grid grid-cols-5 gap-4">
          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Bottle Size *</span>}
            name="bottleSize"
            rules={[{ required: true, message: 'Please enter bottle size' }]}
          >
            <Input placeholder="500 ml" />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-600 font-medium">Tag (Optional)</span>}
            name="tag"
          >
            <Input placeholder="Hot" />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-600 font-medium">Offer (Optional)</span>}
            name="offer"
          >
            <Input placeholder="10%" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Price $ *</span>}
            name="price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input placeholder="$500" />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Total Product *</span>}
            name="totalProduct"
            rules={[{ required: true, message: 'Please enter total product' }]}
          >
            <Input placeholder="50" />
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
            placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
          />
        </Form.Item>

        {/* Image Uploads */}
        <div className="grid grid-cols-2 gap-6">
          {/* Brand Logo/Image */}
          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Brand Logo/Image *</span>}
            name="brandLogo"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload brand logo' }]}
          >
            <Upload
              accept=".png,.jpg,.jpeg"
              beforeUpload={() => false} // Prevent auto-upload
              onChange={handleBrandImageChange}
              showUploadList={false}
              className="border border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <UploadOutlined className="text-2xl text-[#A7997D]" />
                <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </Upload>
          </Form.Item>

          {/* Product Image */}
          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Product Image *</span>}
            name="productImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload product image' }]}
          >
            <Upload
              accept=".png,.jpg,.jpeg"
              beforeUpload={() => false} // Prevent auto-upload
              onChange={handleProductImageChange}
              showUploadList={false}
              className="border border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col items-center">
                <UploadOutlined className="text-2xl text-[#A7997D]" />
                <p className="mt-2 text-sm text-gray-600">Click to upload images</p>
                <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
              </div>
            </Upload>
          </Form.Item>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#A7997D] hover:bg-[#8d7c68] text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Add
          </Button>
        </div>
      </Form>
    </div>
  );
}