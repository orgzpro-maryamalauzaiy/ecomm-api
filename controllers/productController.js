const pool = require("../apis/config/postgres.js");

const createProduct = async (req, res, next) => {
  try {
    const {
      image,
      name,
      description,
      price,
      original_price,
      discount,
      bg_color,
      panel_color,
      text_color,
      stock,
      category,
      sku,
      colors,
    } = req.body;
    // const { image } = req.body

    const results = await pool.query(
      `INSERT INTO products (image, name, description, price, original_price, discount, bg_color, panel_color, text_color, stock, category, sku, colors)
                            VALUES ( $1, $2, $3 , $4, $5 , $6, $7 , $8, $9 , $10, $11 , $12, $13 )
      `,
      [
        image,
        name,
        description,
        price,
        original_price,
        discount,
        bg_color,
        panel_color,
        text_color,
        stock,
        category,
        sku,
        colors,
      ],
    );

    console.log(results);

    res
      .status(200)
      .json({
        error: false,
        message: "Successfully insert product",
        data: results[0],
      });
  } catch (error) {
    next(error);
  }
};

const getProducts = async (req, res, next) => {
  try {
    const { color, category, range_price, type } = req.query;

    const { rows } = await pool.query(
      `SELECT * FROM products WHERE deleted_at = null ${color ? "AND color = $1" : category ? " AND category = $2" : range_price ? " AND price between " + range_price.split(" - ")[0] + " AND " + range_price.split(" - ")[1] : type ? " AND type = $3" : ""}`,
      [color, category, range_price, type],
    );

    console.log(rows);
    res
      .status(200)
      .json({
        error: false,
        message: "Successfully get product",
        data: rows[0],
      });
  } catch (error) {
    next(error);
  }
};

const getProductsNewArrivals = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM products WHERE pin_product = 'newarrivals' AND deleted_at is null ORDER BY created_at desc limit 6`,
    );

    console.log("rows", rows);
    res
      .status(200)
      .json({ error: false, message: "Successfully get product", data: rows });
  } catch (error) {
    next(error);
  }
};

const getProductsBestSellers = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM products WHERE pin_product='bestseller' AND deleted_at is null ORDER BY created_at desc limit 6`,
    );

    console.log(rows);
    res
      .status(200)
      .json({
        error: false,
        message: "Successfully get product bestseller",
        data: rows[0],
      });
  } catch (error) {
    next(error);
  }
};

const getProductsSpecialOffers = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM products WHERE deleted_at is null AND pin_product='special_offer' ORDER BY created_at desc limit 6`,
    );

    console.log(rows);
    res
      .status(200)
      .json({
        error: false,
        message: "Successfully get product special offer",
        data: rows[0],
      });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.query;

    const { rows } = await pool.query(
      `SELECT * FROM products WHERE deleted_at = null AND id = $1`,
      [id],
    );

    console.log(rows);
    res
      .status(200)
      .json({
        error: false,
        message: "Successfully get product",
        data: rows[0],
      });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const {
      id
    } = req.params

    const {
      image,
      name,
      description,
      price,
      original_price,
      discount,
      bg_color,
      panel_color,
      text_color,
      stock,
      category,
      sku,
      colors,
    } = req.body;
    // const { image } = req.body

    console.log('body', req.body)
    let result = {};

    if(image){
      results = await pool.query(
        `UPDATE products SET image = $1, name = $2, description = $3, price = #4, original_price = $5, discount = $6, bg_color = $7, panel_color = $8, text_color = $9, stock = $10, category = $11, sku = $12, colors = $13
                              WHERE id = $14
        `,
        [
          image,
          name,
          description,
          price,
          original_price,
          discount,
          bg_color,
          panel_color,
          text_color,
          stock,
          category,
          sku,
          colors,
          id
        ],
      );
    }else{
      results = await pool.query(
        `UPDATE products SET name = $1, description = $2, price = #3, original_price = $4, discount = $5, bg_color = $6, panel_color = $7, text_color = $8, stock = $9, category = $10, sku = $11, colors = $12
                              WHERE id = $13
        `,
        [
          name,
          description,
          price,
          original_price,
          discount,
          bg_color,
          panel_color,
          text_color,
          stock,
          category,
          sku,
          colors,
          id
        ],
      );

    }


    console.log(results);

    res
      .status(200)
      .json({
        error: false,
        message: "Successfully update product",
        data: results.rows[0],
      });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.query;
    // const { image, name, description, price, original_price, discount, bg_color, panel_color, text_color, stock, category, sku, colors } = req.body
    // const { image } = req.body

    const results = await pool.query(
      `DELETE products WHERE id = $1
      `,
      [id],
    );

    console.log(results);

    res
      .status(200)
      .json({ error: false, message: "Successfully delete product" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsNewArrivals,
  getProductsBestSellers,
  getProductsSpecialOffers,
};
