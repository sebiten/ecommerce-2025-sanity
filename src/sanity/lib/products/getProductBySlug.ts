import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductsBySlug = async (slug: string) => {
  // Execute Query
  const PRODUCT_BY_ID_QUERY = defineQuery(`
      *[
        _type == "product"
        && slug.current == $slug
      ] | order(name asc) [0]
    `);

  try {
    // Use sanityFetch to send the query and pass the search parameter with a wildcard
    const products = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug,
      },
    });

    // Return the list of products, or an empty array if none are found
    return products.data || null;
  } catch (error) {
    console.error("Error fetching products by ID:", error);
    return null;
  }
};
