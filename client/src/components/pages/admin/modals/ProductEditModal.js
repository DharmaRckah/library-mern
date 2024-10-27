// ProductEditModal.jsx

import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

const ProductEditModal = ({ ManufacturerData, closeModal, onUpdate }) => {
  const [formData, setFormData] = useState({
    itemCode: "",
    productName: "",
    category: "",
    subCategory: "",
    manufacturer: "",
    brand: "",
    subBrand: "",
    unit: "",
    hsnCode: "",
    gstRate: 0,
    cess: 0,
    purchaseTaxInclude: false,
    salesTaxInclude: false,
    description: "",
    newWeight: "",
    batchNo: "",
    expiryDate: "",
    feature: "",
    img: [],
    purchasePriceExGst: 0,
    purchasePriceInGst: 0,
    maxmimunRetailPrice: 0,
    retailDiscount: 0,
    retailPrice: 0,
    retailMargin: 0,
    wholesalerDiscount: 0,
    wholesalerPrice: 0,
    wholesaleMargin: 0,
    minimumStock: 0,
    maximumStock: 0,
    quantity: 0,
    rate: 0,
    amount: 0,
    units: "",
    rows: [
      {
        variant: "",
        productCode: "",
        productName: "",
        purchasePrice: 0,
        landingCost: 0,
        mrp: 0,
        retailDiscount: 0,
        retailPrice: 0,
        retailMargin: 0,
        wholesalerDiscount: 0,
        wholesalerPrice: 0,
        wholesaleMargin: 0,
        minimumStock: 0,
        maximumStock: 0,
        openingQty: 0,
      },
    ],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [imgs, setimgs] = useState([]);

  useEffect(() => {
    if (ManufacturerData) {
      setFormData({
        ...ManufacturerData,
        expiryDate: ManufacturerData.expiryDate
          ? new Date(ManufacturerData.expiryDate).toISOString().split("T")[0]
          : "",
        img: [],
      });
      setImagePreviews(ManufacturerData.img || []);
    }
  }, [ManufacturerData]);

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
    setimgs(files);
  };

  // Cleanup preview URLs on component unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  const handleRowChange = (index, e) => {
    const { name, value, type } = e.target;
    const updatedRows = [...formData.rows];
    updatedRows[index][name] =
      type === "number" ? parseFloat(value) || 0 : value;
    setFormData((prevData) => ({
      ...prevData,
      rows: updatedRows,
    }));
  };

  const addNewRow = () => {
    setFormData((prevData) => ({
      ...prevData,
      rows: [
        ...prevData.rows,
        {
          variant: "",
          productCode: "",
          productName: "",
          purchasePrice: 0,
          landingCost: 0,
          mrp: 0,
          retailDiscount: 0,
          retailPrice: 0,
          retailMargin: 0,
          wholesalerDiscount: 0,
          wholesalerPrice: 0,
          wholesaleMargin: 0,
          minimumStock: 0,
          maximumStock: 0,
          openingQty: 0,
        },
      ],
    }));
  };

  const removeRow = (index) => {
    const updatedRows = formData.rows.filter((_, i) => i !== index);
    setFormData((prevData) => ({
      ...prevData,
      rows: updatedRows,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "img" && imgs.length > 0) {
          // Only append images if they exist
          imgs.forEach((file) => form.append("img", file));
        } else {
          form.append(key, formData[key]);
        }
      });

      form.append("items", JSON.stringify(formData.rows));

      const response = await axios.put(
        `/api/v1/auth/updateproduct/${formData._id}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Product updated successfully!");
        if (onUpdate) onUpdate(response.data);
        closeModal();
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="justify-center p-8 responsive-container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-gray-700 text-2xl">Edit Product</h1>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          <FaTimes size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Product Information Section */}
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="font-bold mb-4 text-xl">Product Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Item Code */}
            <div>
              <label className="block font-bold mb-1">Item Code</label>
              <input
                type="text"
                name="itemCode"
                className="w-full p-2 border rounded"
                value={formData.itemCode}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Product Name */}
            <div>
              <label className="block font-bold mb-1">Product Name</label>
              <input
                type="text"
                name="productName"
                className="w-full p-2 border rounded"
                value={formData.productName}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-bold mb-1">Category</label>
              <input
                type="text"
                name="category"
                className="w-full p-2 border rounded"
                value={formData.category}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Sub Category */}
            <div>
              <label className="block font-bold mb-1">Sub Category</label>
              <input
                type="text"
                name="subCategory"
                className="w-full p-2 border rounded"
                value={formData.subCategory}
                onChange={handleInputChange}
              />
            </div>

            {/* Manufacturer */}
            <div>
              <label className="block font-bold mb-1">Manufacturer</label>
              <input
                type="text"
                name="manufacturer"
                className="w-full p-2 border rounded"
                value={formData.manufacturer}
                onChange={handleInputChange}
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block font-bold mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                className="w-full p-2 border rounded"
                value={formData.brand}
                onChange={handleInputChange}
              />
            </div>

            {/* Sub Brand */}
            <div>
              <label className="block font-bold mb-1">Sub Brand</label>
              <input
                type="text"
                name="subBrand"
                className="w-full p-2 border rounded"
                value={formData.subBrand}
                onChange={handleInputChange}
              />
            </div>

            {/* Unit */}
            <div>
              <label className="block font-bold mb-1">Unit</label>
              <input
                type="text"
                name="unit"
                className="w-full p-2 border rounded"
                value={formData.unit}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* HSN Code */}
            <div>
              <label className="block font-bold mb-1">HSN Code</label>
              <input
                type="text"
                name="hsnCode"
                className="w-full p-2 border rounded"
                value={formData.hsnCode}
                onChange={handleInputChange}
              />
            </div>

            {/* GST Rate */}
            <div>
              <label className="block font-bold mb-1">GST Rate (%)</label>
              <input
                type="number"
                name="gstRate"
                className="w-full p-2 border rounded"
                value={formData.gstRate}
                onChange={handleInputChange}
              />
            </div>

            {/* Cess */}
            <div>
              <label className="block font-bold mb-1">Cess (%)</label>
              <input
                type="number"
                name="cess"
                className="w-full p-2 border rounded"
                value={formData.cess}
                onChange={handleInputChange}
              />
            </div>

            {/* Purchase Tax Include */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="purchaseTaxInclude"
                className="w-5 h-5 mr-2"
                checked={formData.purchaseTaxInclude}
                onChange={handleInputChange}
              />
              <label className="font-bold">Purchase Tax Include</label>
            </div>

            {/* Sales Tax Include */}
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                name="salesTaxInclude"
                className="w-5 h-5 mr-2"
                checked={formData.salesTaxInclude}
                onChange={handleInputChange}
              />
              <label className="font-bold">Sales Tax Include</label>
            </div>

            {/* Description */}
            <div className="">
              <label className="block font-bold mb-1">Description</label>
              <textarea
                name="description"
                className="w-full p-2 border rounded"
                value={formData.description}
                onChange={handleInputChange}
                rows={2}
              />
            </div>

            {/* Net Weight */}
            <div>
              <label className="block font-bold mb-1">Net Weight</label>
              <input
                type="text"
                name="newWeight"
                className="w-full p-2 border rounded"
                value={formData.newWeight}
                onChange={handleInputChange}
              />
            </div>

            {/* Batch No. */}
            <div>
              <label className="block font-bold mb-1">Batch No.</label>
              <input
                type="text"
                name="batchNo"
                className="w-full p-2 border rounded"
                value={formData.batchNo}
                onChange={handleInputChange}
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block font-bold mb-1">Expiry Date</label>
              <input
                type="month"
                name="expiryDate"
                className="w-full p-2 border rounded"
                value={formData.expiryDate}
                onChange={handleInputChange}
              />
            </div>

            {/* feature */}
            <div className="">
              <label className="block font-bold mb-1">features</label>
              <textarea
                name="feature"
                className="w-full p-2 border rounded"
                value={formData.feature}
                onChange={handleInputChange}
                rows={2}
              />
            </div>

            {/* Product img */}
            <div className="sm:col-span-2 md:col-span-4">
              <label className="block font-bold mb-1">Product Images</label>
              <input
                type="file"
                name="img"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full p-2 border rounded"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
                {imagePreviews.map((src, index) => (
                  <img
                    key={index}
                    src={`/${src}`}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Price Details Section */}
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="font-bold mb-4 text-xl">Price Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Purchase Price Excluding GST */}
            <div>
              <label className="block font-bold mb-1">
                Purchase Price (Excl. GST)
              </label>
              <input
                type="number"
                name="purchasePriceExGst"
                className="w-full p-2 border rounded"
                value={formData.purchasePriceExGst}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>

            {/* Purchase Price Including GST */}
            <div>
              <label className="block font-bold mb-1">
                Purchase Price (Incl. GST)
              </label>
              <input
                type="number"
                name="purchasePriceInGst"
                className="w-full p-2 border rounded"
                value={formData.purchasePriceInGst}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>

            {/* Maximum Retail Price (MRP) */}
            <div>
              <label className="block font-bold mb-1">
                Maximum Retail Price (MRP)
              </label>
              <input
                type="number"
                name="maxmimunRetailPrice"
                className="w-full p-2 border rounded"
                value={formData.maxmimunRetailPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>

            {/* Retail Discount (%) */}
            <div>
              <label className="block font-bold mb-1">
                Retail Discount (%)
              </label>
              <input
                type="number"
                name="retailDiscount"
                className="w-full p-2 border rounded"
                value={formData.retailDiscount}
                onChange={handleInputChange}
              />
            </div>

            {/* Retail Price */}
            <div>
              <label className="block font-bold mb-1">Retail Price</label>
              <input
                type="number"
                name="retailPrice"
                className="w-full p-2 border rounded"
                value={formData.retailPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>

            {/* Retail Margin (%) */}
            <div>
              <label className="block font-bold mb-1">Retail Margin (%)</label>
              <input
                type="number"
                name="retailMargin"
                className="w-full p-2 border rounded"
                value={formData.retailMargin}
                onChange={handleInputChange}
              />
            </div>

            {/* Wholesaler Discount (%) */}
            <div>
              <label className="block font-bold mb-1">
                Wholesaler Discount (%)
              </label>
              <input
                type="number"
                name="wholesalerDiscount"
                className="w-full p-2 border rounded"
                value={formData.wholesalerDiscount}
                onChange={handleInputChange}
              />
            </div>

            {/* Wholesaler Price */}
            <div>
              <label className="block font-bold mb-1">Wholesaler Price</label>
              <input
                type="number"
                name="wholesalerPrice"
                className="w-full p-2 border rounded"
                value={formData.wholesalerPrice}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>

            {/* Wholesale Margin (%) */}
            <div>
              <label className="block font-bold mb-1">
                Wholesale Margin (%)
              </label>
              <input
                type="number"
                name="wholesaleMargin"
                className="w-full p-2 border rounded"
                value={formData.wholesaleMargin}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Stock Information Section */}
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="font-bold mb-4 text-xl">Stock Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Minimum Stock */}
            <div>
              <label className="block font-bold mb-1">Minimum Stock</label>
              <input
                type="number"
                name="minimumStock"
                className="w-full p-2 border rounded"
                value={formData.minimumStock}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
            </div>

            {/* Maximum Stock */}
            <div>
              <label className="block font-bold mb-1">Maximum Stock</label>
              <input
                type="number"
                name="maximumStock"
                className="w-full p-2 border rounded"
                value={formData.maximumStock}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
            </div>
          </div>
        </div>

        {/* Opening Stock Information Section */}
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="font-bold mb-4 text-xl">Opening Stock Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Opening Quantity */}
            <div>
              <label className="block font-bold mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                className="w-full p-2 border rounded"
                value={formData.quantity}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
            </div>

            {/* Rate */}
            <div>
              <label className="block font-bold mb-1">Rate</label>
              <input
                type="number"
                name="rate"
                className="w-full p-2 border rounded"
                value={formData.rate}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>

            {/* Units */}
            <div>
              <label className="block font-bold mb-1">Units</label>
              <input
                type="text"
                name="units"
                className="w-full p-2 border rounded"
                value={formData.units}
                onChange={handleInputChange}
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block font-bold mb-1">Amount</label>
              <input
                type="number"
                name="amount"
                className="w-full p-2 border rounded"
                value={formData.amount}
                onChange={handleInputChange}
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {/* Rows Details Section */}
        <div className="bg-gray-100 p-4 rounded mb-6">
          <h2 className="font-bold mb-4 text-xl">Variant Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Variant</th>
                  <th className="py-2 px-4 border">Product Code</th>
                  <th className="py-2 px-4 border">Product Name</th>
                  <th className="py-2 px-4 border">Purchase Price</th>
                  <th className="py-2 px-4 border">Landing Cost</th>
                  <th className="py-2 px-4 border">MRP</th>
                  <th className="py-2 px-4 border">Retail Discount</th>
                  <th className="py-2 px-4 border">Retail Price</th>
                  <th className="py-2 px-4 border">Retail Margin</th>
                  <th className="py-2 px-4 border">Wholesaler Discount</th>
                  <th className="py-2 px-4 border">Wholesaler Price</th>
                  <th className="py-2 px-4 border">Wholesale Margin</th>
                  <th className="py-2 px-4 border">Minimum Stock</th>
                  <th className="py-2 px-4 border">Maximum Stock</th>
                  <th className="py-2 px-4 border">Opening Qty</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, index) => (
                  <tr key={index} className="text-center">
                    <td className="py-2 px-4 border">
                      <input
                        type="text"
                        name="variant"
                        className="w-full p-1 border rounded"
                        value={row.variant}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="text"
                        name="productCode"
                        className="w-full p-1 border rounded"
                        value={row.productCode}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="text"
                        name="productName"
                        className="w-full p-1 border rounded"
                        value={row.productName}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="purchasePrice"
                        className="w-full p-1 border rounded"
                        value={row.purchasePrice}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="landingCost"
                        className="w-full p-1 border rounded"
                        value={row.landingCost}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="mrp"
                        className="w-full p-1 border rounded"
                        value={row.mrp}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="retailDiscount"
                        className="w-full p-1 border rounded"
                        value={row.retailDiscount}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="retailPrice"
                        className="w-full p-1 border rounded"
                        value={row.retailPrice}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="retailMargin"
                        className="w-full p-1 border rounded"
                        value={row.retailMargin}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="wholesalerDiscount"
                        className="w-full p-1 border rounded"
                        value={row.wholesalerDiscount}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="wholesalerPrice"
                        className="w-full p-1 border rounded"
                        value={row.wholesalerPrice}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="wholesaleMargin"
                        className="w-full p-1 border rounded"
                        value={row.wholesaleMargin}
                        onChange={(e) => handleRowChange(index, e)}
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="minimumStock"
                        className="w-full p-1 border rounded"
                        value={row.minimumStock}
                        onChange={(e) => handleRowChange(index, e)}
                        min="0"
                        step="1"
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="maximumStock"
                        className="w-full p-1 border rounded"
                        value={row.maximumStock}
                        onChange={(e) => handleRowChange(index, e)}
                        min="0"
                        step="1"
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <input
                        type="number"
                        name="openingQty"
                        className="w-full p-1 border rounded"
                        value={row.openingQty}
                        onChange={(e) => handleRowChange(index, e)}
                        min="0"
                        step="1"
                      />
                    </td>
                    <td className="py-2 px-4 border">
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeRow(index)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={addNewRow}
            >
              Add New Variant
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductEditModal;
