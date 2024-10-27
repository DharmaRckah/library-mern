import React from "react";
import { FaTimes } from "react-icons/fa";

const ProductViewModel = ({ ManufacturerData, closeModal }) => {
  console.log(ManufacturerData,"sdkjhf")
  return (
    <div className="justify-center p-8 responsive-container">
      <div className="flex justify-between items-center mb-1">
        <h1 className="font-bold text-center text-gray-700 text-2xl underline">
          View Product
        </h1>
        <button
          type="button"
          className="text-gray-500 hover:text-gray-700 border"
          onClick={closeModal}
        >
          <FaTimes size={24} />
        </button>
      </div>
      <div className="bg-gray-200 p-4 rounded mb-4">
        <h2 className="font-bold mb-2 text-xl">Product Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3">
          <div>
            <label className="block font-bold">Item Code</label>
            <input
              type="text"
              name="itemCode"
              className="w-full p-1 border rounded"
              value={ManufacturerData.itemCode}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Product Name</label>
            <input
              type="text"
              name="productName"
              className="w-full p-1 border rounded"
              value={ManufacturerData.productName}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Category</label>
            <input
              name="category"
              className="w-full p-1 border rounded"
              value={ManufacturerData.category}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Sub Category</label>
            <input
              className="w-full p-1 border rounded"
              name="subCategory"
              value={ManufacturerData.subCategory}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Manufacturer</label>
            <input
              className="w-full p-1 border rounded"
              name="manufacturer"
              value={ManufacturerData.manufacturer}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Brand</label>
            <input
              className="w-full p-1 border rounded"
              name="brand"
              value={ManufacturerData.brand}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Sub Brand</label>
            <input
              className="w-full p-1 border rounded"
              name="subBrand"
              value={ManufacturerData.subBrand}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">units</label>
            <input
              className="w-full p-1 border rounded"
              name="uom"
              value={ManufacturerData.unit}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">HSN Code</label>
            <input
              className="w-full p-1 border rounded"
              name="uom"
              value={ManufacturerData.hsnCode}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">GST Rate</label>
            <input
              className="w-full p-1 border rounded"
              name="gstRate"
              value={`${ManufacturerData.gstRate}`}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">cess</label>
            <input
              className="w-full p-1 border rounded"
              name="uom"
              value={ManufacturerData.cess}
              readOnly
            />
          </div>
          <div>
            <label className="font-bold">Purchase Tax Include</label>
            <input
              type="checkbox"
              className="p-1 m-4 border rounded"
              name="purchaseTaxInclude"
              checked={ManufacturerData.purchaseTaxInclude === 'true'}
              readOnly
            />
          </div>
          <div>
            <label className="font-bold">Sales Tax Include</label>
            <input
              type="checkbox"
              className="p-1 m-4 border rounded"
              name="salesTaxInclude"
              checked={ManufacturerData.salesTaxInclude === 'true'}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Description</label>
            <textarea
              name="description"
              className="w-full p-1 border rounded"
              value={ManufacturerData.description}
              rows={2}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Net Weight</label>
            <input
              type="text"
              name="newWeight"
              className="w-full p-1 border rounded"
              value={ManufacturerData.newWeight}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Batch No.</label>
            <input
              type="text"
              name="batchNo"
              className="w-full p-1 border rounded"
              value={ManufacturerData.batchNo}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              className="w-full p-1 border rounded"
              value={ManufacturerData.expiryDate}
              readOnly
            />
          </div>

          <div>
            <label className="block font-bold">Features</label>
            <textarea
              type="text"
              name="feature"
              className="w-full p-1 border rounded"
              value={ManufacturerData.feature}
              readOnly
            />
          </div>


        </div>
        <div>
            <label className="block font-bold">Product Images</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2">
              {ManufacturerData.img.map((image, index) => (
                <img
                  key={index}
                  src={`/${image}`}
                  alt={`Product Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          </div>
      </div>
      <div className="bg-gray-200 p-4 rounded mb-4">
        <h2 className="font-bold mb-2 text-xl">Price Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <div>
            <label className="block font-bold">Purchase Price</label>
            <span>( exclude GST)</span>
            <input
              type="number"
              name="purchasePriceExGst"
              className="w-full p-1 border rounded"
              value={ManufacturerData.purchasePriceExGst}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Purchase Price</label>
            <span>( Include GST)</span>
            <input
              type="number"
              name="purchasePriceInGst"
              className="w-full p-1 border rounded"
              value={ManufacturerData.purchasePriceInGst}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Maximum Retail Price</label>
            <span>(MRP)</span>
            <input
              type="number"
              name="maxmimunRetailPrice"
              className="w-full p-1 border rounded"
              value={ManufacturerData.maxmimunRetailPrice}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Retail Discount</label>
            <span>(in %)</span>
            <input
              type="number"
              name="retailDiscount"
              className="w-full p-1 border rounded"
              value={ManufacturerData.retailDiscount}
              readOnly
            />
          </div>

          <div>
            <label className="block font-bold">Retail Price</label>
            <span>(in Rs)</span>

            <input
              type="number"
              name="retailPrice"
              className="w-full p-1 border rounded"
              value={ManufacturerData.retailPrice}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Retail Margin</label>
            <span>(in %)</span>

            <input
              type="number"
              name="retailMargin"
              className="w-full p-1 border rounded"
              value={ManufacturerData.retailMargin}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Wholesaler Discount</label>
            <span>(in %)</span>

            <input
              type="number"
              name="wholesalerDiscount"
              className="w-full p-1 border rounded"
              value={ManufacturerData.wholesalerDiscount}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Wholesaler Price</label>
            <span>(in Rs)</span>

            <input
              type="number"
              name="wholesalerPrice"
              className="w-full p-1 border rounded"
              value={ManufacturerData.wholesalerPrice}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Wholesale Margin</label>
            <span>(in %)</span>

            <input
              type="number"
              name="wholesaleMargin"
              className="w-full p-1 border rounded"
              value={ManufacturerData.wholesaleMargin}
              readOnly
            />
          </div>
        </div>
      </div>
      <div className="bg-gray-200 p-4 rounded mb-4">
        <h2 className="font-bold mb-2 text-xl">Stock Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <div>
            <label className="block font-bold">Minimum Stock</label>
            <input
              type="number"
              name="minimumStock"
              className="w-full p-1 border rounded"
              value={ManufacturerData.minimumStock}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Maximum Stock</label>
            <input
              type="number"
              name="maximumStock"
              className="w-full p-1 border rounded"
              value={ManufacturerData.maximumStock}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-4 rounded mb-4">
        <h2 className="font-bold mb-2 text-xl">Opening Stock Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4">
          <div>
            <label className="block font-bold">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="w-full p-1 border rounded"
              value={ManufacturerData.quantity}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Rate</label>
            <input
              type="number"
              name="rate"
              className="w-full p-1 border rounded"
              value={ManufacturerData.rate}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">UOM</label>
            <input
              type="text"
              name="units"
              className="w-full p-1 border rounded"
              value={ManufacturerData.units}
              readOnly
            />
          </div>
          <div>
            <label className="block font-bold">Amount</label>
            <input
              type="number"
              name="amount"
              className="w-full p-1 border rounded"
              value={ManufacturerData.amount}
              readOnly
            />
          </div>
        </div>
        <div className="bg-gray-200 rounded mb-4">
          <h2 className="font-bold mb-2 text-xl">Rows Details</h2>
          <div className="overflow-x-auto">
            {" "}
            <table className="min-w-full bg-white overflow-x-auto ">
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
                  <th className="py-2 px-4 border">Opening Quantity</th>
                </tr>
              </thead>
              <tbody>
                {ManufacturerData.rows.map((row, index) => (
                  <tr key={row._id} className="text-center">
                    <td className="py-2 px-4 border">{row.variant}</td>
                    <td className="py-2 px-4 border">{row.productCode}</td>
                    <td className="py-2 px-4 border">{row.productName}</td>
                    <td className="py-2 px-4 border">{row.purchasePrice}</td>
                    <td className="py-2 px-4 border">{row.landingCost}</td>
                    <td className="py-2 px-4 border">{row.mrp}</td>
                    <td className="py-2 px-4 border">{row.retailDiscount}</td>
                    <td className="py-2 px-4 border">{row.retailPrice}</td>
                    <td className="py-2 px-4 border">{row.retailMargin}</td>
                    <td className="py-2 px-4 border">
                      {row.wholesalerDiscount}
                    </td>
                    <td className="py-2 px-4 border">{row.wholesalerPrice}</td>
                    <td className="py-2 px-4 border">{row.wholesaleMargin}</td>
                    <td className="py-2 px-4 border">{row.minimumStock}</td>
                    <td className="py-2 px-4 border">{row.maximumStock}</td>
                    <td className="py-2 px-4 border">{row.openingQty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductViewModel;
