'use client'
const { Provider } = require("react-redux")
const { store } = require("./store")

const Providers = ({children}) => {
    return <Provider store={store}>{children}</Provider>
}

export default Providers