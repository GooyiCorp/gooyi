export default class Error {
    constructor() {
        this.errors = []
        this.checkRequire = true
    }
    isRequired(field, name) {
        if (field == null || field == '') this.errors.push(`${name} field is required.`)
        // if(this.checkRequire)   this.checkRequire = false
        return this
    }
    isOnlyRequiredOneOf(lstFieldAndName) {
        if (!lstFieldAndName.some(ele => ele.field != null)) {
            let errorlog = ''
            lstFieldAndName.forEach((ele, idx) => {
                if (idx < lstFieldAndName.length - 1)
                    errorlog += ele.name + ' or '
                else errorlog += ele.name
            })
            this.errors.push(`${errorlog} is required`)
        }
        return this
    }
    isInRange(field, range) {
        if (!Object.values(range).includes(field))
            this.errors.push(`system do not understand value of ${field}.`)
        return this
    }
    isValidLength(field, name, minlength, maxlength) {
        if (!(field.length >= minlength && field.length <= maxlength))
            this.errors.push(`the length of ${name} field is not valid.the valid field has ${minlength} - ${maxlength} characters.`)
        return this
    }
    appendError(message) {
        this.errors.push(message)
    }
    get() {
        return this.errors.length > 0 ? this.errors : null
    }
}