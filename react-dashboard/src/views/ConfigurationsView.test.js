const rewire = require("rewire")
const ConfigurationsView = rewire("./ConfigurationsView")
const mapStateToProps = ConfigurationsView.__get__("mapStateToProps")
// @ponicode
describe("mapStateToProps", () => {
    test("0", () => {
        let callFunction = () => {
            mapStateToProps({ configSettingsReducer: true, saveConfigsReducer: false, rebootReducer: { showPasscodeModal: true } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            mapStateToProps({ configSettingsReducer: false, saveConfigsReducer: true, rebootReducer: { showPasscodeModal: true } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            mapStateToProps({ configSettingsReducer: false, saveConfigsReducer: true, rebootReducer: { showPasscodeModal: false } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            mapStateToProps({ configSettingsReducer: true, saveConfigsReducer: true, rebootReducer: { showPasscodeModal: true } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            mapStateToProps({ configSettingsReducer: false, saveConfigsReducer: false, rebootReducer: { showPasscodeModal: false } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            mapStateToProps(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
