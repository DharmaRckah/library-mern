import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTimes } from 'react-icons/fa'
import Select from 'react-select'
import { useAuth } from '../../../context/Auth.js'

const EditPurchaseOrder = ({ closeModal, estimate }) => {
  const [date, setDate] = useState('')
  const [orderNo, setorderNo] = useState('')
  const [salesType, setSalesType] = useState('')
  const [customerType, setCustomerType] = useState('')
  const [SupplierName, setSupplierName] = useState('')
  const [placeOfSupply, setPlaceOfSupply] = useState('')
  const [paymentTerm, setPaymentTerm] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [receiptDocNo, setReceiptDocNo] = useState('')
  const [dispatchedThrough, setDispatchedThrough] = useState('')
  const [destination, setDestination] = useState('')
  const [carrierNameAgent, setCarrierNameAgent] = useState('')
  const [billOfLading, setBillOfLading] = useState('')
  const [motorVehicleNo, setMotorVehicleNo] = useState('')
  const [billingAddress, setBillingAddress] = useState('')
  const [reverseCharge, setReverseCharge] = useState('')
  const [gstType, setGstType] = useState()
  const [rows, setRows] = useState([])
  const [otherChargesDescriptions, setOtherChargesDescriptions] = useState('')
  const [otherCharges, setOtherCharges] = useState('')
  const [narration, setNarration] = useState('')
  const [grossAmount, setGrossAmount] = useState('')
  const [GstAmount, setGstAmount] = useState('')
  const [netAmount, setNetAmount] = useState('')
  const [qty, setQty] = useState(0)

  const [purchaseType, setpurchaseType] = useState('')
  const [gstRatev, setgstRatev] = useState()

  const [viewModal, setViewModal] = useState(false)
  const [auth] = useAuth()
  const [userId, setUserId] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false)

  useEffect(() => {
    if (estimate) {
      setpurchaseType(estimate.purchaseType)
      setDate(estimate.date || '')
      setorderNo(estimate.orderNo || '')
      setSupplierName(estimate.supplierName || '')
      setPlaceOfSupply(estimate.placeOfSupply || '')
      setPaymentTerm(estimate.paymentTerm || '')
      setDueDate(estimate.dueDate || '')

      setReceiptDocNo(estimate.receiptDocNo || '')
      setDispatchedThrough(estimate.dispatchedThrough || '')
      setDestination(estimate.destination || '')
      setCarrierNameAgent(estimate.carrierNameAgent || '')
      setBillOfLading(estimate.billOfLading || '')
      setMotorVehicleNo(estimate.motorVehicleNo || '')
      setBillingAddress(estimate.billingAddress || '')
      setReverseCharge(estimate.reverseCharge || '')
      setGstType(estimate.gstType || '')
      setRows(estimate.rows || [])
      setOtherChargesDescriptions(estimate.otherChargesDescriptions || '')
      setOtherCharges(estimate.otherCharges || '')
      setNarration(estimate.narration || '')
      setGrossAmount(estimate.grossAmount || '')
      setGstAmount(estimate.GstAmount || '')
      setNetAmount(estimate.netAmount || '')

      const updatedRows = estimate.rows.map((row) => {
        const { igstpercent, ...rest } = row
        setgstRatev(igstpercent)
      })
    }
  }, [estimate])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'otherCharges') {
      setOtherCharges(value)
      calculateTotalAmounts()
    }
    switch (name) {
      case 'receiptDocNo':
        setReceiptDocNo(value)
        break
      case 'dispatchedThrough':
        setDispatchedThrough(value)
        break
      case 'destination':
        setDestination(value)
        break
      case 'carrierNameAgent':
        setCarrierNameAgent(value)
        break
      case 'billOfLading':
        setBillOfLading(value)
        break
      case 'motorVehicleNo':
        setMotorVehicleNo(value)
        break
      case 'date':
        setDate(value)
        break
      case 'orderNo':
        setorderNo(value)
        break
      case 'salesType':
        setSalesType(value)
        break
      case 'customerType':
        setCustomerType(value)
        break
      case 'SupplierName':
        setSupplierName(value)
        break
      case 'placeOfSupply':
        setPlaceOfSupply(value)
        break
      case 'paymentTerm':
        setPaymentTerm(value)
        break
      case 'dueDate':
        setDueDate(value)
        break
      case 'billingAddress':
        setBillingAddress(value)
        break
      case 'reverseCharge':
        setReverseCharge(value)
        break
      case 'gstType':
        setGstType(value)
        break
      case 'otherChargesDescriptions':
        setOtherChargesDescriptions(value)
        break
      case 'otherCharges':
        setOtherCharges(value)
        break
      case 'narration':
        setNarration(value)
        break
      case 'grossAmount':
        setGrossAmount(value)
        break
      case 'GstAmount':
        setGstAmount(value)
        break
      case 'netAmount':
        setNetAmount(value)
        break
      default:
        break
    }
  }

  const addRow = () => {
    setRows([
      ...rows,
      {
        itemCode: '',
        productName: '',
        hsnCode: '',
        qty: 0,
        units: '',
        freeQty: '',
        mrp: 0,
        unitCost: 0,
        schemeMargin: 0,
        discountpercent: 0,
        discountRS: 0,
        taxable: 0,
        cgstpercent: 0,
        cgstRS: 0,
        sgstRS: 0,
        sgstpercent: 0,
        igstpercent: 0,
        igstRS: 0,
        totalValue: 0,
      },
    ])
    calculateTotalAmounts() // Recalculate amounts after adding a row
  }

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index))
    }
  }

  const handleRowChange = (rowIndex, field, value) => {
    const updatedRows = [...rows]
    const currentRow = updatedRows[rowIndex]

    // Update the relevant field in the current row
    currentRow[field] = value
    const qt = Number(currentRow.qty)

    // Extract quantity and unit cost from the current row
    const unitCost = currentRow.unitCost || 0

    // Calculate taxable value
    const taxable = qt * unitCost

    // Calculate GST amounts based on the GST type
    const gstRate = gstType ? parseFloat(gstType) : 0
    const cgstRS = gstType === 'CGST/SGST' ? (taxable * (gstRate / 2)) / 100 : 0
    const sgstRS = gstType === 'CGST/SGST' ? (taxable * (gstRate / 2)) / 100 : 0
    const igstRS = gstType === 'IGST' ? (taxable * gstRate) / 100 : 0

    // Calculate total value
    const totalValue = taxable + gstRate

    // Update the current row with calculated values
    updatedRows[rowIndex] = {
      ...currentRow,
      taxable: taxable.toFixed(2),
      cgstRS,
      sgstRS,
      igstRS,
      totalValue: totalValue.toFixed(2),
    }

    // Update the rows state and recalculate totals
    setRows(updatedRows)
    calculateTotalAmounts()
  }

  const handlQtyChange = (rowIndex, qty) => {
    const updatedRows = [...rows]
    const selectedRow = updatedRows[rowIndex]

    updatedRows[rowIndex] = {
      ...selectedRow,
      qty: qty,
    }

    const unitCost = parseFloat(selectedRow.unitCost) || 0
    const taxable = qty * unitCost
    const gstRate = gstType === 'CGST/SGST' ? gstType : 0

    const cgstRS =
      gstType === 'CGST/SGST' ? (taxable * (Number(gstRatev) / 2)) / 100 : 0
    const sgstRS =
      gstType === 'CGST/SGST' ? (taxable * (Number(gstRatev) / 2)) / 100 : 0

    const igstRS =
      gstType === 'IGST' ? (Number(taxable) * Number(gstRatev)) / 100 : 0

    const totalValue = taxable + cgstRS + sgstRS + igstRS
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      taxable: taxable.toFixed(2),
      cgstRS: cgstRS.toFixed(2),
      sgstRS: sgstRS.toFixed(2),
      igstRS: igstRS.toFixed(2),
      totalValue: totalValue.toFixed(2),
    }

    setRows(updatedRows)
    calculateTotalAmounts()
  }

  const calculateTotalAmounts = () => {
    let grossAmount = 0
    let GstAmount = 0
    let totalOtherCharges = parseFloat(otherCharges) || 0

    rows.forEach((row) => {
      const taxable = parseFloat(row.taxable) || 0
      const cgstRS = parseFloat(row.cgstRS) || 0
      const sgstRS = parseFloat(row.sgstRS) || 0
      const igstRS = parseFloat(row.igstRS) || 0

      grossAmount += taxable
      GstAmount +=
        gstType === 'CGST/SGST'
          ? Number(cgstRS) + Number(sgstRS)
          : Number(igstRS)
    })

    let netAmount
    if (otherChargesDescriptions.toLowerCase().includes('discount')) {
      netAmount = grossAmount + GstAmount - totalOtherCharges
    } else {
      netAmount = grossAmount + GstAmount + totalOtherCharges
    }
    setGrossAmount(grossAmount.toFixed(2))
    setGstAmount(GstAmount.toFixed(2))
    setNetAmount(netAmount)
  }

  useEffect(() => {
    calculateTotalAmounts()
  }, [rows, otherCharges, gstType])

  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageproduct/${userId}`)
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data)
      } else {
        console.error('Unexpected response structure:', response.data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  useEffect(() => {
    if (auth.user.role === 1) {
      setUserId(auth.user._id)
    }
    if (auth.user.role === 0) {
      setUserId(auth.user.admin)
    }
    fetchProducts()
  }, [auth, userId])

  const handleProductSelect = (rowIndex, selectedProductName) => {
    const selectedProduct = products.find(
      (product) => product.productName === selectedProductName,
    )

    if (selectedProduct) {
      updateRowValues(selectedProduct, rowIndex)
    }
  }

  const handleItemCodeSelect = (rowIndex, selectedItemCode) => {
    const selectedProduct = products.find(
      (product) => product.itemCode === selectedItemCode,
    )

    if (selectedProduct) {
      updateRowValues(selectedProduct, rowIndex)
    }
  }

  const updateRowValues = (selectedProduct, rowIndex) => {
    const updatedRows = [...rows] // Clone the current rows

    if (selectedProduct) {
      const qty = selectedProduct.quantity || 0 // Set a default if quantity is not defined
      const unitCost = selectedProduct.purchasePriceExGst || 0 // Use purchasePriceExGst for unit cost

      const taxable = qty * unitCost // Calculate taxable amount based on the product

      // Calculate GST amounts
      const gstRate = selectedProduct.gstRate || 0 // Get GST rate from the selected product
      const cgstRS = (taxable * (gstRate / 2)) / 100
      const sgstRS = (taxable * (gstRate / 2)) / 100
      const igstRS = (taxable * gstRate) / 100
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        itemCode: selectedProduct.itemCode,
        hsnCode: selectedProduct.hsnCode,
        units: selectedProduct.units,
        productName: selectedProduct.productName,
        mrp: parseFloat(selectedProduct.maxmimunRetailPrice).toFixed(2),
        qty: qty,
        unitCost: unitCost, // Set the unit cost from the product
        taxable: taxable.toFixed(2), // Set taxable amount
        cgstpercent: gstRate / 2,
        sgstpercent: gstRate / 2,
        igstpercent: gstRate,
        cgstRS,
        sgstRS,
        igstRS,
        totalValue: taxable + (taxable * gstRate) / 100,
      }

      setRows(updatedRows) // Update state
      calculateTotalAmounts() // Recalculate totals after updating
    }
  }

  const handleUpdate = async () => {
    try {
      const submissionData = new FormData()

      // Append non-file form data to formData
      const transportDetails = estimate.transportDetails || {}

      // Append non-file form data to formData
      const fields = {
        date,
        orderNo: orderNo, // Fix: Correct casing
        customerType,
        supplierName: SupplierName, // Fix: Correct casing
        placeOfSupply,
        paymentTerm,
        dueDate,
        receiptDocNo: transportDetails.receiptDocNo || '',
        dispatchedThrough: transportDetails.dispatchedThrough || '',
        destination: transportDetails.destination || '',
        carrierNameAgent: transportDetails.carrierNameAgent || '',
        billOfLading: transportDetails.billOfLading || '',
        motorVehicleNo: transportDetails.motorVehicleNo || '',
        billingAddress,
        reverseCharge,
        gstType,
        otherChargesDescriptions,
        narration,
        grossAmount: parseFloat(grossAmount).toFixed(2),
        GstAmount: parseFloat(GstAmount).toFixed(2),
        otherCharges: parseFloat(otherCharges).toFixed(2),
        netAmount: parseFloat(netAmount).toFixed(2),
      }
      // Append all fields to formData
      Object.keys(fields).forEach((key) => {
        if (fields[key]) {
          submissionData.append(key, fields[key])
        }
      })

      // Append each row individually
      rows.forEach((row, index) => {
        Object.keys(row).forEach((key) => {
          submissionData.append(`rows[${index}][${key}]`, row[key])
        })
      })

      const response = await axios.put(
        `/api/v1/purchesOrderRoute/updatepurchesorder/${estimate._id}`,
        submissionData,
      )
      if (response.data.success) {
        alert('Estimate updated successfully')
        // closeModal();
      } else {
        alert('Failed to update estimate: ' + response.data.message)
      }
    } catch (error) {
      console.error('Error updating estimate:', error)
      alert('Error updating estimate: ' + error.message)
    }
  }

  useEffect(() => {
    const applyProductDetailsToRows = async (rows) => {
      const updatedRows = await Promise.all(
        rows.map(async (row) => {
          // Find the product based on itemCode or productName
          const selectedProduct = products.find(
            (product) =>
              product.itemCode === row.itemCode ||
              product.productName === row.productName,
          )

          if (selectedProduct) {
            // Get unitCost from the selected product
            const unitCost = selectedProduct.purchasePriceExGst || 0
            const qty = row.qty || 0
            const taxable = qty * unitCost

            // GST Calculations
            const gstRate = selectedProduct.gstRate || 0 // Use product GST rate if available

            // Calculate CGST, SGST, and IGST based on gstType
            let cgstRS = 0,
              sgstRS = 0,
              igstRS = 0
            if (gstType === 'CGST/SGST') {
              cgstRS = (taxable * (gstRate / 2)) / 100
              sgstRS = (taxable * (gstRate / 2)) / 100
            } else if (gstType === 'IGST') {
              igstRS = (taxable * gstRate) / 100
            }

            const totalValue = taxable + cgstRS + sgstRS + igstRS

            // Return the updated row with calculated values
            return {
              ...row,
              unitCost: unitCost, // Set the fetched unit cost
              taxable: taxable.toFixed(2),
              cgstRS: cgstRS.toFixed(2),
              sgstRS: sgstRS.toFixed(2),
              igstRS: igstRS.toFixed(2),
              totalValue: totalValue.toFixed(2), // Total value after GST
            }
          } else {
            // If no product match is found, return the row as-is
            return row
          }
        }),
      )

      // Set the updated rows to the state
      setRows(updatedRows)
      calculateTotalAmounts() // Recalculate total amounts after updating rows
    }

    if (estimate && products.length > 0) {
      // If there are products and estimate data, apply product details to rows
      applyProductDetailsToRows(estimate.rows)
    }
  }, [estimate, products, gstType])

  return (
    <div style={{ backgroundColor: '#82ac73' }} className="p-4 ">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-center text-black text-2xl underline mb-4">
          Edit Purchase Order
        </h1>
        <button
          type="button"
          className="text-black hover:text-black border"
          onClick={closeModal}
        >
          <FaTimes size={24} />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg::grid-cols-4 gap-4 mb-4">
        <div>
          <label className="font-bold">Purchase Type</label>
          <input
            value={purchaseType}
            onChange={handleChange}
            className="border p-2 w-full  rounded"
          ></input>
        </div>
        <div>
          <label className="font-bold">
            Date:
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
        </div>
        <div>
          <label className="font-bold">Order No.</label>
          <input
            type="text"
            name="orderNo"
            value={orderNo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="font-bold">Supplier Name</label>
          <input
            type="text"
            name="SupplierName"
            value={SupplierName}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="font-bold">Place of Supply</label>
          <input
            type="text"
            name="placeOfSupply"
            value={placeOfSupply}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="font-bold">
            Payment Term (days):
            <input
              type="number"
              name="paymentTerm"
              value={paymentTerm}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            />
          </label>
        </div>

        <div>
          <label className="font-bold">
            Due Date
            <input
              type="text"
              value={dueDate}
              name="dueDate"
              onChange={handleChange}
              className="border p-2 w-full text-black rounded"
            />
          </label>
        </div>

        <div className="mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white p-2"
          >
            Transport Details
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg z-50">
            <h4 className="font-bold mb-4">Transport Details</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Dispatched Through</label>
                <input
                  type="text"
                  name="dispatchedThrough"
                  value={dispatchedThrough}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Destination</label>
                <input
                  type="text"
                  name="destination"
                  value={destination}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Carrier Name/Agent</label>
                <input
                  type="text"
                  name="carrierNameAgent"
                  value={carrierNameAgent}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Bill of Lading/LR-RR No.</label>
                <input
                  type="text"
                  name="billOfLading"
                  value={billOfLading}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white p-2 mr-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="mb-4">
          <label className="font-bold">Billing Address</label>
          <textarea
            value={billingAddress}
            name="billingAddress"
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="font-bold">Reverse Charge</label>
          <select
            value={reverseCharge}
            onChange={handleChange}
            name="reverseCharge"
            className="border p-2 w-full rounded"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {salesType === 'GST Invoice' && (
          <div className="mb-4 w-full">
            <label className="font-bold">GST Type:</label>
            <select
              value={gstType}
              name="gstType"
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              <option value="CGST/SGST">CGST/SGST</option>
              <option value="IGST">IGST</option>
            </select>
          </div>
        )}
      </div>
      {/* Items Section */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse overflow-x-auto">
          <thead>
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Item Code</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">HSN Code</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2 ">Units</th>

              <th className="border p-2">MRP</th>
              <th className="border p-2">taxable Value</th>

              <>
                {gstType === 'CGST/SGST' && (
                  <>
                    <th className="border p-2">
                      CGST
                      <div className="flex justify-between">
                        <span className="mr-16">%</span> <span>₹</span>
                      </div>
                    </th>
                    <th className="border p-2">
                      SGST
                      <div className="flex justify-between">
                        <span className="mr-16">%</span> <span>₹</span>
                      </div>
                    </th>
                  </>
                )}
                {gstType === 'IGST' && (
                  <th className="border p-2">
                    IGST
                    <div className="flex justify-between">
                      <span className="mr-16">%</span> <span>₹</span>
                    </div>
                  </th>
                )}
              </>
              <th className="border p-2">Total Value</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <td className="border">
                    <Select
                      id="itemcode-select"
                      value={
                        rows[index].itemCode
                          ? {
                              label: rows[index].itemCode,
                              value: rows[index].itemCode,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleItemCodeSelect(index, selectedOption.value)
                      }
                      options={products.map((product) => ({
                        label: product.itemCode,
                        value: product.itemCode,
                      }))}
                      isSearchable={true}
                      placeholder="Select"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minWidth: '120px',
                          maxWidth: '300px',
                          fontSize: '14px',
                          minHeight: '34px',
                          height: '34px',
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </td>
                </td>
                <td className="border p-2">
                  <td className="border ">
                    <Select
                      id="product-select"
                      value={
                        rows[index].productName
                          ? {
                              label: rows[index].productName,
                              value: rows[index].productName,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleProductSelect(index, selectedOption.value)
                      }
                      options={products.map((product) => ({
                        label: product.productName,
                        value: product.productName,
                      }))}
                      isSearchable={true}
                      placeholder="Select a Product"
                      styles={{
                        control: (base) => ({
                          ...base,
                          minWidth: '200px',
                          maxWidth: '500px',
                          fontSize: '14px',
                          minHeight: '34px',
                          height: '34px',
                        }),
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      menuPortalTarget={document.body}
                      menuPosition="fixed"
                    />
                  </td>
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={row.hsnCode}
                    onChange={(e) =>
                      handleRowChange(index, 'hsnCode', e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: '80px',
                      flexBasis: '80px',
                      flexShrink: 1,
                    }}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    name="qty"
                    value={row.qty}
                    onChange={(e) => handlQtyChange(index, e.target.value)}
                    className="w-full flex-grow"
                    style={{
                      minWidth: '40px',
                      flexBasis: '40px',
                      flexShrink: 1,
                    }}
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="text"
                    value={row.units}
                    onChange={(e) =>
                      handleRowChange(index, 'units', e.target.value)
                    }
                    className="w-full"
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="number"
                    value={row.mrp}
                    onChange={(e) =>
                      handleRowChange(index, 'mrp', e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: '60px',
                      flexBasis: '60px',
                      flexShrink: 1,
                    }}
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="text"
                    value={row.taxable}
                    onChange={(e) =>
                      handleRowChange(index, 'taxable', e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: '50px',
                      flexBasis: '50px',
                      flexShrink: 1,
                    }}
                  />
                </td>

                <>
                  {gstType === 'CGST/SGST' && (
                    <>
                      <td className="border p-2">
                        <div className="flex gap-1">
                          <input
                            type="number"
                            value={row.cgstpercent}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                'cgstpercent',
                                e.target.value,
                              )
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: '50px',
                              flexBasis: '50px',
                              flexShrink: 1,
                            }}
                          />
                          <input
                            type="number"
                            value={row.cgstRS}
                            onChange={(e) =>
                              handleRowChange(index, 'cgstRS', e.target.value)
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: '50px',
                              flexBasis: '50px',
                              flexShrink: 1,
                            }}
                          />
                        </div>
                      </td>
                      <td className="border p-2">
                        <div className="flex gap-1">
                          <input
                            type="number"
                            value={row.sgstpercent}
                            onChange={(e) =>
                              handleRowChange(
                                index,
                                'sgstpercent',
                                e.target.value,
                              )
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: '50px',
                              flexBasis: '50px',
                              flexShrink: 1,
                            }}
                          />
                          <input
                            type="number"
                            value={row.sgstRS}
                            onChange={(e) =>
                              handleRowChange(index, 'sgstRS', e.target.value)
                            }
                            className="w-full flex-grow"
                            style={{
                              minWidth: '50px',
                              flexBasis: '50px',
                              flexShrink: 1,
                            }}
                          />
                        </div>
                      </td>
                    </>
                  )}
                  {gstType === 'IGST' && (
                    <td className="border p-2">
                      <div className="flex gap-1">
                        <input
                          type="number"
                          value={row.igstpercent}
                          onChange={(e) =>
                            handleRowChange(
                              index,
                              'igstpercent',
                              e.target.value,
                            )
                          }
                          className="w-full"
                        />
                        <input
                          type="number"
                          value={row.igstRS}
                          onChange={(e) =>
                            handleRowChange(index, 'igstRS', e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    </td>
                  )}
                </>
                <td className="border p-2">
                  <input
                    type="number"
                    value={row.totalValue}
                    onChange={(e) =>
                      handleRowChange(index, 'totalValue', e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: '70px',
                      flexBasis: '70px',
                      flexShrink: 1,
                    }}
                  />
                </td>
                <td className="p-1 gap-2 flex">
                  <button
                    onClick={() => removeRow(index)}
                    className="bg-red-500 text-white p-1 mt-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addRow}
        className="bg-green-500 text-white p-2 mt-2 rounded hoverbg-green-600 focusoutline-none focusring-2 focusring-green-400 focusring-opacity-50 flex items-center justify-center"
      >
        <svg
          xmlns="http//www.w3.org/2000/svg"
          className="h-4 w-4 "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add New Row
      </button>
      {/* Other Charges */}
      <div className="mt-4">
        <button
          onClick={() => setIsModalOtherChargesOpen(true)}
          className="text-blue-800 text-md p-2 rounded hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Edit Other Charges
        </button>
      </div>

      {isModalOtherChargesOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-11/12 max-w-lg">
            <h4 className="font-bold mb-4">Other Charges Details</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label>Other Charges Description</label>
                <input
                  type="text"
                  name="otherChargesDescriptions"
                  value={otherChargesDescriptions}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label>Other Charges</label>
                <input
                  type="text"
                  name="otherCharges"
                  value={otherCharges}
                  onChange={handleChange}
                  className="border p-2 w-full rounded"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOtherChargesOpen(false)}
                className="bg-gray-500 text-white p-2 mr-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Narration and Amounts */}
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
        <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
          <label className="font-bold">Narration</label>
          <br />
          <textarea
            value={narration}
            name="narration"
            onChange={handleChange}
            className="bg-black text-white border p-1 w-full rounded"
          />
        </div>
        <div className="w-full lg:w-1/3">
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">
              Gross Amount
            </label>
            <input
              type="text"
              name="grossAmount"
              value={grossAmount}
              onChange={handleChange}
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">GST Amount</label>
            <input
              type="text"
              name="GstAmount"
              value={GstAmount}
              // onChange={handleChange}
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">
              Other Charges
            </label>
            <input
              type="text"
              name="otherCharges"
              value={otherCharges}
              onChange={handleChange}
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
            <label className="font-bold lg:w-1/2 text-nowrap">Net Amount</label>
            <input
              type="text"
              name="netAmount"
              value={netAmount}
              onChange={handleChange}
              className="bg-black text-white border p-1 w-full rounded lg:w-2/3"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              Save Changes
            </button>

            <button
              onClick={closeModal}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPurchaseOrder
