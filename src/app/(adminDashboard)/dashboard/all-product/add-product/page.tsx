/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Dashboard/All-Product/AddProductForm.tsx
'use client';

import { Form, Input, Button, Upload, message, UploadFile } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Image from 'next/image';

const { TextArea } = Input;

export default function AddProductForm() {
  const [form] = Form.useForm();
  const [brandImage, setBrandImage] = useState<UploadFile | null>(null);
  const [productImage, setProductImage] = useState<UploadFile | null>(null);

  const handleImageChange = (
    info: { fileList: UploadFile[] },
    setImage: (file: UploadFile) => void
  ) => {
    const file = info.fileList[0];
    if (file) {
      if (file.size && file.size > 10 * 1024 * 1024) {
        message.error('Image must be smaller than 10MB');
        return;
      }
      setImage(file);
    }
  };

  const onFinish = (values: any) => {
    console.log('Submitted Values:', {
      ...values,
      brandImage: brandImage?.originFileObj,
      productImage: productImage?.originFileObj,
    });
    message.success('Product added successfully!');
    form.resetFields();
    setBrandImage(null);
    setProductImage(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-[#A7997D] mb-8 text-center">
        Add New Product
      </h1>

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
            className="rounded-lg border border-[#D9D9D9] h-12" 
          />
        </Form.Item>

        {/* Row 2: Brand Name + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Brand Name *</span>}
            name="brandName"
            rules={[{ required: true, message: 'Please enter brand name' }]}
          >
            <Input 
              placeholder="Winery" 
              className="rounded-lg border border-[#D9D9D9] h-12" 
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Category *</span>}
            name="category"
            rules={[{ required: true, message: 'Please select category' }]}
          >
            <Input 
              placeholder="Red Wine" 
              className="rounded-lg border border-[#D9D9D9] h-12" 
            />
          </Form.Item>
        </div>

        {/* Row 3: Bottle Size + Tag + Offer + Price + Total Product */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Bottle Size *</span>}
            name="bottleSize"
            rules={[{ required: true, message: 'Please enter bottle size' }]}
          >
            <Input 
              placeholder="500 ml" 
              className="rounded-lg border border-[#D9D9D9] h-12" 
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-500 font-medium">Tag (Optional)</span>}
            name="tag"
          >
            <Input 
              placeholder="Hot" 
              className="rounded-lg border border-[#D9D9D9] h-12" 
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-500 font-medium">Offer (Optional)</span>}
            name="offer"
          >
            <Input 
              placeholder="10%" 
              className="rounded-lg border border-[#D9D9D9] h-12" 
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Price $ *</span>}
            name="price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input 
              placeholder="$500" 
              className="rounded-lg border border-[#D9D9D9] h-12" 
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Total Product *</span>}
            name="totalProduct"
            rules={[{ required: true, message: 'Please enter total product' }]}
          >
            <Input 
              placeholder="50" 
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
            placeholder="Product description here..."
            className="rounded-lg border border-[#D9D9D9] p-3"
          />
        </Form.Item>

        {/* Image Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Brand Logo/Image */}
          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Brand Logo/Image *</span>}
            name="brandLogo"
            rules={[{ required: true, message: 'Please upload brand logo' }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              accept=".png,.jpg,.jpeg"
              beforeUpload={() => false}
              onChange={(info) => handleImageChange(info, setBrandImage)}
              fileList={brandImage ? [brandImage] : []}
              showUploadList={false}
              className="border-2 border-dashed border-[#A7997D]/30 rounded-xl p-6 flex flex-col items-center justify-center hover:border-[#A7997D] transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center">
                {brandImage ? (
                  <Image
                    width={100}
                    height={100}
                    src={URL.createObjectURL(brandImage.originFileObj as File)} 
                    alt="Preview" 
                    className="w-24 h-24 object-contain mb-3 rounded-lg"
                  />
                ) : (
                  <UploadOutlined className="text-3xl text-[#A7997D]" />
                )}
                <p className="mt-2 text-sm text-gray-600 font-medium">
                  {brandImage ? 'Change Image' : 'Click to upload brand logo'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
              </div>
            </Upload>
          </Form.Item>

          {/* Product Image */}
          <Form.Item
            label={<span className="text-[#A7997D] font-medium">Product Image *</span>}
            name="productImage"
            rules={[{ required: true, message: 'Please upload product image' }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              accept=".png,.jpg,.jpeg"
              beforeUpload={() => false}
              onChange={(info) => handleImageChange(info, setProductImage)}
              fileList={productImage ? [productImage] : []}
              showUploadList={false}
              className="border-2 border-dashed border-[#A7997D]/30 rounded-xl p-6 flex flex-col items-center justify-center hover:border-[#A7997D] transition-colors cursor-pointer"
            >
              <div className="flex flex-col items-center">
                {productImage ? (
                  <Image
                    width={100}
                    height={100}
                    src={URL.createObjectURL(productImage.originFileObj as File)} 
                    alt="Preview" 
                    className="w-24 h-24 object-contain mb-3 rounded-lg"
                  />
                ) : (
                  <UploadOutlined className="text-3xl text-[#A7997D]" />
                )}
                <p className="mt-2 text-sm text-gray-600 font-medium">
                  {productImage ? 'Change Image' : 'Click to upload product image'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
              </div>
            </Upload>
          </Form.Item>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#A7997D] hover:bg-[#92826f] text-white px-12 py-4 rounded-xl text-lg font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Add Product
          </Button>
        </div>
      </Form>
    </div>
  );
}