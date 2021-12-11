
## `Structures of the app`
    structures and connections in the application


### `./src/index.js`
    |_renders:
    |________./router/routes.js as <Routerx/>

### `./src/router/routes.js`
    |_connects redux store to react pages: <Provider store={store}>
    |_connects global state and redux dispatch to react pages: connect(mapStateToProps,mapDispatchToProps)(PAGE)
    |_setup routes to pages

### `./src/app/store.js`
    |_setup store
    |__________the store connects the Pages to our state and dispatch
    |__________reducer is the logic that connects and modify our global state

### `../app/state`
    |_declares the states to be use by the reducer.js and routes.js
    |_implemented by store (background)
    |__________set this as default in your reducer (see reducer-statusState) [optional]
    |__________connect to your page (see routes-mapStateToProps)
    |__________        for all the pages to use the same state
    |_accessible through props:
    |_________this.props.<state declared in mapStateToProps>.<reducer declared in store>.<property>

### `../app/dispatch`
    |_declares the actions to be use by reducer.js and routes.js
    |_implemented by store (background)
    |__________how: use dispatch from mapDispatchToProps
    |__________     -> action will return an object
    |__________     -> store will read this object
    |__________     -> reducer will handle the value and should return a new state or old state (can be partial)
    |__________     -> stored in state
    |__________connect to your page (see routes-mapDispatchToProps)
    |_accessible through props:
    |_________this.props.<dispatch declared in mapDispatchToProps>([value])


### `../views/pages.js`
    |_exports pages found inside ../views/pages/

### `../views/pages`
    |_holds the react pages
    |_each page have wrapper function and a class
    |_Wrapper Function
    |__________ necessary to use react-router hooks
    |_Class
    |__________extends React
    |__________will render the display of the page
    |__________process the user interaction

### `Database`
    |_`./src/model`
    |__________generic.js
    |__________is a class with mongoose functionality    
    |_______________createsave({data})
    |__________functions inside the class:
                    findById(id)
                    findByCriteria({ field:value,[date:value || [{$gte:value, $lte:value}]] })
                    findByOptions({ field:value,[date:value || [{$gte:value, $lte:value}]] }, null, {sort:value,limit:value,skip:value})
                    findAll()
                    deleteById(id)
                    deleteByCriteria({ field:value,[date:value || [{$gte:value, $lte:value}]] })
                    deleteAll()
    |_________exports: Query
    |__________How to use:
    |__________1. const {Query} = require('./src/model/generic')
    |__________2. create new instance with a mongoose model
    |_______________const query = new Query(Model)
    |__________3. query.findById(id)
    |_______________result: null || {_id:id, field:value, ...}
