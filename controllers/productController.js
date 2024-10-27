import ProductModel from "../models/productModel.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB file size limit per file
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|bmp|tiff|tif|webp|heic|heif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      cb(null, true);
    } else {
      cb(new Error("Error: Images Only!"));
    }
  },
}).array("img", 10); // 'img' corresponds to the field name in your form data, 10 is the max count


export const createProductController = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res
          .status(400)
          .send({ error: "Multer error", message: err.message });
      } else if (err) {
        // An unknown error occurred
        return res
          .status(500)
          .send({ error: "Server error", message: err.message });
      }

      // Files uploaded successfully, proceed to create product
      const {
        itemCode,
        productName,
        category,
        subCategory,
        manufacturer,
        brand,
        subBrand,
        unit,
        hsnCode,
        gstRate,
        cess,
        purchaseTaxInclude,
        salesTaxInclude,
        description,
        newWeight,
        batchNo,
        expiryDate,
        feature,
        minimumStock,
        maximumStock,
        purchasePriceExGst,
        purchasePriceInGst,
        maxmimunRetailPrice,
        retailDiscount,
        retailPrice,
        retailMargin,
        wholesalerDiscount,
        wholesalerPrice,
        wholesaleMargin,
        quantity,
        rate,
        units,
        amount,
        items,
        userId,
      } = req.body;
      
      // Validate and parse the items field
      let parsedItems = [];
      if (items) {
        try {
          parsedItems = JSON.parse(items);
        } catch (e) {
          return res.status(400).send({
            message: "Invalid JSON format for items field",
            details: e.message,
          });
        }
      }

      const rows = parsedItems.map((rowData) => ({
        variant: rowData.variant,
        productCode: rowData.productCode,
        productName: rowData.productName,
        purchasePrice: rowData.purchasePrice,
        landingCost: rowData.landingCost,
        mrp: rowData.mrp,
        retailDiscount: rowData.retailDiscount,
        retailPrice: rowData.retailPrice,
        retailMargin: rowData.retailMargin,
        wholesalerDiscount: rowData.wholesalerDiscount,
        wholesalerPrice: rowData.wholesalerPrice,
        wholesaleMargin: rowData.wholesaleMargin,
        minimumStock: rowData.minimumStock,
        maximumStock: rowData.maximumStock,
        openingQty: rowData.openingQty,
      }));
      const img = req.files ? req.files.map((file) => file.path) : [];
      try {
        const newProduct = new ProductModel({
          itemCode,
          productName,
          category,
          subCategory,
          manufacturer,
          brand,
          subBrand,
          unit,
          hsnCode,
          gstRate,
          cess,
          purchaseTaxInclude,
          salesTaxInclude,
          description,
          newWeight,
          batchNo,
          expiryDate,
          feature,
          minimumStock,
          maximumStock,
          purchasePriceExGst,
          purchasePriceInGst,
          maxmimunRetailPrice,
          retailDiscount,
          retailPrice,
          retailMargin,
          wholesalerDiscount,
          wholesalerPrice,
          wholesaleMargin,
          quantity,
          rate,
          units,
          amount,
          items,
          img,
          rows,
          admin:userId,
        });
        const savedProduct = await newProduct.save();
        res.status(201).send({
          message: "Product added successfully",
          product: savedProduct,
        });
      } catch (error) {
        res.status(500).send({ error: "Server error", message: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};

export const manageProductController = async (req, res) => {
  try {
    const _id = req.params._id;
    const data = await ProductModel.find({admin:_id});
    if (data && data.length > 0) {
      return res
        .status(200)
        .send({ success: true, message: "Data found", data });
    } else {
      return res
        .status(404)
        .send({ success: false, message: "Data not found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};
export const deleteProductController = async (req, res) => {
  try {
    const { _id } = req.params;
    const response = await ProductModel.findByIdAndDelete(_id);

    if (!response) {
      return res
        .status(404)
        .send({ success: false, message: "Product not found" });
    }

    return res.status(200).send({
      success: true,
      message: "Product deleted successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      details: error.message,
    });
  }
};




export const updateProductController = async (req, res) => {
  try {
    // Handle file upload
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res
          .status(400)
          .send({ error: "Multer error", message: err.message });
      } else if (err) {
        // An unknown error occurred
        return res
          .status(500)
          .send({ error: "Server error", message: err.message });
      }

      // Files uploaded successfully, proceed to update product
      const {
        itemCode,
        productName,
        category,
        subCategory,
        manufacturer,
        brand,
        subBrand,
        unit,
        hsnCode,
        gstRate,
        cess,
        purchaseTaxInclude,
        salesTaxInclude,
        description,
        newWeight,
        batchNo,
        expiryDate,
        feature,
        minimumStock,
        maximumStock,
        purchasePriceExGst,
        purchasePriceInGst,
        maxmimunRetailPrice,
        retailDiscount,
        retailPrice,
        retailMargin,
        wholesalerDiscount,
        wholesalerPrice,
        wholesaleMargin,
        quantity,
        rate,
        units,
        amount,
        items,
      } = req.body;

      // Validate and parse the items field
      let parsedItems = [];
      if (items) {
        try {
          parsedItems = JSON.parse(items);
        } catch (e) {
          return res.status(400).send({
            message: "Invalid JSON format for items field",
            details: e.message,
          });
        }
      }

      const rows = parsedItems.map((rowData) => ({
        variant: rowData.variant,
        productCode: rowData.productCode,
        productName: rowData.productName,
        purchasePrice: rowData.purchasePrice,
        landingCost: rowData.landingCost,
        mrp: rowData.mrp,
        retailDiscount: rowData.retailDiscount,
        retailPrice: rowData.retailPrice,
        retailMargin: rowData.retailMargin,
        wholesalerDiscount: rowData.wholesalerDiscount,
        wholesalerPrice: rowData.wholesalerPrice,
        wholesaleMargin: rowData.wholesaleMargin,
        minimumStock: rowData.minimumStock,
        maximumStock: rowData.maximumStock,
        openingQty: rowData.openingQty,
      }));

      const img = req.files ? req.files.map((file) => file.path) : [];

      try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
          req.params.id,
          {
            itemCode,
            productName,
            category,
            subCategory,
            manufacturer,
            brand,
            subBrand,
            unit,
            hsnCode,
            gstRate,
            cess,
            purchaseTaxInclude,
            salesTaxInclude,
            description,
            newWeight,
            batchNo,
            expiryDate,
            feature,
            minimumStock,
            maximumStock,
            purchasePriceExGst,
            purchasePriceInGst,
            maxmimunRetailPrice,
            retailDiscount,
            retailPrice,
            retailMargin,
            wholesalerDiscount,
            wholesalerPrice,
            wholesaleMargin,
            quantity,
            rate,
            units,
            amount,
            items,
            img: img.length ? img : undefined, 
            rows,
          },
          { new: true }
        );

        if (!updatedProduct) {
          return res.status(404).send({
            message: "Product not found",
          });
        }

        res.status(200).send({
          message: "Product updated successfully",
          product: updatedProduct,
        });
      } catch (error) {
        res.status(500).send({ error: "Server error", message: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: "Server error", message: error.message });
  }
};
