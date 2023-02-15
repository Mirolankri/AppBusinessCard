const DEFAULT_VALIDATORE = {
    type: String,
    minLength: 2,
    maxLength: 256,
    required: true,
    trim: true,
    lowercase: true
}

module.exports = { DEFAULT_VALIDATORE }