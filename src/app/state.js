//states and mapStateToProps
const statusState = {
  inputcourseworx: null,
  inputabout: null,
  inputproject: null,
  inputblog: null,
  togglecontact: false,
}

const mapStateToProps = (state) => {
  return {
    state: state,
  }
}

export{
  statusState,
  mapStateToProps,
}
