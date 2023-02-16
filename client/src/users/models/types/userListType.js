import { shape, string, bool, instanceOf } from "prop-types";
import addressType from "./addressType";
import imageType from "./imageType";
import nameType from "./nameType";

const userListType = shape({
    _id: string,
    name: nameType.isRequired,
    phone: string.isRequired,
    email: string.isRequired,
    address: addressType.isRequired,
    isAdmin: bool.isRequired,
    isBusiness: bool.isRequired,
    image: imageType.isRequired
})

export default userListType