const validateProduct = product => {
  // note: this can be done via swagger or other validation tools
  const errors = [];
  const { name, price, image, tags } = product;

  // name
  if (!name) {
    errors.push("Name cannot be empty");
  }
  // price
  if (!price) {
    errors.push("Price cannot be empty");
  } else {
    const newPrice = Number(price);
    // note: products can be free like giveaways
    if (price < 0) {
      errors.push("Price cannot be less than 0");
    }
    // price comparison
    const priceComparator = newPrice.toFixed(2);
    if (priceComparator != newPrice) {
      errors.push("Invalid price");
    }
  }

  // image
  if (image) {
    try {
      const newUrl = new URL(image);
    } catch (error) {
      errors.push("Invalid Image URL");
    }
  }

  // tags
  if (tags) {
    if (!Array.isArray(tags)) {
      errors.push("Invalid tags");
    } else {
      // check if element is a string
      for (let i = 0; i < tags.length; i++) {
        if (typeof tags[i] !== "string") {
          errors.push("Invalid tag");
          break;
        }
      }
    }
  }

  return errors;
};

const createTagArray = tagsString => {
  return tagsString.split(",");
};

module.exports = { createTagArray, validateProduct };
