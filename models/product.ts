import { SchemaFieldTypes } from "redis";

const productSchema = {
    '$.name':{
        type: SchemaFieldTypes.TEXT,
        sortable: true,
        as: "name",
    },
    '$.quantity':{
        type: SchemaFieldTypes.NUMERIC,
        as: "quantity",
    } 
} 

export default productSchema;