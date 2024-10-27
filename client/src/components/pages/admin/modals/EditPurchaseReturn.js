import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTimes } from 'react-icons/fa'
import Select from 'react-select'
import { useAuth } from '../../../context/Auth.js'

const EditPurchaseReturn = ({ closeModal, estimate }) => {
  const [documentPath, setdocumentPath] = useState(null)
  const [date, setDate] = useState('')
  const [debitNoteNo, setdebitNoteNo] = useState('')
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
  const [reasonForReturn, setreasonForReturn] = useState('')
  const [gstType, setGstType] = useState()
  const [rows, setRows] = useState([])
  const [otherChargesDescriptions, setOtherChargesDescriptions] = useState('')
  const [otherCharges, setOtherCharges] = useState('')
  const [narration, setNarration] = useState('')
  const [grossAmount, setGrossAmount] = useState('')
  const [GstAmount, setGstAmount] = useState('')
  const [netAmount, setNetAmount] = useState('')
  const [supplierdebitNoteNo, setsupplierdebitNoteNo] = useState('')
  const [quantity, setQty] = useState(0)
  const [gstRatev, setgstRatev] = useState()
  const [selectPurchase, setSelectPurchase] = useState()
  const [viewModal, setViewModal] = useState(false)
  const [bank, setBank] = useState([])
  const [cash, setCash] = useState([])
  const [auth] = useAuth()
  const [userId, setUserId] = useState('')

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOtherChargesOpen, setIsModalOtherChargesOpen] = useState(false)

  useEffect(() => {
    if (estimate) {
      setSupplierName(estimate.supplierName || "");

      setDate(estimate.date || '')
      setdebitNoteNo(estimate.debitNoteNo || '')
      setsupplierdebitNoteNo(estimate.supplierdebitNoteNo || '')
      setPlaceOfSupply(estimate.placeOfSupply || '')
      setPaymentTerm(estimate.paymentTerm || '')
      setDueDate(estimate.dueDate || '')
      setSelectPurchase(estimate.selectPurchase || '')

      if (estimate.bank) {
        setBank({
          bank: estimate.bank.bank || '',
          selectBankType: estimate.bank.selectBankType || '',
          transactionDate: estimate.bank.transactionDate || '',
          chequeNo: estimate.bank.chequeNo || '',
          transactionNo: estimate.bank.transactionNo || '',
          Amount: estimate.bank.Amount || '',
          Advance: estimate.bank.Advance || '',
          Received: estimate.bank.Received || '',
          Balance: estimate.bank.Balance || '',
        })
      } else {
        setBank({
          bank: '',
          selectBankType: '',
          transactionDate: '',
          chequeNo: '',
          transactionNo: '',
          Amount: '',
          Advance: '',
          Received: '',
          Balance: '',
        })
      }

      if (estimate.cash) {
        setCash({
          Amount: estimate.cash.Amount || '',
          Advance: estimate.cash.Advance || '',
          Received: estimate.cash.Received || '',
          Balance: estimate.cash.Balance || '',
        })
      } else {
        setCash({
          Amount: '',
          Advance: '',
          Received: '',
          Balance: '',
        })
      }

      setReceiptDocNo(estimate.receiptDocNo || '')
      setDispatchedThrough(estimate.dispatchedThrough || '')
      setDestination(estimate.destination || '')
      setCarrierNameAgent(estimate.carrierNameAgent || '')
      setBillOfLading(estimate.billOfLading || '')
      setMotorVehicleNo(estimate.motorVehicleNo || '')
      setBillingAddress(estimate.billingAddress || '')
      setreasonForReturn(estimate.reasonForReturn || '')
      setGstType(estimate.gstType || '')
      setRows(estimate.rows || [])
      setOtherChargesDescriptions(estimate.otherChargesDescriptions || '')
      setOtherCharges(estimate.otherCharges || '')
      setNarration(estimate.narration || '')
      setGrossAmount(estimate.grossAmount || '')
      setGstAmount(estimate.GstAmount || '')
      setNetAmount(estimate.netAmount || '')

      setdocumentPath(estimate.documentPath || '')

      const updatedRows = estimate.rows.map((row) => {
        const { igstpercent, ...rest } = row
        setgstRatev(igstpercent)
      })
    }
  }, [estimate])

  const openViewModal = (suppliers) => {
    setViewModal(true)
  }

  const [paymentMethod, setPaymentMethod] = useState('')

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  const handleCashChange = (e) => {
    setCash({ ...cash, [e.target.name]: e.target.value })
  }

  const handleBankChange = (e) => {
    const { name, value } = e.target
    setBank({ ...bank, [name]: value })
  }

  const handleSubPaymentTypeChange = (e) => {
    setBank({ ...bank, selectBankType: e.target.value })
  }

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
      case 'debitNoteNo':
        setdebitNoteNo(value)
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
      case 'reasonForReturn':
        setreasonForReturn(value)
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
        quantity: 0,
        units: '',
        freeQty: '',
        maxmimunRetailPrice: 0,
        unitCost: 0,
        schemeMargin: 0,
        discountpercent: 0,
        discountRS: 0,
        taxableValue: 0,
        cgstpercent: 0,
        cgstRS: 0,
        sgstRS: 0,
        sgstpercent: 0,
        igstpercent: 0,
        igstRS: 0,
        totalValue: 0,
      },
    ])
  }

  const removeRow = (index) => {
    if (rows.length > 1) {
      setRows(rows.filter((_, i) => i !== index))
    }
  }

  const handleRowChange = (rowIndex, field, value) => {
    const updatedRows = [...rows] // Clone the existing rows array
    const currentRow = updatedRows[rowIndex] // Get the current row

    if (field === 'discountpercent') {
      const discountPercent = parseFloat(value) || 0 // Ensure a valid number
      currentRow.discountpercent = discountPercent

      const unitCost = Number(currentRow.unitCost)
      const discountRS = (unitCost * discountPercent) / 100 // Calculate discount in Rs
      currentRow.discountRs = discountRS.toFixed(2)

      const qt = Number(currentRow.quantity) // Make sure you're using the correct qty for the current row
      const taxableValue = (unitCost - discountRS) * qt // Calculate taxable value
      currentRow.taxableValue = taxableValue.toFixed(2) // Ensure consistent format

      const gstRate = Number(gstRatev) || 0 // Get the GST rate
      {
        console.log(gstRate, 'aslkfdj')
      }
      const cgstRS = (taxableValue * (gstRate / 2)) / 100
      const sgstRS = (taxableValue * (gstRate / 2)) / 100
      const igstRS = (taxableValue * gstRate) / 100

      currentRow.cgstRS = cgstRS.toFixed(2)
      currentRow.sgstRS = sgstRS.toFixed(2)
      currentRow.igstRS = igstRS.toFixed(2)

      // Update totalValue as taxableValue + GST amount
      const totalGST =
        currentRow.cgstRS && currentRow.sgstRS ? cgstRS + sgstRS : igstRS
      currentRow.totalValue = (taxableValue + totalGST).toFixed(2)
    } else if (field === 'discountRs') {
      const discountRs = parseFloat(value) || 0
      const unitCost = Number(currentRow.unitCost)
      const discountPercent = (discountRs / unitCost) * 100

      currentRow.discountpercent = discountPercent.toFixed(2)
      currentRow.discountRs = discountRs.toFixed(2)

      const qt = Number(currentRow.quantity)
      const taxableValue = (unitCost - discountRs) * qt // Calculate taxable value
      currentRow.taxableValue = taxableValue.toFixed(2)

      const gstRate = Number(gstRatev) || 0 // Get the GST rate
      const cgstRS = (taxableValue * (gstRate / 2)) / 100
      const sgstRS = (taxableValue * (gstRate / 2)) / 100
      const igstRS = (taxableValue * gstRate) / 100

      currentRow.cgstRS = cgstRS.toFixed(2)
      currentRow.sgstRS = sgstRS.toFixed(2)
      currentRow.igstRS = igstRS.toFixed(2)
      currentRow.quantity = qt
      // Update totalValue as taxableValue + GST amount
      const totalGST =
        currentRow.cgstRS && currentRow.sgstRS ? cgstRS + sgstRS : igstRS
      currentRow.totalValue = (taxableValue + totalGST).toFixed(2)
    }

    // Update the rows state
    updatedRows[rowIndex] = currentRow
    setRows(updatedRows)
  }

  const handlQtyChange = (rowIndex, quantity) => {
    const updatedRows = [...rows]

    const selectedRow = updatedRows[rowIndex]

    setQty(quantity)
    updatedRows[rowIndex] = {
      ...selectedRow,
      quantity: quantity,
    }

    setRows(updatedRows)
  }

  const calculateTotalAmounts = () => {
    let grossAmount = 0
    let GstAmount = 0
    let totalOtherCharges = parseFloat(otherCharges) || 0

    rows.forEach((row) => {
      const taxableValue = parseFloat(row.taxableValue) || 0
      const cgstRS = parseFloat(row.cgstRS) || 0
      const sgstRS = parseFloat(row.sgstRS) || 0
      const igstRS = parseFloat(row.igstRS) || 0

      grossAmount += taxableValue
      GstAmount += cgstRS + sgstRS // Total GST amount for each row
    })

    let netAmount
    // Check if otherChargesDescriptions includes "discount" to decide calculation
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
  }, [rows, otherCharges])

  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/manageproduct/${userId}`)

      console.log(response, 'kasjfksdj')
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data)
      } else {
        console.error('Unexpected response structure:', response.data)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      // toast.error("Failed to fetch products. Please try again.");
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

  const handleFreeQtyChange = (rowIndex, newFreeQty) => {
    console.log(newFreeQty, 'hfgdhghdhf  dfsf dad')
    const updatedRows = [...rows]
    const selectedRow = updatedRows[rowIndex]

    // Update the free quantity in the selected row
    const freeQty = parseFloat(newFreeQty) || 0 // Ensure it's a valid number

    // Calculate total quantity using the quantity from the selected row
    const totalquantity = Number(quantity) + freeQty

    // Calculate schemeMargin only if both freeQty and quantity exist
    const schemeMargin =
      freeQty && quantity ? ((freeQty / totalquantity) * 100).toFixed(2) : 0

    console.log(schemeMargin, 'schemeMargin')

    // Update the row with the new freeQty and schemeMargin
    updatedRows[rowIndex] = {
      ...selectedRow,
      freeQty: freeQty,
      schemeMargin: schemeMargin,
    }

    // Update the state with the modified rows
    setRows(updatedRows)
  }

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

    // Calculate retail price and taxableValue value based on product details
    if (selectedProduct) {
      setgstRatev(selectedProduct.gstRate)
      const updatedRows = [...rows]

      // Calculate retail price
      const retailPrice =
        selectedProduct.maxmimunRetailPrice -
        (selectedProduct.maxmimunRetailPrice * selectedProduct.retailDiscount) /
          100

      // Determine if sales tax is included from the fetched product data
      const salesTaxInclude = selectedProduct.salesTaxInclude

      // Calculate taxable value based on salesTaxInclude
      const taxableValue = 0

      // Update the row with the new values, schemeMargin is excluded here since it's handled separately
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        itemCode: selectedProduct.itemCode,
        hsnCode: selectedProduct.hsnCode,
        units: selectedProduct.units,
        productName: selectedProduct.productName,
        maxmimunRetailPrice: selectedProduct.maxmimunRetailPrice
          ? parseFloat(selectedProduct.maxmimunRetailPrice).toFixed(2)
          : '0.00',
        // quantity: selectedProduct.quantity,
        expiryDate: selectedProduct.expiryDate,
        batchNo: selectedProduct.batchNo,
        unitCost: selectedProduct.purchasePriceExGst,
        schemeMargin: updatedRows[rowIndex].schemeMargin || 0, // Existing or initial value

        taxableValue: taxableValue,

        cgstpercent: selectedProduct.gstRate / 2,
        sgstpercent: selectedProduct.gstRate / 2,
        igstpercent: selectedProduct.gstRate,

        cgstRS: parseFloat(
          ((taxableValue * (selectedProduct.gstRate / 2)) / 100).toFixed(2),
        ),
        sgstRS: parseFloat(
          ((taxableValue * (selectedProduct.gstRate / 2)) / 100).toFixed(2),
        ),
        igstRS: parseFloat(
          ((taxableValue * selectedProduct.gstRate) / 100).toFixed(2),
        ),

        totalValue: (
          taxableValue +
          (taxableValue * selectedProduct.gstRate) / 100
        ).toFixed(2),
      }

      setRows(updatedRows)
    }

    // Recalculate total amounts after updating the row
    calculateTotalAmounts()
  }

  const handleUpdate = async () => {
    try {
      const submissionData = new FormData()

      // Append non-file form data to formData
      const transportDetails = estimate.transportDetails || {}

      // Append non-file form data to formData
      const fields = {
        date,
        debitNoteNo: debitNoteNo, // Fix: Correct casing
        selectPurchase,
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
        reasonForReturn,
        gstType,
        otherChargesDescriptions,
        narration, // Fix: Use narration directly (no formData)
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

      if (paymentMethod === 'Cash' && cash) {
        // Fix: Use cash state
        submissionData.append('cash', JSON.stringify(cash))
      } else if (paymentMethod === 'Bank' && bank) {
        // Fix: Use bank state
        submissionData.append('bank', JSON.stringify(bank))
      }

      // If a document file has been selected, append it to the FormData
      if (documentPath) {
        submissionData.append('documentPath', documentPath)
      }

      const response = await axios.put(
        `/api/v1/purchesReturnRoute/updatepurchasereturn/${estimate._id}`,
        submissionData
      );

      console.log(response, 'kdsjfk')

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

  const closeViewModal = () => {
    setViewModal(false)
  }

  return (
    <div style={{ backgroundColor: '#82ac73' }} className="p-4">
      <div className="flex justify-end items-center mb-4">
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
          <label className="font-bold"> Select Purchase</label>
          <input
            type="text"
            name="debitNoteNo"
            value={selectPurchase}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
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
          <label className="font-bold">Debit Note No</label>
          <input
            type="text"
            name="debitNoteNo"
            value={debitNoteNo}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

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
          <label className="font-bold">Reason Of Return </label>
          <select
            value={reasonForReturn}
            onChange={handleChange}
            name="reasonForReturn"
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
              <th className="border p-2 ">free Qty</th>

              <th className="border p-2">MRP</th>
              <th className="border p-2">Unit Cost</th>
              <th className="border p-2">Scheme Margin</th>

              <th className="border p-2">
                Discount
                <div className="flex justify-between">
                  <span className="mr-16">%</span> <span>₹</span>
                </div>
              </th>
              <>
                <th className="border p-2">Taxable</th>
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
                    name="quantity"
                    value={row.quantity}
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
                    type="text"
                    name="freeQty"
                    value={row.freeQty}
                    onChange={(e) => handleFreeQtyChange(index, e.target.value)}
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
                    type="number"
                    value={row.maxmimunRetailPrice}
                    onChange={(e) =>
                      handleRowChange(
                        index,
                        'maxmimunRetailPrice',
                        e.target.value,
                      )
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
                    value={row.unitCost}
                    onChange={(e) =>
                      handleRowChange(index, 'unitCost', e.target.value)
                    }
                    className="w-full flex-grow"
                    style={{
                      minWidth: '50px',
                      flexBasis: '50px',
                      flexShrink: 1,
                    }}
                  />
                </td>

                <td className="border p-2">
                  <input
                    type="text"
                    value={row.schemeMargin}
                    onChange={(e) =>
                      handleRowChange(index, 'schemeMargin', e.target.value)
                    }
                    className="w-full"
                  />
                </td>

                <td className="border">
                  <div className="p-1 flex gap-1">
                    <input
                      type="text"
                      value={row.discountpercent}
                      onChange={(e) =>
                        handleRowChange(
                          index,
                          'discountpercent',
                          e.target.value,
                        )
                      }
                      className="w-full flex-grow"
                      style={{
                        minWidth: '20px',
                        flexBasis: '20px',
                        flexShrink: 1,
                      }}
                    />
                    <input
                      type="text"
                      value={row.discountRs}
                      onChange={
                        (e) =>
                          handleRowChange(index, 'discountRs', e.target.value) // Fix here
                      }
                      className="w-full flex-grow"
                      style={{
                        minWidth: '40px',
                        flexBasis: '40px',
                        flexShrink: 1,
                      }}
                    />
                  </div>
                </td>
                <>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={row.taxableValue}
                      onChange={(e) =>
                        handleRowChange(index, 'taxableValue', e.target.value)
                      }
                      className="w-full flex-grow"
                      style={{
                        minWidth: '70px',
                        flexBasis: '70px',
                        flexShrink: 1,
                      }}
                    />
                  </td>
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

      <div className="mt-4 mb-4">
        <label className="w-1/4 text-white text-md p-2 rounded bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 flex items-center justify-center">
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
          </svg>{' '}
          change Document
          <input
            type="file"
            className="hidden"
            onChange={(e) => setdocumentPath(e.target.files[0])}
          />
        </label>
      </div>

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

export default EditPurchaseReturn
