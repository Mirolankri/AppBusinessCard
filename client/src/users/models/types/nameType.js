import { shape, string } from "prop-types";

const nameType = shape({
    _id: string,
    first: string.isRequired,
    middle: string,
    last: string.isRequired 
})

export default nameType