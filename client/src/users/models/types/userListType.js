import { shape, string, number, arrayOf, oneOfType, bool } from "prop-types";
import addressType from "./addressType";
import nameType from "./nameType";

const userListType = shape({
    _id: string,
    name: nameType.isRequired,
    phone: string.isRequired,
    email: string.isRequired,
    address: addressType.isRequired,
    isAdmin: bool.isRequired,
    isBusiness: bool.isRequired
})

export default userListType