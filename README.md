
##Structures of the app
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
    |__________     -> action will return an object -> store will read this object
    |__________     -> reducer will handle the value -> stored in state
    |__________connect to your page (see routes-mapDispatchToProps)
    |_accessible through props:
    |_________this.props.<dispatch declared in mapDispatchToProps>([value])
